import { Spinner } from "../components/Spinner";
import { MovieDetails } from "../models/form-model";
import { createFileRoute, redirect } from "@tanstack/react-router";
import {
  deleteMovieBooking,
  getMyBookings,
  updateMovieBooking,
} from "@/services/user-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { formatShowtime } from "@/stores/utility";
import { MovieTable } from "@/components/MovieTable";

export const MyBookingsComponent = () => {
  const queryClient = useQueryClient();
  const { isFetching: loading, data: moviesData } = useQuery({
    queryKey: ["getMyBookingsData"],
    queryFn: async () => {
      const moviesData = await getMyBookings();

      return moviesData || [];
    },
  });

  const updateMovieMutation = useMutation({
    mutationFn: (updateBooking: MovieDetails) => {
      return updateMovieBooking(updateBooking);
    },
    onSuccess: (response) => {
      alert("Movie booking updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["getMyBookingsData"] });
      return response;
    },
  });

  const deleteMovieMutation = useMutation({
    mutationFn: (deleteBooking: MovieDetails) => {
      return deleteMovieBooking(deleteBooking.id);
    },
    onSuccess: (response) => {
      alert("Movie booking deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getMyBookingsData"] });
      return response;
    },
  });

  const handleUpdateBooking = (values: MovieDetails) => {
    updateMovieMutation.mutate(values);
  };

  const handleDeleteBooking = (values: MovieDetails) => {
    deleteMovieMutation.mutate(values);
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
      accessorKey: "bookedSeats",
      header: "Booked Seats",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black-600 text-left mb-4">
        My Bookings
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
                label: "Update",
                onClick: handleUpdateBooking,
                className:
                  "bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded",
              },
              {
                label: "Delete",
                onClick: handleDeleteBooking,
                className:
                  "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded",
              },
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const Route = createFileRoute("/my-bookings")({
  component: MyBookingsComponent,
  beforeLoad: ({ context }) => {
    // Check if the user token is set
    if (!context.auth.userProfile.token) {
      // Redirect to login if not authorized
      throw redirect({
        to: "/login",
      });
    }
    return; // Allow access if authorized
  },
});
