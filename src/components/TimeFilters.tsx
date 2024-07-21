import React from "react";

const TimeFilters = ({ handleTimeRangeChange, activeRange }: any) => {
  const timeRanges = ["1D", "1W", "1M", "1Y", "2Y", "5Y", "ALL"];

  return (
    <div className="flex flex-row space-x-4 self-center w-full justify-center items-center">
      {timeRanges.map((range) => (
        <button
          key={range}
          className={`glassmorphic px-2 py-1 border border-blue-800 hover:bg-gray-600 rounded-lg ${
            activeRange === range ? "bg-gray-600" : ""
          }`}
          onClick={() => handleTimeRangeChange(range)}
        >
          {range === "ALL" ? "All Time" : range}
        </button>
      ))}
    </div>
  );
};

export default TimeFilters;
