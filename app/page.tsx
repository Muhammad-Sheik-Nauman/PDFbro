import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Merge, Scissors, RotateCw, Hash, Trash2, Shield, Zap, Lock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { seoContent, structuredData } from "@/lib/content";

const tools = [
  {
    icon: FileText,
    title: "Compress PDF",
    description: "Reduce PDF file size while maintaining quality",
    href: "/compress-pdf",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: Hash,
    title: "Add Page Numbers",
    description: "Number your PDF pages professionally",
    href: "/add-page-numbers",
    color: "bg-emerald-100 text-emerald-700",
    featured: true,
    badge: "Most Popular"
  },
  {
    icon: Scissors,
    title: "Split PDF",
    description: "Extract or separate PDF pages",
    href: "/split-pdf",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    icon: RotateCw,
    title: "Rotate PDF",
    description: "Fix page orientation quickly",
    href: "/rotate-pdf",
    color: "bg-green-50 text-green-600"
  },
  {
    icon: Merge,
    title: "Merge PDF",
    description: "Combine multiple PDFs into one file",
    href: "/merge-pdf",
    color: "bg-teal-50 text-teal-600"
  },
  {
    icon: Trash2,
    title: "Delete Pages",
    description: "Remove unwanted pages from PDFs",
    href: "/delete-pages",
    color: "bg-emerald-50 text-emerald-600"
  }
];

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Secure",
    description: "Files encrypted and auto-deleted after 1 hour"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process PDFs in seconds, not minutes"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "No registration, no tracking, no data storage"
  },
  {
    icon: CheckCircle,
    title: "Always Free",
    description: "Unlimited use with no watermarks"
  }
];

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        {/* Tools Grid Section */}
        <section id="tools" className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                All PDF Tools in One Place
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Professional online PDF tools that are fast, secure, and completely free. No installation or registration required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool, index) => (
                <Link key={index} href={tool.href}>
                  <Card className={`h-full gumroad-shadow hover:gumroad-shadow-lg cursor-pointer border border-gray-200 hover:border-emerald-200 group ${tool.featured ? 'ring-2 ring-emerald-400 gumroad-shadow-lg' : ''}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className={`p-4 rounded-2xl ${tool.color}`}>
                          <tool.icon className="h-8 w-8" />
                        </div>
                        {tool.featured && (
                          <span className="bg-emerald-500 text-white text-xs px-3 py-2 rounded-full font-bold">
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <CardTitle className="text-xl font-black mb-2">{tool.title}</CardTitle>
                      <CardDescription className="text-base text-gray-600 font-medium">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full group-hover:bg-emerald-50 group-hover:text-emerald-600 font-semibold">
                        {seoContent.ctaButtons.secondary}
                        <span className="ml-2">→</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-28 px-4 relative overflow-hidden">
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight">
              {seoContent.homepage.h1}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              {seoContent.homepage.subtitle}
            </p>
            
            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full gumroad-shadow border border-emerald-100">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-gray-800">Secure & Private</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full gumroad-shadow border border-emerald-100">
                <Zap className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-gray-800">Lightning Fast</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-6 py-3 rounded-full gumroad-shadow border border-emerald-100">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="text-sm font-bold text-gray-800">100% Free</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-12 py-7 h-auto font-bold rounded-full gumroad-shadow-lg" asChild>
                <Link href="#tools">
                  {seoContent.ctaButtons.viewAllTools}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-12 py-7 h-auto font-bold rounded-full border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300" asChild>
                <Link href="/add-page-numbers">
                  Add Page Numbers
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                Why Choose PDF Bro?
              </h2>
              <p className="text-lg text-gray-600">
                The trusted choice for over 100,000 users worldwide
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {trustFeatures.map((feature, index) => (
                <div key={index} className="text-center p-8 rounded-2xl bg-white gumroad-shadow group">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-2xl mb-5">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Edit your PDFs in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
              <div className="text-center relative">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-6 gumroad-shadow-lg">
                  1
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  Upload Your File
                </h3>
                <p className="text-gray-600 text-base font-medium">
                  Select or drag and drop your PDF or document
                </p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-6 gumroad-shadow-lg">
                  2
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  Process Instantly
                </h3>
                <p className="text-gray-600 text-base font-medium">
                  Your file is processed automatically in seconds
                </p>
              </div>

              <div className="text-center relative">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center text-3xl font-black mx-auto mb-6 gumroad-shadow-lg">
                  3
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-3">
                  Download Result
                </h3>
                <p className="text-gray-600 text-base font-medium">
                  Get your edited PDF instantly, ready to use
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA Section */}
        <section className="py-24 px-4 bg-emerald-500 text-white relative overflow-hidden">
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              Ready to Edit Your PDFs?
            </h2>
            <p className="text-xl text-emerald-100 mb-12 max-w-2xl mx-auto font-medium">
              Join thousands of users who trust PDF Bro for their PDF editing needs. Start now for free!
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-12 py-7 h-auto bg-white text-emerald-600 hover:bg-emerald-50 font-black rounded-full gumroad-shadow-lg" asChild>
              <Link href="#tools">
                Get Started Free
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.organization)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.website)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData.softwareApplication)
        }}
      />
    </>
  );
}
