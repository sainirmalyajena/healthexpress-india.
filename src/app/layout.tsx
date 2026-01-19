import type { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HealthExpress India - Surgery & Hospitalization Support",
    template: "%s | HealthExpress India",
  },
  description: "Find the right surgery at the right hospital across India. Browse our comprehensive surgery directory and connect with top healthcare providers.",
  keywords: ["surgery", "hospital", "healthcare", "India", "medical", "treatment", "surgery cost", "hospital booking", "affordable surgery", "best surgeons india", "medical tourism india", "health packages", "delhi", "mumbai", "bangalore", "pune", "hyderabad", "chennai"],
  authors: [{ name: "HealthExpress India" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://healthexpress.in",
    siteName: "HealthExpress India",
    title: "HealthExpress India - Surgery & Hospitalization Support",
    description: "Find the right surgery at the right hospital across India.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HealthExpress India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthExpress India - Surgery & Hospitalization Support",
    description: "Find the right surgery at the right hospital across India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
