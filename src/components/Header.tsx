import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ThemeSwitch";
import { Proza_Libre } from "next/font/google";

const proza = Proza_Libre({ weight: "400", subsets: ["latin"] });

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const updatedSearches = [
        searchTerm,
        ...recentSearches.filter((item) => item !== searchTerm),
      ].slice(0, 5);
      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));

      console.log("Searching for:", searchTerm);

      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    console.log("Searching for:", suggestion);
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
              className="overflow-hidden relative"
            >
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  className="w-full px-3 bg-transparent py-2 border dark:border-blue-900 focus:outline-none rounded-full"
                />
              </form>
              {showSuggestions && recentSearches.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border dark:border-blue-900 rounded-md shadow-lg">
                  {recentSearches.map((search, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </div>
                  ))}
                </div>
              )}
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
