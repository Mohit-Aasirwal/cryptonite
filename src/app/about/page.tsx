"use client";
import Card from "@/components/Card";
import React from "react";
import { motion } from "framer-motion";

const page = () => {
  return (
    <div className="flex min-h-full flex-col items-center justify-between p-12 dark:bg-gradient-to-r overflow-x-hidden from-[#17153B] to-[#070F2B] space-y-5">
      <Card className="w-full max-w-4xl p-6 space-y-4">
        <motion.h1
          className="text-4xl font-bold text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          About Me
        </motion.h1>
        <motion.div
          className="text-lg text-center text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>Developed by Mohit Aasirwal</p>
          <p>
            I am a passionate developer with expertise in creating dynamic and
            responsive web applications. Check out my portfolio{" "}
            <a
              href="https://mohitaasirwal.tech"
              className="text-blue-500 underline"
            >
              here
            </a>
            .
          </p>
        </motion.div>
      </Card>
    </div>
  );
};

export default page;
