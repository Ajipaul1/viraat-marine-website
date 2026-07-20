const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://www.viraatmarine.com';
const DOMAIN_ALT = 'https://viraatmarine.com';
const TARGET_DIR = path.join(__dirname, 'public');

// Create the target public directory if it doesn't exist
if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

const visitedPages = new Set();
const visitedAssets = new Set();
const pageQueue = ['/'];
const assetQueue = [];

// Helper to determine if a URL is local to viraatmarine.com
function getLocalPath(urlStr, referrerUrl = '/') {
  if (!urlStr) return null;
  
  // Trim spaces and remove quotes
  let cleaned = urlStr.trim().replace(/^['"]|['"]$/g, '');
  
  // Ignore anchor links, mailto, tel, javascript
  if (cleaned.startsWith('#') || cleaned.startsWith('mailto:') || cleaned.startsWith('tel:') || cleaned.startsWith('javascript:')) {
    return null;
  }
  
  let absoluteUrl;
  try {
    // If it's already an absolute URL
    if (cleaned.startsWith('http://') || cleaned.startsWith('https://')) {
      absoluteUrl = new URL(cleaned);
    } else if (cleaned.startsWith('//')) {
      absoluteUrl = new URL('https:' + cleaned);
    } else {
      // Resolve relative path against referrer URL
      const base = new URL(referrerUrl, DOMAIN);
      absoluteUrl = new URL(cleaned, base);
    }
  } catch (e) {
    return null;
  }
  
  // Check if it's on our domain
  if (absoluteUrl.hostname === 'www.viraatmarine.com' || absoluteUrl.hostname === 'viraatmarine.com') {
    return absoluteUrl.pathname + absoluteUrl.search;
  }
  
  return null;
}

// Helper to download and save a file
async function downloadFile(localPath, type) {
  // Normalize local path (remove leading slash)
  let cleanPath = localPath;
  if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }
  
  // Remove query parameters for filename
  let filePath = cleanPath.split('?')[0];
  if (!filePath || filePath === '') {
    filePath = 'index.html';
  } else if (type === 'page' && !filePath.endsWith('.html') && !filePath.endsWith('.php')) {
    filePath = filePath + '.html';
  }
  
  const fullPath = path.join(TARGET_DIR, filePath);
  
  // Ensure directory exists
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  
  const downloadUrl = DOMAIN + localPath;
  console.log(`Downloading (${type}): ${downloadUrl} -> ${fullPath}`);
  
  try {
    const response = await fetch(downloadUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      console.error(`Failed to download ${downloadUrl}: ${response.status} ${response.statusText}`);
      return null;
    }
    
    if (type === 'page' || type === 'css' || type === 'js') {
      const text = await response.text();
      fs.writeFileSync(fullPath, text, 'utf8');
      return { text, fullPath, filePath };
    } else {
      const buffer = await response.arrayBuffer();
      fs.writeFileSync(fullPath, Buffer.from(buffer));
      return { binary: true, fullPath, filePath };
    }
  } catch (err) {
    console.error(`Error downloading ${downloadUrl}:`, err.message);
    return null;
  }
}

// Simple regex parser to find links in HTML
function parseHtml(htmlText, currentPagePath) {
  const urls = [];
  
  // 1. Find src="..." attributes
  const srcRegex = /src=["']([^"']+)["']/g;
  let match;
  while ((match = srcRegex.exec(htmlText)) !== null) {
    urls.push({ url: match[1], type: 'asset' });
  }
  
  // 2. Find href="..." attributes
  const hrefRegex = /href=["']([^"']+)["']/g;
  while ((match = hrefRegex.exec(htmlText)) !== null) {
    const urlStr = match[1];
    // Check if it's an asset (ends with css, js, png, jpg, jpeg, gif, svg, webp, ico, woff, woff2, ttf, pdf)
    const isAsset = /\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|pdf)(\?.*)?$/i.test(urlStr.split('#')[0]);
    urls.push({ url: urlStr, type: isAsset ? 'asset' : 'page' });
  }
  
  // 3. Find background style url(...)
  const urlStyleRegex = /url\(['"]?([^'")]+)['"]?\)/g;
  while ((match = urlStyleRegex.exec(htmlText)) !== null) {
    urls.push({ url: match[1], type: 'asset' });
  }
  
  // 4. Find link tags with preload/icon/etc.
  const linkRelRegex = /<link[^>]+href=["']([^"']+)["']/g;
  while ((match = linkRelRegex.exec(htmlText)) !== null) {
    urls.push({ url: match[1], type: 'asset' });
  }

  // 5. Look for og:image
  const ogImageRegex = /property="og:image"[^>]+content=["']([^"']+)["']/g;
  while ((match = ogImageRegex.exec(htmlText)) !== null) {
    urls.push({ url: match[1], type: 'asset' });
  }
  const ogImageSecureRegex = /property="og:image:secure_url"[^>]+content=["']([^"']+)["']/g;
  while ((match = ogImageSecureRegex.exec(htmlText)) !== null) {
    urls.push({ url: match[1], type: 'asset' });
  }

  // Process found URLs
  for (const item of urls) {
    const localPath = getLocalPath(item.url, currentPagePath);
    if (!localPath) continue;
    
    if (item.type === 'page') {
      const pagePath = localPath.split('#')[0].split('?')[0];
      if (!visitedPages.has(pagePath) && !pageQueue.includes(pagePath)) {
        pageQueue.push(pagePath);
      }
    } else {
      if (!visitedAssets.has(localPath) && !assetQueue.includes(localPath)) {
        assetQueue.push(localPath);
      }
    }
  }
}

// Replace remote domain references in a text file with relative/local paths
function rewriteUrls(text) {
  let rewritten = text;
  // Replace absolute domain urls with / (so they resolve to local root)
  rewritten = rewritten.replaceAll(DOMAIN + '/', '/');
  rewritten = rewritten.replaceAll(DOMAIN_ALT + '/', '/');
  rewritten = rewritten.replaceAll(DOMAIN, '');
  rewritten = rewritten.replaceAll(DOMAIN_ALT, '');
  
  return rewritten;
}

// Crawler for CSS files to discover fonts and images referenced inside url()
async function crawlCss(cssText, cssLocalPath) {
  const urlRegex = /url\(['"]?([^'")]+)['"]?\)/g;
  let match;
  const foundAssets = [];
  while ((match = urlRegex.exec(cssText)) !== null) {
    const urlStr = match[1];
    const localPath = getLocalPath(urlStr, cssLocalPath);
    if (localPath) {
      foundAssets.push(localPath);
    }
  }
  
  for (const assetPath of foundAssets) {
    if (!visitedAssets.has(assetPath) && !assetQueue.includes(assetPath)) {
      assetQueue.push(assetPath);
    }
  }
}

async function startCrawl() {
  console.log('--- Starting Crawl ---');
  
  // 1. Crawl all pages
  while (pageQueue.length > 0) {
    const pagePath = pageQueue.shift();
    if (visitedPages.has(pagePath)) continue;
    
    visitedPages.add(pagePath);
    
    // Download HTML
    const result = await downloadFile(pagePath, 'page');
    if (result) {
      // Parse HTML to discover more pages and assets
      parseHtml(result.text, pagePath);
      
      // Rewrite URLs in the HTML text and save back
      const rewrittenHtml = rewriteUrls(result.text);
      fs.writeFileSync(result.fullPath, rewrittenHtml, 'utf8');
      console.log(`Saved rewritten HTML: ${result.filePath}`);
    }
  }
  
  console.log('\n--- Pages Crawled. Now Crawling Assets ---');
  console.log(`Total assets in queue: ${assetQueue.length}`);
  
  // 2. Download all discovered assets
  while (assetQueue.length > 0) {
    const assetPath = assetQueue.shift();
    if (visitedAssets.has(assetPath)) continue;
    
    visitedAssets.add(assetPath);
    
    const isCss = assetPath.split('?')[0].endsWith('.css');
    const isJs = assetPath.split('?')[0].endsWith('.js');
    const type = isCss ? 'css' : (isJs ? 'js' : 'binary');
    
    const result = await downloadFile(assetPath, type);
    if (result && isCss) {
      // If it's CSS, we read its contents, find font/image urls inside, and rewrite them
      let cssText = result.text;
      await crawlCss(cssText, assetPath);
      const rewrittenCss = rewriteUrls(cssText);
      fs.writeFileSync(result.fullPath, rewrittenCss, 'utf8');
    } else if (result && isJs) {
      // If it's JS, rewrite URLs
      let jsText = result.text;
      const rewrittenJs = rewriteUrls(jsText);
      fs.writeFileSync(result.fullPath, rewrittenJs, 'utf8');
    }
  }
  
  console.log('\n--- Crawl Completed ---');
  console.log(`Visited Pages:`, Array.from(visitedPages));
  console.log(`Visited Assets Count:`, visitedAssets.size);
}

startCrawl();
