import fs from 'node:fs';
import puppeteer from 'puppeteer';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

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

function getChromeExecutablePath() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH && fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (fs.existsSync(macChrome)) {
    return macChrome;
  }
  const macChromeCanary = '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary';
  if (fs.existsSync(macChromeCanary)) {
    return macChromeCanary;
  }
  const linuxChrome = '/usr/bin/google-chrome';
  if (fs.existsSync(linuxChrome)) {
    return linuxChrome;
  }
  const linuxChromium = '/usr/bin/chromium-browser';
  if (fs.existsSync(linuxChromium)) {
    return linuxChromium;
  }
  return undefined;
}

export async function generatePdfBuffer({ markdown, settings, documentTitle }) {
  const format = (settings?.pageSize || 'letter').toLowerCase();
  const marginMm = settings?.margin === 'compact' ? '10mm' : settings?.margin === 'spacious' ? '25mm' : settings?.customMarginMm ? `${settings.customMarginMm}mm` : '16mm';
  const accent = settings?.accentColor || '#d97706';
  const font = settings?.font === 'plus-jakarta' ? 'Plus Jakarta Sans' : settings?.font === 'merriweather' ? 'Merriweather' : settings?.font === 'lora' ? 'Lora' : settings?.font === 'jetbrains-mono' ? 'JetBrains Mono' : settings?.font === 'space-grotesk' ? 'Space Grotesk' : 'Inter';
  const fontSize = settings?.fontSize || '10pt';
  const lineHeight = settings?.lineHeight === 'tight' ? '1.3' : settings?.lineHeight === 'relaxed' ? '1.65' : '1.45';

  let rawMd = markdown || '';

  // Handle page break tags
  rawMd = rawMd.replace(
    /(?:<!--\s*pagebreak\s*-->|\\pagebreak|===pagebreak===)/gi,
    '\n\n<div class="print-page-break"></div>\n\n'
  );

  // Handle GitHub alerts
  rawMd = rawMd.replace(
    />\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*([\s\S]*?)(?=(?:\n\s*\n|$))/gi,
    (_match, type, content) => {
      const alertType = type.toLowerCase();
      const title = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
      return `<div class="callout callout-${alertType}"><div class="callout-title">${title}</div><div class="callout-content">${content.replace(/^>\s*/gm, '')}</div></div>`;
    }
  );

  const htmlBody = marked.parse(rawMd);

  const fullHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${documentTitle || 'Document'}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Lora:ital,wght@0,400;0,600;1,400&family=Merriweather:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600;700&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <style>
    @page {
      size: ${format};
      margin: ${marginMm};
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: '${font}', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: ${fontSize};
      line-height: ${lineHeight};
      color: #111827;
      margin: 0;
      padding: 0;
      background: #ffffff;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    h1 {
      font-size: 2em;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2px solid ${accent};
      padding-bottom: 0.2em;
      margin-top: 0;
      margin-bottom: 0.4em;
    }
    h2 {
      font-size: 1.4em;
      font-weight: 700;
      color: #0f172a;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 0.2em;
      margin-top: 0.9em;
      margin-bottom: 0.35em;
    }
    h3 {
      font-size: 1.15em;
      font-weight: 700;
      color: ${accent};
      text-transform: uppercase;
      margin-top: 0.8em;
      margin-bottom: 0.3em;
    }
    h4 {
      font-size: 1.05em;
      font-weight: 600;
      color: #1e293b;
      margin-top: 0.7em;
      margin-bottom: 0.2em;
    }
    p { margin-top: 0; margin-bottom: 0.5em; }
    ul, ol { margin-top: 0.2em; margin-bottom: 0.5em; padding-left: 1.25em; }
    li { margin-bottom: 0.2em; }
    hr { border: 0; border-top: 1px solid #cbd5e1; margin: 0.75em 0; }
    a { color: ${accent}; text-decoration: none; }
    a:hover { text-decoration: underline; }
    blockquote {
      margin: 0.75em 0;
      padding: 0.5em 1em;
      border-left: 4px solid ${accent};
      background: #f8fafc;
      color: #334155;
      font-style: italic;
    }
    table { width: 100%; border-collapse: collapse; margin: 0.75em 0; font-size: 0.9em; }
    th { background: #f1f5f9; border: 1px solid #cbd5e1; padding: 0.4em 0.6em; font-weight: 700; text-align: left; }
    td { border: 1px solid #e2e8f0; padding: 0.35em 0.6em; }
    tr:nth-child(even) { background: #f8fafc; }
    .resume-contact-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      font-size: 0.9em;
      color: #475569;
      margin-top: -0.25rem;
      margin-bottom: 0.75rem;
    }
    .print-page-break {
      page-break-after: always !important;
      break-after: page !important;
      height: 0;
      margin: 0;
      padding: 0;
      visibility: hidden;
    }
    h1, h2, h3, h4, tr, pre, blockquote, .callout {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    .callout {
      border-radius: 0.5rem;
      padding: 0.65rem 0.9rem;
      margin: 0.75rem 0;
      border-left: 4px solid;
      font-size: 0.92em;
    }
    .callout-title { font-weight: 700; text-transform: uppercase; font-size: 0.85em; margin-bottom: 0.25rem; }
    .callout-note { background: #eff6ff; border-color: #3b82f6; color: #1e3a8a; }
    .callout-tip { background: #ecfdf5; border-color: #10b981; color: #064e3b; }
    .callout-warning { background: #fffbeb; border-color: #f59e0b; color: #78350f; }
    .callout-important { background: #f5f3ff; border-color: #8b5cf6; color: #4c1d95; }
    .callout-caution { background: #fef2f2; border-color: #ef4444; color: #7f1d1d; }
    .hljs {
      color: #24292e;
      background: #f6f8fa;
      padding: 0.75rem 1rem;
      border-radius: 0.375rem;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85em;
      border: 1px solid #e1e4e8;
      overflow-x: auto;
    }
    .hljs-keyword { color: #d73a49; font-weight: 600; }
    .hljs-string { color: #032f62; }
    .hljs-comment { color: #6a737d; font-style: italic; }
    .hljs-number { color: #005cc5; }
  </style>
</head>
<body>
  ${htmlBody}
</body>
</html>`;

  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  };

  const detectedChrome = getChromeExecutablePath();
  if (detectedChrome) {
    launchOptions.executablePath = detectedChrome;
  }

  const browser = await puppeteer.launch(launchOptions);
  try {
    const page = await browser.newPage();
    await page.setContent(fullHtml, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: format === 'a4' ? 'a4' : 'letter',
      printBackground: true,
      margin: {
        top: marginMm,
        right: marginMm,
        bottom: marginMm,
        left: marginMm,
      },
    });

    return pdfBuffer;
  } finally {
    await browser.close();
  }
}
