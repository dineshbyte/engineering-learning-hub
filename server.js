#!/usr/bin/env node
/**
 * Tiny zero-dependency static file server for the Learning Hub.
 *
 * WHY THIS EXISTS
 *   reader.html loads .epub files with fetch/XHR. Chromium browsers (Brave,
 *   Chrome, Edge) block fetch() of file:// resources for security, so opening
 *   the reader straight from disk (file://) cannot auto-load a book. Serving
 *   the folder over http:// (same-origin) makes those requests legal in every
 *   browser — no external service, no third-party hosting.
 *
 * USAGE
 *   npm start              # then open http://localhost:8000/
 *   PORT=3000 npm start    # pick another port
 *   node server.js         # same thing without npm
 *
 * No dependencies and no `npm install`: this uses only Node's built-in modules.
 */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;                          // serve this repo folder
const PORT = Number(process.env.PORT) || 8000;
const HOST = process.env.HOST || '127.0.0.1';    // localhost only (not exposed to the LAN)

// Extension -> MIME type. The critical entry is .epub: without
// application/epub+zip, some readers refuse to parse the downloaded bytes.
// The .xhtml/.opf/.ncx entries help the reader fetch an epub's internals when
// it is ever unzipped/served directly.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm':  'text/html; charset=utf-8',
  '.js':   'text/javascript; charset=utf-8',
  '.mjs':  'text/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.webp': 'image/webp',
  '.ico':  'image/x-icon',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.ttf':  'font/ttf',
  '.txt':  'text/plain; charset=utf-8',
  '.md':   'text/markdown; charset=utf-8',
  '.epub': 'application/epub+zip',
  '.xhtml':'application/xhtml+xml; charset=utf-8',
  '.opf':  'application/oebps-package+xml',
  '.ncx':  'application/x-dtbncx+xml',
};

const server = http.createServer((req, res) => {
  // 1) Take only the path, drop the query string, and percent-decode it.
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  // 2) Directory request -> serve its index.html.
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // 3) Resolve against ROOT and block path traversal (../ escaping the folder).
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  // 4) Stat, then stream the file (streaming keeps multi-MB epubs memory-cheap).
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + urlPath);
      return;
    }
    const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
    });
    const stream = fs.createReadStream(filePath);
    stream.on('error', () => {
      // Headers may already be sent; just end the response.
      try { res.end(); } catch (e) { /* ignore */ }
    });
    stream.pipe(res);
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('\n  Port ' + PORT + ' is already in use.');
    console.error('  Try a different one:  PORT=8080 npm start\n');
  } else {
    console.error('\n  Server error:', err.message, '\n');
  }
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  const base = 'http://localhost:' + PORT;
  console.log('\n  Learning Hub is running — no external service needed.\n');
  console.log('    Hub     ' + base + '/');
  console.log('    Reader  ' + base + '/reader.html   (in-browser EPUB reader)\n');
  console.log('  Now EPUB previews work in any browser. Press Ctrl+C to stop.\n');
});
