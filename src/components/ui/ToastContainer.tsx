"use client";

import { useSettingsStore } from "@/store";
import Toast from "./Toast";

export default function ToastContainer() {
  const { currentToast, hideToast } = useSettingsStore();

  if (!currentToast) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Toast
        key={currentToast.id}
        message={currentToast.message}
        type={currentToast.type}
        duration={currentToast.duration}
        onClose={hideToast}
      />
    </div>
  );
} 