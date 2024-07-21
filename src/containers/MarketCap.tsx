"use client";
import Card from "@/components/Card";
import Graph from "@/components/Graph";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const MarketCap = () => {
  const [graphType, setGraphType] = useState("line");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 10,
            page: 1,
          },
        }
      );
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const toggleGraphType = () => {
    setGraphType((prevType: string) =>
      prevType === "line" ? "candle" : "line"
    );
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div>
          <h1 className="text-xl">Market Cap of the Top Currency Tokens</h1>
        </div>
        <div className="space-x-3 rounded-sm relative">
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`absolute top-0 left-0 h-full w-1/2 transition-all duration-500 rounded-sm ${
              graphType === "line"
                ? "glassmorphic left-0"
                : "glassmorphic left-1/2"
            }`}
          />

          <button
            className={`relative z-10 p-2 transition-all duration-200 ${
              graphType === "line" ? "text-white " : "text-gray-500 "
            }`}
            onClick={toggleGraphType}
          >
            Line
          </button>

          <button
            className={`relative z-10 p-2 transition-all duration-200 ${
              graphType === "candle" ? "text-white " : "text-gray-500 "
            }`}
            onClick={toggleGraphType}
          >
            Candle
          </button>
        </div>
      </div>
      <Card>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <Graph graphType={graphType} data={data} />
        )}
      </Card>
    </>
  );
};

export default MarketCap;
