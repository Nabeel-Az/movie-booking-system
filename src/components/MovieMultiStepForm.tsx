import { formatShowtime } from "@/stores/utility";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { nanoid } from "nanoid";
import { MovieDetails } from "@/models/form-model";

const RATINGS = ["G", "PG", "PG-13", "R", "NC-17"];

export const MovieMultiStepForm = ({
  onSubmit,
  initialValues,
  onDelete,
}: {
  onSubmit: (values: MovieDetails) => void;
  initialValues?: Partial<MovieDetails>;
  onDelete?: (id: string) => void;
}) => {
  const [step, setStep] = useState(0);

  const form = useForm<MovieDetails>({
    defaultValues: {
      id: initialValues?.id || nanoid(5),
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      rating: initialValues?.rating || RATINGS[0],
      showtime: initialValues?.showtime || "",
      availableSeats: 50,
      bookedSeats: 0,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  console.log(initialValues?.showtime);
  return (
    <form
      onSubmit={form.handleSubmit}
      className="w-full max-w mx-auto bg-white p-6 rounded shadow"
    >
      {step === 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 1: Movie Details</h2>
          <form.Field name="title">
            {(field) => (
              <div className="text-xl mb-4 flex flex-col">
                <label htmlFor={field.name} className="mb-1 font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Movie Title"
                  className="input input-bordered w-full mb-2"
                  required
                />
              </div>
            )}
          </form.Field>
          <form.Field name="description">
            {(field) => (
              <div className="text-xl mb-4 flex flex-col">
                <label htmlFor={field.name} className="mb-1 font-semibold">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Description"
                  className="input input-bordered w-full mb-2"
                  required
                />
              </div>
            )}
          </form.Field>
          <form.Field name="rating">
            {(field) => (
              <div className="text-xl mb-4 flex flex-col">
                <label htmlFor={field.name} className="mb-1 font-semibold">
                  Rating
                </label>
                <select
                  name="rating"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="input input-bordered w-full mb-2"
                  required
                >
                  {RATINGS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-lg bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
              onClick={() => setStep(1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 2: Showtime</h2>
          <form.Field name="showtime">
            {(field) => (
              <div className="text-xl mb-4 flex flex-col">
                <label htmlFor={field.name} className="mb-1 font-semibold">
                  Showtime
                </label>
                <input
                  type="datetime-local"
                  name="showtime"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Showtime"
                  className="input input-bordered w-full mb-2"
                  required
                />
              </div>
            )}
          </form.Field>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-lg bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
              onClick={() => setStep(0)}
            >
              Back
            </button>
            <button
              type="button"
              className="text-lg bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Step 3: Confirm</h2>
          <table className="w-full text-xl table-auto mb-4">
            <tbody>
              <tr>
                <td className="font-semibold pr-2">Title:</td>
                <td>{form.getFieldValue("title")}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Description:</td>
                <td>{form.getFieldValue("description")}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Rating:</td>
                <td>{form.getFieldValue("rating")}</td>
              </tr>
              <tr>
                <td className="font-semibold pr-2">Showtime:</td>
                <td>{formatShowtime(form.getFieldValue("showtime"))}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-lg bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
              onClick={() => setStep(1)}
            >
              Back
            </button>
            {initialValues && initialValues.id && onDelete && (
              <button
                type="button"
                className="text-lg bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
                onClick={() => onDelete(initialValues.id!)}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="text-lg bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
            >
              {initialValues ? "Update" : "Create"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
