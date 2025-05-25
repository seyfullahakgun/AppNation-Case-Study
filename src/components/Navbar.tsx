import React from "react";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import UnitSwitch from "./UnitSwitch";

const Navbar = () => {
  return (
    <div className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <SearchBar />
          <div className="flex items-center justify-between gap-4">
            <ThemeSwitch />
            <UnitSwitch />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
