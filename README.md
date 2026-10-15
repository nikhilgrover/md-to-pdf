# DocuCraft PDF — Markdown to PDF Studio &amp; Resume Generator

A modern, high-fidelity **Markdown to PDF converter and live document studio** engineered for generating elegant, ATS-friendly software engineering resumes, technical architecture specifications (HLD), engineering proposals (RFC), and clean documentation.

Includes both a **responsive Web Studio** with live split-screen preview and a **headless Node CLI** for batch and terminal conversions.

---

## ⚡ Key Highlights

- **📄 Native Vector PDF Output:** Generates clean, selectable, high-resolution vector PDFs using `@media print` and Puppeteer—no fuzzy raster canvas artifacts.
- **💼 Production-Tested Resume Presets:** Pre-loaded with official technical resumes (including Nikhil Grover's 9 YOE Technical Lead resume), single-page compact formats, and executive layouts.
- **📐 Granular Page & Margin Tuning:**
  - **Page Sizes:** US Letter (8.5" × 11") and ISO A4 (210mm × 297mm).
  - **Margins:** Compact (10mm / 0.4"), Standard (16mm / 0.63"), Spacious (25mm / 1.0"), or custom millimeter slider (5mm–35mm).
  - **Typography:** Inter, Plus Jakarta Sans, Merriweather, Lora, JetBrains Mono, and Space Grotesk.
  - **Scale & Leading:** 9pt to 12pt base sizes with tight, normal, and relaxed line-height options.
  - **Accent Themes:** Amber Gold, Classic Blue, Teal Forest, Emerald, Indigo, Crimson, and Slate.
- **✂️ Deterministic Page Break Control:**
  - Insert `<!-- pagebreak -->` or `\pagebreak` anywhere in markdown.
  - Visual on-screen dashed indicator highlights exact page boundary splits.
  - Print engine isolates headers, table rows, and code blocks to eliminate awkward orphan lines.
- **🖥️ Live Split-Screen Studio:** Real-time GFM editor with line numbering, format shortcuts (Cmd+B, Cmd+I, Cmd+P), word/page counter, table generator, and auto-indent.
- **🤖 Headless Terminal CLI:** Convert markdown files directly from your terminal using `npm run cli` or `node bin/cli.mjs`.
- **🔥 Firebase Hosting Ready:** Out-of-the-box `firebase.json` and `.firebaserc` with immutable asset caching and SPA rewrites.

---

## 🚀 Quick Start

### 1. Web Studio (Interactive Editor)

```bash
# Clone and enter directory
cd md-to-pdf

# Install dependencies
npm install

# Start local development studio (http://localhost:5174)
npm run dev

# Build production bundle
npm run build
```

Open [http://localhost:5174](http://localhost:5174) in your browser. You can edit Markdown, switch templates, customize print typography, and click **"Export PDF"** (or press `Cmd+P` / `Ctrl+P`) to save a crisp vector PDF.

---

### 2. Command-Line Interface (CLI)

Convert any Markdown file to PDF directly from your terminal without opening a browser:

```bash
# Basic conversion (uses default US Letter, 12mm margin)
node bin/cli.mjs sample-resume.md my-resume.pdf

# Using npm script shortcut
npm run cli -- sample-resume.md my-resume.pdf

# Custom format, margin, and accent color
node bin/cli.mjs doc.md output.pdf --format=a4 --margin=15mm --accent=#2563eb

# Specify font and font size
node bin/cli.mjs spec.md spec.pdf --font="JetBrains Mono" --fontSize=9pt
```

#### CLI Options Reference
| Flag | Description | Default |
| :--- | :--- | :--- |
| `--format=<letter\|a4>` | Output paper format | `letter` |
| `--margin=<size>` | Page margin (e.g. `10mm`, `15mm`, `0.5in`) | `12mm` |
| `--accent=<hex>` | Headings & rule line color | `#d97706` (Amber) |
| `--font=<name>` | Typography family | `Inter` |
| `--fontSize=<pt>` | Base text point size | `10pt` |
| `--help`, `-h` | Display help screen | — |

---

## 📑 Built-in Template Library

DocuCraft PDF comes pre-loaded with curated presets accessible via the **Templates** menu:

1. **Nikhil Grover — Technical Lead Resume:** Authentic 9 YOE resume covering Amazon Ads (Sponsored Brands), Project Kuiper, Amazon Halo, Cisco, T-Mobile, and University of Washington with metric-driven impact points.
2. **Modern Single-Page Software Engineer Resume:** Compact, high-density 1-pager designed for ATS optimization, skill chips, and project links.
3. **High-Level System Architecture Specification (HLD):** Comprehensive engineering spec with requirements, SLO tables, ASCII topologies, Protobuf schemas, and failure mode matrices.
4. **Request for Comments (RFC) Technical Proposal:** Standardized RFC template with problem statements, benchmark matrices, and phase rollout schedules.
5. **Clean Technical Whitepaper & Article:** Classical essay and whitepaper layout with elegant serif typography.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 19, TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS 4, Custom `@media print` stylesheet
- **Markdown Processing:** `marked` 15 (GFM support, task lists, tables)
- **Code Syntax Highlighting:** `highlight.js` 11 + `marked-highlight`
- **Sanitization:** `DOMPurify`
- **Headless Engine:** `puppeteer` with automated local browser detection
- **Icons:** `lucide-react`
- **Hosting Engine:** Firebase Hosting (`firebase.json`, `.firebaserc`)

---

## 🌐 Deploying to Firebase Hosting

This project is pre-configured for Firebase Hosting. To deploy:

```bash
# 1. Login to Firebase CLI
npx firebase login

# 2. Select or create your Firebase project
npx firebase use <your-project-id>

# 3. Build and deploy
npm run deploy
```

---

## 📄 License
MIT © [Nikhil Grover](https://github.com/nikhilgrover)
