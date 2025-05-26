import { WeatherCondition } from "@/types";

// Weather icon mappings based on weather codes
const weatherIcons: Record<number, string> = {
  // Group 2xx: Thunderstorm
  200: "thunderstorm",
  201: "thunderstorm",
  202: "thunderstorm",
  210: "thunderstorm",
  211: "thunderstorm",
  212: "thunderstorm",
  221: "thunderstorm",
  230: "thunderstorm",
  231: "thunderstorm",
  232: "thunderstorm",

  // Group 3xx: Drizzle
  300: "drizzle",
  301: "drizzle",
  302: "drizzle",
  310: "drizzle",
  311: "drizzle",
  312: "drizzle",
  313: "drizzle",
  314: "drizzle",
  321: "drizzle",

  // Group 5xx: Rain
  500: "rain",
  501: "rain",
  502: "rain",
  503: "rain",
  504: "rain",
  511: "shower-rain",
  520: "shower-rain",
  521: "shower-rain",
  522: "shower-rain",
  531: "shower-rain",

  // Group 6xx: Snow
  600: "snow",
  601: "snow",
  602: "snow",
  611: "snow",
  612: "snow",
  613: "snow",
  615: "snow",
  616: "snow",
  620: "snow",
  621: "snow",
  622: "snow",

  // Group 7xx: Atmosphere
  701: "mist",
  711: "mist",
  721: "mist",
  731: "mist",
  741: "mist",
  751: "mist",
  761: "mist",
  762: "mist",
  771: "mist",
  781: "mist",

  // Group 800: Clear
  800: "clear",

  // Group 80x: Clouds
  801: "few-clouds",
  802: "scattered-clouds",
  803: "broken-clouds",
  804: "broken-clouds",
};

// Default icon
const defaultIcon = "clear";

export function useWeatherIcon(weather: { id: number; description: string }) {
  // Get icon name based on weather code
  const iconName = weatherIcons[weather.id] || defaultIcon;

  // Create icon path
  const iconPath = `/images/${iconName}.svg`;

  return { iconPath };
} 