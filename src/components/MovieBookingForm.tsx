import React, { useState, useEffect } from 'react';
import { MovieDetails, MovieFormProps } from '../models/form-model';

export const MovieBookingForm: React.FC<MovieFormProps> = ({ movie, bookedSeats, onSave, onCancel }) => {
  const [seats, setSeats] = useState(bookedSeats);
  const [isModified, setIsModified] = useState<boolean>(false);
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    id: "",
    title: "",
    description: "",
    availableSeats: 0,
    bookedSeats: 0,
    showtime: ""
  })

  useEffect(() => {
    if (movie) {
      setMovieDetails({
        ...movieDetails,
        title: movie.title,
        description: movie.description,
        availableSeats: movie.availableSeats,
        bookedSeats: seats,
        showtime: movie.showtime
      })
    }
    setIsModified(seats !== movie.bookedSeats);
  }, [movie, seats]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (seats <= movie.availableSeats && seats > 0) {
      onSave(seats);
    } else {
      alert('Please enter a valid number of seats.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-lg rounded-md">
      <div>
        <label htmlFor="title" className="block text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          value={movieDetails.title}
          onChange={(e) => setMovieDetails({...movieDetails, title: e.target.value})}
          className="w-full px-3 py-2 border rounded-md"
          disabled
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700">Description</label>
        <textarea
          id="description"
          value={movieDetails.description}
          onChange={(e) => setMovieDetails({...movieDetails, description: e.target.value})}
          className="w-full px-3 py-2 border rounded-md resize-none h-40"
          disabled
        />
      </div>
      <div>
        <label htmlFor="showtime" className="block text-gray-700">Showtime</label>
        <input
          type="text"
          id="showtime"
          value={movieDetails.showtime}
          onChange={(e) => setMovieDetails({...movieDetails, showtime: e.target.value})}
          className="w-full px-3 py-2 border rounded-md"
          disabled
        />
      </div>
      <div>
        <label htmlFor="seats" className="block text-lg">Number of Seats</label>
        <input
          type="number"
          id="seats"
          value={seats}
          onChange={(e) => setSeats(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
          min={1}
          max={movie.availableSeats}
          required
        />
      </div>    
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className={!isModified 
            ? "px-4 py-2 bg-gray-500 text-white rounded-md"
            : "px-4 py-2 bg-blue-500 text-white rounded-md"
          }                 
          disabled={!isModified}
        >
          Book
        </button>
      </div>
    </form>
  );  
};
