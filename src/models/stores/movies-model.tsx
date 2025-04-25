import { MovieDetails } from "../form-model";

export interface MoviesAdminStoreBase {
  editAdminMovie: MovieDetails;
  storeAdminMovie: (editAdminMovie: MovieDetails) => void;
}
