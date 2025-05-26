import axios from "axios";

// Create Axios instance
export const api = axios.create({
  baseURL: "/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Operations to perform before sending the request
    return config;
  },
  (error) => {
    console.error("İstek Hatası:", error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    // Operations to perform for successful responses
    return response;
  },
  (error) => {
    // Operations to perform for error responses
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Error response from server
        const status = error.response.status;
        const errorData = error.response.data;

        console.error("API Error:", {
          status,
          message: errorData?.message || errorData?.error || "Server error",
          details: errorData,
        });

        // Special error messages
        switch (status) {
          case 400:
            throw new Error("Invalid request. Please check your inputs.");
          case 401:
            throw new Error("Authorization error. Please check your API key.");
          case 404:
            throw new Error("Requested resource not found.");
          case 429:
            throw new Error("Too many requests. Please wait a moment.");
          case 500:
            throw new Error("Server error. Please try again later.");
          default:
            throw new Error(errorData?.message || "Unexpected error occurred.");
        }
      } else if (error.request) {
        // Request was made but no response was received
        console.error("Connection Error:", error.message);
        throw new Error(
          "Could not connect to the server. Please check your internet connection."
        );
      } else {
        // Error occurred while creating the request
        console.error("Request Error:", error.message);
        throw new Error("Error occurred while creating the request.");
      }
    }

    // If it's not an Axios error
    console.error("Unexpected Error:", error);
    return Promise.reject(error);
  }
);
