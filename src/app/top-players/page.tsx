import TopPlayers from "@/containers/TopPlayers";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <TopPlayers />
    </div>
  );
};

export default page;
