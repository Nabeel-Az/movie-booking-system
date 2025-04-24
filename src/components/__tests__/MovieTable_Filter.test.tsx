/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MovieTable } from "../MovieTable";

const queryClient = new QueryClient();

const mockMovies = [
  {
    id: "XGSHE",
    title: "Inception",
    description: "Dreams",
    rating: "PG-13",
    showtime: "2023-08-10T10:00:00Z",
    availableSeats: 50,
    bookedSeats: 0,
  },
  {
    id: "YTRWE",
    title: "Interstellar",
    description: "Space",
    rating: "PG-13",
    showtime: "2023-08-11T12:00:00Z",
    availableSeats: 40,
    bookedSeats: 5,
  },
];

const mockColumns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "rating", header: "Rating" },
  { accessorKey: "showtime", header: "Showtime" },
];

test("Filtering the TanStack Table movies should show the expected number of movies after filter", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MovieTable
        tableData={mockMovies}
        tableColumns={mockColumns}
        actions={[]}
      />
    </QueryClientProvider>
  );

  // Simulate filtering by title
  const filterInput = screen.getByPlaceholderText(/search by title/i);
  fireEvent.change(filterInput, { target: { value: "Interstellar" } });

  // Only "Interstellar" should be visible
  expect(screen.queryByText("Inception")).not.toBeInTheDocument();
  expect(screen.getByText("Interstellar")).toBeInTheDocument();
});
