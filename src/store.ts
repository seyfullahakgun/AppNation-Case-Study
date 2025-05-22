import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Unit, Theme, City } from "./types";

interface SettingsState {
  units: Unit;
  theme: Theme;
  selectedCity: City | null;
  toggleUnits: () => void;
  setUnits: (unit: Unit) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setSelectedCity: (city: City | null) => void;
}

// Persist edilen ayarlar store'u
export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Varsayılan değerler: Celsius ve Dark tema
      units: "metric", // metric = °C
      theme: "dark",
      selectedCity: {
        name: "Istanbul",
        country: "TR",
        lat: 41.0082,
        lon: 28.9784,
        state: "Istanbul"
      },

      toggleUnits: () =>
        set((state) => ({
          units: state.units === "metric" ? "imperial" : "metric",
        })),
      setUnits: (unit) => set({ units: unit }),

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setTheme: (theme) => set({ theme }),

      setSelectedCity: (city) => set({ selectedCity: city }),
    }),
    {
      name: "weather-dashboard-settings", // localStorage key
      // persist sadece units, theme ve selectedCity alanlarını saklar
      partialize: (state) => ({ 
        units: state.units, 
        theme: state.theme,
        selectedCity: state.selectedCity 
      }),
    }
  )
);
