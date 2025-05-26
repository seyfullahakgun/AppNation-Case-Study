"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useSettingsStore } from "@/store";
import UnitSwitch from "./UnitSwitch";
import ThemeSwitch from "./ThemeSwitch";

const SettingsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { theme } = useSettingsStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 cursor-pointer transition-colors"
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <Image
          src={`/icons/settings-${theme === "dark" ? "light" : "dark"}.svg`}
          alt="Settings"
          width={32}
          height={32}
          className="opacity-70"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 p-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-400"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 px-2 py-1">
                <label className="text-sm font-medium text-secondary">Unit</label>
                <UnitSwitch />
              </div>
              <div className="flex items-center justify-between gap-2 px-2 py-1">
                <label className="text-sm font-medium text-secondary">Theme</label>
                <ThemeSwitch />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu; 