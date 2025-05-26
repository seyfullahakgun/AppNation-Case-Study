"use client";

import React, { useState, useRef, useEffect } from "react";
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 cursor-pointer transition-transform duration-300 hover:rotate-90"
      >
        <Image
          src={`/icons/settings-${theme === "dark" ? "light" : "dark"}.svg`}
          alt="Settings"
          width={32}
          height={32}
          className="opacity-70"
        />
      </button>

      <div
        className={`absolute right-0 mt-2 w-48 p-2 text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-400 transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
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
      </div>
    </div>
  );
};

export default SettingsMenu; 