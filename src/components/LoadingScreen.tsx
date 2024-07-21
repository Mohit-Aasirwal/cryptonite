// LoadingScreen.js
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Loader from "./Loader";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50"
    >
      <div className="loader text-black">
        <Loader />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
