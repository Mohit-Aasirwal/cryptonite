import Card from "@/components/Card";
import WatchList from "@/containers/WatchList";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <Card>
        <WatchList />
      </Card>
    </div>
  );
};

export default page;
