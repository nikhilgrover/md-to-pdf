export type PageSize = 'letter' | 'a4';
export type MarginOption = 'compact' | 'standard' | 'spacious' | 'custom';
export type FontOption = 'inter' | 'plus-jakarta' | 'merriweather' | 'lora' | 'jetbrains-mono' | 'space-grotesk';
export type FontSizeOption = '9pt' | '10pt' | '10.5pt' | '11pt' | '12pt';
export type LineHeightOption = 'tight' | 'normal' | 'relaxed';
export type ThemeStyle = 'modern' | 'minimal' | 'academic' | 'executive' | 'creative' | 'corporate';

export interface EditorSettings {
  pageSize: PageSize;
  margin: MarginOption;
  customMarginMm: number;
  font: FontOption;
  fontSize: FontSizeOption;
  lineHeight: LineHeightOption;
  themeStyle: ThemeStyle;
  accentColor: string;
  showPageNumbers: boolean;
  showHeader: boolean;
  headerText: string;
}

export interface DocumentTemplate {
  id: string;
  title: string;
  category: 'Resume & CV' | 'Engineering & System Design' | 'Proposals & RFCs' | 'Documentation';
  description: string;
  badge?: string;
  defaultSettings: Partial<EditorSettings>;
  markdown: string;
}
