#!/usr/bin/env node
/**
 * Generates llms.txt for ThoughtSpot Cloud documentation.
 *
 * Reads  cloud/modules/ROOT/nav.adoc  for site structure.
 * Reads  cloud/modules/ROOT/pages/*.adoc  for page title and :description:.
 * Writes build/llms.txt  (run after `npm run build`, or set OUT_FILE env var).
 *
 * Usage:
 *   node scripts/generate-llms-txt.js
 *
 * Add to package.json scripts:
 *   "llms": "node scripts/generate-llms-txt.js"
 *   "build:llms": "npm run build && node scripts/generate-llms-txt.js"
 */

const fs   = require('fs');
const path = require('path');

const ROOT      = path.resolve(__dirname, '..');
const PAGES_DIR = path.join(ROOT, 'cloud/modules/ROOT/pages');
const NAV_FILE  = path.join(ROOT, 'cloud/modules/ROOT/nav.adoc');
const BASE_URL  = 'https://docs.thoughtspot.com/cloud/latest';
const OUT_FILE  = process.env.OUT_FILE || path.join(ROOT, 'build/llms.txt');

// ---------------------------------------------------------------------------
// Read the page title (first = heading) and :description: from an adoc file.
// ---------------------------------------------------------------------------
function readMeta(filename) {
    const filePath = path.join(PAGES_DIR, filename);
    if (!fs.existsSync(filePath)) return null;

    const src        = fs.readFileSync(filePath, 'utf8');
    const titleMatch = src.match(/^= (.+)$/m);
    const descMatch  = src.match(/^:description:\s*(.+)$/m);

    return {
        title:       titleMatch ? titleMatch[1].trim() : path.basename(filename, '.adoc'),
        description: descMatch  ? descMatch[1].trim()  : '',
    };
}

// ---------------------------------------------------------------------------
// Parse nav.adoc into sections.
//
// Nav format: Antora bullet hierarchy where depth is the number of leading *.
//   * Top-level item           → new section (plain text or xref)
//   ** Nested item             → page entry under current section
//   xref:file.adoc[Title]      → page link
//   xref:file.adoc[]           → page link, title comes from the page itself
// ---------------------------------------------------------------------------
function parseNav(src) {
    const sections = [];
    let current = null;

    for (const rawLine of src.split('\n')) {
        const line = rawLine.trim();
        if (!line || line.startsWith('//')) continue;

        const depthMatch = line.match(/^(\*+)\s+/);
        if (!depthMatch) continue;

        const depth = depthMatch[1].length;
        const rest  = line.slice(depthMatch[0].length).trim();

        const xrefMatch = rest.match(/^xref:([^\[]+\.adoc)\[([^\]]*)\]/);

        if (depth === 1) {
            const title = xrefMatch
                ? (xrefMatch[2].trim() || path.basename(xrefMatch[1], '.adoc'))
                : rest;
            current = { title, pages: [] };
            sections.push(current);
            if (xrefMatch) {
                current.pages.push({ file: xrefMatch[1], navTitle: xrefMatch[2].trim() });
            }
        } else if (xrefMatch && current) {
            current.pages.push({ file: xrefMatch[1], navTitle: xrefMatch[2].trim() });
        }
    }

    return sections.filter(s => s.pages.length > 0);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
const navSrc   = fs.readFileSync(NAV_FILE, 'utf8');
const sections = parseNav(navSrc);

const seen  = new Set();
const lines = [
    '# ThoughtSpot Cloud Documentation',
    '',
    '> Official documentation for ThoughtSpot Cloud — analytics, Liveboards, data connections, user management, multi-tenancy, and administration.',
    '',
    `> Base URL: ${BASE_URL}`,
    '',
];

let totalPages = 0;

for (const section of sections) {
    const sectionLines = [];

    for (const { file, navTitle } of section.pages) {
        if (seen.has(file)) continue;
        seen.add(file);

        const meta = readMeta(file);
        if (!meta) {
            console.warn(`  [warn] page file not found: ${file}`);
            continue;
        }

        const title = navTitle || meta.title;
        const desc  = meta.description ? `: ${meta.description}` : '';
        const slug  = path.basename(file, '.adoc');
        sectionLines.push(`- [${title}](${BASE_URL}/${slug})${desc}`);
        totalPages++;
    }

    if (sectionLines.length) {
        lines.push(`## ${section.title}`, '', ...sectionLines, '');
    }
}

fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true });
fs.writeFileSync(OUT_FILE, lines.join('\n'), 'utf8');

console.log(`llms.txt written → ${OUT_FILE}`);
console.log(`  ${sections.length} sections, ${totalPages} pages indexed`);
