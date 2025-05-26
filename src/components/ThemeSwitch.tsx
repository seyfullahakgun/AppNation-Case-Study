"use client";

import React, { useEffect } from "react";
import { useSettingsStore } from "@/store";

const ThemeSwitch: React.FC = () => {
  const { theme, toggleTheme } = useSettingsStore();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );

    if (theme === "dark") {
      localStorage.theme = "dark";
    } else {
      localStorage.theme = "light";
    }
  }, [theme]);

  return (
    <label className="relative inline-block w-12 h-7 rounded-full shadow-lg overflow-hidden cursor-pointer">
      <input
        type="checkbox"
        checked={theme !== "dark"}
        onChange={toggleTheme}
        className="peer sr-only"
      />
      {/* Track */}
      <span 
        className={`block w-full h-full rounded-full transition-colors duration-400 ${
          theme === "dark" ? "bg-gray-800" : "bg-blue-500"
        }`}
      />
      {/* Thumb */}
      <span 
        className={`absolute left-1.5 top-1.5 w-4 h-4 bg-white rounded-full transition-all duration-400 ${
          theme === "dark" 
            ? "translate-x-0 shadow-[inset_6px_-3px_0_0_#fff]" 
            : "translate-x-5 shadow-[inset_10px_-3px_0_10px_#ffcf48]"
        }`}
      />
      {/* Stars */}
      <div 
        className={`absolute inset-0 transition-all duration-400 ${
          theme === "dark" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute w-1 h-1 bg-white rounded-full top-1.5 left-8 animate-twinkle" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-4 left-7 animate-twinkle delay-150" />
        <div className="absolute w-1 h-1 bg-white rounded-full top-3 left-9 animate-twinkle delay-300" />
      </div>
      {/* Cloud Icon */}
      <svg
        viewBox="0 0 16 16"
        className={`absolute w-10 -bottom-3 -left-3 transition-all duration-400 ${
          theme === "dark" ? "opacity-0 -translate-x-10" : "opacity-100 translate-x-0"
        }`}
      >
        <path
          transform="matrix(.77976 0 0 .78395-299.99-418.63)"
          fill="#fff"
          d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925"
        />
      </svg>
    </label>
  );
};

export default ThemeSwitch;
