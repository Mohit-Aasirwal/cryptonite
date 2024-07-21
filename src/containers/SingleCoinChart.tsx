"use client";
import Card from "@/components/Card";
import LinksRender from "@/components/DomPurify";
import Fundamentals from "@/components/FundamentalItem";
import Performance from "@/components/Performance";
import TimeChart from "@/components/TimeChart";
import TimeFilters from "@/components/TimeFilters";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";

const CACHE_KEY = "single_coin_data";
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const SingleCoinChart = ({ coinId }: any) => {
  const [timeRange, setTimeRange] = useState("1D");
  const [extraData, setExtraData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = (id: string) => {
    const cachedData = localStorage.getItem(`${CACHE_KEY}_${id}`);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  const setCachedData = (id: string, data: any) => {
    const cacheData = {
      timestamp: Date.now(),
      data: data,
    };
    localStorage.setItem(`${CACHE_KEY}_${id}`, JSON.stringify(cacheData));
  };

  const fetchData = useCallback(async (id: string, range: string) => {
    const cachedData = getCachedData(id);
    if (cachedData) {
      setExtraData(cachedData);
      setLoading(false);
      return;
    }

    const endpoint = `https://api.coingecko.com/api/v3/coins/${id}`;
    try {
      setLoading(true);
      setError(null); // Reset error before fetching
      const response = await axios.get(endpoint, {
        headers: {
          "X-CG-Pro-API-Key": "CG-tvKmAT1u9LEXA2qCF1dkeJHw", // Replace with your actual API key
        },
      });
      setExtraData(response.data);
      setCachedData(id, response.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching data. Please try again.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(coinId, timeRange);
    const interval = setInterval(
      () => fetchData(coinId, timeRange),
      CACHE_DURATION
    );
    return () => clearInterval(interval);
  }, [coinId, timeRange, fetchData]);

  const handleTimeRangeChange = (range: any) => {
    setTimeRange(range);
  };

  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        extraData && (
          <>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="flex flex-row justify-start items-center w-full space-x-5">
                <Image
                  src={extraData?.image?.large}
                  alt=""
                  width={1000}
                  height={1000}
                  className="w-20 h-20"
                />
                <div className="flex flex-col space-y-2">
                  <h1 className="text-2xl font-bold">{extraData?.name}</h1>
                  <h1 className="text-xl font-semibold">
                    ${extraData?.market_data?.current_price?.usd}
                  </h1>
                </div>
              </div>
              <div className="flex flex-row justify-end items-center w-full space-x-5">
                <div className="flex flex-row space-x-2 justify-start items-center">
                  <p
                    className={`${
                      extraData?.market_data?.price_change_24h >= 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white p-2 rounded`}
                  >
                    {extraData?.market_data?.price_change_24h?.toFixed(2)}
                  </p>
                  <span>Today</span>
                </div>
                <div className="flex flex-row space-x-2 justify-start items-center">
                  <p
                    className={`${
                      extraData?.market_data?.price_change_percentage_24h >= 0
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white p-2 rounded`}
                  >
                    {extraData?.market_data?.price_change_percentage_24h?.toFixed(
                      2
                    )}
                    %
                  </p>
                  <span>Today</span>
                </div>
              </div>
            </div>
            <div className="w-full space-y-5">
              <Card>
                <div className="flex flex-col space-y-4">
                  <TimeChart timeRange={timeRange} coinId={coinId} />
                  <TimeFilters
                    handleTimeRangeChange={handleTimeRangeChange}
                    activeRange={timeRange}
                  />
                </div>
              </Card>
              <div className="grid grid-cols-2 gap-10 w-full">
                <Card>
                  <h1>Performance</h1>
                  <Performance
                    todayLow={extraData?.market_data?.low_24h?.usd || "loading"}
                    todayHigh={
                      extraData?.market_data?.high_24h?.usd || "loading"
                    }
                    todayCurrent={
                      extraData?.market_data?.current_price?.usd || "loading"
                    }
                    allTimeLow={extraData?.market_data?.atl?.usd || "loading"}
                    allTimeHigh={extraData?.market_data?.ath?.usd || "loading"}
                    allTimeCurrent={
                      extraData?.market_data?.current_price?.usd || "loading"
                    }
                  />
                </Card>
                <Card>
                  <h1>Fundamentals</h1>
                  <Fundamentals data={extraData} />
                </Card>
              </div>
            </div>
            <Card>
              <div className="flex flex-col space-y-3 ">
                <h1 className="text-xl font-semibold">
                  About {extraData.name}
                </h1>
                <LinksRender description={extraData?.description?.en}>
                  {extraData?.description?.en}
                </LinksRender>
              </div>
            </Card>
          </>
        )
      )}
    </div>
  );
};

export default SingleCoinChart;
