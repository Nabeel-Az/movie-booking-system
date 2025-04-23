import { MovieDetails } from "@/models/form-model";
import { deleteRequest, getRequest, postRequest } from "./axios";
import { ApiResponseBase } from "@/models/common";

export const getMoviesList = async (): Promise<MovieDetails[]> => {
  try {
    const response = await getRequest<MovieDetails[]>("api/getMoviesList");
    return response;
  } catch (error) {
    console.error("Error fetching list of movies:", error);
    throw error;
  }
};

export const addMovieBooking = async (
  addMovie: MovieDetails
): Promise<ApiResponseBase> => {
  try {
    const response = await postRequest<ApiResponseBase>(
      "api/addBooking",
      addMovie
    );
    return response;
  } catch (error) {
    console.error("Error adding movie booking:", error);
    throw error;
  }
};

export const getMyBookings = async (): Promise<MovieDetails[]> => {
  try {
    const response = await getRequest<MovieDetails[]>("api/getMyBookings");
    return response;
  } catch (error) {
    console.error("Error fetching movie booking:", error);
    throw error;
  }
};

export const updateMovieBooking = async (
  updateMovieBooking: any
): Promise<ApiResponseBase> => {
  try {
    const response = await postRequest<ApiResponseBase>(
      "api/updateBooking",
      updateMovieBooking
    );
    return response;
  } catch (error) {
    console.error("Error updating movie booking:", error);
    throw error;
  }
};

export const deleteMovieBooking = async (
  bookingId: string
): Promise<ApiResponseBase> => {
  try {
    const response = await deleteRequest<ApiResponseBase>(
      "api/deleteBooking",
      bookingId
    );
    return response;
  } catch (error) {
    console.error("Error deleting movie booking:", error);
    throw error;
  }
};
