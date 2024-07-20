import Sidebar from "@/components/Sidebar";
import MarketCap from "@/containers/MarketCap";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-2">
      <MarketCap />
    </main>
  );
}
