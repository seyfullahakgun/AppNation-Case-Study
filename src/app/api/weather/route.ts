import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const units = searchParams.get("units") || "metric";

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "Koordinatlar gerekli" },
      { status: 400 }
    );
  }

  if (!process.env.OPENWEATHER_API_KEY) {
    console.error("OPENWEATHER_API_KEY bulunamadı");
    return NextResponse.json(
      { error: "API anahtarı yapılandırılmamış" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPENWEATHER_API_KEY}`
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenWeather API Hatası:", {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });

      // OpenWeather API hata kodlarına göre özel mesajlar
      switch (response.status) {
        case 400:
          return NextResponse.json(
            { error: "Geçersiz koordinatlar" },
            { status: 400 }
          );
        case 401:
          return NextResponse.json(
            { error: "Geçersiz API anahtarı" },
            { status: 401 }
          );
        case 404:
          return NextResponse.json(
            { error: "Hava durumu verisi bulunamadı" },
            { status: 404 }
          );
        case 429:
          return NextResponse.json(
            { error: "API istek limiti aşıldı" },
            { status: 429 }
          );
        default:
          return NextResponse.json(
            { error: "Hava durumu verisi alınamadı" },
            { status: response.status }
          );
      }
    }

    const data = await response.json();
    
    if (!data || Object.keys(data).length === 0) {
      console.error("Boş veri alındı:", { lat, lon, units });
      return NextResponse.json(
        { error: "Hava durumu verisi alınamadı" },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Hava durumu API hatası:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Hava durumu verisi alınamadı" },
      { status: 500 }
    );
  }
} 