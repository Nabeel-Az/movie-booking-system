import { MovieMultiStepForm } from "@/components/MovieMultiStepForm";
import { MovieDetails } from "@/models/form-model";
import {
  addAdminMovie,
  deleteAdminMovie,
  updateAdminMovie,
} from "@/services/admin-service";
import { useAdminMoviesStore } from "@/stores/movies-store";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const AdminMoviesComponent = () => {
  const editAdminMovie = useAdminMoviesStore.get.editAdminMovie();
  const storeAdminMovie = useAdminMoviesStore.get.storeAdminMovie();

  const addMovieMutation = useMutation({
    mutationFn: (movieCreated: MovieDetails) => {
      return addAdminMovie(movieCreated);
    },
    onSuccess: async (response) => {
      alert("Movie created!");
      return response;
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: (movieCreated: MovieDetails) => {
      return updateAdminMovie({
        match: { id: movieCreated.id },
        ...movieCreated,
      });
    },
    onSuccess: (response) => {
      alert("Movie updated!");
      storeAdminMovie({} as MovieDetails);
      return response;
    },
  });

  const deleteMovieMutation = useMutation({
    mutationFn: (movieId: string) => {
      return deleteAdminMovie(movieId);
    },
    onSuccess: (response) => {
      alert("Movie deleted!");
      storeAdminMovie({} as MovieDetails);
      return response;
    },
  });

  const handleCreateMovie = (values: MovieDetails) => {
    addMovieMutation.mutate(values);
  };

  const handleUpdateMovie = (values: MovieDetails) => {
    updateMovieMutation.mutate(values);
  };

  const handleDeleteMovie = (movieId: string) => {
    deleteMovieMutation.mutate(movieId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-extrabold text-gray-700 text-center mb-8 tracking-tight drop-shadow">
        Admin Movie Creation
      </h1>
      {/* Create mode */}
      {(!editAdminMovie || Object.keys(editAdminMovie).length === 0) && (
        <MovieMultiStepForm onSubmit={handleCreateMovie} />
      )}
      {/* Update mode */}
      {editAdminMovie && Object.keys(editAdminMovie).length > 0 && (
        <MovieMultiStepForm
          initialValues={{
            ...editAdminMovie,
          }}
          onSubmit={handleUpdateMovie}
          onDelete={handleDeleteMovie}
        />
      )}
    </div>
  );
};

export const Route = createFileRoute("/admin/movies")({
  component: AdminMoviesComponent,
});
