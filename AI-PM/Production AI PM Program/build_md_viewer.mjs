import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const programDir = path.dirname(__filename);

const markdownFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".md")) {
      const rel = path.relative(programDir, full).split(path.sep).join("/");
      markdownFiles.push(rel);
    }
  }
}

walk(programDir);

const indexOrder = orderedMarkdownLinksFromIndex();
const indexRank = new Map(indexOrder.map((file, idx) => [file, idx]));
markdownFiles.sort((a, b) => {
  const aRank = indexRank.has(a) ? indexRank.get(a) : Number.MAX_SAFE_INTEGER;
  const bRank = indexRank.has(b) ? indexRank.get(b) : Number.MAX_SAFE_INTEGER;
  if (aRank !== bRank) return aRank - bRank;
  return a.localeCompare(b, undefined, { numeric: true });
});

const docs = markdownFiles.map(file => ({
  file,
  title: titleFor(file),
  body: fs.readFileSync(path.join(programDir, file), "utf8")
}));

function titleFor(file) {
  const text = fs.readFileSync(path.join(programDir, file), "utf8");
  const heading = text.match(/^#\s+(.+)$/m);
  if (heading) return heading[1].trim();
  return path.basename(file, ".md").replaceAll("_", " ");
}

function orderedMarkdownLinksFromIndex() {
  const indexPath = path.join(programDir, "index.html");
  if (!fs.existsSync(indexPath)) return [];
  const html = fs.readFileSync(indexPath, "utf8");
  const links = [...html.matchAll(/href="([^"]+\.md)"/g)]
    .map(match => decodeURIComponent(match[1]))
    .filter(file => fs.existsSync(path.join(programDir, file)));
  return [...new Set(links)];
}

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Production AI PM Markdown Viewer</title>
  <style>
    :root {
      --ink: #191714;
      --muted: #68635b;
      --paper: #f7f4ee;
      --panel: #fffdf8;
      --line: #ddd6ca;
      --accent: #b8431b;
      --accent-dark: #7f2d14;
      --cool: #266170;
      --soft: #f0e8dc;
      --code: #27211d;
      --code-bg: #f1e8da;
      --highlight: #ffe27a;
      --highlight-border: #d49b18;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--ink);
      background: var(--paper);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.55;
    }
    .shell {
      display: grid;
      grid-template-columns: 360px minmax(0, 1fr);
      min-height: 100vh;
    }
    aside {
      position: sticky;
      top: 0;
      height: 100vh;
      overflow: auto;
      border-right: 1px solid var(--line);
      background: #fffaf2;
      padding: 22px;
    }
    .brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
    }
    .brand a {
      color: var(--accent-dark);
      text-decoration: none;
      font-size: 13px;
      font-weight: 800;
    }
    .kicker {
      color: var(--accent);
      font-size: 11px;
      font-weight: 850;
      letter-spacing: .14em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .brand-title {
      font-weight: 850;
      font-size: 20px;
      line-height: 1.1;
    }
    .search {
      width: 100%;
      height: 42px;
      border: 1px solid var(--line);
      border-radius: 7px;
      padding: 0 12px;
      background: white;
      color: var(--ink);
      font: inherit;
      margin-bottom: 14px;
    }
    .doc-list {
      display: grid;
      gap: 7px;
    }
    .doc-link {
      display: block;
      border: 1px solid transparent;
      border-radius: 7px;
      padding: 10px 11px;
      color: var(--ink);
      text-decoration: none;
      background: transparent;
    }
    .doc-link:hover {
      border-color: var(--line);
      background: white;
    }
    .doc-link.active {
      border-color: var(--accent);
      background: white;
      box-shadow: inset 3px 0 0 var(--accent);
    }
    .doc-title {
      display: block;
      font-size: 14px;
      font-weight: 800;
      line-height: 1.25;
    }
    .doc-path {
      display: block;
      margin-top: 4px;
      color: var(--muted);
      font-size: 11px;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }
    main {
      min-width: 0;
      padding: 28px clamp(22px, 3.5vw, 56px) 72px;
    }
    .topbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 16px;
      margin-bottom: 22px;
      padding-bottom: 14px;
      border-bottom: 1px solid var(--line);
      color: var(--muted);
      font-size: 13px;
    }
    .topbar a {
      color: var(--accent-dark);
      font-weight: 800;
      text-decoration: none;
    }
    .top-actions {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 10px;
      flex-wrap: wrap;
    }
    .highlight-status {
      color: var(--muted);
      font-size: 12px;
    }
    .highlight-nav {
      display: inline-flex;
      overflow: hidden;
      border: 1px solid var(--line);
      border-radius: 7px;
      background: white;
    }
    .top-button,
    .floating-action,
    .menu-button,
    .panel-button {
      border: 1px solid var(--line);
      border-radius: 7px;
      background: white;
      color: var(--ink);
      font: inherit;
      font-size: 13px;
      font-weight: 800;
      cursor: pointer;
    }
    .top-button {
      padding: 7px 10px;
    }
    .nav-button {
      width: 34px;
      height: 32px;
      border: 0;
      border-right: 1px solid var(--line);
      border-radius: 0;
      background: transparent;
      color: var(--ink);
      font: inherit;
      font-size: 16px;
      font-weight: 900;
      line-height: 1;
      cursor: pointer;
    }
    .nav-button:last-child {
      border-right: 0;
    }
    .top-button:hover,
    .nav-button:hover,
    .floating-action:hover,
    .menu-button:hover,
    .panel-button:hover {
      border-color: var(--accent);
      color: var(--accent-dark);
    }
    .top-button:disabled,
    .nav-button:disabled {
      cursor: not-allowed;
      opacity: .45;
    }
    .article {
      max-width: 1320px;
      margin: 0 auto;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      padding: clamp(24px, 5vw, 56px);
      box-shadow: 0 18px 60px rgba(70, 53, 34, .08);
    }
    .article h1 {
      margin: 0 0 22px;
      font-size: clamp(34px, 5vw, 60px);
      line-height: 1;
      letter-spacing: 0;
    }
    .article h2 {
      margin: 38px 0 12px;
      padding-top: 18px;
      border-top: 1px solid var(--line);
      font-size: 25px;
      line-height: 1.15;
    }
    .article h3 {
      margin: 28px 0 10px;
      color: var(--cool);
      font-size: 19px;
      line-height: 1.2;
    }
    .article h4 {
      margin: 22px 0 8px;
      font-size: 16px;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    .article p { margin: 12px 0; }
    .article a { color: var(--accent-dark); font-weight: 750; }
    .article mark.md-highlight {
      background: linear-gradient(180deg, transparent 12%, var(--highlight) 12%, var(--highlight) 88%, transparent 88%);
      border-bottom: 2px solid var(--highlight-border);
      color: inherit;
      cursor: pointer;
      padding: 0 1px;
    }
    .article mark.md-highlight:hover {
      background: var(--highlight);
    }
    .article mark.md-highlight.active {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
      background: var(--highlight);
    }
    .article mark.md-highlight.has-comment {
      border-bottom-style: double;
    }
    .article ul, .article ol {
      padding-left: 24px;
      margin: 12px 0 18px;
    }
    .article li { margin: 5px 0; }
    .article blockquote {
      margin: 20px 0;
      padding: 14px 18px;
      border-left: 4px solid var(--accent);
      background: var(--soft);
      color: var(--ink);
    }
    .article code {
      padding: 2px 5px;
      border-radius: 4px;
      background: var(--code-bg);
      color: var(--code);
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: .92em;
    }
    .article pre {
      overflow: auto;
      margin: 18px 0;
      padding: 16px;
      border-radius: 7px;
      background: var(--code);
      color: #fffaf2;
      line-height: 1.5;
    }
    .article pre code {
      padding: 0;
      background: transparent;
      color: inherit;
    }
    .table-wrap {
      overflow-x: auto;
      margin: 16px 0 24px;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: white;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      min-width: 560px;
      font-size: 14px;
    }
    th, td {
      border-bottom: 1px solid var(--line);
      padding: 10px 12px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: var(--soft);
      color: var(--accent-dark);
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: .06em;
    }
    tr:last-child td { border-bottom: 0; }
    .empty {
      padding: 40px;
      color: var(--muted);
      border: 1px dashed var(--line);
      border-radius: 8px;
      background: white;
    }
    .floating-action {
      position: fixed;
      z-index: 20;
      display: none;
      padding: 8px 10px;
      box-shadow: 0 12px 32px rgba(25, 23, 20, .16);
    }
    .floating-menu,
    .comment-panel {
      position: fixed;
      z-index: 25;
      display: none;
      border: 1px solid var(--line);
      border-radius: 8px;
      background: #fffdf8;
      box-shadow: 0 18px 48px rgba(25, 23, 20, .18);
    }
    .floating-menu {
      gap: 6px;
      padding: 7px;
    }
    .menu-button {
      padding: 8px 10px;
    }
    .comment-panel {
      width: min(360px, calc(100vw - 24px));
      padding: 12px;
    }
    .comment-panel label {
      display: block;
      margin-bottom: 7px;
      color: var(--muted);
      font-size: 12px;
      font-weight: 850;
      text-transform: uppercase;
      letter-spacing: .08em;
    }
    .comment-panel textarea {
      width: 100%;
      min-height: 108px;
      resize: vertical;
      border: 1px solid var(--line);
      border-radius: 7px;
      padding: 10px;
      background: white;
      color: var(--ink);
      font: inherit;
      font-size: 14px;
    }
    .comment-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 10px;
    }
    .panel-button {
      padding: 8px 10px;
    }
    .floating-action.is-visible {
      display: block;
    }
    .floating-menu.is-visible {
      display: inline-flex;
    }
    .comment-panel.is-visible {
      display: block;
    }
    @media (max-width: 860px) {
      .shell { grid-template-columns: 1fr; }
      aside {
        position: relative;
        height: auto;
        max-height: 45vh;
        border-right: 0;
        border-bottom: 1px solid var(--line);
      }
      main { padding: 22px 16px 40px; }
      .article { padding: 22px; }
    }
  </style>
</head>
<body>
  <div class="shell">
    <aside>
      <div class="brand">
        <div>
          <div class="kicker">Production AI PM</div>
          <div class="brand-title">Markdown Viewer</div>
        </div>
        <a href="index.html">Index</a>
      </div>
      <input id="search" class="search" type="search" placeholder="Search docs">
      <nav id="docList" class="doc-list" aria-label="Markdown files"></nav>
    </aside>
    <main>
      <div class="topbar">
        <span id="pathLabel">Select a document</span>
        <div class="top-actions">
          <span id="highlightStatus" class="highlight-status">No highlights</span>
          <div class="highlight-nav" aria-label="Highlight navigation">
            <button id="highlightPrev" class="nav-button" type="button" title="Previous highlight" disabled>↑</button>
            <button id="highlightNext" class="nav-button" type="button" title="Next highlight" disabled>↓</button>
          </div>
          <button id="clearHighlights" class="top-button" type="button" disabled>Clear highlights</button>
          <a id="rawLink" href="#" target="_blank" rel="noreferrer">Open raw file</a>
        </div>
      </div>
      <article id="article" class="article">
        <div class="empty">Choose a Markdown file from the sidebar.</div>
      </article>
    </main>
  </div>
  <button id="highlightAction" class="floating-action" type="button">Highlight</button>
  <div id="highlightMenu" class="floating-menu" role="menu" aria-label="Highlight actions">
    <button id="selectHighlightAction" class="menu-button" type="button">Select</button>
    <button id="commentHighlightAction" class="menu-button" type="button">Comment</button>
    <button id="deleteHighlightAction" class="menu-button" type="button">Delete</button>
  </div>
  <div id="highlightCommentPanel" class="comment-panel" aria-label="Highlight comment">
    <label for="highlightCommentText">Comment</label>
    <textarea id="highlightCommentText" placeholder="Add a note for this highlight"></textarea>
    <div class="comment-actions">
      <button id="cancelHighlightComment" class="panel-button" type="button">Cancel</button>
      <button id="saveHighlightComment" class="panel-button" type="button">Save comment</button>
    </div>
  </div>

  <script id="doc-data" type="application/json">${JSON.stringify(docs).replaceAll("<", "\\u003c")}</script>
  <script>
    const docs = JSON.parse(document.getElementById("doc-data").textContent);
    const byFile = new Map(docs.map(doc => [doc.file, doc]));
    const docList = document.getElementById("docList");
    const article = document.getElementById("article");
    const search = document.getElementById("search");
    const pathLabel = document.getElementById("pathLabel");
    const rawLink = document.getElementById("rawLink");
    const highlightStatus = document.getElementById("highlightStatus");
    const highlightPrev = document.getElementById("highlightPrev");
    const highlightNext = document.getElementById("highlightNext");
    const clearHighlights = document.getElementById("clearHighlights");
    const highlightAction = document.getElementById("highlightAction");
    const highlightMenu = document.getElementById("highlightMenu");
    const selectHighlightAction = document.getElementById("selectHighlightAction");
    const commentHighlightAction = document.getElementById("commentHighlightAction");
    const deleteHighlightAction = document.getElementById("deleteHighlightAction");
    const highlightCommentPanel = document.getElementById("highlightCommentPanel");
    const highlightCommentText = document.getElementById("highlightCommentText");
    const saveHighlightComment = document.getElementById("saveHighlightComment");
    const cancelHighlightComment = document.getElementById("cancelHighlightComment");
    const STORAGE_PREFIX = "production-ai-pm-md-highlights:v1:";
    let activeDoc = null;
    let activeHighlightId = null;
    let pendingHighlight = null;
    let pendingDeleteId = null;
    let selectionFrame = 0;
    let suppressSelectionToolbar = false;

    function escapeHtml(value) {
      return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function inlineMarkdown(text) {
      let out = escapeHtml(text);
      out = out.replace(/\\[([^\\]]+)\\]\\(([^)]+)\\)/g, '<a href="$2">$1</a>');
      out = out.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
      out = out.replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>');
      out = out.replace(/\\*([^*]+)\\*/g, '<em>$1</em>');
      return out;
    }

    function parseTable(lines, start) {
      const header = splitTableRow(lines[start]);
      const separator = splitTableRow(lines[start + 1] || "");
      if (!header.length || !separator.length || !separator.every(cell => /^:?-{3,}:?$/.test(cell.trim()))) return null;
      const rows = [];
      let i = start + 2;
      while (i < lines.length && /^\\s*\\|/.test(lines[i])) {
        rows.push(splitTableRow(lines[i]));
        i++;
      }
      const head = header.map(cell => '<th>' + inlineMarkdown(cell.trim()) + '</th>').join("");
      const body = rows.map(row => '<tr>' + header.map((_, idx) => '<td>' + inlineMarkdown((row[idx] || "").trim()) + '</td>').join("") + '</tr>').join("");
      return {
        html: '<div class="table-wrap"><table><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table></div>',
        next: i
      };
    }

    function splitTableRow(line) {
      return line.trim().replace(/^\\|/, "").replace(/\\|$/, "").split("|");
    }

    function renderMarkdown(markdown) {
      const lines = markdown.replace(/\\r\\n/g, "\\n").split("\\n");
      const html = [];
      let i = 0;
      while (i < lines.length) {
        const line = lines[i];
        if (!line.trim()) {
          i++;
          continue;
        }
        if (line.startsWith("\`\`\`")) {
          const code = [];
          i++;
          while (i < lines.length && !lines[i].startsWith("\`\`\`")) {
            code.push(lines[i]);
            i++;
          }
          i++;
          html.push('<pre><code>' + escapeHtml(code.join("\\n")) + '</code></pre>');
          continue;
        }
        const table = parseTable(lines, i);
        if (table) {
          html.push(table.html);
          i = table.next;
          continue;
        }
        const heading = line.match(/^(#{1,4})\\s+(.+)$/);
        if (heading) {
          const level = heading[1].length;
          html.push('<h' + level + '>' + inlineMarkdown(heading[2]) + '</h' + level + '>');
          i++;
          continue;
        }
        if (/^>\\s?/.test(line)) {
          const quote = [];
          while (i < lines.length && /^>\\s?/.test(lines[i])) {
            quote.push(lines[i].replace(/^>\\s?/, ""));
            i++;
          }
          html.push('<blockquote>' + quote.map(inlineMarkdown).join("<br>") + '</blockquote>');
          continue;
        }
        if (/^\\s*[-*]\\s+/.test(line)) {
          const items = [];
          while (i < lines.length && /^\\s*[-*]\\s+/.test(lines[i])) {
            items.push(lines[i].replace(/^\\s*[-*]\\s+/, ""));
            i++;
          }
          html.push('<ul>' + items.map(item => '<li>' + inlineMarkdown(item) + '</li>').join("") + '</ul>');
          continue;
        }
        if (/^\\s*\\d+\\.\\s+/.test(line)) {
          const items = [];
          while (i < lines.length && /^\\s*\\d+\\.\\s+/.test(lines[i])) {
            items.push(lines[i].replace(/^\\s*\\d+\\.\\s+/, ""));
            i++;
          }
          html.push('<ol>' + items.map(item => '<li>' + inlineMarkdown(item) + '</li>').join("") + '</ol>');
          continue;
        }
        if (/^---+$/.test(line.trim())) {
          html.push("<hr>");
          i++;
          continue;
        }
        const paragraph = [line.trim()];
        i++;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !/^(#{1,4})\\s+/.test(lines[i]) &&
          !lines[i].startsWith("\`\`\`") &&
          !/^\\s*[-*]\\s+/.test(lines[i]) &&
          !/^\\s*\\d+\\.\\s+/.test(lines[i]) &&
          !/^\\s*\\|/.test(lines[i]) &&
          !/^>\\s?/.test(lines[i]) &&
          !/^---+$/.test(lines[i].trim())
        ) {
          paragraph.push(lines[i].trim());
          i++;
        }
        html.push('<p>' + inlineMarkdown(paragraph.join(" ")) + '</p>');
      }
      return html.join("\\n");
    }

    function storageKey(file) {
      return STORAGE_PREFIX + file;
    }

    function readHighlights(file) {
      try {
        const value = localStorage.getItem(storageKey(file));
        if (!value) return [];
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return [];
        return parsed
          .filter(item => item && Number.isFinite(item.start) && Number.isFinite(item.end) && item.end > item.start && typeof item.text === "string" && typeof item.id === "string")
          .map(item => ({
            id: item.id,
            start: item.start,
            end: item.end,
            text: item.text,
            comment: typeof item.comment === "string" ? item.comment : ""
          }))
          .sort((a, b) => a.start - b.start || a.end - b.end);
      } catch (error) {
        return [];
      }
    }

    function writeHighlights(file, highlights) {
      try {
        if (!highlights.length) {
          localStorage.removeItem(storageKey(file));
          return;
        }
        localStorage.setItem(storageKey(file), JSON.stringify(highlights));
      } catch (error) {
        highlightStatus.textContent = "Highlights could not be saved in this browser.";
      }
    }

    function normalizeHighlights(doc) {
      const text = article.textContent || "";
      const stored = readHighlights(doc.file);
      const valid = [];
      let lastEnd = -1;
      for (const item of stored) {
        if (item.start < lastEnd) continue;
        if (item.start < 0 || item.end > text.length) continue;
        if (text.slice(item.start, item.end) !== item.text) continue;
        valid.push(item);
        lastEnd = item.end;
      }
      if (valid.length !== stored.length) {
        writeHighlights(doc.file, valid);
      }
      return valid;
    }

    function wrapTextRange(root, start, end, highlight) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const segments = [];
      let current = 0;
      let node = walker.nextNode();
      while (node) {
        const value = node.nodeValue || "";
        const next = current + value.length;
        const segmentStart = Math.max(start, current);
        const segmentEnd = Math.min(end, next);
        if (segmentStart < segmentEnd) {
          segments.push({
            node: node,
            start: segmentStart - current,
            end: segmentEnd - current
          });
        }
        current = next;
        if (current >= end) break;
        node = walker.nextNode();
      }
      for (let i = segments.length - 1; i >= 0; i--) {
        const segment = segments[i];
        const range = document.createRange();
        range.setStart(segment.node, segment.start);
        range.setEnd(segment.node, segment.end);
        const mark = document.createElement("mark");
        mark.className = "md-highlight";
        if (highlight.comment) {
          mark.classList.add("has-comment");
          mark.title = highlight.comment;
        }
        mark.dataset.highlightId = highlight.id;
        mark.appendChild(range.extractContents());
        range.insertNode(mark);
      }
    }

    function applyStoredHighlights(doc) {
      const highlights = normalizeHighlights(doc);
      for (const item of highlights) {
        wrapTextRange(article, item.start, item.end, item);
      }
      if (!highlights.some(item => item.id === activeHighlightId)) {
        activeHighlightId = null;
      }
      setActiveHighlight(activeHighlightId, false);
      updateHighlightUi(highlights);
    }

    function updateHighlightUi(highlights) {
      const count = highlights.length;
      if (!activeDoc) {
        highlightStatus.textContent = "No highlights";
        clearHighlights.disabled = true;
        highlightPrev.disabled = true;
        highlightNext.disabled = true;
        return;
      }
      if (count === 0) {
        highlightStatus.textContent = "No highlights";
        clearHighlights.disabled = true;
        highlightPrev.disabled = true;
        highlightNext.disabled = true;
        return;
      }
      const commentCount = highlights.filter(item => item.comment).length;
      const index = activeHighlightId ? highlights.findIndex(item => item.id === activeHighlightId) : -1;
      const countLabel = count === 1 ? "1 highlight" : count + " highlights";
      const commentLabel = commentCount === 1 ? "1 comment" : commentCount + " comments";
      highlightStatus.textContent = index >= 0 ? (index + 1) + " / " + count + " highlights - " + commentLabel : countLabel + " - " + commentLabel;
      clearHighlights.disabled = count === 0;
      highlightPrev.disabled = count === 0;
      highlightNext.disabled = count === 0;
    }

    function hideFloatingActions() {
      highlightAction.classList.remove("is-visible");
      highlightMenu.classList.remove("is-visible");
      deleteHighlightAction.classList.remove("is-visible");
      pendingDeleteId = null;
    }

    function hideCommentPanel() {
      highlightCommentPanel.classList.remove("is-visible");
    }

    function positionFloatingAction(button, rect) {
      button.classList.add("is-visible");
      const width = button.offsetWidth || 140;
      const height = button.offsetHeight || 36;
      const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 8));
      const preferredTop = rect.top - height - 8;
      const fallbackTop = rect.bottom + 8;
      const top = preferredTop >= 8 ? preferredTop : Math.min(fallbackTop, window.innerHeight - height - 8);
      button.style.left = left + "px";
      button.style.top = top + "px";
    }

    function marksForHighlight(id) {
      if (!id) return [];
      return Array.from(article.querySelectorAll("mark.md-highlight")).filter(mark => mark.dataset.highlightId === id);
    }

    function setActiveHighlight(id, updateStatus = true) {
      activeHighlightId = id || null;
      for (const mark of article.querySelectorAll("mark.md-highlight.active")) {
        mark.classList.remove("active");
      }
      for (const mark of marksForHighlight(activeHighlightId)) {
        mark.classList.add("active");
      }
      if (updateStatus && activeDoc) {
        updateHighlightUi(normalizeHighlights(activeDoc));
      }
    }

    function scrollToHighlight(id) {
      const mark = marksForHighlight(id)[0];
      if (!mark) return;
      mark.scrollIntoView({ block: "center", behavior: "smooth" });
    }

    function navigateHighlight(direction) {
      if (!activeDoc) return;
      const highlights = normalizeHighlights(activeDoc);
      if (!highlights.length) return;
      let index = highlights.findIndex(item => item.id === activeHighlightId);
      if (index < 0) {
        index = direction > 0 ? -1 : 0;
      }
      const nextIndex = (index + direction + highlights.length) % highlights.length;
      setActiveHighlight(highlights[nextIndex].id);
      hideFloatingActions();
      hideCommentPanel();
      scrollToHighlight(activeHighlightId);
    }

    function selectActiveHighlight() {
      const marks = marksForHighlight(activeHighlightId);
      if (!marks.length) return;
      const range = document.createRange();
      range.setStartBefore(marks[0]);
      range.setEndAfter(marks[marks.length - 1]);
      const selection = window.getSelection();
      if (!selection) return;
      suppressSelectionToolbar = true;
      selection.removeAllRanges();
      selection.addRange(range);
      scrollToHighlight(activeHighlightId);
      hideFloatingActions();
    }

    function openCommentPanel() {
      if (!activeDoc || !activeHighlightId) return;
      const highlight = readHighlights(activeDoc.file).find(item => item.id === activeHighlightId);
      const mark = marksForHighlight(activeHighlightId)[0];
      if (!highlight || !mark) return;
      highlightCommentText.value = highlight.comment || "";
      positionFloatingAction(highlightCommentPanel, mark.getBoundingClientRect());
      highlightCommentText.focus();
      hideFloatingActions();
    }

    function saveActiveHighlightComment() {
      if (!activeDoc || !activeHighlightId) return;
      const highlights = readHighlights(activeDoc.file).map(item => {
        if (item.id !== activeHighlightId) return item;
        return {
          id: item.id,
          start: item.start,
          end: item.end,
          text: item.text,
          comment: highlightCommentText.value.trim()
        };
      });
      writeHighlights(activeDoc.file, highlights);
      hideCommentPanel();
      refreshArticle();
      scrollToHighlight(activeHighlightId);
    }

    function textOffsetFor(node, offset) {
      const range = document.createRange();
      range.selectNodeContents(article);
      range.setEnd(node, offset);
      return range.toString().length;
    }

    function selectedHighlightCandidate() {
      const selection = window.getSelection();
      if (!activeDoc || !selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
      const range = selection.getRangeAt(0).cloneRange();
      if (!article.contains(range.startContainer) || !article.contains(range.endContainer)) return null;
      let start = textOffsetFor(range.startContainer, range.startOffset);
      let end = textOffsetFor(range.endContainer, range.endOffset);
      if (start > end) {
        const nextStart = end;
        end = start;
        start = nextStart;
      }
      const fullText = article.textContent || "";
      const selectedText = fullText.slice(start, end);
      const leading = (selectedText.match(/^\\s*/) || [""])[0].length;
      const trailing = (selectedText.match(/\\s*$/) || [""])[0].length;
      start += leading;
      end -= trailing;
      if (start >= end) return null;
      const rects = range.getClientRects();
      const rect = rects.length ? rects[0] : range.getBoundingClientRect();
      return {
        start: start,
        end: end,
        text: fullText.slice(start, end),
        rect: rect
      };
    }

    function refreshArticle() {
      if (!activeDoc) return;
      const top = window.scrollY;
      article.innerHTML = renderMarkdown(activeDoc.body);
      applyStoredHighlights(activeDoc);
      window.scrollTo({ top: top });
    }

    function savePendingHighlight() {
      if (!activeDoc || !pendingHighlight) return;
      const highlights = readHighlights(activeDoc.file);
      const overlaps = highlights.some(item => pendingHighlight.start < item.end && pendingHighlight.end > item.start);
      if (overlaps) {
        highlightStatus.textContent = "Selection overlaps an existing highlight.";
        hideFloatingActions();
        return;
      }
      highlights.push({
        id: "hl-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
        start: pendingHighlight.start,
        end: pendingHighlight.end,
        text: pendingHighlight.text,
        comment: ""
      });
      highlights.sort((a, b) => a.start - b.start || a.end - b.end);
      writeHighlights(activeDoc.file, highlights);
      activeHighlightId = highlights.find(item => item.start === pendingHighlight.start && item.end === pendingHighlight.end && item.text === pendingHighlight.text)?.id || null;
      window.getSelection()?.removeAllRanges();
      pendingHighlight = null;
      hideFloatingActions();
      refreshArticle();
    }

    function deletePendingHighlight() {
      const targetId = pendingDeleteId || activeHighlightId;
      if (!activeDoc || !targetId) return;
      const highlights = readHighlights(activeDoc.file).filter(item => item.id !== targetId);
      writeHighlights(activeDoc.file, highlights);
      activeHighlightId = null;
      pendingDeleteId = null;
      hideFloatingActions();
      hideCommentPanel();
      refreshArticle();
    }

    function clearCurrentHighlights() {
      if (!activeDoc) return;
      writeHighlights(activeDoc.file, []);
      activeHighlightId = null;
      pendingDeleteId = null;
      hideFloatingActions();
      hideCommentPanel();
      refreshArticle();
    }

    function setActive(file) {
      const doc = byFile.get(file) || docs[0];
      if (!doc) return;
      activeDoc = doc;
      activeHighlightId = null;
      pendingHighlight = null;
      hideFloatingActions();
      hideCommentPanel();
      document.title = doc.title + " · Markdown Viewer";
      pathLabel.textContent = doc.file;
      rawLink.href = doc.file;
      article.innerHTML = renderMarkdown(doc.body);
      applyStoredHighlights(doc);
      for (const link of docList.querySelectorAll(".doc-link")) {
        link.classList.toggle("active", link.dataset.file === doc.file);
      }
      const url = new URL(location.href);
      url.searchParams.set("file", doc.file);
      history.replaceState(null, "", url);
    }

    function renderList(filter = "") {
      const term = filter.trim().toLowerCase();
      const matches = docs.filter(doc => {
        if (!term) return true;
        return doc.title.toLowerCase().includes(term) || doc.file.toLowerCase().includes(term) || doc.body.toLowerCase().includes(term);
      });
      docList.innerHTML = matches.map(doc => {
        return '<a class="doc-link" data-file="' + escapeHtml(doc.file) + '" href="?file=' + encodeURIComponent(doc.file) + '">' +
          '<span class="doc-title">' + escapeHtml(doc.title) + '</span>' +
          '<span class="doc-path">' + escapeHtml(doc.file) + '</span>' +
        '</a>';
      }).join("");
      if (!matches.length) {
        docList.innerHTML = '<div class="empty">No documents match that search.</div>';
      }
    }

    docList.addEventListener("click", event => {
      const link = event.target.closest(".doc-link");
      if (!link) return;
      event.preventDefault();
      setActive(link.dataset.file);
    });

    search.addEventListener("input", () => {
      const current = new URL(location.href).searchParams.get("file");
      renderList(search.value);
      if (current) {
        for (const link of docList.querySelectorAll(".doc-link")) {
          link.classList.toggle("active", link.dataset.file === current);
        }
      }
    });

    for (const control of [highlightAction, selectHighlightAction, commentHighlightAction, deleteHighlightAction, saveHighlightComment, cancelHighlightComment]) {
      control.addEventListener("mousedown", event => {
        event.preventDefault();
      });
    }

    highlightCommentPanel.addEventListener("mousedown", event => {
      event.stopPropagation();
    });

    highlightMenu.addEventListener("mousedown", event => {
      event.preventDefault();
      event.stopPropagation();
    });

    highlightAction.addEventListener("click", savePendingHighlight);
    deleteHighlightAction.addEventListener("click", deletePendingHighlight);
    selectHighlightAction.addEventListener("click", selectActiveHighlight);
    commentHighlightAction.addEventListener("click", openCommentPanel);
    saveHighlightComment.addEventListener("click", saveActiveHighlightComment);
    cancelHighlightComment.addEventListener("click", hideCommentPanel);
    clearHighlights.addEventListener("click", clearCurrentHighlights);
    highlightPrev.addEventListener("click", () => navigateHighlight(-1));
    highlightNext.addEventListener("click", () => navigateHighlight(1));

    article.addEventListener("click", event => {
      const mark = event.target.closest("mark.md-highlight");
      if (!mark || !article.contains(mark)) return;
      setActiveHighlight(mark.dataset.highlightId);
      pendingDeleteId = activeHighlightId;
      pendingHighlight = null;
      highlightAction.classList.remove("is-visible");
      hideCommentPanel();
      positionFloatingAction(highlightMenu, mark.getBoundingClientRect());
      event.stopPropagation();
    });

    document.addEventListener("selectionchange", () => {
      if (selectionFrame) {
        cancelAnimationFrame(selectionFrame);
      }
      selectionFrame = requestAnimationFrame(() => {
        if (suppressSelectionToolbar) {
          suppressSelectionToolbar = false;
          pendingHighlight = null;
          highlightAction.classList.remove("is-visible");
          return;
        }
        const candidate = selectedHighlightCandidate();
        if (!candidate) {
          pendingHighlight = null;
          highlightAction.classList.remove("is-visible");
          return;
        }
        pendingHighlight = candidate;
        pendingDeleteId = null;
        highlightMenu.classList.remove("is-visible");
        hideCommentPanel();
        positionFloatingAction(highlightAction, candidate.rect);
      });
    });

    document.addEventListener("click", event => {
      if (highlightMenu.contains(event.target) || highlightCommentPanel.contains(event.target)) return;
      if (event.target.closest("mark.md-highlight")) return;
      hideFloatingActions();
    });

    window.addEventListener("resize", hideFloatingActions);
    window.addEventListener("scroll", hideFloatingActions, { passive: true });

    renderList();
    const initial = new URL(location.href).searchParams.get("file");
    setActive(initial && byFile.has(initial) ? initial : docs[0]?.file);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(programDir, "md-viewer.html"), html);
console.log(`Generated md-viewer.html with ${docs.length} Markdown files.`);
