import React from "react";

export default function FAQ() {
  return (
    <section className="py-8 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        <details className="bg-white rounded-lg shadow p-4">
          <summary className="font-semibold cursor-pointer">How do I use this PDF tool?</summary>
          <p className="mt-2 text-gray-700">Simply upload your PDF, select the desired action, and follow the on-screen instructions to process your file.</p>
        </details>
        <details className="bg-white rounded-lg shadow p-4">
          <summary className="font-semibold cursor-pointer">Are my files safe?</summary>
          <p className="mt-2 text-gray-700">Yes, your files are processed securely in your browser and are never stored on our servers.</p>
        </details>
        <details className="bg-white rounded-lg shadow p-4">
          <summary className="font-semibold cursor-pointer">Is this service free?</summary>
          <p className="mt-2 text-gray-700">Yes, all features are 100% free to use with no hidden charges.</p>
        </details>
        <details className="bg-white rounded-lg shadow p-4">
          <summary className="font-semibold cursor-pointer">What file types are supported?</summary>
          <p className="mt-2 text-gray-700">Currently, only PDF files are supported for upload and processing.</p>
        </details>
      </div>
    </section>
  );
}
