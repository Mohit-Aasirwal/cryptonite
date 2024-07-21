import BigPlayers from "@/containers/BigPlayers";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <h1 className="text-2xl self-start font-bold">Top Players</h1>
      <BigPlayers />
    </div>
  );
};

export default page;
