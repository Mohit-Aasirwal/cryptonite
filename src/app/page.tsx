import Card from "@/components/Card";
import Graph from "@/components/Graph";
import Button from "@/components/ThemeSwitch";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B]">
      <Card>
        <Graph />
      </Card>
    </main>
  );
}
