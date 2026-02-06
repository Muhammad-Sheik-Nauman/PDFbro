import Link from "next/link";
import { FileText, Twitter, Facebook, Linkedin } from "lucide-react";
import { seoContent } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 mt-20 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="bg-black text-white p-2 rounded-lg">
                <FileText className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">PDF Bro</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4">
              {seoContent.footer.description}
            </p>
          </div>

          {/* PDF Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4">PDF Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/compress-pdf" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/merge-pdf" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Merge PDF
                </Link>
              </li>
              <li>
                <Link href="/split-pdf" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Split PDF
                </Link>
              </li>
              <li>
                <Link href="/rotate-pdf" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Rotate PDF
                </Link>
              </li>
              <li>
                <Link href="/add-page-numbers" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Add Page Numbers
                </Link>
              </li>
              <li>
                <Link href="/delete-pages" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Delete Pages
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            {seoContent.footer.copyright}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            All PDF processing happens securely in your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
