import html2pdf from 'html2pdf.js';

interface PdfExportOptions {
  filename: string;
  pageSize: 'letter' | 'a4';
  marginMm: number;
}

export async function downloadPdfFile(element: HTMLElement, options: PdfExportOptions): Promise<void> {
  const cleanFilename = options.filename.replace(/[^a-z0-9_-]/gi, '_') || 'document';
  const finalFilename = cleanFilename.endsWith('.pdf') ? cleanFilename : `${cleanFilename}.pdf`;

  const marginTuple: [number, number, number, number] = [
    options.marginMm,
    options.marginMm,
    options.marginMm,
    options.marginMm,
  ];

  const opt = {
    margin: marginTuple,
    filename: finalFilename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      logging: false,
    },
    jsPDF: { 
      unit: 'mm', 
      format: options.pageSize === 'letter' ? 'letter' : 'a4', 
      orientation: 'portrait' as const
    },
    pagebreak: { 
      mode: ['css', 'legacy'] 
    },
  };

  try {
    await html2pdf().set(opt).from(element).save();
  } catch (error) {
    console.error('Error in html2pdf download:', error);
    // Fallback to browser print if client-side canvas has an issue
    window.print();
  }
}

export async function generatePdfBlob(element: HTMLElement, options: PdfExportOptions): Promise<Blob> {
  const marginTuple: [number, number, number, number] = [
    options.marginMm,
    options.marginMm,
    options.marginMm,
    options.marginMm,
  ];

  const opt = {
    margin: marginTuple,
    filename: options.filename,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2, 
      useCORS: true, 
      letterRendering: true,
      logging: false,
    },
    jsPDF: { 
      unit: 'mm', 
      format: options.pageSize === 'letter' ? 'letter' : 'a4', 
      orientation: 'portrait' as const
    },
    pagebreak: { 
      mode: ['css', 'legacy'] 
    },
  };

  const worker = html2pdf().set(opt).from(element);
  const pdfBlob = await worker.outputPdf('blob');
  return pdfBlob as Blob;
}
