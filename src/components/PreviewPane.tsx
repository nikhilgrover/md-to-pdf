import React, { useState, useRef } from 'react';
import { EditorSettings } from '../types';
import { downloadPdfFile, generatePdfBlob } from '../utils/pdfDownloader';
import { 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check, 
  Printer, 
  Download, 
  Loader2, 
  FileText
} from 'lucide-react';

interface PreviewPaneProps {
  htmlContent: string;
  settings: EditorSettings;
  documentTitle: string;
  onPrintPdf: () => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  htmlContent,
  settings,
  documentTitle,
  onPrintPdf,
}) => {
  const [zoom, setZoom] = useState<number>(100);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewTab, setViewTab] = useState<'sheets' | 'pdf'>('sheets');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isCompilingPdf, setIsCompilingPdf] = useState(false);

  const printableRef = useRef<HTMLDivElement>(null);

  // Numeric margin calculation for html2pdf
  const getMarginMm = (): number => {
    switch (settings.margin) {
      case 'compact':
        return 10;
      case 'spacious':
        return 25;
      case 'custom':
        return settings.customMarginMm;
      case 'standard':
      default:
        return 16;
    }
  };

  const marginMm = getMarginMm();
  const marginCssValue = `${marginMm}mm`;

  // Font family mapping
  const getFontFamily = () => {
    switch (settings.font) {
      case 'plus-jakarta':
        return "'Plus Jakarta Sans', sans-serif";
      case 'merriweather':
        return "'Merriweather', serif";
      case 'lora':
        return "'Lora', serif";
      case 'jetbrains-mono':
        return "'JetBrains Mono', monospace";
      case 'space-grotesk':
        return "'Space Grotesk', sans-serif";
      case 'inter':
      default:
        return "'Inter', -apple-system, BlinkMacSystemFont, sans-serif";
    }
  };

  // Line height mapping
  const getLineHeight = () => {
    switch (settings.lineHeight) {
      case 'tight':
        return '1.3';
      case 'relaxed':
        return '1.65';
      case 'normal':
      default:
        return '1.45';
    }
  };

  const handleCopyHtml = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Direct PDF Download Handler
  const handleDownloadPdf = async () => {
    if (!printableRef.current || isDownloading) return;

    setIsDownloading(true);
    try {
      await downloadPdfFile(printableRef.current, {
        filename: documentTitle || 'document',
        pageSize: settings.pageSize,
        marginMm: marginMm,
      });
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Compile PDF for embedded viewer
  const handleTogglePdfView = async () => {
    if (viewTab === 'sheets') {
      if (!printableRef.current) return;
      setIsCompilingPdf(true);
      try {
        const blob = await generatePdfBlob(printableRef.current, {
          filename: documentTitle || 'document',
          pageSize: settings.pageSize,
          marginMm: marginMm,
        });
        if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
        const url = URL.createObjectURL(blob);
        setPdfBlobUrl(url);
        setViewTab('pdf');
      } catch (err) {
        console.error('Error generating PDF preview:', err);
        setViewTab('sheets');
      } finally {
        setIsCompilingPdf(false);
      }
    } else {
      setViewTab('sheets');
    }
  };

  const isLetter = settings.pageSize === 'letter';
  const paperWidthClass = isLetter ? 'w-[8.5in]' : 'w-[210mm]';
  const paperMinHeightClass = isLetter ? 'min-h-[11in]' : 'min-h-[297mm]';

  // Split content by explicit pagebreak marker to show distinct page sheets
  const pageBreakDelimiter = '<div class="print-page-break" data-break="page"></div>';
  const pageChunks = htmlContent.split(pageBreakDelimiter);
  const totalPages = Math.max(1, pageChunks.length);

  return (
    <div className="h-full flex flex-col bg-zinc-900/60 overflow-hidden relative">
      {/* Top Preview Controls Bar */}
      <div className="no-print h-12 border-b border-zinc-800 bg-zinc-950/90 px-4 flex items-center justify-between text-xs select-none z-10 gap-2">
        <div className="flex items-center gap-2 text-zinc-400 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-zinc-100">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">PDF Preview</span>
          </div>
          <span>•</span>
          <span className="font-mono text-[10px] uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
            {isLetter ? 'US Letter' : 'A4'}
          </span>
          <span className="font-mono text-[10px] text-zinc-400 hidden md:inline">
            {totalPages} {totalPages === 1 ? 'Page' : 'Pages'}
          </span>
        </div>

        {/* View Mode Toggle: Visual Sheets vs Native PDF Reader */}
        <div className="hidden lg:flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-[11px]">
          <button
            onClick={() => setViewTab('sheets')}
            className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
              viewTab === 'sheets'
                ? 'bg-zinc-800 text-amber-400 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Live Sheets
          </button>
          <button
            onClick={handleTogglePdfView}
            disabled={isCompilingPdf}
            className={`px-2.5 py-1 rounded flex items-center gap-1 transition-colors cursor-pointer ${
              viewTab === 'pdf'
                ? 'bg-zinc-800 text-amber-400 font-bold shadow'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {isCompilingPdf ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
            <span>Compiled PDF</span>
          </button>
        </div>

        {/* Zoom & Action Controls */}
        <div className="flex items-center gap-1.5">
          {/* Zoom controls */}
          {viewTab === 'sheets' && (
            <div className="hidden sm:flex items-center bg-zinc-900 rounded border border-zinc-800 p-0.5 text-zinc-400">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="p-1 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                title="Zoom out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1.5 min-w-[38px] text-center text-zinc-300">
                {zoom}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(150, z + 10))}
                className="p-1 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
                title="Zoom in"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setZoom(100)}
                className="p-1 hover:text-white rounded hover:bg-zinc-800 text-[10px] font-mono px-1 cursor-pointer"
                title="Reset Zoom to 100%"
              >
                100%
              </button>
            </div>
          )}

          <button
            onClick={handleCopyHtml}
            className="hidden xl:flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
            title="Copy compiled HTML to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'HTML'}</span>
          </button>

          <button
            onClick={onPrintPdf}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            title="Print or Save via Browser (Cmd+P)"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Print</span>
          </button>

          {/* Direct Download PDF Button */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
            title="Download PDF file directly"
          >
            {isDownloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-zinc-950/70">
        {viewTab === 'pdf' && pdfBlobUrl ? (
          /* Embedded Native PDF Viewer */
          <div className="w-full h-full max-w-5xl rounded-xl overflow-hidden border border-zinc-800 shadow-2xl bg-zinc-900">
            <iframe
              src={`${pdfBlobUrl}#toolbar=1&navpanes=1`}
              className="w-full h-full border-none"
              title="Compiled PDF Document"
            />
          </div>
        ) : (
          /* Visual Paginated Sheets View */
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
            className="transition-all"
          >
            {/* The root container captured for PDF export and printing */}
            <div
              id="printable-root"
              ref={printableRef}
              style={{
                ['--doc-font' as string]: getFontFamily(),
                ['--doc-size' as string]: settings.fontSize,
                ['--doc-line-height' as string]: getLineHeight(),
                ['--doc-margin' as string]: marginCssValue,
                ['--accent-color' as string]: settings.accentColor,
              }}
              className="flex flex-col gap-8 print:gap-0 print:block"
            >
              {pageChunks.map((chunkHtml, pageIndex) => (
                <div key={pageIndex} className="flex flex-col items-center">
                  {/* Page Sheet Banner for On-Screen Multi-Page Perception */}
                  {totalPages > 1 && (
                    <div className="no-print mb-2 text-[10px] font-mono uppercase text-zinc-500 font-semibold flex items-center gap-2">
                      <span>PAGE {pageIndex + 1} OF {totalPages}</span>
                    </div>
                  )}

                  {/* Individual Paper Sheet */}
                  <div
                    style={{
                      padding: marginCssValue,
                      fontFamily: getFontFamily(),
                      fontSize: settings.fontSize,
                      lineHeight: getLineHeight(),
                    }}
                    className={`${paperWidthClass} ${paperMinHeightClass} bg-white text-zinc-900 shadow-2xl rounded-sm print:shadow-none print:m-0 print:w-full print:min-h-0 relative transition-all border border-zinc-200 print:border-none print:page-break-after-always`}
                  >
                    {/* Header on Page 1 or all pages */}
                    {settings.showHeader && settings.headerText && (
                      <div className="pb-3 mb-4 border-b border-zinc-300 flex justify-between items-center text-[9pt] font-mono text-zinc-500 select-none">
                        <span>{settings.headerText}</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Rendered HTML for this page */}
                    <div
                      className="markdown-body"
                      dangerouslySetInnerHTML={{ __html: chunkHtml }}
                    />

                    {/* Footer / Page Numbers */}
                    {settings.showPageNumbers && (
                      <div className="mt-8 pt-3 border-t border-zinc-200 flex justify-between items-center text-[8pt] font-mono text-zinc-400 select-none">
                        <span>{documentTitle}</span>
                        <span>Page {pageIndex + 1} of {totalPages}</span>
                      </div>
                    )}
                  </div>

                  {/* Print Page Break Divider between pages */}
                  {pageIndex < pageChunks.length - 1 && (
                    <div className="print-page-break" style={{ pageBreakAfter: 'always', breakAfter: 'page', height: 0 }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
