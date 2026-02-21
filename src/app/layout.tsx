import type { Metadata } from "next";
import { Header, Footer, StickyMobileCTA } from "@/components/layout";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import Analytics from "@/components/Analytics";
import { generateOrganizationSchema } from "@/lib/schema";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://healthexpressindia.com'),
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

import { GoogleTagManager } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en">
      <head>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema)
          }}
        />
      </head>
      <body className={`${inter.variable} min-h-screen flex flex-col pb-[80px] md:pb-0 overflow-x-hidden font-sans antialiased text-slate-900 selection:bg-teal-100 selection:text-teal-900`}>
        <Analytics />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StickyMobileCTA />
      </body>

    </html>
  );
}
