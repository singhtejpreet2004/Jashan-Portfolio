import type { Metadata } from "next";
import { Inter, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Jashan Gupta — Data Analyst",
  description:
    "Data Analyst specializing in SQL, Python, Power BI, and ETL pipelines. Turning complex data into actionable business insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body bg-[#030712] text-[#e6edf3]">{children}</body>
    </html>
  );
}
