const fs = require('fs');
const https = require('https');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const assetsDir = path.join(publicDir, 'assets');

if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
}

function download(url, dest) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, response => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                fs.unlink(dest, () => reject(`Server responded with ${response.statusCode}: ${url}`));
            }
        }).on('error', err => {
            fs.unlink(dest, () => reject(err.message));
        });
    });
}

const htmlFiles = [
    path.join(__dirname, '..', 'dom_home.html'),
    path.join(__dirname, '..', 'dom_services.html'),
    path.join(__dirname, '..', 'dom_bounties.html'),
    path.join(__dirname, '..', 'dom_verify.html')
];

// Regex to capture full URLs or relative paths like /_next/image?url=...
const srcRegex = /(?:src|href|srcset)=["'](.*?)["']/gi;
const bgUrlRegex = /url\(["']?(.*?)["']?\)/gi;

const downloadedUrls = new Set();
const downloadPromises = [];

async function extractAndDownload() {
    for (const file of htmlFiles) {
        if (!fs.existsSync(file)) continue;
        const content = fs.readFileSync(file, 'utf-8');

        const processUrl = (rawUrl) => {
            // Handle Next.js specific image URLs (_next/image?url=...)
            if (rawUrl.includes('_next/image?url=')) {
                try {
                    const params = new URLSearchParams(rawUrl.split('?')[1]);
                    rawUrl = params.get('url') || rawUrl;
                    rawUrl = decodeURIComponent(rawUrl);
                } catch (e) { }
            }

            // Skip data URIs or empty
            if (!rawUrl || rawUrl.startsWith('data:')) return;

            // Handle root relative and absolute URLs
            let fullUrl = rawUrl;
            if (rawUrl.startsWith('/')) {
                fullUrl = `https://rentahuman.ai${rawUrl}`;
            } else if (!rawUrl.startsWith('http')) {
                return; // Ignore other relative logic
            }

            // Only care about image extensions or typical Next.js static paths
            if (fullUrl.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)/i)) {
                if (!downloadedUrls.has(fullUrl)) {
                    downloadedUrls.add(fullUrl);

                    // Generate safe filename from url
                    const cleanUrl = fullUrl.split('?')[0];
                    let filename = path.basename(cleanUrl);
                    if (!filename || filename.length < 3) {
                        filename = `img_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                    }

                    const dest = path.join(assetsDir, filename);
                    console.log(`Queueing: ${fullUrl} -> ${filename}`);
                    downloadPromises.push(download(fullUrl, dest).catch(e => console.error(`Failed: ${fullUrl}`, e)));
                }
            }
        };

        let match;
        while ((match = srcRegex.exec(content)) !== null) {
            // Handle srcset splits (e.g. "url 1x, url2 2x")
            const urls = match[1].split(',').map(u => u.trim().split(' ')[0]);
            urls.forEach(processUrl);
        }

        while ((match = bgUrlRegex.exec(content)) !== null) {
            processUrl(match[1]);
        }
    }

    await Promise.all(downloadPromises);
    console.log(`Finished downloading ${downloadedUrls.size} assets.`);
}

extractAndDownload();
