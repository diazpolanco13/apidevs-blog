import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "APIDevs Trading Blog - Análisis Técnico y Estrategias de Trading",
  description: "Blog especializado en trading con indicadores premium para TradingView. Análisis técnico, estrategias con IA, y tutoriales exclusivos.",
  keywords: "trading, indicadores, TradingView, análisis técnico, criptomonedas, forex, estrategias",
  authors: [{ name: "APIDevs Team" }],
  openGraph: {
    title: "APIDevs Trading Blog",
    description: "Análisis técnico avanzado y estrategias de trading con IA",
    url: "https://blog.apidevs.io",
    siteName: "APIDevs Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "APIDevs Trading Blog",
    description: "Análisis técnico avanzado y estrategias de trading con IA",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}