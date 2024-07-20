import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ThemeSwitch"; // Assuming you have this component
import { Proza_Libre } from "next/font/google";

const proza = Proza_Libre({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-row justify-between items-center p-5 bg-transparent w-full">
      <Link href="/" className="flex flex-row items-center justify-center">
        <Image
          src="/logo.png"
          alt="Cryptonite Logo"
          height={1000}
          width={1000}
          className="w-16 h-fit"
        />
        <h1 className={`${proza.className} text-xl uppercase`}>Cryptonite</h1>
      </Link>
      <div className="flex flex-row justify-center items-center space-x-5 w-full">
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "50%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "center" }}
              className="overflow-hidden"
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-3 bg-transparent py-2 border dark:border-blue-900 focus:outline-none rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-row justify-center items-center space-x-5">
        <IoIosSearch
          className="text-2xl cursor-pointer"
          onClick={handleSearchOpen}
        />
        <Button />
      </div>
    </div>
  );
};

export default Header;
