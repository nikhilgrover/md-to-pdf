import React, { useState, useRef, useEffect } from 'react';
import { EditorSettings } from '../types';
import { fetchPdfBlobUrl } from '../utils/pdfExport';
import { 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check, 
  FileText,
  Loader2,
  Maximize2
} from 'lucide-react';

interface PreviewPaneProps {
  htmlContent: string;
  markdown: string;
  settings: EditorSettings;
  documentTitle: string;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({
  htmlContent,
  markdown,
  settings,
  documentTitle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [copied, setCopied] = useState(false);
  const [viewTab, setViewTab] = useState<'sheets' | 'pdf'>('sheets');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);
  const [isCompilingPdf, setIsCompilingPdf] = useState(false);

  // Auto-fit zoom on container resize
  const fitToWidth = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.clientWidth - 48; // padding
    const paperWidth = settings.pageSize === 'letter' ? 816 : 794; // approx px at 96dpi
    const optimalZoom = Math.min(100, Math.max(50, Math.floor((containerWidth / paperWidth) * 100)));
    setZoom(optimalZoom);
  };

  useEffect(() => {
    // Initial auto-fit
    fitToWidth();

    const handleResize = () => {
      // only auto-fit if window resized significantly
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [settings.pageSize]);

  // Margin calculation
  const getMarginStyle = () => {
    switch (settings.margin) {
      case 'compact':
        return '10mm';
      case 'spacious':
        return '25mm';
      case 'custom':
        return `${settings.customMarginMm}mm`;
      case 'standard':
      default:
        return '16mm';
    }
  };

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

  // Toggle between real-time HTML sheets and compiled PDF reader iframe
  const handleTogglePdfView = async () => {
    if (viewTab === 'sheets') {
      setIsCompilingPdf(true);
      try {
        const url = await fetchPdfBlobUrl({
          markdown,
          settings,
          documentTitle,
        });
        if (url) {
          if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
          setPdfBlobUrl(url);
          setViewTab('pdf');
        } else {
          setViewTab('sheets');
        }
      } catch (err) {
        console.error('Error compiling PDF preview:', err);
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
  const marginCssValue = getMarginStyle();

  // Split content by explicit pagebreak marker to show distinct paper sheets
  const pageBreakDelimiter = '<div class="print-page-break" data-break="page"></div>';
  const pageChunks = htmlContent.split(pageBreakDelimiter);
  const totalPages = Math.max(1, pageChunks.length);

  return (
    <div className="h-full flex flex-col bg-zinc-900/60 overflow-hidden relative">
      {/* Top Preview Controls Bar (Clean & Non-Duplicate) */}
      <div className="no-print h-12 border-b border-zinc-800 bg-zinc-950/90 px-4 flex items-center justify-between text-xs select-none z-10 gap-2 shrink-0">
        <div className="flex items-center gap-2 text-zinc-400 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-zinc-100">
            <FileText className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">PDF Preview</span>
          </div>
          <span>•</span>
          <span className="font-mono text-[10px] uppercase bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-zinc-300">
            {isLetter ? 'US Letter' : 'A4'}
          </span>
          <span className="font-mono text-[10px] text-zinc-400">
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

        {/* Zoom & Utility Actions */}
        <div className="flex items-center gap-1.5">
          {viewTab === 'sheets' && (
            <div className="flex items-center bg-zinc-900 rounded border border-zinc-800 p-0.5 text-zinc-400">
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
                onClick={fitToWidth}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono hover:text-white hover:bg-zinc-800 cursor-pointer border-l border-zinc-800"
                title="Fit to Container Width"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Fit</span>
              </button>
            </div>
          )}

          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
            title="Copy compiled HTML to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied' : 'HTML'}</span>
          </button>
        </div>
      </div>

      {/* Main Preview Scroll Canvas */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto p-4 sm:p-8 flex justify-start sm:justify-center items-start bg-zinc-950/70"
      >
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
          /* Visual Paginated Sheets View (Never clipped on left!) */
          <div className="m-auto flex flex-col items-center">
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
                      <div className="page-banner no-print mb-2 text-[10px] font-mono uppercase text-zinc-500 font-semibold flex items-center gap-2 select-none">
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
                      className={`pdf-paper-sheet ${paperWidthClass} ${paperMinHeightClass} bg-white text-zinc-900 shadow-2xl rounded-sm print:shadow-none print:m-0 print:w-full print:min-h-0 relative transition-all border border-zinc-200 print:border-none`}
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
          </div>
        )}
      </div>
    </div>
  );
};
