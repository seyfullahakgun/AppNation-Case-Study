import { NextResponse } from 'next/server'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const OPENWEATHER_API_URL = 'http://api.openweathermap.org/geo/1.0/direct'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${OPENWEATHER_API_URL}?q=${query}&limit=5&appid=${OPENWEATHER_API_KEY}`
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch cities')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cities' },
      { status: 500 }
    )
  }
} 