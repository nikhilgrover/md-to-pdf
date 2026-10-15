import React from 'react';
import { 
  X, 
  Sliders, 
  Type, 
  FileSpreadsheet, 
  Palette, 
  RotateCcw, 
  AlignLeft,
  BookOpen
} from 'lucide-react';
import { EditorSettings, MarginOption, FontOption, FontSizeOption, LineHeightOption } from '../types';

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EditorSettings;
  onUpdateSettings: (newSettings: Partial<EditorSettings>) => void;
  onResetSettings: () => void;
}

const ACCENT_COLORS = [
  { name: 'Amber Gold', hex: '#d97706' },
  { name: 'Classic Blue', hex: '#2563eb' },
  { name: 'Teal Forest', hex: '#0f766e' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Crimson', hex: '#e11d48' },
  { name: 'Monochrome Slate', hex: '#0f172a' },
];

export const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onResetSettings,
}) => {
  if (!isOpen) return null;

  return (
    <div className="no-print fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-sm bg-zinc-950 border-l border-zinc-800 h-full flex flex-col z-10 shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Document &amp; Print Styling</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Settings Form Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-zinc-300">
          {/* 1. Page Format & Dimensions */}
          <div className="space-y-3">
            <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Page Format</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onUpdateSettings({ pageSize: 'letter' })}
                className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                  settings.pageSize === 'letter'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="font-semibold">US Letter</div>
                <div className="text-[10px] text-zinc-500 font-mono">8.5 × 11 in</div>
              </button>

              <button
                onClick={() => onUpdateSettings({ pageSize: 'a4' })}
                className={`py-2 px-3 rounded-lg border text-center transition-all cursor-pointer ${
                  settings.pageSize === 'a4'
                    ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                    : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="font-semibold">ISO A4</div>
                <div className="text-[10px] text-zinc-500 font-mono">210 × 297 mm</div>
              </button>
            </div>
          </div>

          {/* 2. Page Margins */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px]">
                Page Margins
              </label>
              <span className="font-mono text-[10px] text-zinc-400">
                {settings.margin === 'compact' && '10mm (~0.4")'}
                {settings.margin === 'standard' && '16mm (~0.63")'}
                {settings.margin === 'spacious' && '25mm (~1.0")'}
                {settings.margin === 'custom' && `${settings.customMarginMm}mm`}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['compact', 'standard', 'spacious'] as MarginOption[]).map((m) => (
                <button
                  key={m}
                  onClick={() => onUpdateSettings({ margin: m })}
                  className={`py-1.5 px-2 rounded-lg border capitalize text-center text-xs transition-all cursor-pointer ${
                    settings.margin === m
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Custom margin slider */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                <span>Fine-tune Margin</span>
                <span className="font-mono">{settings.customMarginMm} mm</span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                value={settings.customMarginMm}
                onChange={(e) => onUpdateSettings({ margin: 'custom', customMarginMm: Number(e.target.value) })}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>
          </div>

          {/* 3. Typography Family */}
          <div className="space-y-3">
            <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-amber-400" />
              <span>Font Family</span>
            </label>

            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'inter', name: 'Inter', sample: 'Modern Sans' },
                { id: 'plus-jakarta', name: 'Plus Jakarta', sample: 'Clean Tech' },
                { id: 'merriweather', name: 'Merriweather', sample: 'Editorial Serif' },
                { id: 'lora', name: 'Lora', sample: 'Academic Serif' },
                { id: 'jetbrains-mono', name: 'JetBrains Mono', sample: 'Technical Code' },
                { id: 'space-grotesk', name: 'Space Grotesk', sample: 'Geometric Display' },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => onUpdateSettings({ font: f.id as FontOption })}
                  className={`p-2.5 rounded-lg border text-left transition-all cursor-pointer ${
                    settings.font === f.id
                      ? 'border-amber-400 bg-amber-400/10 text-amber-300 font-bold'
                      : 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <div className="font-semibold text-xs">{f.name}</div>
                  <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{f.sample}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Font Size & Line Spacing */}
          <div className="space-y-3">
            <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <AlignLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>Base Scale &amp; Line Height</span>
            </label>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-zinc-400 text-xs">
                <span>Font Size:</span>
                <div className="flex gap-1">
                  {(['9pt', '10pt', '10.5pt', '11pt', '12pt'] as FontSizeOption[]).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => onUpdateSettings({ fontSize: sz })}
                      className={`px-2 py-1 rounded text-[10px] font-mono border transition-all cursor-pointer ${
                        settings.fontSize === sz
                          ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-zinc-400 text-xs pt-1">
                <span>Line Spacing:</span>
                <div className="flex gap-1">
                  {(['tight', 'normal', 'relaxed'] as LineHeightOption[]).map((lh) => (
                    <button
                      key={lh}
                      onClick={() => onUpdateSettings({ lineHeight: lh })}
                      className={`px-2.5 py-1 rounded text-[10px] capitalize border transition-all cursor-pointer ${
                        settings.lineHeight === lh
                          ? 'border-amber-400 bg-amber-400 text-zinc-950 font-bold'
                          : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {lh}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Accent Color */}
          <div className="space-y-3">
            <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" />
              <span>Heading &amp; Accent Color</span>
            </label>

            <div className="flex flex-wrap gap-2 items-center">
              {ACCENT_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => onUpdateSettings({ accentColor: c.hex })}
                  style={{ backgroundColor: c.hex }}
                  className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                    settings.accentColor.toLowerCase() === c.hex.toLowerCase()
                      ? 'border-white scale-110 shadow-lg'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={c.name}
                />
              ))}

              {/* Custom Color Input */}
              <label className="relative cursor-pointer ml-1" title="Pick custom accent color">
                <input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => onUpdateSettings({ accentColor: e.target.value })}
                  className="sr-only"
                />
                <div 
                  style={{ backgroundColor: settings.accentColor }}
                  className="w-7 h-7 rounded-full border-2 border-dashed border-zinc-500 hover:border-white transition-colors"
                />
              </label>
            </div>
          </div>

          {/* 6. Headers & Footers */}
          <div className="space-y-3 pt-2 border-t border-zinc-800/80">
            <label className="font-bold text-zinc-200 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Header &amp; Footer</span>
            </label>

            <div className="space-y-2.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showHeader}
                  onChange={(e) => onUpdateSettings({ showHeader: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-400 focus:ring-0 accent-amber-400 cursor-pointer"
                />
                <span className="text-zinc-300">Show Header Running Title</span>
              </label>

              {settings.showHeader && (
                <input
                  type="text"
                  value={settings.headerText}
                  onChange={(e) => onUpdateSettings({ headerText: e.target.value })}
                  placeholder="e.g. Confidential — System Design Spec"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />
              )}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showPageNumbers}
                  onChange={(e) => onUpdateSettings({ showPageNumbers: e.target.checked })}
                  className="rounded border-zinc-700 bg-zinc-900 text-amber-400 focus:ring-0 accent-amber-400 cursor-pointer"
                />
                <span className="text-zinc-300">Show Footer / Page Numbers</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950 flex items-center justify-between">
          <button
            onClick={onResetSettings}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
