import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://pdfbro.me'),
  title: "PDF Bro - Free Online PDF Tools | Convert, Merge, Split & Edit PDFs",
  description: "Free online PDF tools to convert Word to PDF, merge PDFs, split PDFs, rotate pages, add page numbers, and delete pages. Fast, secure, and easy to use. No registration required.",
  keywords: "PDF tools, free PDF converter, Word to PDF, merge PDF, split PDF, rotate PDF, add page numbers to PDF, delete PDF pages, online PDF editor, PDF page numbering tool",
  authors: [{ name: "PDF Bro" }],
  openGraph: {
    title: "PDF Bro - Free Online PDF Tools",
    description: "Free online PDF tools to convert, merge, split & edit PDFs. Fast, secure, and easy to use.",
    url: "https://pdfbro.me",
    siteName: "PDF Bro",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PDF Bro - Free Online PDF Tools",
    description: "Free online PDF tools to convert, merge, split & edit PDFs",
    creator: "@pdfbro",
  },
  verification: {
    google: "verification_token",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://pdfbro.me",
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
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
