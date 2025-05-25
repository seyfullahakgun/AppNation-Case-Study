import { NextResponse } from "next/server";

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/3.0";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const units = searchParams.get("units") || "metric";

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Latitude and longitude are required" },
      { status: 400 }
    );
  }

  if (!OPENWEATHER_API_KEY) {
    console.error("OPENWEATHER_API_KEY not found");
    return NextResponse.json(
      { error: "API key is not configured" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenWeather API Error:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });

      switch (response.status) {
        case 400:
          return NextResponse.json(
            { error: "Invalid coordinates" },
            { status: 400 }
          );
        case 401:
          return NextResponse.json(
            { error: "Invalid API key" },
            { status: 401 }
          );
        case 404:
          return NextResponse.json(
            { error: "Weather data not found" },
            { status: 404 }
          );
        case 429:
          return NextResponse.json(
            { error: "API request limit exceeded" },
            { status: 429 }
          );
        default:
          return NextResponse.json(
            { error: "Failed to fetch weather data" },
            { status: response.status }
          );
      }
    }

    const data = await response.json();
    
    if (!data || Object.keys(data).length === 0) {
      console.error("Empty data received:", { lat, lon, units });
      return NextResponse.json(
        { error: "No weather data available" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Weather API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch weather data" },
      { status: 500 }
    );
  }
} 