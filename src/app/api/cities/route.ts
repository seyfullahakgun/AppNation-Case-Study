import { NextResponse } from 'next/server'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const OPENWEATHER_GEO_URL = 'https://api.openweathermap.org/geo/1.0'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')
  const limit = searchParams.get('limit') || '5'

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  if (!OPENWEATHER_API_KEY) {
    console.error('OPENWEATHER_API_KEY not found')
    return NextResponse.json(
      { error: 'API key is not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(
      `${OPENWEATHER_GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=${limit}&appid=${OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('OpenWeather API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      })

      switch (response.status) {
        case 400:
          return NextResponse.json(
            { error: 'Invalid query parameter' },
            { status: 400 }
          )
        case 401:
          return NextResponse.json(
            { error: 'Invalid API key' },
            { status: 401 }
          )
        case 404:
          return NextResponse.json(
            { error: 'No cities found' },
            { status: 404 }
          )
        case 429:
          return NextResponse.json(
            { error: 'API request limit exceeded' },
            { status: 429 }
          )
        default:
          return NextResponse.json(
            { error: 'Failed to fetch cities' },
            { status: response.status }
          )
      }
    }

    const data = await response.json()
    
    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'No cities found' },
        { status: 404 }
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Cities API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch cities' },
      { status: 500 }
    )
  }
} 