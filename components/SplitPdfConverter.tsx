"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap, FileText, Download, X, Loader2 } from "lucide-react";

export default function SplitPdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [splitPages, setSplitPages] = useState<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
          setError('File size must be less than 100MB');
          // Show toast or notification here
          if (typeof window !== 'undefined') {
            window.alert('File size exceeds 100MB. Please try a smaller file or use "Put Later" option.');
          }
          return;
        }

      setFile(selectedFile);
      setError(null);
      setProcessed(false);
      setSplitPages([]);

      // Get page count
      try {
        const { PDFDocument } = await import('pdf-lib');
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        setPageCount(pdfDoc.getPageCount());
      } catch (err) {
        console.error(err);
        setError('Failed to load PDF');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(droppedFile);
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
        handleFileSelect({ target: { files: dataTransfer.files } } as any);
      }
    }
  };

  const splitPdf = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      const pages: Blob[] = [];

      // Split each page into separate PDF
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        pages.push(new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' }));
      }

      setSplitPages(pages);
      setProcessed(true);
    } catch (err: any) {
      setError(err.message || 'Split failed. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPage = (index: number) => {
    const url = URL.createObjectURL(splitPages[index]);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace('.pdf', '')}_page_${index + 1}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    splitPages.forEach((_, index) => {
      setTimeout(() => downloadPage(index), index * 200);
    });
  };

  const resetConverter = () => {
    setFile(null);
    setProcessed(false);
    setError(null);
    setSplitPages([]);
    setPageCount(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          {!file && !processed && (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Select PDF Document
              </h3>
              <p className="text-gray-600 mb-4">
                or drag and drop your file here
              </p>
              <Button size="lg" className="px-8 bg-emerald-500 hover:bg-emerald-600">
                Choose File
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                PDF files only • Maximum file size: 100MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {file && !processed && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-red-600" />
                  <div>
                    <p className="font-semibold text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {pageCount} pages • {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetConverter}
                  className="text-gray-500 hover:text-red-600"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={splitPdf}
                disabled={processing}
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Splitting PDF...
                  </>
                ) : (
                  `Split into ${pageCount} Pages`
                )}
              </Button>
            </div>
          )}

          {processed && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Split Complete!
                </h3>
                <p className="text-gray-600">
                  {splitPages.length} pages ready to download
                </p>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-2">
                {splitPages.map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => downloadPage(index)}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Page {index + 1}
                  </Button>
                ))}
              </div>
              <div className="flex gap-3 justify-center pt-4">
                <Button
                  onClick={downloadAll}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download All
                </Button>
                <Button
                  onClick={resetConverter}
                  variant="outline"
                  size="lg"
                >
                  Split Another
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3">
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
  );
}
