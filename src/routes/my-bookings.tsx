import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { MovieDetails } from "../models/form-model";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMoviesStore } from "@/stores/movies-store";

export const MyBookingsComponent = () => {
  const [loading, setLoading] = useState(true);
  // const { userBooking, addUserBooking, setUserBooking } = useUserBookings();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userBooking) {
      setLoading(false);
    }
  }, [userBooking]);

  const movies = useMoviesStore.get.movies();
  const updateMovies = useMoviesStore.get.updateMovies();

  const handleUpdateBooking = (index: number) => {
    setSelectedMovie(userBooking[index]);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (movie: MovieDetails, newBookedSeats: number) => {
    const bookedSeatsDifference = newBookedSeats - movie.bookedSeats;
    const updatedMovies = movies?.map((m) =>
      m.title === movie.title
        ? {
            ...m,
            bookedSeats: newBookedSeats,
            availableSeats: m.availableSeats - bookedSeatsDifference,
          }
        : m
    );
    updateMovies(updatedMovies ?? []);
    addUserBooking({ ...movie, bookedSeats: bookedSeatsDifference });
    setIsModalOpen(false);
  };

  const handleCancelBooking = (index: number) => {
    const selectedMovie = userBooking[index];

    if (selectedMovie) {
      const updatedMovies = movies?.map((movie) =>
        movie.title === selectedMovie.title
          ? {
              ...movie,
              availableSeats: movie.availableSeats + selectedMovie.bookedSeats,
              bookedSeats: 0,
            }
          : movie
      );
      updateMovies(updatedMovies ?? []);
      setUserBooking((prevUserBooking) =>
        prevUserBooking.filter((_, idx) => idx !== index)
      );
    }
  };

  const handleSubmitBooking = () => {
    if (userBooking.length > 0) {
      alert("Booking submitted successfully!");
      setUserBooking([]);
    } else {
      alert("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {/* {loading && <Spinner />}

      {!loading && (
        <MovieBookingTable
          movies={userBooking}
          onUpdate={handleUpdateBooking}
          onDelete={handleCancelBooking}
          onSubmit={handleSubmitBooking}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isUpdate={(selectedMovie?.bookedSeats ?? 0) > 0}
      >
        {selectedMovie && (
          <MovieBookingForm
            movie={selectedMovie}
            bookedSeats={selectedMovie.bookedSeats}
            onSave={(newSeats) => handleSaveBooking(selectedMovie, newSeats)}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal> */}
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
