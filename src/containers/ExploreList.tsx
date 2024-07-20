"use client";
import Table from "@/components/Table";
import { useRouter } from "next/navigation";
import React from "react";

const ExploreList = () => {
  const router = useRouter();
  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Volume", accessor: "volume" },
    { header: "Percentage", accessor: "percentage" },
  ];
  const data = [
    { name: "John Doe", volume: 1000, percentage: "10%" },
    { name: "Jane Doe", volume: 2000, percentage: "20%" },
    { name: "Jim Beam", volume: 3000, percentage: "30%" },
    { name: "Alice Smith", volume: 1500, percentage: "15%" },
    { name: "Bob Johnson", volume: 2500, percentage: "25%" },
    { name: "Carol White", volume: 3500, percentage: "35%" },
    { name: "David Brown", volume: 4000, percentage: "40%" },
    { name: "Eve Green", volume: 4500, percentage: "45%" },
    { name: "Frank Black", volume: 5000, percentage: "50%" },
    { name: "Grace Lee", volume: 5500, percentage: "55%" },
    { name: "Henry Ford", volume: 6000, percentage: "60%" },
    { name: "Ivy Chen", volume: 6500, percentage: "65%" },
    { name: "John Doe", volume: 1000, percentage: "10%" },
    { name: "Jane Doe", volume: 2000, percentage: "20%" },
    { name: "Jim Beam", volume: 3000, percentage: "30%" },
    { name: "Alice Smith", volume: 1500, percentage: "15%" },
    { name: "Bob Johnson", volume: 2500, percentage: "25%" },
    { name: "Carol White", volume: 3500, percentage: "35%" },
    { name: "David Brown", volume: 4000, percentage: "40%" },
    { name: "Eve Green", volume: 4500, percentage: "45%" },
    { name: "Frank Black", volume: 5000, percentage: "50%" },
    { name: "Grace Lee", volume: 5500, percentage: "55%" },
    { name: "Henry Ford", volume: 6000, percentage: "60%" },
    { name: "Jim Beam", volume: 3000, percentage: "30%" },
    { name: "Alice Smith", volume: 1500, percentage: "15%" },
    { name: "Bob Johnson", volume: 2500, percentage: "25%" },
    { name: "Carol White", volume: 3500, percentage: "35%" },
    { name: "David Brown", volume: 4000, percentage: "40%" },
    { name: "Eve Green", volume: 4500, percentage: "45%" },
    { name: "Frank Black", volume: 5000, percentage: "50%" },
    { name: "Grace Lee", volume: 5500, percentage: "55%" },
    { name: "Henry Ford", volume: 6000, percentage: "60%" },
    { name: "Ivy Chen", volume: 6500, percentage: "65%" },
    { name: "Ivy Chen", volume: 6500, percentage: "65%" },
    { name: "David Brown", volume: 4000, percentage: "40%" },
    { name: "Eve Green", volume: 4500, percentage: "45%" },
    { name: "Frank Black", volume: 5000, percentage: "50%" },
    { name: "Grace Lee", volume: 5500, percentage: "55%" },
    { name: "Henry Ford", volume: 6000, percentage: "60%" },
    { name: "Ivy Chen", volume: 6500, percentage: "65%" },
    { name: "Ivy Chen", volume: 6500, percentage: "65%" },
  ];
  const columnStyles = {
    token: "text-left",
    symbol: "text-right",
    volume: "text-left",
  };
  const handleRowClick = (row: any) => {
    // alert(`Row clicked: ${JSON.stringify(row)}`);
    console.log("row clicked", row);
    router.push(`/${row.name}`);
  };
  return (
    <div>
      <Table
        columns={columns}
        columnStyles={columnStyles}
        data={data}
        onRowClick={handleRowClick}
        itemsPerPage={30}
      />
    </div>
  );
};

export default ExploreList;
