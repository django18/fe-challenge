"use client";

import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";

const openSans = Open_Sans({
  weight: ["400"], // regular
  subsets: ["latin"],
  variable: "--font-open-sans",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Aspire Card App</title>
        <meta name="description" content="Aspire card management application" />
      </head>
      <body
        className={`${openSans.className} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
