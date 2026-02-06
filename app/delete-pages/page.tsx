import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DeletePagesConverter from "@/components/DeletePagesConverter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { seoContent } from "@/lib/content";
import type { Metadata } from "next";

const tool = seoContent.tools.deletePages;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: "delete PDF pages, remove pages from PDF, PDF page remover, delete PDF pages online free, remove unwanted pages",
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

export default function DeletePagesPage() {
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
        <section className="bg-gradient-to-b from-background to-secondary/30 pt-12 pb-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {tool.h1}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                {tool.description}
              </p>
            </div>

            {/* Converter Component */}
            <DeletePagesConverter />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Why Use Our PDF Page Deletion Tool?
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
              <Link href="/merge-pdf">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Merge PDF
                    </h3>
                    <p className="text-gray-600">
                      Combine multiple PDF files into one
                    </p>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/add-page-numbers">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-black mb-2">
                      Add Page Numbers
                    </h3>
                    <p className="text-gray-600">
                      Number your PDF pages professionally
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
              Professional PDF Page Deletion Made Easy
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Need to remove unwanted pages from your PDF documents? Our free online PDF page deletion tool 
              makes it incredibly simple to clean up your PDFs by removing unnecessary, blank, or sensitive 
              pages in just a few clicks. Perfect for professionals, students, and anyone working with PDF documents.
            </p>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">
              How to Delete Pages from PDF
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
              <li>Upload your PDF file using drag and drop or file selection</li>
              <li>Review all pages displayed in the grid view</li>
              <li>Click on pages you want to delete (they'll be highlighted in red)</li>
              <li>Click "Delete Pages" to remove selected pages and download your cleaned PDF</li>
            </ol>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">
              Why Delete Pages from PDFs?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Remove blank pages:</strong> Clean up scanned documents with accidental blank pages</li>
              <li><strong>Delete sensitive information:</strong> Remove pages containing confidential data before sharing</li>
              <li><strong>Reduce file size:</strong> Make your PDFs smaller by removing unnecessary pages</li>
              <li><strong>Improve document flow:</strong> Create cleaner, more professional documents</li>
              <li><strong>Extract specific content:</strong> Keep only the pages you need</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">
              Features of Our PDF Page Deletion Tool
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Visual page grid for easy page selection</li>
              <li>Select or deselect all pages with one click</li>
              <li>See exactly how many pages you're deleting before processing</li>
              <li>Maintains original PDF quality</li>
              <li>Fast processing - even for large PDF files</li>
              <li>100% secure - all processing happens in your browser</li>
              <li>No watermarks or limitations</li>
            </ul>

            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 my-8">
              <h4 className="text-xl font-bold text-black mb-2">
                💡 Pro Tip
              </h4>
              <p className="text-gray-700">
                Use "Select All" then deselect the pages you want to keep - this is faster when you 
                only need to keep a few pages from a large document.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">
              Common Use Cases
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li><strong>Business documents:</strong> Remove cover pages or draft versions before final submission</li>
              <li><strong>Academic papers:</strong> Delete reference pages or appendices for specific submissions</li>
              <li><strong>Scanned documents:</strong> Remove blank pages from multi-page scans</li>
              <li><strong>Contracts & legal documents:</strong> Remove executed signature pages or outdated terms</li>
              <li><strong>Reports & presentations:</strong> Clean up documents by removing unnecessary slides</li>
            </ul>

            <h3 className="text-2xl font-bold text-black mt-8 mb-4">
              Is It Safe to Delete Pages Online?
            </h3>
            <p className="text-gray-700 leading-relaxed mb-6">
              Absolutely! Our PDF page deletion tool processes everything directly in your web browser using 
              client-side technology. Your PDF never leaves your device, ensuring complete privacy and security. 
              No server uploads, no data storage, no privacy concerns.
            </p>

            <div className="text-center mt-12">
              <h3 className="text-2xl font-bold text-black mb-4">
                Ready to Clean Up Your PDFs?
              </h3>
              <p className="text-gray-600 mb-6">
                Free, fast, and secure. No watermarks, no registration required.
              </p>
              <Button size="lg" variant="secondary" className="px-8" asChild>
                <Link href="#top">Delete Pages Now</Link>
              </Button>
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
