import { MovieDetails } from "@/models/form-model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo, useState } from "react";

interface MovieTableAction<T> {
  label: string;
  onClick: (row: T) => void;
  className?: string;
}

interface MovieTableProps {
  tableData?: MovieDetails[];
  tableColumns?: ColumnDef<MovieDetails, any>[];
  actions?: MovieTableAction<MovieDetails>[];
  showPagination?: boolean;
}

export const MovieTable: React.FC<MovieTableProps> = ({
  tableData,
  tableColumns,
  actions = [],
  showPagination = false,
}) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [titleFilter, setTitleFilter] = useState<string>("");
  const [ratingFilter, setRatingFilter] = useState<string>("");
  const [showtimeFilter, setShowtimeFilter] = useState<string>("");

  const filterByTitle = (movie: MovieDetails) => {
    if (!titleFilter) return true;
    return movie.title.toLowerCase().includes(titleFilter.toLowerCase());
  };

  const filterByRating = (movie: MovieDetails) => {
    if (!ratingFilter) return true;
    return movie.rating === ratingFilter;
  };

  const filterByShowtime = (movie: MovieDetails) => {
    if (!showtimeFilter) return true;
    const showtime = new Date(movie.showtime);

    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    switch (showtimeFilter) {
      case "today":
        return showtime.toDateString() === today.toDateString();
      case "this-week":
        return showtime >= startOfWeek && showtime <= today;
      case "this-month":
        return showtime >= startOfMonth && showtime <= endOfMonth;
      default:
        return true;
    }
  };

  const filteredData = useMemo(() => {
    return tableData?.filter((movie) => {
      return (
        filterByTitle(movie) && filterByRating(movie) && filterByShowtime(movie)
      );
    });
  }, [tableData, titleFilter, ratingFilter, showtimeFilter]);

  const movieTable = useReactTable({
    data: filteredData || [],
    columns: tableColumns || [],
    state: {
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        const newState = updater({ pageIndex, pageSize });
        setPageIndex(newState.pageIndex);
        setPageSize(newState.pageSize);
      } else {
        setPageIndex(updater.pageIndex);
        setPageSize(updater.pageSize);
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
    pageCount: Math.ceil((filteredData?.length || 0) / pageSize),
  });

  const [seatInputs, setSeatInputs] = useState<{ [movieId: string]: number }>(
    {}
  );

  const handleSeatInputChange = (movieId: string, value: string) => {
    const num = Number(value);
    setSeatInputs((prev) => ({
      ...prev,
      [movieId]: isNaN(num) ? 0 : num,
    }));
  };

  const showNoMoviesFound = !filteredData || filteredData.length === 0;

  return (
    <div className="mt-10 mx-10 lg:mx-20">
      <div className="flex flex-col gap-8">
        {/* Filters Section */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by Title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="border px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
          />
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="border px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
          >
            <option value="">All Ratings</option>
            <option value="G">G - Kid Friendly</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
          </select>
          <select
            value={showtimeFilter}
            onChange={(e) => setShowtimeFilter(e.target.value)}
            className="border px-4 py-3 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-lg"
          >
            <option value="">All Showtimes</option>
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white shadow-2xl rounded-lg">
          <table className="w-full text-lg table-auto">
            <thead className="bg-gray-200 text-gray-700">
              {movieTable.getHeaderGroups().map((headerGroup) => (
                <tr className="border-b border-gray-300" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="px-6 py-4 font-semibold text-lg text-gray-700 text-center"
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none text-indigo-600 hover:text-indigo-800"
                              : "",
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  ))}
                  {actions.length > 0 && (
                    <th className="px-6 py-4 font-semibold text-lg text-gray-700 text-center">
                      Actions
                    </th>
                  )}
                </tr>
              ))}
            </thead>
            <tbody>
              {showNoMoviesFound ? (
                <tr>
                  <td
                    colSpan={
                      (tableColumns?.length ?? 0) + (actions.length > 0 ? 1 : 0)
                    }
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Movies Found
                  </td>
                </tr>
              ) : (
                movieTable.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-300 hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        className="px-6 py-4 text-lg text-gray-700"
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                    {actions.length > 0 && (
                      <td className="px-6 py-4 text-center">
                        {actions.map((action, idx) => {
                          if (
                            action.label === "Book" ||
                            action.label === "Update"
                          ) {
                            return (
                              <div
                                key={idx}
                                className="flex items-center gap-4"
                              >
                                <input
                                  type="number"
                                  min={1}
                                  max={row.original.availableSeats}
                                  value={seatInputs[row.original.id] || ""}
                                  onChange={(e) =>
                                    handleSeatInputChange(
                                      row.original.id,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Seats"
                                  className="w-24 border rounded-md px-4 py-2 text-lg shadow-sm"
                                />
                                <button
                                  className={
                                    action.className ||
                                    "bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg shadow-md"
                                  }
                                  onClick={() =>
                                    action.onClick({
                                      ...row.original,
                                      bookedSeats:
                                        seatInputs[row.original.id] || 1,
                                    })
                                  }
                                  disabled={
                                    !seatInputs[row.original.id] ||
                                    seatInputs[row.original.id] < 1 ||
                                    seatInputs[row.original.id] >
                                      row.original.availableSeats
                                  }
                                >
                                  {action.label}
                                </button>
                              </div>
                            );
                          }
                          return (
                            <button
                              key={idx}
                              className={
                                action.className ||
                                "bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg shadow-md"
                              }
                              onClick={() => action.onClick(row.original)}
                            >
                              {action.label}
                            </button>
                          );
                        })}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {!showNoMoviesFound && showPagination && (
          <div className="flex items-center justify-between mt-6">
            <div>
              <button
                className="px-6 py-3 mr-4 bg-gray-300 rounded-lg text-lg text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => movieTable.previousPage()}
                disabled={!movieTable.getCanPreviousPage()}
              >
                Previous
              </button>
              <button
                className="px-6 py-3 bg-gray-300 rounded-lg text-lg text-gray-700 hover:bg-gray-400 disabled:opacity-50"
                onClick={() => movieTable.nextPage()}
                disabled={!movieTable.getCanNextPage()}
              >
                Next
              </button>
            </div>
            <div>
              Page{" "}
              <strong>
                {movieTable.getState().pagination.pageIndex + 1} of{" "}
                {movieTable.getPageCount()}
              </strong>
            </div>
            <div>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPageIndex(0);
                }}
                className="border px-6 py-3 rounded-lg text-lg"
              >
                {[5, 10].map((size) => (
                  <option key={size} value={size}>
                    Display {size}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
