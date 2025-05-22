export type Unit = "metric" | "imperial";

export type Theme = "light" | "dark";

export interface City {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
}
