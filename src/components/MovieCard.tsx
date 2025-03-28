import React from 'react';
import { MovieCardProps } from '../models/form-model';

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onBook, onUpdate, onCancel }) => {
  return (
    <div className="max-w mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6 border-2 border-gold-500">
      <h2 className="text-xl font-bold text-gray-800">{movie.title}</h2>
      <p className="text-gray-600 mt-2">{movie.description}</p>
      <p className="text-gray-700 mt-2">Available Seats: <span className="font-bold">{movie.availableSeats}</span></p>
      {movie.bookedSeats > 0 && (
        <p className="text-gray-700 mt-2">
          Booked Seats: <span className="font-bold">{movie.bookedSeats}</span>
        </p>
      )}
      <p className="text-gray-700 mt-1">Showtime: <span className="font-bold">{movie.showtime}</span></p>     
      <div className="mt-4 space-x-2">
      {movie.bookedSeats === 0 && (      
      <button
        onClick={() => onBook(movie)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Book Now
        </button>       
      )}
      {movie.bookedSeats > 0 && (
      <>
        <button
          onClick={() => onUpdate(movie)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Update Booking
        </button>
        <button
          onClick={() => onCancel(movie)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Cancel Booking
        </button>
      </>
      )}
      </div>
    </div>
  );
};
