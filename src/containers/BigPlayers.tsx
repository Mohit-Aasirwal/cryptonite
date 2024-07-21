"use client";
import Card from "@/components/Card";
import LoadingScreen from "@/components/LoadingScreen";
import Table from "@/components/Table";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";

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

  // const columnStyles = {
  //   name: "text-center",
  //   symbol: "text-center",
  //   total_holdings: "text-right",
  //   total_value_usd: "text-right",
  //   percentage_of_total_supply: "text-right",
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
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

        const btcUsdRate = 1 / ratesData.rates.btc.value; // BTC to USD rate
        const ethUsdRate = btcUsdRate / ratesData.rates.eth.value; // ETH to USD rate

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

        // Format the data
        const formattedData = sortedData.map((company) => ({
          name: company.name,
          symbol: company.symbol,
          total_holdings: company.total_holdings.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          }),
          total_value_usd: `$${company.total_value_usd.toLocaleString(
            undefined,
            { maximumFractionDigits: 0 }
          )}`,
          percentage_of_total_supply: `${company.percentage_of_total_supply.toFixed(
            4
          )}%`,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please refresh again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // Fetch data every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRowClick = (row: any) => {
    console.log("row clicked", row);
    router.push(`/${row.name}`);
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && (
        <Card>
          <div className="w-full h-full">
            <Table
              columns={columns}
              // columnStyles={columnStyles}
              data={data}
              onRowClick={handleRowClick}
              itemsPerPage={10}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default BigPlayers;
