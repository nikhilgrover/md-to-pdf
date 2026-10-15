import React, { useRef } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  Upload, 
  Settings2, 
  LayoutTemplate, 
  Scissors, 
  Eye, 
  Edit3, 
  Columns,
  Loader2
} from 'lucide-react';

interface NavbarProps {
  documentTitle: string;
  onTitleChange: (title: string) => void;
  stats: { words: number; chars: number; lines: number; estimatedPages: number };
  viewMode: 'split' | 'editor' | 'preview';
  onViewModeChange: (mode: 'split' | 'editor' | 'preview') => void;
  onOpenTemplates: () => void;
  onOpenSettings: () => void;
  onInsertPageBreak: () => void;
  onExportMarkdown: () => void;
  onImportMarkdown: (content: string, filename: string) => void;
  onPrintPdf: () => void;
  onDownloadPdf: () => void;
  isDownloadingPdf?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  documentTitle,
  onTitleChange,
  stats,
  viewMode,
  onViewModeChange,
  onOpenTemplates,
  onOpenSettings,
  onInsertPageBreak,
  onExportMarkdown,
  onImportMarkdown,
  onPrintPdf,
  onDownloadPdf,
  isDownloadingPdf = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onImportMarkdown(content, file.name.replace(/\.[^/.]+$/, ''));
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <header className="no-print h-16 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-4 flex items-center justify-between gap-3 select-none z-30 sticky top-0">
      {/* Brand & Document Name */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-zinc-950 font-black flex items-center justify-center font-mono text-sm shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <FileText className="w-5 h-5 text-zinc-950" />
          </div>
          <div className="hidden sm:block">
            <span className="font-extrabold text-sm text-white tracking-tight leading-none block">
              DocuCraft <span className="text-amber-400 font-mono text-xs">PDF</span>
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">Markdown to PDF Studio</span>
          </div>
        </div>

        <div className="h-6 w-px bg-zinc-800 mx-1 hidden sm:block" />

        {/* Editable Document Title */}
        <div className="relative group max-w-[180px] sm:max-w-[260px]">
          <input
            type="text"
            value={documentTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            className="bg-zinc-900/80 hover:bg-zinc-900 focus:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 focus:border-amber-400/80 rounded-lg px-2.5 py-1 text-xs font-semibold text-zinc-100 focus:outline-none transition-all w-full truncate"
            title="Click to rename document"
            placeholder="Document Title"
          />
        </div>

        {/* Stats Pill */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800/80 text-[11px] font-mono text-zinc-400">
          <span>{stats.words} words</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">~{stats.estimatedPages} pg</span>
        </div>
      </div>

      {/* View Mode Switcher */}
      <div className="hidden md:flex items-center bg-zinc-900 p-0.5 rounded-lg border border-zinc-800 text-xs font-medium">
        <button
          onClick={() => onViewModeChange('editor')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            viewMode === 'editor'
              ? 'bg-zinc-800 text-amber-400 shadow font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Editor Only"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Editor</span>
        </button>

        <button
          onClick={() => onViewModeChange('split')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            viewMode === 'split'
              ? 'bg-zinc-800 text-amber-400 shadow font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="Split Screen (Editor Left | PDF Right)"
        >
          <Columns className="w-3.5 h-3.5" />
          <span>Editor &amp; PDF</span>
        </button>

        <button
          onClick={() => onViewModeChange('preview')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all cursor-pointer ${
            viewMode === 'preview'
              ? 'bg-zinc-800 text-amber-400 shadow font-bold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
          title="PDF Preview Only"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>PDF Preview</span>
        </button>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        {/* Templates Button */}
        <button
          onClick={onOpenTemplates}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-semibold transition-all hover:border-zinc-700 cursor-pointer"
          title="Browse Resume & Spec Templates"
        >
          <LayoutTemplate className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Templates</span>
        </button>

        {/* Insert Page Break */}
        <button
          onClick={onInsertPageBreak}
          className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-mono transition-all cursor-pointer"
          title="Insert Page Break (breaks to next PDF sheet)"
        >
          <Scissors className="w-3.5 h-3.5 text-amber-400" />
          <span>+ PageBreak</span>
        </button>

        {/* Page & Style Settings */}
        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer"
          title="PDF Typography & Margins Settings"
        >
          <Settings2 className="w-4 h-4" />
        </button>

        {/* File Import / Export hidden input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".md,.markdown,.txt"
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer"
          title="Import Markdown file"
        >
          <Upload className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden md:inline">Import</span>
        </button>

        <button
          onClick={onExportMarkdown}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white text-xs transition-colors cursor-pointer"
          title="Download Markdown source (.md)"
        >
          <Download className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden md:inline">.md</span>
        </button>

        {/* Browser Print / Vector Option */}
        <button
          onClick={onPrintPdf}
          className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
          title="Browser Vector Print (Cmd+P)"
        >
          <Printer className="w-3.5 h-3.5 text-amber-400" />
          <span>Print</span>
        </button>

        {/* Primary Action: Direct Download PDF */}
        <button
          onClick={onDownloadPdf}
          disabled={isDownloadingPdf}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-black text-xs shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all hover:scale-[1.02] cursor-pointer disabled:opacity-50"
          title="Download PDF file directly to your computer"
        >
          {isDownloadingPdf ? (
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
    </header>
  );
};
