import { formatShowtime } from "@/stores/utility";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { nanoid } from "nanoid";
import { MovieDetails } from "@/models/form-model";
import ValidationError from "./ValidationError";

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
      rating: initialValues?.rating || "",
      showtime: initialValues?.showtime || "",
      availableSeats: 50,
      bookedSeats: 0,
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={form.handleSubmit}
      className="w-full max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl space-y-8"
    >
      {step === 0 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Step 1: Movie Details
          </h2>
          <div className="space-y-6">
            <form.Field name="title">
              {(field) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-lg font-medium text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Movie Title"
                    className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <ValidationError
                    isTouched={field.state.meta.isTouched}
                    value={field.state.value}
                    errorMessage="Title is required"
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="description">
              {(field) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-lg font-medium text-gray-600"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Description"
                    className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <ValidationError
                    isTouched={field.state.meta.isTouched}
                    value={field.state.value}
                    errorMessage="Description is required"
                  />
                </div>
              )}
            </form.Field>
            <form.Field name="rating">
              {(field) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-lg font-medium text-gray-600"
                  >
                    Rating
                  </label>
                  <select
                    name="rating"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select a rating</option>
                    {RATINGS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <ValidationError
                    isTouched={field.state.meta.isTouched}
                    value={field.state.value}
                    errorMessage="Rating is required"
                  />
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => ({
                title: state.values.title,
                description: state.values.description,
                rating: state.values.rating,
              })}
            >
              {({ title, description, rating }) => (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className={
                      !title || !description || !rating
                        ? "text-lg bg-gray-500 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300 cursor-not-allowed"
                        : "text-lg bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
                    }
                    onClick={() => setStep(1)}
                    disabled={!title || !description || !rating}
                  >
                    Next
                  </button>
                </div>
              )}
            </form.Subscribe>
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Step 2: Showtime
          </h2>
          <div className="space-y-6">
            <form.Field name="showtime">
              {(field) => (
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor={field.name}
                    className="text-lg font-medium text-gray-600"
                  >
                    Showtime
                  </label>
                  <input
                    type="datetime-local"
                    name="showtime"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="input input-bordered w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <ValidationError
                    isTouched={field.state.meta.isTouched}
                    value={field.state.value}
                    errorMessage="Showtime is required"
                  />
                </div>
              )}
            </form.Field>

            <form.Subscribe
              selector={(state) => ({
                showtime: state.values.showtime,
              })}
            >
              {({ showtime }) => (
                <div className="flex justify-between space-x-4">
                  <button
                    type="button"
                    className="text-lg bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className={
                      !showtime
                        ? "text-lg bg-gray-500 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300 cursor-not-allowed"
                        : "text-lg bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium shadow-md transition duration-300"
                    }
                    onClick={() => setStep(2)}
                    disabled={!showtime}
                  >
                    Next
                  </button>
                </div>
              )}
            </form.Subscribe>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Step 3: Confirm
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-lg table-auto mb-6">
              <tbody>
                <tr>
                  <td className="font-semibold pr-4 py-2 text-gray-600">
                    Title:
                  </td>
                  <td className="py-2">{form.getFieldValue("title")}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 text-gray-600">
                    Description:
                  </td>
                  <td className="py-2">{form.getFieldValue("description")}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 text-gray-600">
                    Rating:
                  </td>
                  <td className="py-2">{form.getFieldValue("rating")}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 text-gray-600">
                    Showtime:
                  </td>
                  <td className="py-2">
                    {formatShowtime(form.getFieldValue("showtime"))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between space-x-4">
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
