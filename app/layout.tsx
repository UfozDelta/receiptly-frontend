import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Receipt Scanner",
  description: "AI-powered receipt scanning and expense tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#000',
              color: '#fff',
              fontSize: '14px',
              borderRadius: '8px',
              padding: '12px 16px',
            },
            success: {
              iconTheme: {
                primary: '#fff',
                secondary: '#000',
              },
            },
            error: {
              iconTheme: {
                primary: '#fff',
                secondary: '#000',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
