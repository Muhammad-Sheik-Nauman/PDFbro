"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="PDF Bro" width={200} height={60} priority className="h-12 w-auto" />
            <h1 className="text-2xl font-bold" style={{ color: '#3895D3' }}>PDFbro</h1>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/compress-pdf" 
              className={`text-sm font-semibold ${
                isActive("/compress-pdf") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Compress PDF
            </Link>
            <Link 
              href="/merge-pdf" 
              className={`text-sm font-semibold ${
                isActive("/merge-pdf") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Merge PDF
            </Link>
            <Link 
              href="/split-pdf" 
              className={`text-sm font-semibold ${
                isActive("/split-pdf") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Split PDF
            </Link>
            <Link 
              href="/rotate-pdf" 
              className={`text-sm font-semibold ${
                isActive("/rotate-pdf") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Rotate PDF
            </Link>
            <Link 
              href="/add-page-numbers" 
              className={`text-sm font-semibold ${
                isActive("/add-page-numbers") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Add Page Numbers
            </Link>
            <Link 
              href="/delete-pages" 
              className={`text-sm font-semibold ${
                isActive("/delete-pages") 
                  ? "bg-emerald-500 text-white px-4 py-2.5 rounded-full shadow-md" 
                  : "text-gray-700 hover:text-emerald-600 px-4 py-2.5 rounded-full hover:bg-emerald-50"
              }`}
            >
              Delete Pages
            </Link>
          </nav>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors shadow-sm"
            aria-label="Toggle menu"
          >
            <span>Tools</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              <Link 
                href="/compress-pdf" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/compress-pdf") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Compress PDF
              </Link>
              <Link 
                href="/add-page-numbers" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/add-page-numbers") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Add Page Numbers
              </Link>
              <Link 
                href="/split-pdf" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/split-pdf") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Split PDF
              </Link>
              <Link 
                href="/rotate-pdf" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/rotate-pdf") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Rotate PDF
              </Link>
              <Link 
                href="/merge-pdf" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/merge-pdf") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Merge PDF
              </Link>
              <Link 
                href="/delete-pages" 
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-semibold transition-all duration-200 px-4 py-3 rounded-xl ${
                  isActive("/delete-pages") 
                    ? "bg-emerald-500 text-white shadow-md" 
                    : "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                Delete Pages
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
