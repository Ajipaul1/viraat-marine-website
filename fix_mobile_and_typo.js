const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const MEDIA_CSS_PATH = path.join(PUBLIC_DIR, 'public', '2_FrontEnd', 'css', 'media.css');

// 1. Fix typo "Co-orporate office" -> "Corporate office" in all HTML files
function getAllFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, allFiles);
    } else if (file.endsWith('.html')) {
      allFiles.push(fullPath);
    }
  }
  return allFiles;
}

const htmlFiles = getAllFiles(PUBLIC_DIR);

for (const filePath of htmlFiles) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Fix typo
  content = content.replace(/Co-orporate office/gi, 'Corporate office');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated typo in: ${path.relative(PUBLIC_DIR, filePath)}`);
  }
}

// 2. Fix Mobile Header Overlap by adding solid background on mobile views in media.css
if (fs.existsSync(MEDIA_CSS_PATH)) {
  let mediaCss = fs.readFileSync(MEDIA_CSS_PATH, 'utf8');
  
  // Ensure header has solid background on mobile so content behind it doesn't bleed through
  const mobileHeaderFix = `\n/* Fix Mobile Header Overlap & Transparency */\n@media(max-width:991px){\n  header, header.header-scroll-active {\n    background: #091d3e !important;\n    box-shadow: 0 4px 12px rgba(0,0,0,0.3);\n  }\n  .mobile-view {\n    top: 50% !important;\n    transform: translateY(-50%);\n  }\n}\n`;
  
  if (!mediaCss.includes('Fix Mobile Header Overlap')) {
    mediaCss += mobileHeaderFix;
    fs.writeFileSync(MEDIA_CSS_PATH, mediaCss, 'utf8');
    console.log('Added Mobile Header Overlap fix to media.css');
  }
}

console.log('Done fixing mobile layout and typos!');
