import { MovieTable } from "@/components/MovieTable";
import { Spinner } from "@/components/Spinner";
import { MovieDetails } from "@/models/form-model";
import { getAdminMoviesList } from "@/services/admin-service";
import { useAdminMoviesStore } from "@/stores/movies-store";
import { formatShowtime } from "@/stores/utility";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect } from "react";

const AdminComponent = () => {
  const navigate = Route.useNavigate();
  const storeAdminMovie = useAdminMoviesStore.get.storeAdminMovie();

  useEffect(() => {
    storeAdminMovie({} as MovieDetails);
  }, [storeAdminMovie]);

  const { isFetching: loading, data: moviesData } = useQuery({
    queryKey: ["getAllAdminMoviesData"],
    queryFn: async () => {
      const moviesData = await getAdminMoviesList();

      return moviesData || [];
    },
  });

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
  ];

  const handleAdminEditMovie = async (movie: MovieDetails) => {
    storeAdminMovie(movie);
    await navigate({ to: "/admin/movies" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black-600 text-left mb-4">
        Admin Home Dashboard
      </h1>
      {loading && <Spinner />}
      {!loading && (
        <div>
          <MovieTable
            tableData={moviesData}
            tableColumns={movieKeyList}
            actions={[
              {
                label: "Edit",
                onClick: handleAdminEditMovie,
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
