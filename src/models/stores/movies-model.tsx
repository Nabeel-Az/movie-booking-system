import { MovieDetails } from "../form-model";

export interface MoviesStoreBase {
  movies: MovieDetails[];
  userBooking: MovieDetails[];
  updateMovies: (movies: MovieDetails[]) => void;
}

export interface MoviesAdminStoreBase {
  editAdminMovie: MovieDetails;
  storeAdminMovie: (editAdminMovie: MovieDetails) => void;
}
