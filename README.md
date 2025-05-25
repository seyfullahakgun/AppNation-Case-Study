# Weather Dashboard

A modern and user-friendly weather dashboard built with React and Next.js, providing real-time weather data visualization.

## 🚀 Features

- 🔍 City search
- 🌡️ Real-time weather data
- 📊 5-day weather forecast
- 🌓 Light/Dark theme support
- 📱 Fully responsive design
- 🔄 Temperature unit toggle (Celsius/Fahrenheit)
- 📜 Last 5 search history
- 🎯 Autocomplete
- ⚡ Fast and optimized performance

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **API Requests:** React Query
- **API:** OpenWeatherMap API
- **Deployment:** Vercel

## 📋 Requirements

- Node.js 18.0.0 or higher
- npm or yarn
- OpenWeatherMap API key

## 🚀 Installation

1. Clone the project:
```bash
git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create `.env.local` file and add your API key:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   └── page.tsx        # Main page
├── components/         # React components
├── hooks/             # Custom hooks
├── lib/               # Helper functions
├── store/             # Zustand store
└── types/             # TypeScript types
```

## 🔧 API Integration

We use OpenWeatherMap API. To get an API key:

1. Sign up at [OpenWeatherMap](https://openweathermap.org/)
2. Create an API key
3. Add it to your `.env.local` file

## 🚀 Deployment

The project is deployed on Vercel. For a new deployment:

1. Create a Vercel account
2. Connect your GitHub repository
3. Configure environment variables
4. Deploy

## 📝 Assumptions and Decisions

- **API Choice:** OpenWeatherMap API was chosen because:
  - Free plan is sufficient
  - Good documentation
  - Reliable service
  - Extensive dataset

- **State Management:** Zustand was chosen because:
  - Simple and lightweight
  - TypeScript support
  - Easy integration
  - Good performance

- **Styling:** Tailwind CSS was chosen because:
  - Rapid development
  - Easy responsive design
  - Small bundle size
  - Large community support

## 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 👥 Contact

Project Owner - [@seyfullahakgun](https://github.com/seyfullahakgun)

Project Link: [https://github.com/seyfullahakgun/weather-dashboard](https://github.com/seyfullahakgun/weather-dashboard)

---

# Hava Durumu Dashboard'u

React ve Next.js kullanılarak geliştirilmiş, gerçek zamanlı hava durumu verilerini gösteren modern ve kullanıcı dostu bir web uygulaması.

## 🚀 Özellikler

- 🔍 Şehir arama
- 🌡️ Gerçek zamanlı hava durumu verileri
- 📊 5 günlük hava durumu tahmini
- 🌓 Açık/Koyu tema desteği
- 📱 Tam responsive tasarım
- 🔄 Sıcaklık birimi değiştirme (Celsius/Fahrenheit)
- 📜 Son 5 arama geçmişi
- 🎯 Otomatik tamamlama
- ⚡ Hızlı ve optimize edilmiş performans

## 🛠️ Teknoloji Yığını

- **Framework:** Next.js 14
- **Dil:** TypeScript
- **Stil:** Tailwind CSS
- **State Yönetimi:** Zustand
- **API İstekleri:** React Query
- **API:** OpenWeatherMap API
- **Deployment:** Vercel

## 📋 Gereksinimler

- Node.js 18.0.0 veya üzeri
- npm veya yarn
- OpenWeatherMap API anahtarı

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/seyfullahakgun/weather-dashboard.git
cd weather-dashboard
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
```

3. `.env.local` dosyası oluşturun ve API anahtarınızı ekleyin:
```env
OPENWEATHER_API_KEY=your_api_key_here
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
```

5. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 🏗️ Proje Yapısı

```
src/
├── app/                 # Next.js app router
│   ├── api/            # API routes
│   └── page.tsx        # Ana sayfa
├── components/         # React bileşenleri
├── hooks/             # Custom hooks
├── lib/               # Yardımcı fonksiyonlar
├── store/             # Zustand store
└── types/             # TypeScript tipleri
```

## 🔧 API Entegrasyonu

OpenWeatherMap API'sini kullanıyoruz. API anahtarı almak için:

1. [OpenWeatherMap](https://openweathermap.org/)'e kaydolun
2. API anahtarı oluşturun
3. `.env.local` dosyasına ekleyin

## 🚀 Deployment

Proje Vercel üzerinde deploy edilmiştir. Yeni bir deployment için:

1. Vercel hesabı oluşturun
2. GitHub reponuzu bağlayın
3. Environment variables'ı ayarlayın
4. Deploy edin

## 📝 Varsayımlar ve Kararlar

- **API Seçimi:** OpenWeatherMap API'si seçildi çünkü:
  - Ücretsiz plan yeterli
  - İyi dokümantasyon
  - Güvenilir servis
  - Geniş veri seti

- **State Yönetimi:** Zustand seçildi çünkü:
  - Basit ve hafif
  - TypeScript desteği
  - Kolay entegrasyon
  - İyi performans

- **Styling:** Tailwind CSS seçildi çünkü:
  - Hızlı geliştirme
  - Responsive tasarım kolaylığı
  - Küçük bundle size
  - Geniş topluluk desteği

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 👥 İletişim

Proje Sahibi - [@seyfullahakgun](https://github.com/seyfullahakgun)

Proje Linki: [https://github.com/seyfullahakgun/weather-dashboard](https://github.com/seyfullahakgun/weather-dashboard)
