'use client'

import { useEffect } from 'react'
import SearchBar from "@/components/SearchBar";
import ThemeSwitch from "@/components/ThemeSwitch";
import { useSettingsStore } from '@/store'

export default function Home() {
  const { theme, setTheme } = useSettingsStore()

  // Sayfa yüklendiğinde sistem temasını kontrol et
  useEffect(() => {
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(isDarkMode ? 'dark' : 'light')
  }, [setTheme])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <SearchBar />
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}
