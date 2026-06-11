#!/usr/bin/env node
/**
 * Lumière S5 backend — tiny Node server.
 *
 * Replaces the static Python http.server. Adds ONE real endpoint:
 *   POST /api/quote   → accepts an order JSON, returns price + dummy
 *                       payment link, using the SAME pricing rules as
 *                       the in-app Order Assistant (Lumière S5 demo).
 *
 * Everything else (the index.html app, the KB files in the parent
 * folder) is served as-is — same URLs, same behaviour.
 *
 * Run from the app folder:  node server.js
 * Default port 8000; override with PORT env.
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT || '8000', 10);
const ROOT = path.resolve(__dirname, '..');          // serve from one level up
const APP_DIR = 'lumiere-bakery-s5-app';

// ─── PRICING RULES (mirrors the in-app Order Assistant) ────────────────
const PRICE_PER_KG = {
  'chocolate':        950,
  'vanilla':          850,
  'red velvet':      1050,
  'mango coconut':   1200,
  'hazelnut praline': 1300,
  'lemon zest':       950,
  'black forest':    1000,
};
const EGGLESS_SURCHARGE = 80;   // per cake
const FONDANT_MULTIPLIER = 1.20;

function normalizeFlavour(raw) {
  if (!raw) return null;
  const f = String(raw).toLowerCase().trim();
  if (/red\s*velvet/.test(f)) return 'red velvet';
  if (/mango/.test(f))        return 'mango coconut';
  if (/hazel/.test(f))        return 'hazelnut praline';
  if (/lemon/.test(f))        return 'lemon zest';
  if (/black\s*forest/.test(f)) return 'black forest';
  if (/chocolate|choco/.test(f)) return 'chocolate';
  if (/vanilla/.test(f))      return 'vanilla';
  return f;
}

function parseSizeKg(raw) {
  if (raw == null) return null;
  const s = String(raw).toLowerCase().trim();
  // Match "1kg", "1 kg", "500g", "1.5kg", "2kgs", etc.
  let m = s.match(/([\d.]+)\s*kgs?/);
  if (m) return parseFloat(m[1]);
  m = s.match(/([\d.]+)\s*g/);
  if (m) return parseFloat(m[1]) / 1000;
  m = s.match(/^([\d.]+)$/);   // plain number → assume kg
  if (m) return parseFloat(m[1]);
  return null;
}

function computeQuote(order) {
  const flavour = normalizeFlavour(order.flavour);
  const sizeKg  = parseSizeKg(order.size);
  const eggless = !!order.eggless;
  const fondant = !!order.fondant;

  const errors = [];
  if (!flavour) errors.push('flavour missing or unrecognised');
  if (!sizeKg || sizeKg <= 0) errors.push('size missing or invalid');
  if (errors.length) return { ok: false, errors };

  const perKg = PRICE_PER_KG[flavour];
  if (perKg == null) return { ok: false, errors: [`flavour "${flavour}" not on menu`] };

  let subtotal = perKg * sizeKg;
  if (eggless) subtotal += EGGLESS_SURCHARGE;
  if (fondant) subtotal = subtotal * FONDANT_MULTIPLIER;

  const total = Math.round(subtotal);
  const orderId = 'LUM-' + Date.now().toString(36).toUpperCase()
                + '-' + Math.floor(Math.random() * 9000 + 1000);
  const paymentUrl = `https://pay.lumiere.demo/order/${orderId}?amount=${total}`;

  return {
    ok: true,
    orderId,
    currency: 'INR',
    amount: total,
    breakdown: {
      flavour,
      sizeKg,
      perKg,
      base: Math.round(perKg * sizeKg),
      egglessSurcharge: eggless ? EGGLESS_SURCHARGE : 0,
      fondantApplied: fondant,
    },
    paymentUrl,
    expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
  };
}

// ─── HTTP HANDLER ──────────────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md':   'text/markdown; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg', '.jpeg': 'image/jpeg',
  '.ico':  'image/x-icon',
};

function sendJson(res, code, obj) {
  const body = JSON.stringify(obj, null, 2);
  res.writeHead(code, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + filePath.replace(ROOT, ''));
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  // ─── API ────────────────────────────────────────────────────────────
  if (u.pathname === '/api/quote' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e5) req.destroy(); });
    req.on('end', () => {
      let order;
      try { order = JSON.parse(body || '{}'); }
      catch { return sendJson(res, 400, { ok: false, error: 'invalid JSON' }); }
      const quote = computeQuote(order);
      sendJson(res, quote.ok ? 200 : 400, quote);
    });
    return;
  }

  // Health check
  if (u.pathname === '/api/health') {
    return sendJson(res, 200, { ok: true, service: 'lumiere-s5-backend', version: 1 });
  }

  // ─── STATIC ─────────────────────────────────────────────────────────
  // Strip query, decode, resolve safely within ROOT.
  let urlPath = decodeURIComponent(u.pathname);
  if (urlPath === '/' || urlPath === '') urlPath = `/${APP_DIR}/`;
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const fullPath = path.resolve(ROOT, '.' + urlPath);
  if (!fullPath.startsWith(ROOT)) {
    res.writeHead(403); res.end('forbidden'); return;
  }
  serveFile(res, fullPath);
});

server.listen(PORT, () => {
  console.log(`Lumière S5 backend listening on http://localhost:${PORT}`);
  console.log(`  App:    http://localhost:${PORT}/${APP_DIR}/`);
  console.log(`  Quote:  POST http://localhost:${PORT}/api/quote`);
  console.log(`  Health: GET  http://localhost:${PORT}/api/health`);
});
