import React, { useState, useEffect, useMemo } from 'react';
import { TEMPLATES } from './templates/templates';
import { EditorSettings, DocumentTemplate } from './types';
import { parseMarkdownToHtml, getMarkdownStats } from './utils/markdown';
import { Navbar } from './components/Navbar';
import { EditorPane } from './components/EditorPane';
import { PreviewPane } from './components/PreviewPane';
import { SettingsDrawer } from './components/SettingsDrawer';
import { TemplatesModal } from './components/TemplatesModal';

const DEFAULT_SETTINGS: EditorSettings = {
  pageSize: 'letter',
  margin: 'compact',
  customMarginMm: 12,
  font: 'inter',
  fontSize: '10pt',
  lineHeight: 'tight',
  themeStyle: 'modern',
  accentColor: '#d97706',
  showPageNumbers: false,
  showHeader: false,
  headerText: 'Nikhil Grover — Resume',
};

const STORAGE_KEY_MD = 'docucraft_markdown_content';
const STORAGE_KEY_TITLE = 'docucraft_document_title';
const STORAGE_KEY_SETTINGS = 'docucraft_editor_settings';

export const App: React.FC = () => {
  // Initialize state with LocalStorage or default template
  const [markdown, setMarkdown] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MD);
    return saved !== null ? saved : TEMPLATES[0].markdown;
  });

  const [documentTitle, setDocumentTitle] = useState<string>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_TITLE);
    return saved !== null ? saved : 'Nikhil Grover — Resume';
  });

  const [settings, setSettings] = useState<EditorSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
    if (saved) {
      try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      } catch (e) {
        console.error('Failed to parse settings:', e);
      }
    }
    return { ...DEFAULT_SETTINGS, ...TEMPLATES[0].defaultSettings };
  });

  const [viewMode, setViewMode] = useState<'split' | 'editor' | 'preview'>('split');
  const [isTemplatesOpen, setIsTemplatesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Auto-save to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_MD, markdown);
  }, [markdown]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_TITLE, documentTitle);
  }, [documentTitle]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Update dynamic window title for print PDF filename
  useEffect(() => {
    document.title = documentTitle ? `${documentTitle} — DocuCraft PDF` : 'DocuCraft PDF';
  }, [documentTitle]);

  // Parse markdown to HTML
  const htmlContent = useMemo(() => {
    return parseMarkdownToHtml(markdown);
  }, [markdown]);

  // Compute word and page statistics
  const stats = useMemo(() => {
    return getMarkdownStats(markdown);
  }, [markdown]);

  // Insert page break shortcut
  const handleInsertPageBreak = () => {
    setMarkdown((prev) => `${prev.trimEnd()}\n\n<!-- pagebreak -->\n\n`);
  };

  // Trigger vector print dialog
  const handlePrintPdf = () => {
    window.print();
  };

  // Export current markdown file
  const handleExportMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle.replace(/[^a-z0-9_-]/gi, '_') || 'document'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Import external markdown
  const handleImportMarkdown = (content: string, filename: string) => {
    setMarkdown(content);
    if (filename) {
      setDocumentTitle(filename);
    }
  };

  // Apply selected template
  const handleSelectTemplate = (template: DocumentTemplate) => {
    setMarkdown(template.markdown);
    setDocumentTitle(template.title);
    setSettings((prev) => ({
      ...prev,
      ...template.defaultSettings,
    }));
  };

  const handleUpdateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-zinc-950 text-zinc-100 font-sans">
      {/* Top Navigation */}
      <Navbar
        documentTitle={documentTitle}
        onTitleChange={setDocumentTitle}
        stats={stats}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onOpenTemplates={() => setIsTemplatesOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onInsertPageBreak={handleInsertPageBreak}
        onExportMarkdown={handleExportMarkdown}
        onImportMarkdown={handleImportMarkdown}
        onPrintPdf={handlePrintPdf}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor Pane (Left) */}
        {(viewMode === 'split' || viewMode === 'editor') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full transition-all`}>
            <EditorPane
              value={markdown}
              onChange={setMarkdown}
              onInsertText={(prefix, suffix, defaultText) => {
                setMarkdown((prev) => `${prev}${prefix}${defaultText || ''}${suffix || ''}`);
              }}
              onPrintPdf={handlePrintPdf}
            />
          </div>
        )}

        {/* Live Preview Pane (Right) */}
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div className={`${viewMode === 'split' ? 'w-1/2' : 'w-full'} h-full transition-all`}>
            <PreviewPane
              htmlContent={htmlContent}
              settings={settings}
              documentTitle={documentTitle}
              onPrintPdf={handlePrintPdf}
            />
          </div>
        )}
      </main>

      {/* Slide-out Settings Drawer */}
      <SettingsDrawer
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onUpdateSettings={handleUpdateSettings}
        onResetSettings={handleResetSettings}
      />

      {/* Preset Templates Gallery Modal */}
      <TemplatesModal
        isOpen={isTemplatesOpen}
        onClose={() => setIsTemplatesOpen(false)}
        onSelectTemplate={handleSelectTemplate}
      />
    </div>
  );
};
