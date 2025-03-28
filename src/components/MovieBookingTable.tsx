import React from 'react';
import { MovieTableProps } from '../models/form-model';

export const MovieBookingTable: React.FC<MovieTableProps> = ({ movies, onUpdate, onDelete, onSubmit }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <div className="mt-4 text-left mb-5">
      {movies.length > 0 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Submit Booking
          </button>
        </form>
      )}
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Seats</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Showtime</th>
          </tr>
        </thead>
        <tbody>
          {movies.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-sm text-center text-gray-500">
                No bookings found
              </td>
            </tr>
          ) : (
            movies.map((movie, index) => (
              <tr key={movie.id} className="border-t">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{movie.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{movie.description}</td>
                <td className="px-9 py-4 text-sm text-gray-500">{movie.bookedSeats}</td>
                <td className="px-5 py-4 text-sm text-gray-500">{movie.showtime}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onUpdate(index)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
