import React from "react";

const FundamentalItem = ({
  label,
  value,
  info = false,
  currency = false,
}: any) => (
  <div className="flex justify-between py-2 border-b border-gray-700">
    <div className="flex items-center">
      <span className="text-gray-400">{label}</span>
      {/* {info && (
        <svg
          className="w-4 h-4 ml-1 text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      )} */}
    </div>
    <span className="text-white font-medium">
      {currency && "$"}
      {typeof value === "number" ? value.toLocaleString() : value}
    </span>
  </div>
);

const Fundamentals = ({ data }: any) => {
  return (
    <div className="">
      <FundamentalItem
        label="Market Cap"
        value={data?.market_data?.market_cap?.usd || "loading"}
        info={true}
        currency={true}
      />
      <FundamentalItem
        label="Fully Diluted Valuation"
        value={data?.market_data?.fully_diluted_valuation?.usd || "loading"}
        info={true}
        currency={true}
      />
      <FundamentalItem
        label="24 Hour Trading Vol"
        value={data?.market_data?.total_volume?.usd || "loading"}
        info={true}
        currency={true}
      />
      <FundamentalItem
        label="Circulating Supply"
        value={data?.market_data?.circulating_supply || "loading"}
        info={true}
      />
      <FundamentalItem
        label="Total Supply"
        value={data?.market_data?.total_supply || "loading"}
        info={true}
      />
      <FundamentalItem
        label="Max Supply"
        value={data?.market_data?.max_supply || "loading"}
        info={true}
      />
    </div>
  );
};

export default Fundamentals;
