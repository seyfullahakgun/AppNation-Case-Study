import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Unit, Theme, City, Toast } from "./types";

interface SettingsState {
  // Settings
  units: Unit;
  theme: Theme;
  selectedCity: City | null;
  
  // Toast
  currentToast: Toast | null;
  
  // Settings Actions
  toggleUnits: () => void;
  setUnits: (unit: Unit) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setSelectedCity: (city: City | null) => void;
  
  // Toast Actions
  showToast: (toast: Omit<Toast, "id">) => void;
  hideToast: () => void;
}

// Persist edilen ayarlar store'u
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Settings
      units: "metric",
      theme: "dark",
      selectedCity: {
        name: "Istanbul",
        country: "TR",
        lat: 41.0082,
        lon: 28.9784,
        state: "Istanbul"
      },
      
      // Toast
      currentToast: null,

      // Settings Actions
      toggleUnits: () =>
        set((state) => {
          const newUnits = state.units === "metric" ? "imperial" : "metric";
          return {
            units: newUnits,
            currentToast: {
              id: Math.random().toString(36).substring(7),
              message: `Temperature unit changed to ${newUnits === "metric" ? "Celsius" : "Fahrenheit"}`,
              type: "info",
            },
          };
        }),
        
      setUnits: (unit) =>
        set((state) => ({
          units: unit,
          currentToast: {
            id: Math.random().toString(36).substring(7),
            message: `Temperature unit changed to ${unit === "metric" ? "Celsius" : "Fahrenheit"}`,
            type: "info",
          },
        })),

      toggleTheme: () =>
        set((state) => {
          const newTheme = state.theme === "light" ? "dark" : "light";
          return {
            theme: newTheme,
            currentToast: {
              id: Math.random().toString(36).substring(7),
              message: `Theme changed to ${newTheme === "light" ? "light" : "dark"} mode`,
              type: "info",
            },
          };
        }),
        
      setTheme: (theme) =>
        set((state) => ({
          theme,
          currentToast: {
            id: Math.random().toString(36).substring(7),
            message: `Theme changed to ${theme === "light" ? "light" : "dark"} mode`,
            type: "info",
          },
        })),

      setSelectedCity: (city) =>
        set((state) => ({
          selectedCity: city,
          currentToast: {
            id: Math.random().toString(36).substring(7),
            message: `Weather information updated for ${city?.name}`,
            type: "success",
          },
        })),

      // Toast Actions
      showToast: (toast) =>
        set({
          currentToast: { ...toast, id: Math.random().toString(36).substring(7) },
        }),
        
      hideToast: () =>
        set({ currentToast: null }),
    }),
    {
      name: "weather-dashboard-settings",
      partialize: (state) => ({
        units: state.units,
        theme: state.theme,
        selectedCity: state.selectedCity,
      }),
    }
  )
);
