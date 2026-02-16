"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap, FileText, Download, X, Loader2, Hash } from "lucide-react";

export default function AddPageNumbersConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left'>('bottom-center');
  const [startPage, setStartPage] = useState<number | ''>('');
  const [totalPages, setTotalPages] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      if (files.length > 100) {
        setError('You can upload up to 100 PDF files at once.');
        if (typeof window !== 'undefined') {
          window.alert('You can upload up to 100 PDF files at once. Please try fewer files or use "Put Later" option.');
        }
        return;
      }
      const selectedFile = files[0];
      if (selectedFile) {
        if (selectedFile.type !== 'application/pdf') {
          setError('Please select a PDF file');
          return;
        }
        if (selectedFile.size > 100 * 1024 * 1024) {
          setError('File size must be less than 100MB');
          if (typeof window !== 'undefined') {
            window.alert('File size exceeds 100MB. Please try a smaller file or use "Put Later" option.');
          }
          return;
        }
        setFile(selectedFile);
        setError(null);
        setProcessed(false);
        setPdfUrl(null);
        // Get total pages
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const { PDFDocument } = await import('pdf-lib');
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            setTotalPages(pdfDoc.getPageCount());
          } catch (err) {
            console.error('Failed to load PDF:', err);
          }
        };
        reader.readAsArrayBuffer(selectedFile);
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

  const addPageNumbers = async () => {
    if (!file) return;

    // Convert startPage to number and validate
    const pageNum = startPage === '' ? 1 : startPage;
    
    if (pageNum < 1 || pageNum > totalPages) {
      setError(`Please enter a valid page number between 1 and ${totalPages}`);
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;

      pages.forEach((page, index) => {
        const { width, height } = page.getSize();
        
        // Skip pages before startPage
        if (index + 1 < pageNum) {
          return;
        }
        
        const pageNumber = `${index - pageNum + 2}`;
        const textWidth = font.widthOfTextAtSize(pageNumber, fontSize);
        
        let x: number;
        const y = 30; // 30 points from bottom

        switch (position) {
          case 'bottom-center':
            x = (width - textWidth) / 2;
            break;
          case 'bottom-right':
            x = width - textWidth - 50; // 50 points from right
            break;
          case 'bottom-left':
            x = 50; // 50 points from left
            break;
        }

        page.drawText(pageNumber, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setProcessed(true);
    } catch (err: any) {
      setError(err.message || 'Failed to add page numbers. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = file?.name.replace('.pdf', '_numbered.pdf') || 'numbered.pdf';
      link.click();
    }
  };

  const resetConverter = () => {
    setFile(null);
    setProcessed(false);
    setError(null);
    setPdfUrl(null);
    setStartPage('');
    setTotalPages(0);
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
                PDF files only • Maximum file size: 100MB • Maximum 100 files
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
                      {(file.size / 1024 / 1024).toFixed(2)} MB
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

              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-900">Number Position</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'bottom-left' as const, label: 'Bottom Left' },
                    { value: 'bottom-center' as const, label: 'Bottom Center' },
                    { value: 'bottom-right' as const, label: 'Bottom Right' }
                  ].map((pos) => (
                    <button
                      key={pos.value}
                      onClick={() => setPosition(pos.value)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        position === pos.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <Hash className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold text-sm text-gray-900">{pos.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="startPage" className="text-sm font-medium text-gray-900">
                  Start Numbering From Page {totalPages > 0 && `(Total: ${totalPages} pages)`}
                </label>
                <input
                  id="startPage"
                  type="number"
                  min="1"
                  max={totalPages || 9999}
                  value={startPage}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      setStartPage('' as any);
                    } else {
                      const num = parseInt(value);
                      if (!isNaN(num)) {
                        setStartPage(num);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    const value = e.target.value;
                    if (value === '' || parseInt(value) < 1) {
                      setStartPage(1);
                    }
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:outline-none text-gray-900"
                  placeholder="Enter page to start numbering"
                />
                <p className="text-xs text-gray-500">
                  Example: Enter 3 to skip pages 1-2, start numbering from page 3 as "1"
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={addPageNumbers}
                disabled={processing}
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Adding Page Numbers...
                  </>
                ) : (
                  <>
                    <Hash className="h-5 w-5 mr-2" />
                    Add Page Numbers
                  </>
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
                  Page Numbers Added!
                </h3>
                <p className="text-gray-600">
                  All pages now have numbers
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={downloadPdf}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
                </Button>
                <Button
                  onClick={resetConverter}
                  variant="outline"
                  size="lg"
                >
                  Number Another
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
