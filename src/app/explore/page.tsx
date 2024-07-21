import Card from "@/components/Card";
import ExploreList from "@/containers/ExploreList";
import WatchList from "@/containers/WatchList";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <div className="grid grid-cols-5 w-full gap-5">
        <div className="col-span-3 space-y-3">
          <h1 className="text-xl">Companies by their stake in crypto</h1>
          <Card>
            <ExploreList />
          </Card>
        </div>
        <div className="col-span-2 grid grid-rows-2 space-y-12">
          <div className="space-y-3">
            <h1 className="text-xl">Trending Coins</h1>
            <Card>
              <WatchList />
            </Card>
          </div>
          {/* <div className="space-y-3">
            <h1 className="text-xl">Disruptive Innovators</h1>
            <Card>
              <WatchList />
            </Card>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
