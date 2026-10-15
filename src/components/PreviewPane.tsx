import React, { useState } from 'react';
import { EditorSettings } from '../types';
import { 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check, 
  Printer
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

  const isLetter = settings.pageSize === 'letter';
  const paperWidthClass = isLetter ? 'w-[8.5in]' : 'w-[210mm]';
  const paperMinHeightClass = isLetter ? 'min-h-[11in]' : 'min-h-[297mm]';

  const marginValue = getMarginStyle();

  return (
    <div className="h-full flex flex-col bg-zinc-900/60 overflow-hidden relative">
      {/* Top Preview Controls Bar */}
      <div className="no-print h-10 border-b border-zinc-800 bg-zinc-950/80 px-4 flex items-center justify-between text-xs select-none z-10">
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="font-semibold text-zinc-200">Print Preview</span>
          <span>•</span>
          <span className="font-mono text-[11px] uppercase bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-300">
            {settings.pageSize === 'letter' ? 'US Letter (8.5×11")' : 'ISO A4 (210×297mm)'}
          </span>
          <span className="font-mono text-[11px] text-zinc-500">
            {settings.fontSize} • {settings.font}
          </span>
        </div>

        {/* Zoom & Quick Actions */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center bg-zinc-900 rounded border border-zinc-800 p-0.5 text-zinc-400">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="p-1 hover:text-white rounded hover:bg-zinc-800 cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1.5 min-w-[42px] text-center text-zinc-300">
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
              Reset
            </button>
          </div>

          <button
            onClick={handleCopyHtml}
            className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-[11px] transition-colors cursor-pointer"
            title="Copy compiled HTML to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'HTML'}</span>
          </button>

          <button
            onClick={onPrintPdf}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-[11px] transition-all shadow-sm cursor-pointer"
            title="Print to PDF (Cmd+P)"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print PDF</span>
          </button>
        </div>
      </div>

      {/* Canvas Area with Centered Paper */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center bg-zinc-950/70">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out',
          }}
          className="transition-all"
        >
          {/* Simulated Printed Paper Container */}
          <div
            id="printable-root"
            style={{
              ['--doc-font' as string]: getFontFamily(),
              ['--doc-size' as string]: settings.fontSize,
              ['--doc-line-height' as string]: getLineHeight(),
              ['--doc-margin' as string]: marginValue,
              ['--accent-color' as string]: settings.accentColor,
              padding: marginValue,
            }}
            className={`${paperWidthClass} ${paperMinHeightClass} bg-white text-zinc-900 shadow-2xl rounded-sm print:shadow-none print:m-0 print:w-full relative transition-all`}
          >
            {/* Optional Header */}
            {settings.showHeader && settings.headerText && (
              <div className="pb-3 mb-4 border-b border-zinc-300 flex justify-between items-center text-[9pt] font-mono text-zinc-500">
                <span>{settings.headerText}</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            )}

            {/* Rendered Markdown Body */}
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Optional Footer */}
            {settings.showPageNumbers && (
              <div className="mt-8 pt-3 border-t border-zinc-200 flex justify-between items-center text-[8pt] font-mono text-zinc-400">
                <span>{documentTitle}</span>
                <span>DocuCraft PDF Studio</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
