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
          width={44}
          height={44}
          className="opacity-70"
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-card-background border border-border-light rounded-lg shadow-lg p-4 space-y-4"
          >
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-secondary">Unit</label>
              <UnitSwitch />
            </div>
            <div className="flex items-center justify-between gap-2">
              <label className="text-sm font-medium text-secondary">Theme</label>
              <ThemeSwitch />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SettingsMenu; 