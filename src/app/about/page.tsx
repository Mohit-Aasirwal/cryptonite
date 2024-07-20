import Card from "@/components/Card";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <Card>
        <h1>About</h1>
        <p>Developed by Mohit Aasirwal</p>
        <p> find my portfolio here.</p>
      </Card>
    </div>
  );
};

export default page;
