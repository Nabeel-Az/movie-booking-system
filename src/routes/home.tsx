import { useEffect, useState } from 'react';
import { useFetchApi } from '../hooks/useFetchMovies';
import { Spinner } from '../components/Spinner';
import { Modal } from '../components/Modal';
import { MovieBookingForm } from '../components/MovieBookingForm';
import { useUserBookings } from '../hooks/UserBookingContext';
import { MovieDetails } from '../models/form-model';
import { MovieCard } from '../components/MovieCard';

export const HomeComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading } = useFetchApi('/listOfMovies');
  const { userBooking, movies, setUserBooking, updateMovies, addUserBooking } = useUserBookings();
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);
  const [bookedSeats, setBookedSeats] = useState<number>(0);

  useEffect(() => {
    if(userBooking.length > 0) return;
    if (data) {
      updateMovies(data);
    }
  }, [data]);

  const handleBookMovie = (movie: MovieDetails) => {
    setSelectedMovie(movie);
    setBookedSeats(1);
    setIsModalOpen(true);
  };

  const handleUpdateBooking = (movie: MovieDetails) => {
    setSelectedMovie(movie);
    setBookedSeats(movie.bookedSeats);
    setIsModalOpen(true);
  };

  const handleCancelBooking = (movie: MovieDetails) => {
    const updatedMovies = movies?.map((m) =>
      m.title === movie.title
        ? { ...m, availableSeats: m.availableSeats + m.bookedSeats, bookedSeats: 0 }
        : m
    );
    updateMovies(updatedMovies ?? []);
    setUserBooking((prevUserBooking) =>
      prevUserBooking.filter((userMovie) => userMovie.title !== movie.title)
    );
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-black-600 text-center mb-4">Movie Booking Management System</h1>
      {loading && <Spinner />}  
      {!loading && (
        <div>
          {movies?.map((movie) => (
            <div key={movie.title} className='mb-4'>
              <MovieCard       
                movie={movie}
                onBook={handleBookMovie}
                onUpdate={handleUpdateBooking}
                onCancel={handleCancelBooking}
              />
            </div>
          ))}
        </div>  
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isUpdate={(selectedMovie?.bookedSeats ?? 0) > 0}>
        {selectedMovie && (
          <MovieBookingForm
            movie={selectedMovie}
            bookedSeats={bookedSeats}
            onSave={(newSeats) => handleSaveBooking(selectedMovie, newSeats)}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};