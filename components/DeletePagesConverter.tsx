"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Trash2, CheckCircle, Shield, Zap, Download } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface PagePreview {
  pageNumber: number;
  selected: boolean;
}

export default function DeletePagesConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PagePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedPdf, setProcessedPdf] = useState<{ blob: Blob; url: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleFileSelect = async (selectedFile: File) => {
    setError("");
    
    // Validate file type
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file");
      return;
    }

    // Validate file size (10MB)
      if (selectedFile.size > 100 * 1024 * 1024) {
        setError("File size must be less than 100MB");
        // Show toast or notification here
        if (typeof window !== 'undefined') {
          window.alert('File size exceeds 100MB. Please try a smaller file or use "Put Later" option.');
        }
        return;
      }

    setFile(selectedFile);
    
    // Load PDF and get page count
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();
      
      // Initialize all pages as not selected
      const pageList: PagePreview[] = [];
      for (let i = 0; i < pageCount; i++) {
        pageList.push({
          pageNumber: i + 1,
          selected: false
        });
      }
      
      setPages(pageList);
    } catch (err) {
      setError("Failed to load PDF file");
      console.error(err);
    }
  };

  const togglePageSelection = (pageNumber: number) => {
    setPages(pages.map(page => 
      page.pageNumber === pageNumber 
        ? { ...page, selected: !page.selected }
        : page
    ));
  };

  const selectAllPages = () => {
    setPages(pages.map(page => ({ ...page, selected: true })));
  };

  const deselectAllPages = () => {
    setPages(pages.map(page => ({ ...page, selected: false })));
  };

  const handleDeletePages = async () => {
    if (!file || pages.length === 0) return;

    const selectedPages = pages.filter(p => p.selected);
    
    if (selectedPages.length === 0) {
      setError("Please select at least one page to delete");
      return;
    }

    if (selectedPages.length === pages.length) {
      setError("Cannot delete all pages. At least one page must remain.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      // Get indices of pages to keep (not selected for deletion)
      const pagesToKeep = pages
        .filter(p => !p.selected)
        .map(p => p.pageNumber - 1);
      // Create new PDF with only the pages to keep
      const newPdfDoc = await PDFDocument.create();
      const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToKeep);
      copiedPages.forEach(page => {
        newPdfDoc.addPage(page);
      });
      // Save the new PDF
      const pdfBytes = await newPdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      // Store the processed PDF and URL for download
      setProcessedPdf({ blob, url });
    } catch (err) {
      setError("Failed to delete pages. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPages([]);
    setProcessedPdf(null);
    setError("");
  };

  const selectedCount = pages.filter(p => p.selected).length;

  // Clean up object URL when component unmounts or processedPdf changes
  useEffect(() => {
    return () => {
      if (processedPdf?.url) {
        URL.revokeObjectURL(processedPdf.url);
      }
    };
  }, [processedPdf]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-8">
          {!file && !processedPdf ? (
            <>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-gray-300 hover:border-emerald-500"
                }`}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  Select PDF File
                </h3>
                <p className="text-gray-600 mb-4">
                  or drag and drop your PDF here
                </p>
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button size="lg" className="px-8 bg-emerald-500 hover:bg-emerald-600" asChild>
                    <span>Choose PDF File</span>
                  </Button>
                </label>
                <p className="text-xs text-gray-500 mt-4">
                  Maximum file size: 100MB
                </p>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-blue-600" />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Zap className="h-4 w-4 text-yellow-600" />
                  <span>Fast</span>
                </div>
              </div>
            </>
          ) : processedPdf ? (
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                <h3 className="text-xl font-semibold mb-2">Pages deleted successfully!</h3>
                <p className="text-gray-600 mb-4">Your PDF is ready to download.</p>
              </div>
              <a
                href={processedPdf.url}
                download={file ? file.name.replace('.pdf', '_deleted_pages.pdf') : 'output.pdf'}
              >
                <Button size="lg" className="px-8 bg-emerald-500 hover:bg-emerald-600">
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
              </a>
              <Button onClick={handleReset} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Start Over
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {file?.name ?? "PDF file"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {pages.length} pages • {selectedCount} selected for deletion
                    </p>
                  </div>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={selectAllPages}
                    variant="outline"
                    size="sm"
                  >
                    Select All
                  </Button>
                  <Button
                    onClick={deselectAllPages}
                    variant="outline"
                    size="sm"
                  >
                    Deselect All
                  </Button>
                </div>

                <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                  {pages.map((page) => (
                    <button
                      key={page.pageNumber}
                      onClick={() => togglePageSelection(page.pageNumber)}
                      className={`relative aspect-[3/4] border-2 rounded-lg p-2 transition-all ${
                        page.selected
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300 hover:border-emerald-500"
                      }`}
                    >
                      <div className="flex items-center justify-center h-full">
                        <span className="text-sm font-medium text-gray-700">
                          Page {page.pageNumber}
                        </span>
                      </div>
                      {page.selected && (
                        <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <Trash2 className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <Button
                  onClick={handleDeletePages}
                  disabled={isProcessing || selectedCount === 0}
                  className="w-full bg-red-500 hover:bg-red-600"
                  size="lg"
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>
                      <Trash2 className="h-5 w-5 mr-2" />
                      Delete {selectedCount} {selectedCount === 1 ? "Page" : "Pages"}
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
