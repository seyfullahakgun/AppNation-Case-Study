"use client";

import { useSettingsStore } from "@/store";
import { ToastType } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

const icons = {
  success: "/icons/check.svg",
  error: "/icons/danger.svg",
  info: "/icons/info.svg",
};

const colors = {
  success: {
    light:
      "bg-green-50 border-green-200 text-green-800 border border-green-400",
    dark: "bg-green-900/20 border-green-800 text-green-400 border border-green-400",
  },
  error: {
    light: "bg-red-50 border-red-200 text-red-800 border border-red-400",
    dark: "bg-red-900/20 border-red-800 text-red-400 border border-red-400",
  },
  info: {
    light: "bg-blue-50 border-blue-200 text-blue-800 border border-blue-400",
    dark: "bg-blue-900/20 border-blue-800 text-blue-400 border border-blue-400",
  },
};

export default function Toast({
  message,
  type,
  duration = 3000,
  onClose,
}: ToastProps) {
  const { theme } = useSettingsStore();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose();
      }, 300); // Animasyon süresi kadar bekle
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed z-50 flex items-center gap-3 px-4 py-3 rounded-lg border text-gray-600 dark:text-gray-200 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-400 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
      } md:bottom-6 md:right-0 md:left-auto md:w-auto left-1/2 bottom-6 -translate-x-1/2 w-[calc(100%-2rem)]`}
    >
      <div className={`${colors[type][theme]} rounded-full p-2`}>
        <Image
          src={icons[type]}
          alt={type}
          width={20}
          height={20}
          className="flex-shrink-0"
        />
      </div>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}
