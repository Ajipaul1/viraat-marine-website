const fs = require('fs');
const path = require('path');

const cssPath1 = path.join(__dirname, 'public', 'public', '2_FrontEnd', 'css', 'style.css');
const cssPath2 = path.join(__dirname, 'public', 'public', '2_FrontEnd', 'css', 'media.css');

const css1 = fs.readFileSync(cssPath1, 'utf8');
const css2 = fs.readFileSync(cssPath2, 'utf8');

console.log('=== SEARCHING HEADER IN MEDIA.CSS ===');
const mediaLines = css2.split('\n').filter(line => line.includes('main_nav_header') || line.includes('logo') || line.includes('header'));
console.log(mediaLines.slice(0, 30).join('\n'));
