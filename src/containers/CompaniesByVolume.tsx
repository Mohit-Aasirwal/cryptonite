"use client";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { columns } from "@/utils/columns";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const CACHE_KEY = "coingecko_data";
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const CompaniesByVolume = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAndCacheData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/global?x_cg_api_key=CG-tvKmAT1u9LEXA2qCF1dkeJHw"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      const { total_market_cap, total_volume, market_cap_percentage } =
        jsonData.data;

      const formattedData = Object.entries(total_market_cap).map(
        ([token, marketCap]) => ({
          token,
          symbol: token.toUpperCase(),
          volume: (total_volume[token] / 1e6).toFixed(2) + "M",
          marketcap: (Number(marketCap) / 1e9).toFixed(2) + "B",
          cappercentage: (market_cap_percentage[token] || 0).toFixed(2) + "%",
        })
      );

      // Cache the data
      const cacheData = {
        timestamp: Date.now(),
        data: formattedData,
      };
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const getCachedData = () => {
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { timestamp, data } = JSON.parse(cachedData);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return data;
      }
    }
    return null;
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const cachedData = getCachedData();
        if (cachedData) {
          setData(cachedData);
        } else {
          const freshData = await fetchAndCacheData();
          setData(freshData);
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
    const interval = setInterval(loadData, CACHE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const columnStyles = useMemo(
    () => ({
      token: "text-left",
      symbol: "text-center",
      volume: "text-right",
      marketcap: "text-right",
      cappercentage: "text-right",
    }),
    []
  );

  const handleRowClick = (row: any) => {
    router.push(`/${row.token}`);
  };

  return (
    <div className="min-h-full">
      <Card>
        <div className="w-full h-full">
          {loading && <div>Loading...</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          {!loading && !error && (
            <Table
              columns={columns}
              // columnStyles={columnStyles}
              data={data}
              // onRowClick={handleRowClick}
              itemsPerPage={10}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default CompaniesByVolume;
