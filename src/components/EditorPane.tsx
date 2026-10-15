import React, { useRef } from 'react';
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  CheckSquare, 
  Quote, 
  Code, 
  Table, 
  Link, 
  Scissors
} from 'lucide-react';

interface EditorPaneProps {
  value: string;
  onChange: (val: string) => void;
  onInsertText: (prefix: string, suffix?: string, defaultText?: string) => void;
  onPrintPdf: () => void;
}

export const EditorPane: React.FC<EditorPaneProps> = ({
  value,
  onChange,
  onPrintPdf,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Tab key inserts 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      onChange(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
      return;
    }

    // Ctrl/Cmd + B for Bold
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
      e.preventDefault();
      wrapSelection('**', '**', 'bold text');
      return;
    }

    // Ctrl/Cmd + I for Italic
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'i') {
      e.preventDefault();
      wrapSelection('*', '*', 'italic text');
      return;
    }

    // Ctrl/Cmd + P for Print/PDF
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p') {
      e.preventDefault();
      onPrintPdf();
      return;
    }
  };

  const wrapSelection = (prefix: string, suffix = '', defaultText = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.substring(start, end);
    const textToWrap = selected || defaultText;

    const replacement = `${prefix}${textToWrap}${suffix}`;
    const newValue = value.substring(0, start) + replacement + value.substring(end);
    onChange(newValue);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = start + prefix.length;
      textarea.selectionEnd = start + prefix.length + textToWrap.length;
    }, 0);
  };

  const insertTable = () => {
    const tableTemplate = '\n| Header 1 | Header 2 | Header 3 |\n| :--- | :--- | :--- |\n| Value 1 | Value 2 | Value 3 |\n| Value 4 | Value 5 | Value 6 |\n';
    wrapSelection(tableTemplate, '');
  };

  const lineCount = value.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-zinc-950 border-r border-zinc-800 text-zinc-100 min-w-0">
      {/* Formatting Toolbar */}
      <div className="p-2 border-b border-zinc-800 bg-zinc-900/60 flex flex-wrap items-center gap-1 select-none text-zinc-400">
        <button
          onClick={() => wrapSelection('**', '**', 'bold text')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Bold (Cmd+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('*', '*', 'italic text')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Italic (Cmd+I)"
        >
          <Italic className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('~~', '~~', 'strikethrough text')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Strikethrough"
        >
          <Strikethrough className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-1" />

        <button
          onClick={() => wrapSelection('# ', '', 'Heading 1')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Heading 1"
        >
          <Heading1 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('## ', '', 'Heading 2')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Heading 2"
        >
          <Heading2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('### ', '', 'Heading 3')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Heading 3"
        >
          <Heading3 className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-1" />

        <button
          onClick={() => wrapSelection('- ', '', 'List item')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Bulleted List"
        >
          <List className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('1. ', '', 'Numbered item')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Numbered List"
        >
          <ListOrdered className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('- [ ] ', '', 'Task item')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Task List Checkbox"
        >
          <CheckSquare className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-1" />

        <button
          onClick={() => wrapSelection('> ', '', 'Quote text')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Blockquote"
        >
          <Quote className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('```\n', '\n```', 'code here')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Code Block"
        >
          <Code className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={insertTable}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Insert Table"
        >
          <Table className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => wrapSelection('[', '](https://example.com)', 'link text')}
          className="p-1.5 hover:bg-zinc-800 hover:text-white rounded transition-colors"
          title="Insert Hyperlink"
        >
          <Link className="w-3.5 h-3.5" />
        </button>

        <div className="h-4 w-px bg-zinc-800 mx-1" />

        <button
          onClick={() => wrapSelection('\n\n<!-- pagebreak -->\n\n', '')}
          className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-400/20 rounded text-[11px] font-mono transition-colors"
          title="Insert explicit Page Break for print"
        >
          <Scissors className="w-3 h-3" />
          <span>PageBreak</span>
        </button>

        <div className="ml-auto flex items-center gap-2 text-xs font-mono text-zinc-500">
          <span>Markdown GFM</span>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 relative flex overflow-hidden">
        {/* Line Numbers Bar */}
        <div className="w-11 py-4 bg-zinc-950/70 border-r border-zinc-900 text-zinc-600 select-none text-[11px] font-mono text-right pr-2 overflow-hidden leading-[1.6]">
          {Array.from({ length: Math.max(1, lineCount) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start writing Markdown or load a template from the toolbar..."
          spellCheck={false}
          className="flex-1 w-full h-full p-4 bg-transparent text-zinc-200 placeholder-zinc-600 font-mono text-xs leading-[1.6] resize-none focus:outline-none overflow-y-auto selection:bg-amber-400 selection:text-zinc-950"
        />
      </div>

      {/* Footer bar */}
      <div className="h-7 border-t border-zinc-900 bg-zinc-950 px-3 flex items-center justify-between text-[11px] font-mono text-zinc-500 select-none">
        <div className="flex items-center gap-3">
          <span>Tab = 2 spaces</span>
          <span>•</span>
          <span>Cmd+B Bold</span>
          <span>•</span>
          <span>Cmd+P Print</span>
        </div>
        <div>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};
