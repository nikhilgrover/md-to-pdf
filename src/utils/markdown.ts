import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import DOMPurify from 'dompurify';

// Configure Marked with syntax highlighting
const marked = new Marked(
  markedHighlight({
    emptyLangClass: 'hljs',
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    },
  })
);

marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Pre-processes markdown text to handle custom page breaks and alerts
 */
function preprocessMarkdown(text: string): string {
  if (!text) return '';

  let processed = text;

  // 1. Convert page breaks: <!-- pagebreak --> or \pagebreak or ===pagebreak===
  processed = processed.replace(
    /(?:<!--\s*pagebreak\s*-->|\\pagebreak|===pagebreak===)/gi,
    '\n\n<div class="print-page-break" data-break="page"></div>\n\n'
  );

  // 2. GitHub-flavored alerts in blockquotes
  // e.g. > [!NOTE] Some text
  processed = processed.replace(
    />\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([\s\S]*?)(?=(?:\n\s*\n|$))/gi,
    (_match, type, content) => {
      const alertType = type.toLowerCase();
      const title = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      return `<div class="callout callout-${alertType}"><div class="callout-title">${title}</div><div class="callout-content">${content.replace(/^>\s*/gm, '')}</div></div>`;
    }
  );

  return processed;
}

/**
 * Parses markdown to sanitized HTML
 */
export function parseMarkdownToHtml(markdown: string): string {
  try {
    const preprocessed = preprocessMarkdown(markdown);
    const rawHtml = marked.parse(preprocessed) as string;

    // Sanitize with DOMPurify allowing classes, ids, data attributes, and styles
    const cleanHtml = DOMPurify.sanitize(rawHtml, {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['target', 'rel', 'class', 'style', 'data-break'],
    });

    return cleanHtml;
  } catch (error) {
    console.error('Markdown parse error:', error);
    return `<div class="p-4 text-red-500">Error parsing markdown: ${String(error)}</div>`;
  }
}

/**
 * Utility statistics from markdown text
 */
export function getMarkdownStats(markdown: string) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  const chars = markdown.length;
  const lines = markdown.split('\n').length;
  const estimatedPages = Math.max(1, Math.ceil(words / 450));
  return { words, chars, lines, estimatedPages };
}
