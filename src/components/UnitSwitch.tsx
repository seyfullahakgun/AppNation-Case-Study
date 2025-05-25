"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store";

const UnitSwitch: React.FC = () => {
  const { units, setUnits, theme } = useSettingsStore();

  return (
    <div className="flex items-center gap-1 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-400 sticky top-0 z-50">
      <motion.button
        onClick={() => setUnits("metric")}
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${
          theme === "light" && units !== "metric"
            ? "text-gray-900"
            : "text-gray-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {units === "metric" && (
          <motion.div
            layoutId="activeUnit"
            className="absolute inset-0 bg-primary rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">°C</span>
      </motion.button>

      <motion.button
        onClick={() => setUnits("imperial")}
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${
          theme === "light" && units !== "imperial"
            ? "text-gray-900"
            : units === "imperial"
            ? "text-gray-200"
            : "text-gray-200"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {units === "imperial" && (
          <motion.div
            layoutId="activeUnit"
            className="absolute inset-0 bg-primary rounded-md"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
        <span className="relative z-10">°F</span>
      </motion.button>
    </div>
  );
};

export default UnitSwitch;
