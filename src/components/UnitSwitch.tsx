"use client";

import React from "react";
import { useSettingsStore } from "@/store";

const UnitSwitch: React.FC = () => {
  const { units, setUnits, theme } = useSettingsStore();

  return (
    <div className="flex items-center gap-1 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-400 sticky top-0 z-50 relative">
      {/* Active Indicator */}
      <div 
        className={`absolute h-[calc(100%-8px)] bg-blue-500 rounded-md transition-all duration-300 ease-in-out ${
          units === "metric" 
            ? "left-1 w-[calc(50%-6px)]" 
            : "left-[calc(50%+2px)] w-[calc(50%-6px)]"
        }`}
      />

      <button
        onClick={() => setUnits("metric")}
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 ${
          theme === "light" && units !== "metric"
            ? "text-gray-900"
            : "text-gray-200"
        }`}
      >
        <span className="relative z-10">°C</span>
      </button>

      <button
        onClick={() => setUnits("imperial")}
        className={`relative px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer transition-transform duration-200 hover:scale-105 active:scale-95 ${
          theme === "light" && units !== "imperial"
            ? "text-gray-900"
            : units === "imperial"
            ? "text-gray-200"
            : "text-gray-200"
        }`}
      >
        <span className="relative z-10">°F</span>
      </button>
    </div>
  );
};

export default UnitSwitch;
