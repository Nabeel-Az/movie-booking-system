import { MovieDetails } from "@/models/form-model";
import { create } from "zustand";
import { createSelectors } from "./utility";
import {
  MoviesAdminStoreBase,
  // MoviesStoreBase,
} from "@/models/stores/movies-model";

export const useAdminMoviesStoreBase = create<MoviesAdminStoreBase>()(
  (set) => ({
    editAdminMovie: {} as MovieDetails,
    storeAdminMovie: (editAdminMovie: MovieDetails) =>
      set(() => ({ editAdminMovie })),
  })
);

export const useAdminMoviesStore = createSelectors(useAdminMoviesStoreBase);
