const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const urlPath = new URL(req.url, `http://${req.headers.host}`).pathname;
            const filename = urlPath === '/' ? 'home' : urlPath.replace(/^\//, '').replace(/\//g, '_');
            fs.writeFileSync(`/Users/xiaodao/VSCodeProjects/rentahuman/dom_${filename}.html`, body);
            console.log(`Saved dom_${filename}.html`);
            res.end('ok');
        });
    } else {
        res.end('ok');
    }
});

server.listen(3005, () => {
    console.log('DOM receiver listening on port 3005');
});
