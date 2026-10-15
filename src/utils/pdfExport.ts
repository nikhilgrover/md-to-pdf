import { EditorSettings } from '../types';

interface DownloadPdfParams {
  markdown: string;
  settings: EditorSettings;
  documentTitle: string;
}

/**
 * Downloads PDF using server-side Puppeteer API when running Vite dev,
 * or gracefully triggers native browser print with isolated PDF styling.
 */
export async function downloadPdf({
  markdown,
  settings,
  documentTitle,
}: DownloadPdfParams): Promise<void> {
  const cleanTitle = (documentTitle || 'document').replace(/[^a-z0-9_-]/gi, '_');
  const filename = cleanTitle.endsWith('.pdf') ? cleanTitle : `${cleanTitle}.pdf`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdown,
        settings,
        documentTitle: cleanTitle,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      return;
    }
  } catch (error) {
    console.warn('Backend PDF generator not responding, falling back to browser print:', error);
  }

  // Fallback to browser print with isolated print stylesheet
  window.print();
}

/**
 * Compiles markdown into a PDF Blob for preview inside an iframe
 */
export async function fetchPdfBlobUrl({
  markdown,
  settings,
  documentTitle,
}: DownloadPdfParams): Promise<string | null> {
  try {
    const response = await fetch('/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        markdown,
        settings,
        documentTitle: documentTitle || 'document',
      }),
    });

    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }
  } catch (err) {
    console.error('Failed to compile PDF blob:', err);
  }
  return null;
}
