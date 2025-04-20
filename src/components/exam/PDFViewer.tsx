import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Box, IconButton, Typography } from '@mui/material';
import { ZoomIn, ZoomOut } from '@mui/icons-material';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  url?: string;
  page?: number;
}

export const PDFViewer = ({ url, page = 1 }: PDFViewerProps) => {
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState<number | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  if (!url) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Typography>No PDF available for this question</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <IconButton onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}>
          <ZoomOut />
        </IconButton>
        <IconButton onClick={() => setScale((s) => Math.min(2, s + 0.1))}>
          <ZoomIn />
        </IconButton>
      </Box>
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={page}
          scale={scale}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      {numPages && (
        <Typography align="center" sx={{ mt: 1 }}>
          Page {page} of {numPages}
        </Typography>
      )}
    </Box>
  );
};