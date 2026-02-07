import { seoContent } from "@/lib/content";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CompressPdfConverter from "@/components/CompressPdfConverter";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const tool = seoContent.tools.compressPdf;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: "Compress PDF files online free. Reduce PDF file size, optimize documents, and manage PDFs. Best PDF compressor for business, school, and personal use. Find PDF tools for any document task.",
  keywords: "compress PDF, reduce PDF size, PDF compressor online free, shrink PDF, make PDF smaller, PDF file size reducer, PDF tools, online PDF tools, document optimization, business PDF, school PDF, personal PDF, free PDF tools, PDF management",
  alternates: {
    canonical: `https://pdfbro.me/${tool.slug}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: "Compress PDF files online free. Reduce PDF file size, optimize documents, and manage PDFs. Best PDF compressor for business, school, and personal use. Find PDF tools for any document task.",
    url: `https://pdfbro.me/${tool.slug}`,
    type: 'website',
    siteName: 'PDF Bro',
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: "Compress PDF files online free. Reduce PDF file size, optimize documents, and manage PDFs. Best PDF compressor for business, school, and personal use. Find PDF tools for any document task.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CompressPdfPage() {
  const relatedTools = [
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one file",
      href: "/merge-pdf"
    },
    {
      title: "Rotate PDF",
      description: "Fix PDF page orientation",
      href: "/rotate-pdf"
    },
    {
      title: "Split PDF",
      description: "Extract or separate PDF pages",
      href: "/split-pdf"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.title,
    "description": tool.description,
    "url": `https://pdfbro.me/${tool.slug}`,
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5."
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <section className="bg-gradient-to-b from-background to-secondary/30 pt-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {tool.h1}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                {tool.description}
              </p>
            </div>

            <CompressPdfConverter />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tool.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              How It Works
            </h2>
            <div className="space-y-6">
              {tool.howItWorks.map((step, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-lg text-gray-700">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        {relatedTools && relatedTools.length > 0 && (
          <section className="py-16 px-4 bg-secondary/20">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold text-black text-center mb-12">
                Other PDF Tools You Might Need
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedTools.map((relatedTool, index) => (
                  <Link key={index} href={relatedTool.href} className="block">
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-black mb-2">
                          {relatedTool.title}
                        </h3>
                        <p className="text-gray-600">{relatedTool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}