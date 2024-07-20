"use client";
import Card from "@/components/Card";
import Graph from "@/components/Graph";
import React, { useState } from "react";
import { motion } from "framer-motion";

const MarketCap = () => {
  const [graphType, setGraphType] = useState("line");

  const toggleGraphType = () => {
    setGraphType((prevType: string) =>
      prevType === "line" ? "candle" : "line"
    );
  };
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full">
        <div className="">
          <h1 className="text-xl">Market Cap of the Top Currency Tokens</h1>
        </div>
        <div className=" space-x-3 rounded-sm relative">
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
        <Graph graphType={graphType} />
      </Card>
    </>
  );
};

export default MarketCap;
