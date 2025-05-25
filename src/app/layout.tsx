import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather App",
  description: "Weather application with city search",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900 transition-colors duration-300`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
