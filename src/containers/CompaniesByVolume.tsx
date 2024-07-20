"use client";
import Card from "@/components/Card";
import Table from "@/components/Table";
import { columns } from "@/utils/columns";
import React from "react";
import { useRouter } from "next/navigation";
const CompaniesByVolume = () => {
  const router = useRouter();
  const data = [
    { token: "John Doe", symbol: 28, volume: "123 Main St" },
    { token: "Jane Doe", symbol: 32, volume: "456 Maple Ave" },
    { token: "Jim Beam", symbol: 45, volume: "789 Elm St" },
  ];
  const columnStyles = {
    token: "text-left",
    symbol: "text-right",
    volume: "text-left",
  };
  const handleRowClick = (row: any) => {
    // alert(`Row clicked: ${JSON.stringify(row)}`);
    console.log("row clicked", row);
    router.push(`/${row.token}`);
  };
  return (
    <Card>
      <div className="w-full h-full">
        <Table
          columns={columns}
          columnStyles={columnStyles}
          data={data}
          onRowClick={handleRowClick}
          itemsPerPage={10}
        />
      </div>
    </Card>
  );
};

export default CompaniesByVolume;
