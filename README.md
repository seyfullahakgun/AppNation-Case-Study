# Weather Dashboard

This project was developed as a case study for the Frontend Developer position at AppNation in March 2024. It demonstrates my skills in modern web development, focusing on creating a responsive and user-friendly weather application.

A modern and user-friendly weather dashboard built with React and Next.js, providing real-time weather data visualization.

## 🚀 Features

* 🔍 City search
* 🌡️ Real-time weather data
* 📊 5-day weather forecast
* 🌓 Light/Dark theme support
* 📱 Fully responsive design
* 🔄 Temperature unit toggle (Celsius/Fahrenheit)
* 📜 Last 5 search history
* 🎯 Autocomplete
* ⚡ Fast and optimized performance

## 🛠️ Tech Stack

* **Framework:** Next.js 15
* **Language:** TypeScript
* **Styling:** Tailwind CSS v4
* **State Management:** Zustand
* **API Requests:** React Query
* **API:** OpenWeatherMap API
* **Deployment:** Vercel

## 📋 Requirements

* Node.js 18.0.0 or higher
* npm, yarn, or pnpm
* OpenWeatherMap API key

## 🚀 Installation

1. Clone the project:
```bash
git clone https://github.com/seyfullahakgun/AppNation-Case-Study.git
cd AppNation-Case-Study
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create `.env.local` file and add your API key:
```
OPENWEATHER_API_KEY=your_api_key_here
```
> Note: You can find the API key in the email sent to you.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
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
> Note: You can find the API key in the email sent to you.

## 🚀 Deployment

The project is deployed on Vercel. You can access it at: [Weather Dashboard](https://weather-dashboard-iota-seven.vercel.app/)

## 📝 Assumptions and Decisions

* **API Choice:** OpenWeatherMap API was chosen because:  
   * Free plan is sufficient  
   * Good documentation  
   * Reliable service  
   * Extensive dataset

* **State Management:** Zustand was chosen because:  
   * Simple and lightweight  
   * TypeScript support  
   * Easy integration  
   * Good performance

* **Styling:** Tailwind CSS v4 was chosen because:  
   * Latest features and improvements
   * Better performance
   * Enhanced developer experience
   * Improved responsive design capabilities
   * Large community support

* **Package Manager:** pnpm was chosen because:
   * Faster installation
   * Better disk space usage
   * Strict dependency management
   * Compatible with npm/yarn

## 📋 Project Assumptions and Decisions

During the development of this project, several key decisions were made:

1. **Architecture Decisions:**
   * Used Next.js 15 for its latest features and improved performance
   * Implemented API routes to protect the OpenWeatherMap API key
   * Chose TypeScript for better type safety and developer experience

2. **UI/UX Decisions:**
   * Implemented a responsive design that works well on all devices
   * Added dark/light theme support for better user experience
   * Used Tailwind CSS v4 for rapid development and consistent styling
   * Implemented loading states and error handling for better user feedback

3. **Performance Decisions:**
   * Used React Query for efficient data fetching and caching
   * Implemented debouncing for search functionality
   * Optimized images and assets for faster loading
   * Used Zustand for lightweight state management

4. **Security Decisions:**
   * Kept API key secure by using environment variables
   * Implemented API routes to prevent exposing sensitive data
   * Added input validation and sanitization

5. **Development Decisions:**
   * Used pnpm for better package management
   * Implemented proper error handling throughout the application
   * Added TypeScript for better code quality and maintainability
   * Used ESLint and Prettier for code consistency

## 🤝 Contributing

1. Fork it
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Contact

Project Owner - [@seyfullahakgun](https://github.com/seyfullahakgun)

Project Link: [https://github.com/seyfullahakgun/AppNation-Case-Study](https://github.com/seyfullahakgun/AppNation-Case-Study)

---

# Hava Durumu Dashboard'u

Bu proje, Mart 2024'te AppNation şirketinin Frontend Developer pozisyonu için bir case study olarak geliştirilmiştir. Modern web geliştirme becerilerimi, responsive ve kullanıcı dostu bir hava durumu uygulaması oluşturmaya odaklanarak sergilemektedir.

React ve Next.js kullanılarak geliştirilmiş, gerçek zamanlı hava durumu verilerini gösteren modern ve kullanıcı dostu bir web uygulaması.

## 🚀 Özellikler

* 🔍 Şehir arama
* 🌡️ Gerçek zamanlı hava durumu verileri
* 📊 5 günlük hava durumu tahmini
* 🌓 Açık/Koyu tema desteği
* 📱 Tam responsive tasarım
* 🔄 Sıcaklık birimi değiştirme (Celsius/Fahrenheit)
* 📜 Son 5 arama geçmişi
* 🎯 Otomatik tamamlama
* ⚡ Hızlı ve optimize edilmiş performans

## 🛠️ Teknoloji Yığını

* **Framework:** Next.js 15
* **Dil:** TypeScript
* **Stil:** Tailwind CSS v4
* **State Yönetimi:** Zustand
* **API İstekleri:** React Query
* **API:** OpenWeatherMap API
* **Deployment:** Vercel

## 📋 Gereksinimler

* Node.js 18.0.0 veya üzeri
* npm, yarn veya pnpm
* OpenWeatherMap API anahtarı

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone https://github.com/seyfullahakgun/AppNation-Case-Study.git
cd AppNation-Case-Study
```

2. Bağımlılıkları yükleyin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. `.env.local` dosyası oluşturun ve API anahtarınızı ekleyin:
```
OPENWEATHER_API_KEY=your_api_key_here
```
> Not: API anahtarını e-posta ile gönderilen mesajda bulabilirsiniz.

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
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
> Not: API anahtarını e-posta ile gönderilen mesajda bulabilirsiniz.

## 🚀 Deployment

Proje Vercel üzerinde deploy edilmiştir. Erişmek için: [Weather Dashboard](https://weather-dashboard-iota-seven.vercel.app/)

## 📝 Varsayımlar ve Kararlar

* **API Seçimi:** OpenWeatherMap API'si seçildi çünkü:  
   * Ücretsiz plan yeterli  
   * İyi dokümantasyon  
   * Güvenilir servis  
   * Geniş veri seti

* **State Yönetimi:** Zustand seçildi çünkü:  
   * Basit ve hafif  
   * TypeScript desteği  
   * Kolay entegrasyon  
   * İyi performans

* **Styling:** Tailwind CSS v4 seçildi çünkü:  
   * En son özellikler ve iyileştirmeler
   * Daha iyi performans
   * Geliştirilmiş geliştirici deneyimi
   * Geliştirilmiş responsive tasarım yetenekleri
   * Geniş topluluk desteği

* **Paket Yöneticisi:** pnpm seçildi çünkü:
   * Daha hızlı kurulum
   * Daha iyi disk alanı kullanımı
   * Sıkı bağımlılık yönetimi
   * npm/yarn ile uyumlu

## 📋 Proje Varsayımları ve Kararları

Bu projenin geliştirilmesi sırasında birkaç önemli karar alındı:

1. **Mimari Kararlar:**
   * En son özellikler ve geliştirilmiş performans için Next.js 15 kullanıldı
   * OpenWeatherMap API anahtarını korumak için API rotaları uygulandı
   * Daha iyi tip güvenliği ve geliştirici deneyimi için TypeScript seçildi

2. **UI/UX Kararlar:**
   * Tüm cihazlarda iyi çalışan responsive bir tasarım uygulandı
   * Daha iyi kullanıcı deneyimi için açık/koyu tema desteği eklendi
   * Hızlı geliştirme ve tutarlı stil için Tailwind CSS v4 kullanıldı
   * Daha iyi kullanıcı geri bildirimi için yükleme durumları ve hata yönetimi uygulandı

3. **Performans Kararları:**
   * Verimli veri çekme ve önbelleğe alma için React Query kullanıldı
   * Arama işlevselliği için debouncing uygulandı
   * Daha hızlı yükleme için görüntüler ve varlıklar optimize edildi
   * Hafif state yönetimi için Zustand kullanıldı

4. **Güvenlik Kararları:**
   * API anahtarı environment variables kullanılarak güvende tutuldu
   * Hassas verilerin açığa çıkmasını önlemek için API rotaları uygulandı
   * Girdi doğrulama ve sanitizasyonu eklendi

5. **Geliştirme Kararları:**
   * Daha iyi paket yönetimi için pnpm kullanıldı
   * Uygulama genelinde uygun hata yönetimi uygulandı
   * Daha iyi kod kalitesi ve bakım yapılabilirlik için TypeScript eklendi
   * Kod tutarlılığı için ESLint ve Prettier kullanıldı

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 👥 İletişim

Proje Sahibi - [@seyfullahakgun](https://github.com/seyfullahakgun)

Proje Linki: [https://github.com/seyfullahakgun/AppNation-Case-Study](https://github.com/seyfullahakgun/AppNation-Case-Study)
