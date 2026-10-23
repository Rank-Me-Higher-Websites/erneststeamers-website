import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Server-only. Set N8N_WEBHOOK_URL in the host environment; never expose it to the client.
const N8N_WEBHOOK_URL = (process.env.N8N_WEBHOOK_URL || '').trim();

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = join(__dirname, 'dist');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const readBody = (req) => new Promise((resolve, reject) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
    if (data.length > 1e6) { req.destroy(); reject(new Error('payload too large')); }
  });
  req.on('end', () => resolve(data));
  req.on('error', reject);
});

const json = (res, status, body) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
};

const server = createServer(async (req, res) => {
  // API: log a lead
  if (req.method === 'POST' && req.url === '/api/leads') {
    try {
      const raw = await readBody(req);
      const d = JSON.parse(raw || '{}');
      const ip = (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim()
        || req.socket.remoteAddress || '';
      const ua = (req.headers['user-agent'] || '').toString().slice(0, 500);
      const result = await pool.query(
        `INSERT INTO leads (name, email, phone, address, service, rooms, square_footage, preferred_date, message, source, user_agent, ip)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, created_at`,
        [
          d.name || null, d.email || null, d.phone || null, d.address || null,
          d.service || null, d.rooms || null, d.squareFootage || null,
          d.preferredDate || null, d.message || null, d.source || null, ua, ip,
        ]
      );

      // Forward server-side so the webhook URL stays out of the client bundle.
      // A missing URL or a failed forward must not fail the saved lead.
      if (!N8N_WEBHOOK_URL) {
        console.error('N8N_WEBHOOK_URL is not set; lead saved without n8n forward');
      } else {
        try {
          const n8nRes = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: d.name || '',
              email: d.email || '',
              phone: d.phone || '',
              address: d.address || '',
              service: d.service || '',
              rooms: d.rooms || '',
              squareFootage: d.squareFootage || '',
              preferredDate: d.preferredDate || '',
              message: d.message || '',
              source: d.source || '',
            }),
          });
          if (!n8nRes.ok) console.error('n8n webhook non-200:', n8nRes.status);
        } catch (whErr) {
          console.error('n8n webhook error:', whErr);
        }
      }

      return json(res, 200, { ok: true, id: result.rows[0].id });
    } catch (err) {
      console.error('lead insert error:', err);
      return json(res, 500, { ok: false, error: 'failed to log lead' });
    }
  }

  // Static + SPA fallback
  let filePath = join(distDir, req.url === '/' ? 'index.html' : req.url);
  const ext = extname(filePath);

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  } catch {
    const indexData = await readFile(join(distDir, 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(indexData);
  }
});

server.listen(5000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:5000');
});
