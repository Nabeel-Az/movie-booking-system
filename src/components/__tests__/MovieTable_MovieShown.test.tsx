/* eslint-disable no-undef */
// MovieTable.test.tsx

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
];

const mockColumns = [
  { accessorKey: "title", header: "Title" },
  { accessorKey: "description", header: "Description" },
  { accessorKey: "rating", header: "Rating" },
  { accessorKey: "showtime", header: "Showtime" },
];

test("renders movie table with a movie", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <MovieTable
        tableData={mockMovies}
        tableColumns={mockColumns}
        actions={[]}
      />
    </QueryClientProvider>
  );

  expect(screen.getByText("Inception")).toBeInTheDocument();
});
