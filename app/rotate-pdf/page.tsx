import { seoContent } from "@/lib/content";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RotatePdfConverter from "@/components/RotatePdfConverter";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

const tool = seoContent.tools.rotatePdf;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: "rotate PDF online, fix PDF orientation, rotate PDF pages, PDF rotation tool, flip PDF pages, change PDF orientation",
  alternates: {
    canonical: `https://pdfbro.me/${tool.slug}`,
  },
  openGraph: {
    title: tool.metaTitle,
    description: tool.metaDescription,
    url: `https://pdfbro.me/${tool.slug}`,
    type: 'website',
    siteName: 'PDF Bro',
  },
  twitter: {
    card: 'summary_large_image',
    title: tool.metaTitle,
    description: tool.metaDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RotatePdfPage() {
  const relatedTools = [
    {
      title: "Split PDF",
      description: "Extract or separate PDF pages",
      href: "/split-pdf"
    },
    {
      title: "Add Page Numbers",
      description: "Number your PDF pages professionally",
      href: "/add-page-numbers"
    },
    {
      title: "Merge PDF",
      description: "Combine multiple PDFs into one file",
      href: "/merge-pdf"
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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-secondary/30 pt-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {tool.h1}
              </h1>
            </div>

            {/* Converter Component */}
            <RotatePdfConverter />
          </div>
        </section>

        {/* Description Section */}
        <section className="bg-white py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center">
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {tool.description}
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-8 px-4 border-t">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Why Choose PDF Bro?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tool.benefits.slice(0, 3).map((benefit, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <CheckCircle className="h-12 w-12 text-emerald-600 mb-4" />
                    <p className="text-gray-700">{benefit}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools */}
        <section className="bg-secondary/30 py-8 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-black text-center mb-8">
              Related Tools
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTools.map((relatedTool, index) => (
                <Link key={index} href={relatedTool.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2 text-black">{relatedTool.title}</h3>
                      <p className="text-gray-600">{relatedTool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
