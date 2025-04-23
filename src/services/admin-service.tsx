import { ApiResponseBase } from "@/models/common";
import { deleteRequest, getRequest, postRequest, putRequest } from "./axios";
import { MovieDetails } from "@/models/form-model";

export const getAdminMoviesList = async (): Promise<MovieDetails[]> => {
  try {
    const response = await getRequest<MovieDetails[]>("admin/getMoviesList");
    return response;
  } catch (error) {
    console.error("Error fetching list of movies:", error);
    throw error;
  }
};

export const addAdminMovie = async (
  addAdminMovie: MovieDetails
): Promise<ApiResponseBase> => {
  try {
    const response = await postRequest<ApiResponseBase>(
      "admin/addMovie",
      addAdminMovie
    );
    return response;
  } catch (error) {
    console.error("Error creating movie:", error);
    throw error;
  }
};

export const updateAdminMovie = async (
  updateMovie: any
): Promise<ApiResponseBase> => {
  try {
    const response = await putRequest<ApiResponseBase>(
      "admin/updateMovie",
      updateMovie
    );
    return response;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};

export const deleteAdminMovie = async (
  movieId: string
): Promise<ApiResponseBase> => {
  try {
    const response = await deleteRequest<ApiResponseBase>(
      "admin/deleteMovie",
      movieId
    );
    return response;
  } catch (error) {
    console.error("Error deleting movie:", error);
    throw error;
  }
};
