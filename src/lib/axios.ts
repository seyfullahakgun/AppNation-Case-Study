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
      // Sunucudan gelen hata mesajını göster
      const errorMessage = error.response?.data?.message || "Bir hata oluştu";
      console.error("API Error:", errorMessage);
    }
    return Promise.reject(error);
  }
);
