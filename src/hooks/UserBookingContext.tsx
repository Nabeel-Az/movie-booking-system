import { createContext, useState, useContext, ReactNode, useMemo } from "react";
import { MovieDetails } from "../models/form-model";

export type UserBookingContextType = {
  movies: MovieDetails[] | null;
  userBooking: MovieDetails[];
  updateMovies: (storeMovies: MovieDetails[]) => void;
  addUserBooking: (movieBooking: MovieDetails) => void;
  setUserBooking: React.Dispatch<React.SetStateAction<MovieDetails[]>>;
};

export const UserBookingContext = createContext<
  UserBookingContextType | undefined
>(undefined);

export const UserBookingContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [userBooking, setUserBooking] = useState<MovieDetails[]>([]);
  const [movies, setMovies] = useState<MovieDetails[] | null>(null);

  const updateMovies = (storeMovies: MovieDetails[]) => {
    setMovies(storeMovies);
  };

  const addUserBooking = (movieBooking: MovieDetails) => {
    const existingMovieBooking = userBooking.find(
      (element) => element.title === movieBooking.title
    );
    if (existingMovieBooking) {
      setUserBooking((prevUserBooking) =>
        prevUserBooking.map((item) =>
          item.title === movieBooking.title
            ? {
                ...item,
                bookedSeats: item.bookedSeats
                  ? item.bookedSeats + movieBooking.bookedSeats
                  : movieBooking.bookedSeats,
              }
            : item
        )
      );
    } else {
      setUserBooking((prevUserBooking) => [...prevUserBooking, movieBooking]);
    }
  };

  // Memoize the context value to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      movies,
      userBooking,
      updateMovies,
      addUserBooking,
      setUserBooking,
    }),
    [movies, userBooking] // Only recreate if these values change
  );

  return (
    <UserBookingContext.Provider value={contextValue}>
      {children}
    </UserBookingContext.Provider>
  );
};

export const useUserBookings = () => {
  const context = useContext(UserBookingContext);
  if (!context) {
    throw new Error(
      "retrieveUserBookings must be used within an UserBookingContextProvider"
    );
  }
  return context;
};
