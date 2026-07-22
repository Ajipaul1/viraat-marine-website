const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

function hideVesselsFromNav(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      hideVesselsFromNav(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Regex pattern to remove the entire Vessels dropdown li from top nav header
      const dropdownRegex = /<li class="dropdown-item-wrapper">[\s\S]*?<\/li>/gi;

      if (dropdownRegex.test(content)) {
        content = content.replace(dropdownRegex, '');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Hidden Vessels dropdown from nav header in: ${path.relative(PUBLIC_DIR, fullPath)}`);
      }
    }
  }
}

hideVesselsFromNav(PUBLIC_DIR);
console.log('Successfully hidden Vessels from public navigation header across all HTML files!');
