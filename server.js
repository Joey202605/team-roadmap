const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  let f = req.url === '/' ? '/address_ai_reporter.html' : req.url;
  let p = path.join(__dirname, f.replace(/^\//, ''));
  fs.readFile(p, (e, d) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    let ext = path.extname(p);
    let ct = { 'html': 'text/html', 'js': 'text/javascript', 'css': 'text/css' }[ext.slice(1)] || 'text/plain';
    res.writeHead(200, { 'Content-Type': ct + '; charset=utf-8' });
    res.end(d);
  });
}).listen(8080, () => console.log('Server running at http://localhost:8080'));
