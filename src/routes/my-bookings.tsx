import { useUserBookings } from '../hooks/UserBookingContext';
import { MovieBookingTable } from '../components/MovieBookingTable';
import { useEffect, useState } from 'react';
import { Spinner } from '../components/Spinner';
import { MovieDetails } from '../models/form-model';
import { Modal } from '../components/Modal';
import { MovieBookingForm } from '../components/MovieBookingForm';

export const MyBookingsComponent = () => {
  const [loading, setLoading] = useState(true);
  const { userBooking, movies, updateMovies, addUserBooking, setUserBooking} = useUserBookings();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userBooking) {
      setLoading(false);
    }
  }, [userBooking]);
  
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
            availableSeats: m.availableSeats - bookedSeatsDifference 
          }
        : m
    );
    updateMovies(updatedMovies ?? []);
    addUserBooking({...movie, bookedSeats: bookedSeatsDifference});
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
              bookedSeats: 0 
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
      if(userBooking.length > 0) {
        alert("Booking submitted successfully!");
        setUserBooking([]);
      }
      else {
        alert("Failed to submit booking. Please try again.");
      }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">My Bookings</h1>

      {loading && <Spinner />} 

      {!loading && (
      <MovieBookingTable
        movies={userBooking}
        onUpdate={handleUpdateBooking}
        onDelete={handleCancelBooking}
        onSubmit={handleSubmitBooking}
      />
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isUpdate={(selectedMovie?.bookedSeats ?? 0) > 0}>
        {selectedMovie && (
          <MovieBookingForm
            movie={selectedMovie}
            bookedSeats={selectedMovie.bookedSeats}
            onSave={(newSeats) => handleSaveBooking(selectedMovie, newSeats)}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};
