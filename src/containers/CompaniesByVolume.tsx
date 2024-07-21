"use client";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { columns } from "@/utils/columns";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const CompaniesByVolume = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
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

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Fetch data every minute

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
    console.log("row clicked", row);
    router.push(`/${row.token}`);
  };

  return (
    <Card>
      <div className="w-full h-full">
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500 text-center">{error}</div>}
        {!loading && !error && (
          <Table
            columns={columns}
            // columnStyles={columnStyles}
            data={data}
            onRowClick={handleRowClick}
            itemsPerPage={10}
          />
        )}
      </div>
    </Card>
  );
};

export default CompaniesByVolume;
