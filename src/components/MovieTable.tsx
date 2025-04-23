import { MovieDetails } from "@/models/form-model";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface MovieTableProps {
  tableData?: MovieDetails[];
  tableColumns?: ColumnDef<MovieDetails, any>[];
  onEdit?: (movie: MovieDetails) => void;
}

export const MovieTable: React.FC<MovieTableProps> = ({
  tableData,
  tableColumns,
  onEdit,
}) => {
  const movieTable = useReactTable({
    data: tableData || [],
    columns: tableColumns || [],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="mt-15 ml-10">
      <div className="flex flex-col gap-10">
        <div>
          <table className="w-full border border-gray-300">
            <thead>
              {movieTable.getHeaderGroups().map((headerGroup) => (
                <tr className="bg-gray-100" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      className="border border-gray-300 px-4 py-2 text-left"
                      key={header.id}
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none"
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
                </tr>
              ))}
            </thead>
            <tbody>
              {movieTable.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {/* Actions column cell */}
                  {onEdit && (
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => onEdit(row.original)}
                      >
                        Edit
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right">
          <p className="text-gray-600">
            Total Movies: {movieTable.getRowModel().rows.length}
          </p>
        </div>
      </div>
    </div>
  );
};
