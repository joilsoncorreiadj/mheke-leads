import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mheke - Sua Estratégia Digital",
  description: "Descubra o que está travando o crescimento da sua marca e como mudar isso agora.",
  viewport: {
    themeColor: '#FF00A4',
  },
  icons: {
    icon: '/favicon.ico',
  },
  formatDetection: {
    telephone: true,
    date: true,
    address: true,
    email: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-gray-900 antialiased">
        <FacebookPixel />
        {children}
      </body>
    </html>
  );
}
