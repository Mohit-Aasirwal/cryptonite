"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { motion } from "framer-motion";
const Sidebar = () => {
  const Links = [
    {
      name: "Dashboard",
      link: "/",
    },
    {
      name: "Explore",
      link: "/explore",
    },
    {
      name: "Top Players",
      link: "/top-players",
    },
    {
      name: "WatchList",
      link: "/watch-list",
    },
    {
      name: "About",
      link: "/about",
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ x: -1000 }}
      animate={{ x: open ? 0 : -200 }}
      exit={{ x: -1000 }}
      transition={{
        duration: 0.5,
      }}
      className="flex items-center h-fit w-fit absolute z-50"
    >
      {
        <motion.div
          initial={{ x: -1000 }}
          animate={{ x: open ? 0 : -1000 }}
          transition={{
            duration: 0.3,
          }}
          className="border glassmorphic border-gray-300  h-fit w-fit flex flex-col p-5 rounded-lg space-y-5"
        >
          {Links &&
            Links.map((value, id) => {
              return (
                <div
                  className="flex flex-col items-center justify-center text-center text-gray-100 opacity-70 hover:opacity-100  hover:bg-gradient-to-tr hover:glassmorphic from-gray-600 to-gray-500 w-full transition duration-200 ease-linear rounded-md hover:text-white"
                  key={id}
                >
                  <Link
                    href={value.link}
                    className="transition duration-200 ease-linear text-center w-full p-2 px-10"
                  >
                    {value.name}
                  </Link>
                </div>
              );
            })}
        </motion.div>
      }
      <motion.button
        className={`${
          open
            ? " -left-3 transition duration-700 rotate-0"
            : "transition duration-700 rotate-180"
        } relative top-0 border border-white rounded-full p-2 glass`}
        onClick={() => setOpen(!open)}
      >
        <IoChevronBack />
      </motion.button>
    </motion.div>
  );
};

export default Sidebar;
