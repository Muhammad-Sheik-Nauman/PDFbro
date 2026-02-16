"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap, FileText, Download, X, Loader2, GripVertical } from "lucide-react";

interface PdfFile {
  file: File;
  id: string;
}

export default function MergePdfConverter() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [merging, setMerging] = useState(false);
  const [merged, setMerged] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    
    const validFiles = selectedFiles.filter(file => {
      if (file.type !== 'application/pdf') {
        setError('Only PDF files are allowed');
        return false;
      }
        if (file.size > 100 * 1024 * 1024) {
          setError('Each file must be less than 100MB');
          // Show toast or notification here
          if (typeof window !== 'undefined') {
            window.alert('File size exceeds 100MB. Please try a smaller file or use "Put Later" option.');
          }
          return false;
        }
      return true;
    });

    if (validFiles.length > 0) {
      const newFiles = validFiles.map(file => ({
        file,
        id: Math.random().toString(36).substr(2, 9)
      }));
      setFiles(prev => [...prev, ...newFiles]);
      setError(null);
      setMerged(false);
      setPdfUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    const dataTransfer = new DataTransfer();
    droppedFiles.forEach(file => dataTransfer.items.add(file));
    
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      handleFileSelect({ target: { files: dataTransfer.files } } as any);
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === files.length - 1)
    ) {
      return;
    }

    const newFiles = [...files];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]];
    setFiles(newFiles);
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      setError('Please select at least 2 PDF files to merge');
      return;
    }

    setMerging(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      
      // Create a new PDF document
      const mergedPdf = await PDFDocument.create();

      // Load and copy pages from each PDF
      for (const { file } of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      // Save the merged PDF
      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setMerged(true);
    } catch (err: any) {
      setError(err.message || 'Merge failed. Please try again.');
      console.error(err);
    } finally {
      setMerging(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'merged.pdf';
      link.click();
    }
  };

  const resetConverter = () => {
    setFiles([]);
    setMerged(false);
    setError(null);
    setPdfUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8">
          {files.length === 0 && !merged && (
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-emerald-500 transition-colors cursor-pointer"
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold text-black mb-2">
                Select PDF Files
              </h3>
              <p className="text-gray-600 mb-4">
                or drag and drop multiple files here
              </p>
              <Button size="lg" className="px-8 bg-emerald-500 hover:bg-emerald-600">
                Choose Files
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                PDF files only • Maximum file size: 100MB per file
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          )}

          {files.length > 0 && !merged && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  {files.length} PDF{files.length !== 1 ? 's' : ''} selected
                </h3>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="sm"
                >
                  Add More
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {files.map((pdfFile, index) => (
                  <div
                    key={pdfFile.id}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => moveFile(index, 'up')}
                        disabled={index === 0}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveFile(index, 'down')}
                        disabled={index === files.length - 1}
                        className="text-gray-400 hover:text-gray-600 disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                    <GripVertical className="h-5 w-5 text-gray-400" />
                    <FileText className="h-8 w-8 text-red-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">
                        {pdfFile.file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(pdfFile.id)}
                      className="text-gray-500 hover:text-red-600 flex-shrink-0"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={mergePdfs}
                disabled={merging || files.length < 2}
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {merging ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Merging PDFs...
                  </>
                ) : (
                  `Merge ${files.length} PDF${files.length !== 1 ? 's' : ''}`
                )}
              </Button>
            </div>
          )}

          {merged && (
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-2">
                  Merge Complete!
                </h3>
                <p className="text-gray-600">
                  Your PDFs have been merged successfully
                </p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={downloadPdf}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Merged PDF
                </Button>
                <Button
                  onClick={resetConverter}
                  variant="outline"
                  size="lg"
                >
                  Merge More
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
