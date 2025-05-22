/*
  components/ThemeSwitch.tsx
*/
"use client";

import React, { useEffect } from "react";
import { useSettingsStore } from "@/store";
import { motion } from "framer-motion";

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useSettingsStore();

  useEffect(() => {
    // Tema değiştiğinde HTML elementine data-theme attribute'unu ekle/kaldır
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <label className="relative inline-block w-12 h-7 rounded-full shadow-lg overflow-hidden">
      <input
        type="checkbox"
        checked={theme !== "dark"}
        onChange={toggleTheme}
        className="peer sr-only"
      />
      {/* Track */}
      <motion.span 
        className="block w-full h-full rounded-full"
        animate={{
          backgroundColor: theme === "dark" ? "#1f2937" : "#3b82f6"
        }}
        transition={{ duration: 0.4 }}
      />
      {/* Thumb */}
      <motion.span 
        className="absolute left-1.5 top-1.5 w-4 h-4 bg-white rounded-full"
        animate={{
          x: theme === "dark" ? 0 : 20,
          boxShadow: theme === "dark" 
            ? "inset 6px -3px 0 0 #fff" 
            : "inset 10px -3px 0 10px #ffcf48"
        }}
        transition={{ 
          duration: 0.4,
          type: "spring",
          stiffness: 500,
          damping: 30
        }}
      />
      {/* Stars */}
      <motion.div 
        className="absolute w-1 h-1 bg-white rounded-full top-1.5 left-8"
        animate={{ opacity: theme === "dark" ? 1 : 0, x: theme === "dark" ? 0 : 10 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div 
        className="absolute w-1 h-1 bg-white rounded-full top-4 left-7"
        animate={{ opacity: theme === "dark" ? 1 : 0, x: theme === "dark" ? 0 : 10 }}
        transition={{ duration: 0.4 }}
      />
      <motion.div 
        className="absolute w-1 h-1 bg-white rounded-full top-3 left-9"
        animate={{ opacity: theme === "dark" ? 1 : 0, x: theme === "dark" ? 0 : 10 }}
        transition={{ duration: 0.4 }}
      />
      {/* Cloud Icon */}
      <motion.svg
        viewBox="0 0 16 16"
        className="absolute w-10 -bottom-3 -left-3"
        animate={{ opacity: theme === "dark" ? 0 : 1, x: theme === "dark" ? -10 : 0 }}
        transition={{ duration: 0.4 }}
      >
        <path
          transform="matrix(.77976 0 0 .78395-299.99-418.63)"
          fill="#fff"
          d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
        />
      </motion.svg>
    </label>
  );
};

export default ThemeSwitch;
