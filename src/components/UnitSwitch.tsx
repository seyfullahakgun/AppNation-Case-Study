"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSettingsStore } from "@/store";

const UnitSwitch: React.FC = () => {
  const { units, setUnits } = useSettingsStore();

  return (
    <div className="flex items-center gap-2 bg-card-background p-1 rounded-lg border border-border-light">
      <motion.button
        onClick={() => setUnits("metric")}
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium ${
          units === "metric" ? "text-primary-foreground" : "text-secondary"
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
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium ${
          units === "imperial" ? "text-primary-foreground" : "text-secondary"
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