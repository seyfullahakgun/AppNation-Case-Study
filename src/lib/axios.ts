import axios from "axios";

// Axios instance oluştur
export const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// İstek interceptor'ı
api.interceptors.request.use(
  (config) => {
    // İstek gönderilmeden önce yapılacak işlemler
    return config;
  },
  (error) => {
    console.error("İstek Hatası:", error.message);
    return Promise.reject(error);
  }
);

// Yanıt interceptor'ı
api.interceptors.response.use(
  (response) => {
    // Başarılı yanıtlar için yapılacak işlemler
    return response;
  },
  (error) => {
    // Hata durumunda yapılacak işlemler
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Sunucudan gelen hata yanıtı
        const status = error.response.status;
        const errorData = error.response.data;
        
        console.error("API Hatası:", {
          status,
          message: errorData?.message || errorData?.error || "Sunucu hatası",
          details: errorData
        });

        // Özel hata mesajları
        switch (status) {
          case 400:
            throw new Error("Geçersiz istek. Lütfen girdiğiniz bilgileri kontrol edin.");
          case 401:
            throw new Error("Yetkilendirme hatası. API anahtarınızı kontrol edin.");
          case 404:
            throw new Error("İstenen kaynak bulunamadı.");
          case 429:
            throw new Error("Çok fazla istek gönderildi. Lütfen biraz bekleyin.");
          case 500:
            throw new Error("Sunucu hatası. Lütfen daha sonra tekrar deneyin.");
          default:
            throw new Error(errorData?.message || "Beklenmeyen bir hata oluştu.");
        }
      } else if (error.request) {
        // İstek yapıldı ama yanıt alınamadı
        console.error("Bağlantı Hatası:", error.message);
        throw new Error("Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.");
      } else {
        // İstek oluşturulurken hata oluştu
        console.error("İstek Hatası:", error.message);
        throw new Error("İstek oluşturulurken bir hata oluştu.");
      }
    }
    
    // Axios hatası değilse
    console.error("Beklenmeyen Hata:", error);
    return Promise.reject(error);
  }
);
