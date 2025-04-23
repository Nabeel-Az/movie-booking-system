import { MovieTable } from "@/components/MovieTable";
import { Spinner } from "@/components/Spinner";
import { MovieDetails } from "@/models/form-model";
import { getAdminMoviesList } from "@/services/admin-service";
import { useMoviesStore, useAdminMoviesStore } from "@/stores/movies-store";
import { formatShowtime } from "@/stores/utility";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

const AdminComponent = () => {
  const navigate = Route.useNavigate();
  const movies = useMoviesStore.get.movies();
  const updateMovies = useMoviesStore.get.updateMovies();
  const storeAdminMovie = useAdminMoviesStore.get.storeAdminMovie();

  useEffect(() => {
    storeAdminMovie({} as MovieDetails);
  }, [storeAdminMovie]);

  const { isFetching: loading } = useQuery({
    queryKey: ["getAllAdminMoviesData"],
    queryFn: async () => {
      const moviesData = await getAdminMoviesList();
      updateMovies(moviesData);

      return moviesData || [];
    },
  });

  const movieKeyList = [
    {
      accessorKey: "id",
      header: "Movie ID",
    },
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
  ];

  const handleAdminEditMovie = async (movie: MovieDetails) => {
    storeAdminMovie(movie);
    await navigate({ to: "/admin/movies" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black-600 text-center mb-4">
        Movie Booking Management System
      </h1>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <MovieTable
            tableData={movies}
            tableColumns={movieKeyList}
            onEdit={handleAdminEditMovie}
          />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: AdminComponent,
  beforeLoad: ({ context }) => {
    const { auth } = context;
    const { userProfile } = auth;

    // Check if the user token is set and has the 'admin' role
    if (!context.auth.userProfile.token || userProfile.role !== "admin") {
      // Redirect to appropriate page based on user role
      throw redirect({
        to: userProfile.role === "user" ? "/home" : "/login",
      });
    }
    return;
  },
});
