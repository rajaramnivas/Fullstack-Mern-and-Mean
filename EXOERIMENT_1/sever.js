// Simple Node.js server to serve static HTML and CSS without Express
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html.txt' : req.url);
    // Remove query string
    filePath = filePath.split('?')[0];

    // Add .txt extension if requesting index.html or style.css
    if (req.url === '/' || req.url === '/index.html' || req.url === '/index.html.txt') {
        filePath = path.join(PUBLIC_DIR, 'index.html.txt');
    } else if (req.url === '/style.css' || req.url === '/style.css.txt') {
        filePath = path.join(PUBLIC_DIR, 'style.css.txt');
    }

    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css' || filePath.endsWith('style.css.txt')) {
        contentType = 'text/css';
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
