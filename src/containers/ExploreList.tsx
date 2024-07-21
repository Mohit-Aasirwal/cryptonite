"use client";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const ExploreList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const columns = useMemo(
    () => [
      { header: "Name", accessor: "name" },
      { header: "Country", accessor: "country" },
      { header: "Total Holdings", accessor: "total_holdings" },
      {
        header: "Total Current Value (USD)",
        accessor: "total_current_value_usd",
      },
      {
        header: "Percentage of Total Supply",
        accessor: "percentage_of_total_supply",
      },
    ],
    []
  );

  const columnStyles = useMemo(
    () => ({
      name: "text-left",
      country: "text-left",
      total_holdings: "text-right",
      total_current_value_usd: "text-right",
      percentage_of_total_supply: "text-right",
    }),
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
        setData(response.data.companies);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = (row: any) => {
    console.log("Row clicked", row);
    router.push(`/${row.name}`);
  };

  return (
    <div className="w-full h-full">
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && !error && (
        <Table
          columns={columns}
          // columnStyles={columnStyles}
          data={data}
          onRowClick={handleRowClick}
          itemsPerPage={20}
        />
      )}
    </div>
  );
};

export default ExploreList;
