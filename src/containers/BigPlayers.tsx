"use client";
import Card from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";
import Table from "@/components/Table";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";

const CACHE_KEY = "big_players_data";
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes in milliseconds

const BigPlayers = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo(
    () => [
      { header: "Name", accessor: "name" },
      { header: "Symbol", accessor: "symbol" },
      { header: "Total Holdings", accessor: "total_holdings" },
      { header: "Total Value USD", accessor: "total_value_usd" },
      {
        header: "Percentage of Total Supply",
        accessor: "percentage_of_total_supply",
      },
    ],
    []
  );

  const fetchAndCacheData = async () => {
    try {
      const [btcResponse, ethResponse, ratesResponse] = await Promise.all([
        fetch(
          "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin"
        ),
        fetch(
          "https://api.coingecko.com/api/v3/companies/public_treasury/ethereum"
        ),
        fetch("https://api.coingecko.com/api/v3/exchange_rates", {
          headers: {
            "x-cg-api-key": "CG-tvKmAT1u9LEXA2qCF1dkeJHw",
          },
        }),
      ]);

      if (!btcResponse.ok || !ethResponse.ok || !ratesResponse.ok) {
        throw new Error("Failed to fetch data");
      }

      const btcData = await btcResponse.json();
      const ethData = await ethResponse.json();
      const ratesData = await ratesResponse.json();

      const btcUsdRate = 1 / ratesData.rates.btc.value;
      const ethUsdRate = btcUsdRate / ratesData.rates.eth.value;

      const combinedData = [
        ...btcData.companies.map((company: any) => ({
          ...company,
          symbol: "BTC",
          total_value_usd: company.total_holdings * btcUsdRate,
        })),
        ...ethData.companies.map((company: any) => ({
          ...company,
          symbol: "ETH",
          total_value_usd: company.total_holdings * ethUsdRate,
        })),
      ];
      const sortedData = combinedData.sort(
        (a, b) => b.total_value_usd - a.total_value_usd
      );

      const formattedData = sortedData.map((company) => ({
        name: company.name,
        symbol: company.symbol,
        total_holdings: company.total_holdings.toLocaleString(undefined, {
          maximumFractionDigits: 2,
        }),
        total_value_usd: `$${company.total_value_usd.toLocaleString(undefined, {
          maximumFractionDigits: 0,
        })}`,
        percentage_of_total_supply: `${company.percentage_of_total_supply.toFixed(
          4
        )}%`,
      }));

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
        setError("Failed to fetch data. Please refresh again.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Fetch data every 2 minutes (matching cache duration)
    const interval = setInterval(loadData, CACHE_DURATION);

    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (row: any) => {
    console.log("row clicked", row);
    router.push(`/${row.name}`);
  };

  return (
    <div className="min-h-full w-full">
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && (
        <Card>
          <div className="w-full h-full">
            <Table
              columns={columns}
              data={data}
              onRowClick={handleRowClick}
              itemsPerPage={10}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default BigPlayers;
