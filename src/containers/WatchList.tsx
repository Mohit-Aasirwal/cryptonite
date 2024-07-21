"use client";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

// Fetch watchlist data
const fetchWatchListData = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/search/trending");
  const data = await res.json();
  return data.coins; // Assuming you want to use the coins array
};

const WatchList = () => {
  const router = useRouter();
  const [data, setData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const watchlistData = await fetchWatchListData();
      setData(watchlistData);
    };
    fetchData();
  }, []);

  // Define columns for the table
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Symbol", accessor: "symbol" },
    { header: "Market Cap Rank", accessor: "market_cap_rank" },
    { header: "Current Price", accessor: "price" },
  ];

  // Define styles for table columns
  const columnStyles = {
    name: "text-left",
    symbol: "text-left",
    market_cap_rank: "text-right",
    price: "text-right",
  };

  // Handle row click
  const handleRowClick = (row: any) => {
    router.push(`/${row.id}`);
  };

  // Map data to table rows
  const tableData = data.map((coin: any) => ({
    id: coin.item.id,
    name: coin.item.name,
    symbol: coin.item.symbol,
    market_cap_rank: coin.item.market_cap_rank,
    price: coin.item.data.price, // Assuming price is under item.data.price
  }));

  return (
    <div>
      <Table
        columns={columns}
        // columnStyles={columnStyles}
        data={tableData}
        onRowClick={handleRowClick}
        itemsPerPage={10}
      />
    </div>
  );
};

export default WatchList;
