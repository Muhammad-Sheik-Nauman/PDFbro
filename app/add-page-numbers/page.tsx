import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AddPageNumbersConverter from "@/components/AddPageNumbersConverter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { seoContent } from "@/lib/content";
import type { Metadata } from "next";

const tool = seoContent.tools.addPageNumbers;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: "add page numbers to PDF, PDF page numbering, number PDF pages, PDF page numbers online, add page numbers free, PDF numbering tool",
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

export default function AddPageNumbersPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-background to-secondary/30 pt-12 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <div className="inline-block bg-emerald-500 text-white text-sm px-3 py-1 rounded-full mb-4">
                ⭐ Most Popular Tool
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {tool.h1}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {tool.description}
              </p>
            </div>

            {/* Converter Component */}
            <AddPageNumbersConverter />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Why Use Our PDF Page Numbering Tool?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tool.benefits.slice(0, 3).map((benefit, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                      <p className="text-gray-700">{benefit}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Related Tools Section */}
        <section className="py-16 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Other PDF Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/merge-pdf">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Merge PDF
                    </h3>
                    <p className="text-gray-600">
                      Combine multiple PDF files into one document
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/split-pdf">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Split PDF
                    </h3>
                    <p className="text-gray-600">
                      Extract or separate PDF pages easily
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/rotate-pdf">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Rotate PDF
                    </h3>
                    <p className="text-gray-600">
                      Fix PDF page orientation in seconds
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* SEO Content Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl prose prose-lg">
            <h2 className="text-3xl font-bold text-black mb-6">
              Professional PDF Page Numbering Made Easy
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Adding page numbers to PDF documents is essential for professional presentations, academic papers, reports, and ebooks. Our free online PDF page numbering tool makes it incredibly easy to add clean, professional page numbers to any PDF without watermarks or registration.
            </p>

            <h3 className="text-2xl font-bold text-black mb-4">
              Perfect for Every Document Type
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Whether you're working on a business report, academic thesis, ebook manuscript, or legal document, adding page numbers improves readability and professionalism. Our tool supports custom positioning (header, footer, or corners), multiple number formats (1,2,3 or i,ii,iii), and lets you choose which page to start numbering from.
            </p>

            <h3 className="text-2xl font-bold text-black mb-4">
              Why PDF Page Numbers Matter
            </h3>
            
            <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-6">
              <li>Makes long documents easier to navigate and reference</li>
              <li>Essential for professional reports and academic papers</li>
              <li>Helps readers track their progress through the document</li>
              <li>Required for table of contents and index functionality</li>
              <li>Adds credibility and polish to any PDF document</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mb-4">
              Free Online PDF Editor - No Software Required
            </h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Unlike expensive desktop software like Adobe Acrobat, PDF Bro provides a completely free online solution. There's no need to download or install anything – simply upload your PDF, customize your page numbering settings, and download the result. Best of all, there are no watermarks, no registration required, and no limits on how many PDFs you can process.
            </p>
          </div>
        </section>

        {/* Other Tools Section */}
        <section className="py-16 px-4 bg-secondary/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Other Popular PDF Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/compress-pdf" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">Compress PDF</h3>
                    <p className="text-gray-600">Reduce PDF file size while maintaining quality</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/merge-pdf" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">Merge PDF</h3>
                    <p className="text-gray-600">Combine multiple PDFs into one file</p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/split-pdf" className="block">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">Split PDF</h3>
                    <p className="text-gray-600">Extract or separate PDF pages</p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 px-4 bg-black text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Adding Page Numbers to Your PDFs
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Free, fast, and professional. No watermarks, no registration required.
            </p>
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="#top">Add Page Numbers Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured Data for Tool */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "PDF Page Numbering Tool",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": tool.metaDescription,
            "featureList": tool.benefits
          })
        }}
      />
    </>
  );
}
