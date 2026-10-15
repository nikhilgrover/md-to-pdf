import React, { useState } from 'react';
import { TEMPLATES } from '../templates/templates';
import { DocumentTemplate } from '../types';
import { 
  X, 
  LayoutTemplate, 
  ArrowRight
} from 'lucide-react';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: DocumentTemplate) => void;
}

export const TemplatesModal: React.FC<TemplatesModalProps> = ({
  isOpen,
  onClose,
  onSelectTemplate,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  if (!isOpen) return null;

  const categories = [
    'ALL',
    'Resume & CV',
    'Engineering & System Design',
    'Proposals & RFCs',
    'Documentation',
  ];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (activeCategory === 'ALL') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity" 
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl max-h-[85vh] flex flex-col z-10 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-[11px] font-mono font-bold uppercase mb-2">
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>Document Presets</span>
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Curated Markdown to PDF Templates
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Select an architectural specification, executive proposal, or production-tested resume layout.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-6 py-3 border-b border-zinc-900 bg-zinc-950 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Cards Grid */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group relative p-5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 hover:border-amber-400/50 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    {template.category}
                  </span>
                  {template.badge && (
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      {template.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {template.title}
                </h3>

                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  {template.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-500">
                  {template.defaultSettings.pageSize === 'letter' ? 'Letter' : 'A4'} • {template.defaultSettings.font}
                </span>

                <button
                  onClick={() => {
                    onSelectTemplate(template);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-amber-400 group-hover:bg-amber-400 text-zinc-200 group-hover:text-zinc-950 font-bold text-xs transition-all shadow-sm cursor-pointer"
                >
                  <span>Load Preset</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/80 flex items-center justify-between text-xs text-zinc-500">
          <span>Tip: Loading a template will replace your current editor content.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
