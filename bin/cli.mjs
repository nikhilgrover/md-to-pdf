#!/usr/bin/env node

/**
 * DocuCraft PDF — Headless Markdown to PDF CLI Converter
 * Usage: node bin/cli.mjs <input.md> [output.pdf] [--format=letter|a4] [--margin=12mm] [--accent=#d97706]
 */

import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// Configure Marked with code syntax highlighting
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

function printHelp() {
  console.log(`
\x1b[1m\x1b[33mDocuCraft PDF — Markdown to PDF CLI Generator\x1b[0m

\x1b[1mUSAGE:\x1b[0m
  node bin/cli.mjs <input.md> [output.pdf] [options]
  npm run cli -- <input.md> [output.pdf] [options]

\x1b[1mOPTIONS:\x1b[0m
  --format=<letter|a4>       Page format (default: letter)
  --margin=<size>            Page margin (e.g. 10mm, 15mm, 0.5in, default: 12mm)
  --accent=<hex>             Heading & accent color (default: #d97706)
  --font=<name>              Font family (default: Inter)
  --fontSize=<pt>            Base font size (default: 10pt)
  --help, -h                 Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  node bin/cli.mjs sample-resume.md sample-resume.pdf
  node bin/cli.mjs spec.md spec.pdf --format=a4 --margin=15mm
  node bin/cli.mjs proposals/rfc.md --accent=#2563eb
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    printHelp();
    process.exit(0);
  }

  const flags = {};
  const positional = [];

  for (const arg of args) {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      flags[key] = value !== undefined ? value : true;
    } else {
      positional.push(arg);
    }
  }

  const inputFile = positional[0];
  if (!inputFile) {
    console.error('\x1b[31mError: Missing input markdown file.\x1b[0m');
    printHelp();
    process.exit(1);
  }

  if (!fs.existsSync(inputFile)) {
    console.error(`\x1b[31mError: File not found: ${inputFile}\x1b[0m`);
    process.exit(1);
  }

  const outputFile = positional[1] || inputFile.replace(/\.[^/.]+$/, '') + '.pdf';
  const format = (flags.format || 'letter').toUpperCase();
  const margin = flags.margin || '12mm';
  const accent = flags.accent || '#d97706';
  const font = flags.font || 'Inter';
  const fontSize = flags.fontSize || '10pt';

  console.log(`\x1b[36mConverting:\x1b[0m ${inputFile} → ${outputFile}`);
  console.log(`\x1b[90mSettings: Format=${format}, Margin=${margin}, Accent=${accent}, Font=${font}, Size=${fontSize}\x1b[0m`);

  let rawMd = fs.readFileSync(inputFile, 'utf-8');

  // Handle pagebreak tags
  rawMd = rawMd.replace(
    /(?:<!--\s*pagebreak\s*-->|\\pagebreak|===pagebreak===)/gi,
    '\n\n<div class="print-page-break"></div>\n\n'
  );

  const htmlBody = marked.parse(rawMd);

  const fullHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>${path.basename(outputFile, '.pdf')}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    @page {
      size: ${format.toLowerCase()};
      margin: ${margin};
    }
    *, *::before, *::after { box-sizing: border-box; }
    body {
      font-family: '${font}', -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: ${fontSize};
      line-height: 1.45;
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
    h1, h2, h3, h4, tr, pre, blockquote {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
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

    await page.pdf({
      path: outputFile,
      format: format,
      printBackground: true,
      margin: {
        top: margin,
        right: margin,
        bottom: margin,
        left: margin,
      },
    });

    const stats = fs.statSync(outputFile);
    console.log(`\x1b[32m✔ Successfully generated PDF:\x1b[0m ${outputFile} (${(stats.size / 1024).toFixed(1)} KB)`);
  } catch (err) {
    console.error('\x1b[31mError generating PDF:\x1b[0m', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error('\x1b[31mFatal error:\x1b[0m', err);
  process.exit(1);
});
