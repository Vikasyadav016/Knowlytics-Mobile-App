import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import "./CommonTable.css";

const ROW_OPTIONS = [10, 20, 50, 100, 150];

interface CommonTableDynammicProps<TData> {
  columns: any[];
  data: TData[];
  enableSorting?: boolean;
  className?: string;
}

const CommonTableDynammic = <TData,>({
  columns = [],
  data = [],
  enableSorting = false,
  className = "",
}: CommonTableDynammicProps<TData>) => {
  const [pageSize, setPageSize] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);

  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(data.length / pageSize),
    state: {
      pagination: { pageIndex, pageSize },
    },
    onPaginationChange: ({ pageIndex, pageSize }:any) => {
      setPageIndex(pageIndex);
      setPageSize(pageSize);
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const canPreviousPage = table.getCanPreviousPage();
  const canNextPage = table.getCanNextPage();

  return (
    <>
      <div className={`table-container ${className}`}>
        <table className="min-w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="cursor-pointer select-none"
                    onClick={
                      enableSorting
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div className="flex items-center space-x-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {enableSorting && (
                        <SortIndicator
                          sortDirection={header.column.getIsSorted()}
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center p-4">
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center mt-4 select-none gap-5">
        <button
          className="pagination-button"
          onClick={() => table.setPageIndex(0)}
          disabled={!canPreviousPage}
          title="First Page"
        >
          &laquo;
        </button>

        <button
          className="pagination-button"
          onClick={() => table.previousPage()}
          disabled={!canPreviousPage}
          title="Previous Page"
        >
          &lt;
        </button>

        <select
          className="pagination-select"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageIndex(0);
          }}
        >
          {ROW_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <button
          className="pagination-button"
          onClick={() => table.nextPage()}
          disabled={!canNextPage}
          title="Next Page"
        >
          &gt;
        </button>

        <button
          className="pagination-button"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!canNextPage}
          title="Last Page"
        >
          &raquo;
        </button>
      </div>
    </>
  );
};

function SortIndicator({ sortDirection }: { sortDirection: string | false }) {
  if (sortDirection === "asc") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 inline-block ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    );
  } else if (sortDirection === "desc") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-3 h-3 inline-block ml-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }
  return null;
}

export default CommonTableDynammic;
