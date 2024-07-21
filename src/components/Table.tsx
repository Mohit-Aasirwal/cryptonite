"use client";
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

type TableTypes = {
  data: any;
  columns: any;
  columnStyles?: any;
  onRowClick?: any;
  itemsPerPage: number;
};

const Table = ({
  columns,
  data,
  columnStyles,
  onRowClick,
  itemsPerPage,
}: TableTypes) => {
  const [sortConfig, setSortConfig] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter((item) =>
      columns.some((column: any) =>
        String(item[column.accessor])
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [sortedData, columns, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const requestSort = (key: any) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: any) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container space-y-5 min-h-80 justify-between">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 px-3 bg-transparent py-2 border dark:border-blue-500 border-blue-400 focus:outline-none rounded-full"
      />
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-blue-500 ">
            {columns.map((column: any) => (
              <th
                key={column.accessor}
                onClick={() => requestSort(column.accessor)}
                className={classNames(
                  "cursor-pointer p-2",
                  columnStyles[column.accessor],
                  getClassNamesFor(column.accessor)
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick(row)}
              className="cursor-pointer hover:bg-blue-900 hover:bg-opacity-20"
            >
              {columns.map((column: any) => (
                <td
                  key={column.accessor}
                  className={classNames(
                    "p-2 text-center",
                    columnStyles[column.accessor]
                  )}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          &lt;
        </button>
        {[...Array(pageCount)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={classNames(
              "px-3 py-1 rounded",
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            )}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columnStyles: PropTypes.object,
  onRowClick: PropTypes.func.isRequired,
};

Table.defaultProps = {
  columnStyles: {},
};

export default Table;
