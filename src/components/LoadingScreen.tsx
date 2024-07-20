// LoadingScreen.js
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50"
    >
      <div className="loader text-black">
        {/* <Image
          src={
            "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdzFiZ2M4aHdtNm4xaTdldzhneTI5NnJtbTdvOGZ5YXV5Y2M2OTd2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ohs7HdhQA4ffttvrO/giphy.webp"
          }
          alt="loading..."
          className="w-screen h-screen"
          width={1000}
          height={1000}
        /> */}
        <h1>Loading...</h1>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
