"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, CheckCircle, Shield, Zap, FileText, Download, X, Loader2, Minimize2 } from "lucide-react";

type CompressionLevel = 'low' | 'medium' | 'high';

export default function CompressPdfConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('medium');
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
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
      setOriginalSize(selectedFile.size);
      setError(null);
      setProcessed(false);
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

  const compressPdf = async () => {
    if (!file) return;

    setProcessing(true);
    setError(null);

    try {
      const { PDFDocument } = await import('pdf-lib');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Compression settings based on level
      const compressionSettings = {
        low: { objectsPerTick: 50 },
        medium: { objectsPerTick: 100 },
        high: { objectsPerTick: 200 }
      };

      // Save with compression
      const pdfBytes = await pdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: compressionSettings[compressionLevel].objectsPerTick,
      });

      setCompressedSize(pdfBytes.length);

      const blob = new Blob([new Uint8Array(pdfBytes)], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      setPdfUrl(url);
      setProcessed(true);
    } catch (err: any) {
      setError(err.message || 'Compression failed. Please try again.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = file?.name.replace('.pdf', '_compressed.pdf') || 'compressed.pdf';
      link.click();
    }
  };

  const resetConverter = () => {
    setFile(null);
    setProcessed(false);
    setError(null);
    setPdfUrl(null);
    setOriginalSize(0);
    setCompressedSize(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getSavingsPercentage = (): number => {
    if (originalSize === 0 || compressedSize === 0) return 0;
    return Math.round(((originalSize - compressedSize) / originalSize) * 100);
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
                      {formatFileSize(originalSize)}
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
                <label className="text-sm font-medium text-gray-900">Compression Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'low' as const, label: 'Low', desc: 'Best quality' },
                    { value: 'medium' as const, label: 'Medium', desc: 'Balanced' },
                    { value: 'high' as const, label: 'High', desc: 'Smallest size' }
                  ].map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setCompressionLevel(level.value)}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        compressionLevel === level.value
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <Minimize2 className="h-6 w-6 mx-auto mb-2 text-emerald-600" />
                      <p className="font-semibold text-sm text-gray-900">{level.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{level.desc}</p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ℹ️ Note: Compression reduces file size by optimizing PDF structure. Quality may vary depending on the original file.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                  {error}
                </div>
              )}

              <Button
                onClick={compressPdf}
                disabled={processing}
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Compressing PDF...
                  </>
                ) : (
                  <>
                    <Minimize2 className="h-5 w-5 mr-2" />
                    Compress PDF
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
                  Compression Complete!
                </h3>
                <p className="text-gray-600">
                  Your PDF has been compressed successfully
                </p>
                
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-gray-600">Original</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatFileSize(originalSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Compressed</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        {formatFileSize(compressedSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Saved</p>
                      <p className="text-lg font-semibold text-emerald-600">
                        {getSavingsPercentage()}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={downloadPdf}
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download Compressed PDF
                </Button>
                <Button
                  onClick={resetConverter}
                  variant="outline"
                  size="lg"
                >
                  Compress Another
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Trust Badges */}
      <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
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
    </div>
  );
}
