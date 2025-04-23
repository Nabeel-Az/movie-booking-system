import { MovieDetails } from "@/models/form-model";
import { create } from "zustand";
import { createSelectors } from "./utility";
import {
  MoviesAdminStoreBase,
  MoviesStoreBase,
} from "@/models/stores/movies-model";

export const useMoviesStoreBase = create<MoviesStoreBase>()((set) => ({
  movies: [] as MovieDetails[],
  userBooking: [] as MovieDetails[],
  updateMovies: (movies: MovieDetails[]) => set(() => ({ movies })),
  // addUserBooking: (movieBooking: MovieDetails) => set(() => ({ userBooking })),
}));

export const useAdminMoviesStoreBase = create<MoviesAdminStoreBase>()(
  (set) => ({
    editAdminMovie: {} as MovieDetails,
    storeAdminMovie: (editAdminMovie: MovieDetails) =>
      set(() => ({ editAdminMovie })),
  })
);

export const useMoviesStore = createSelectors(useMoviesStoreBase);
export const useAdminMoviesStore = createSelectors(useAdminMoviesStoreBase);
