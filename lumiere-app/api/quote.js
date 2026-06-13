/**
 * Vercel Serverless Function — POST /api/quote
 *
 * Accepts a partial order JSON, computes a price using the same rules as the
 * in-app Order Assistant (Lumière S5 demo), and returns a dummy payment link.
 *
 * Called by:
 *   - The n8n bakery workflow (Gmail + Telegram + chat triggers)
 *   - Anyone else who POSTs JSON with { flavour, size, eggless?, fondant? }
 *
 * Mirrors server.js (the Node-only local-dev version) — kept in lockstep.
 */

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
  let m = s.match(/([\d.]+)\s*kgs?/);
  if (m) return parseFloat(m[1]);
  m = s.match(/([\d.]+)\s*g/);
  if (m) return parseFloat(m[1]) / 1000;
  m = s.match(/^([\d.]+)$/);
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

// Vercel injects req and res like Node's http module. req.body is auto-parsed
// when content-type is application/json.
export default function handler(req, res) {
  // CORS — n8n.cloud and the bakery site both POST from different origins.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'POST only' });
    return;
  }

  let order = req.body;
  // Some clients send a JSON string instead of a parsed object.
  if (typeof order === 'string') {
    try { order = JSON.parse(order); }
    catch { res.status(400).json({ ok: false, error: 'invalid JSON' }); return; }
  }
  if (!order || typeof order !== 'object') {
    res.status(400).json({ ok: false, error: 'expected JSON body' });
    return;
  }

  const quote = computeQuote(order);
  res.status(quote.ok ? 200 : 400).json(quote);
}
