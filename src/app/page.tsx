import CompaniesByVolume from "@/containers/CompaniesByVolume";
import MarketCap from "@/containers/MarketCap";
import BigPlayers from "@/containers/BigPlayers";

export default function Home() {
  return (
    <>
    <main className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <MarketCap />
      <div className="grid grid-cols-5 w-full gap-5">
        <div className="col-span-3 space-y-3">
          <h1 className="text-xl">Companies by Volume and Market Cap</h1>
          <CompaniesByVolume />
        </div>
        <div className="col-span-2 space-y-3">
          <h1 className="text-xl">Big Players in Big Two</h1>
          <BigPlayers />
        </div>
      </div>
      <p className="">
        In case of discrepancy, you have probably exceeded rate limit of the
        api, please wait some seconds before refreshing.
      </p>
    </main>
    </>
  );
}
