import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL;
const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://learneralways.com"),
  title: {
    default: "Learner Always",
    template: "%s | Learner Always",
  },
  description:
    "A blog about technology, career growth, and the pursuit of continuous learning.",
  openGraph: {
    title: "Learner Always",
    description:
      "A blog about technology, career growth, and the pursuit of continuous learning.",
    url: "https://learneralways.com",
    siteName: "Learner Always",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learner Always",
    description:
      "A blog about technology, career growth, and the pursuit of continuous learning.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12">
          {children}
        </main>
        <Footer />
        {umamiUrl && umamiWebsiteId && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
