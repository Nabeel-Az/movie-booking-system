import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addMovieBooking, getMoviesList } from "@/services/user-service";
import { MovieDetails } from "@/models/form-model";
import { formatShowtime } from "@/stores/utility";
import { Spinner } from "@/components/Spinner";
import { MovieTable } from "@/components/MovieTable";

export const HomeComponent = () => {
  const { isFetching: loading, data: moviesData } = useQuery({
    queryKey: ["getAllMoviesData"],
    queryFn: async () => {
      const moviesData = await getMoviesList();

      return moviesData || [];
    },
  });

  const bookMovieMutation = useMutation({
    mutationFn: (movieCreated: MovieDetails) => {
      return addMovieBooking(movieCreated);
    },
    onSuccess: async (response) => {
      alert("Movie booked successfully!");
      return response;
    },
  });

  const handleBookMovie = (values: MovieDetails) => {
    bookMovieMutation.mutate(values);
  };

  const movieKeyList = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "rating",
      header: "Rating",
    },
    {
      accessorKey: "showtime",
      header: "Showtime",
      cell: ({ row }: { row: { original: MovieDetails } }) =>
        formatShowtime(row.original.showtime),
    },
    {
      accessorKey: "availableSeats",
      header: "Available Seats",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-8 tracking-tight drop-shadow">
        User Home Dashboard
      </h1>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <MovieTable
            tableData={moviesData}
            tableColumns={movieKeyList}
            showPagination={true}
            actions={[
              {
                label: "Book",
                onClick: handleBookMovie,
                className:
                  "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/home")({
  component: HomeComponent,
  beforeLoad: ({ context }) => {
    if (!context.auth.userProfile.token) {
      throw redirect({
        to: "/login",
      });
    }
    return;
  },
});
