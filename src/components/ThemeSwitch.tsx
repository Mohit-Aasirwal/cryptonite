import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { FiMoon } from "react-icons/fi";
import { LuSunMedium } from "react-icons/lu";

const Button = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.button
      initial={{
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      onClick={handleClick}
      className="transition-all duration-500 text-2xl ease-in-out"
    >
      <motion.div
        key={currentTheme}
        initial={{ opacity: 0, rotate: 180 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: -180 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        {currentTheme === "dark" ? <LuSunMedium /> : <FiMoon />}
      </motion.div>
    </motion.button>
  );
};

export default Button;
