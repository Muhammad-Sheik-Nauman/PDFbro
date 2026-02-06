import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap } from "lucide-react";
import Link from "next/link";

interface ToolPageProps {
  tool: {
    title: string;
    h1: string;
    description: string;
    benefits: string[];
    howItWorks: string[];
    featured?: boolean;
    badge?: string;
  };
  relatedTools?: Array<{
    title: string;
    description: string;
    href: string;
  }>;
}

export default function ToolPageTemplate({ tool, relatedTools }: ToolPageProps) {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Title First */}
        <section className="bg-gradient-to-b from-background to-secondary/30 pt-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              {tool.featured && (
                <div className="inline-block bg-emerald-500 text-white text-sm px-3 py-1 rounded-full mb-4">
                  ⭐ {tool.badge}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {tool.h1}
              </h1>
            </div>

            {/* Upload Area Second */}
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
                  <h3 className="text-xl font-semibold text-black mb-2">
                    Select PDF File
                  </h3>
                  <p className="text-gray-600 mb-4">
                    or drag and drop your file here
                  </p>
                  <Button size="lg" className="px-8 bg-emerald-500 hover:bg-emerald-600">
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-500 mt-4">
                    Maximum file size: 10MB
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Trust Badges Below Upload */}
            <div className="flex flex-wrap justify-center gap-3 mt-8 pb-12">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium">100% Free</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Secure</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm">
                <Zap className="h-4 w-4 text-yellow-600" />
                <span className="font-medium">Fast</span>
              </div>
            </div>
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

        {/* Final CTA */}
        <section className="py-16 px-4 bg-black text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Free, fast, and secure. No registration required.
            </p>
            <Button size="lg" variant="secondary" className="px-8" asChild>
              <Link href="#top">Start Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
