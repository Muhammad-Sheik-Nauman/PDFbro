"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap, FileText, Download, X, Loader2, RotateCw } from "lucide-react";

interface PageRotation {
  pageNumber: number;
  rotation: 90 | 180 | 270 | 0;
  selected: boolean;
}

export default function RotatePdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pages, setPages] = useState<PageRotation[]>([]);
  const [mode, setMode] = useState<'all' | 'individual'>('all');
  const [globalRotation, setGlobalRotation] = useState<90 | 180 | 270>(90);
  const [selectedPage, setSelectedPage] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please select a PDF file');
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      setError(null);
      setProcessed(false);
      setPdfUrl(null);
      
      // Get total pages and initialize page rotation array
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const { PDFDocument } = await import('pdf-lib');
          const arrayBuffer = e.target?.result as ArrayBuffer;
          const pdfDoc = await PDFDocument.load(arrayBuffer);
          const pageCount = pdfDoc.getPageCount();
          
          const pageList: PageRotation[] = [];
          for (let i = 0; i < pageCount; i++) {
            pageList.push({
              pageNumber: i + 1,
              rotation: 0,
              selected: false
            });
          }
          setPages(pageList);
        } catch (err) {
          console.error('Failed to load PDF:', err);
        }
      };
      reader.readAsArrayBuffer(selectedFile);
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

  const setPageRotation = (pageNumber: number, rotation: 0 | 90 | 180 | 270) => {
    setPages(pages.map(page => 
      page.pageNumber === pageNumber 
        ? { ...page, rotation }
        : page
    ));
  };

  const rotatePdf = async () => {
    if (!file || pages.length === 0) return;

    if (mode === 'individual') {
      const pagesToRotate = pages.filter(p => p.rotation !== 0);
      if (pagesToRotate.length === 0) {
        setError("Please set rotation for at least one page");
        return;
      }
    }

    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument, degrees } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pdfPages = pdfDoc.getPages();

      if (mode === 'all') {
        // Rotate all pages by global rotation
        pdfPages.forEach(page => {
          const currentRotation = page.getRotation().angle;
          page.setRotation(degrees(currentRotation + globalRotation));
        });
      } else {
        // Apply individual rotation to each page
        pages.forEach((pageInfo, index) => {
          if (pageInfo.rotation !== 0) {
            const page = pdfPages[index];
            const currentRotation = page.getRotation().angle;
            page.setRotation(degrees(currentRotation + pageInfo.rotation));
          }
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setProcessed(true);
    } catch (err: any) {
      setError(err.message || 'Rotation failed. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = file?.name.replace('.pdf', '_rotated.pdf') || 'rotated.pdf';
      link.click();
    }
  };

  const resetConverter = () => {
    setFile(null);
    setProcessed(false);
    setError(null);
    setPdfUrl(null);
    setPages([]);
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
                PDF files only • Maximum file size: 10MB
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
                <label className="text-sm font-medium text-gray-900">Rotation Mode</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setMode('all')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      mode === 'all'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">All Pages</p>
                    <p className="text-xs text-gray-600 mt-1">Rotate all pages together</p>
                  </button>
                  <button
                    onClick={() => setMode('individual')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      mode === 'individual'
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-200 hover:border-emerald-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">Individual Pages</p>
                    <p className="text-xs text-gray-600 mt-1">Set rotation per page</p>
                  </button>
                </div>
              </div>

              {mode === 'all' ? (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">Rotation Angle (for all {pages.length} pages)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[90, 180, 270].map((angle) => (
                      <button
                        key={angle}
                        onClick={() => setGlobalRotation(angle as 90 | 180 | 270)}
                        className={`p-4 rounded-lg border-2 transition-colors ${
                          globalRotation === angle
                            ? 'border-emerald-500 bg-emerald-50'
                            : 'border-gray-200 hover:border-emerald-300'
                        }`}
                      >
                        <RotateCw className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
                        <p className="font-semibold text-gray-900">{angle}°</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-900">
                    Select Page and Set Rotation ({pages.filter(p => p.rotation !== 0).length} pages configured)
                  </label>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-[200px] overflow-y-auto p-2 border rounded-lg">
                    {pages.map((page) => (
                      <button
                        key={page.pageNumber}
                        onClick={() => setSelectedPage(page.pageNumber)}
                        className={`aspect-square border-2 rounded-lg p-1 transition-all text-xs font-medium ${
                          selectedPage === page.pageNumber
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : page.rotation !== 0
                            ? 'border-blue-400 bg-blue-50 text-blue-700'
                            : 'border-gray-300 hover:border-emerald-300 text-gray-700'
                        }`}
                      >
                        <div>{page.pageNumber}</div>
                        {page.rotation !== 0 && (
                          <div className="text-[10px]">{page.rotation}°</div>
                        )}
                      </button>
                    ))}
                  </div>

                  {selectedPage && (
                    <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <p className="text-sm font-medium text-gray-900">
                        Rotation for Page {selectedPage}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {[0, 90, 180, 270].map((angle) => (
                          <button
                            key={angle}
                            onClick={() => setPageRotation(selectedPage, angle as 0 | 90 | 180 | 270)}
                            className={`p-3 rounded border-2 transition-colors ${
                              pages.find(p => p.pageNumber === selectedPage)?.rotation === angle
                                ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                : 'border-gray-300 hover:border-emerald-300 text-gray-700'
                            }`}
                          >
                            <div className="text-sm font-medium">
                              {angle === 0 ? 'None' : `${angle}°`}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={rotatePdf}
                disabled={processing || (mode === 'individual' && pages.filter(p => p.rotation !== 0).length === 0)}
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Rotating PDF...
                  </>
                ) : mode === 'all' ? (
                  <>
                    <RotateCw className="h-5 w-5 mr-2" />
                    Rotate All Pages {globalRotation}°
                  </>
                ) : (
                  <>
                    <RotateCw className="h-5 w-5 mr-2" />
                    Rotate {pages.filter(p => p.rotation !== 0).length} {pages.filter(p => p.rotation !== 0).length === 1 ? 'Page' : 'Pages'}
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
                  Rotation Complete!
                </h3>
                <p className="text-gray-600">
                  Your PDF has been rotated successfully
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
                  Rotate Another
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
