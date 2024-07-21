"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";

const Sidebar = () => {
  const Links = [
    { name: "Dashboard", link: "/" },
    { name: "Explore", link: "/explore" },
    { name: "Top Players", link: "/top-players" },
    { name: "WatchList", link: "/watch-list" },
    { name: "About", link: "/about" },
  ];

  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: open ? 0 : "-100%" }}
      transition={{ duration: 0.5 }}
      className="fixed left-0 top-0 h-full flex items-center z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="border glassmorphic border-gray-300 h-fit w-52 flex flex-col p-5 rounded-r-lg space-y-5"
      >
        {Links.map((value, id) => (
          <div
            className="flex flex-col items-center justify-center text-center text-gray-100 opacity-70 hover:opacity-100 hover:bg-gradient-to-tr hover:glassmorphic from-gray-600 to-gray-500 w-full transition duration-200 ease-linear rounded-md hover:text-white"
            key={id}
          >
            <Link
              href={value.link}
              className="transition duration-200 ease-linear text-center w-full p-2 px-10"
            >
              {value.name}
            </Link>
          </div>
        ))}
      </motion.div>
      <motion.button
        className={`absolute -right-10 top-1/2 -translate-y-1/2 rounded-full p-2 glassmorphic ${
          open ? "rotate-0" : "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      >
        <IoChevronBack />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
