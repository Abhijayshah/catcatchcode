import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useUser } from '../context/UserContext';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

// Set worker manually to avoid version mismatch issues
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const WatermarkedPDFViewer = ({ url }) => {
  const { user } = useUser();
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center bg-gray-100 dark:bg-gray-900 overflow-y-auto p-4 select-none" onContextMenu={(e) => e.preventDefault()}>
      
      {/* Watermark Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none flex flex-col justify-center items-center opacity-10 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="transform -rotate-45 text-4xl font-bold text-gray-500 whitespace-nowrap my-20">
            {user?.email || 'CatCatchCode User'} - {user?._id || 'ID'}
          </div>
        ))}
      </div>

      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
        className="shadow-lg"
        loading={<div className="text-center p-4">Loading PDF...</div>}
      >
        <Page 
          pageNumber={pageNumber} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          width={Math.min(window.innerWidth * 0.8, 800)} 
        />
      </Document>

      {/* Navigation Controls */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-lg flex items-center gap-4 z-50">
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(prev => prev - 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm font-medium">
          Page {pageNumber} of {numPages}
        </span>
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(prev => prev + 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WatermarkedPDFViewer;
