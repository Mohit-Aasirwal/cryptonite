import React from "react";

const PriceSlider = ({ label, low, high, current }: any) => {
  const percentage = ((current - low) / (high - low)) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">{label}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-sm text-gray-300">${low.toLocaleString()}</span>
        <span className="text-sm text-gray-300">${high.toLocaleString()}</span>
      </div>
      <div className="relative h-2 bg-green-500 rounded">
        <div
          className="absolute w-3 h-3 bg-white rounded-full -mt-0.5 transform -translate-x-1/2"
          style={{ left: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const Performance = ({
  todayLow,
  todayHigh,
  todayCurrent,
  allTimeLow,
  allTimeHigh,
  allTimeCurrent,
}: any) => {
  return (
    <div className="h-fit">
      <PriceSlider
        label="Today's Low/High"
        low={todayLow}
        high={todayHigh}
        current={todayCurrent}
      />
      <PriceSlider
        label="All Time Low/High"
        low={allTimeLow}
        high={allTimeHigh}
        current={allTimeCurrent}
      />
    </div>
  );
};

export default Performance;
