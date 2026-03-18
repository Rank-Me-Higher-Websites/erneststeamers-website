import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

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

const server = createServer(async (req, res) => {
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
