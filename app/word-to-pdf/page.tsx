import ToolPageTemplate from "@/components/ToolPageTemplate";
import { seoContent } from "@/lib/content";
import type { Metadata } from "next";

const tool = seoContent.tools.compressPdf;

export const metadata: Metadata = {
  title: tool.metaTitle,
  description: tool.metaDescription,
  keywords: "compress PDF, reduce PDF size, PDF compressor online free, shrink PDF, make PDF smaller, PDF file size reducer",
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
      <ToolPageTemplate tool={tool} relatedTools={relatedTools} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}