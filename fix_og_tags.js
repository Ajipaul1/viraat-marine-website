const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');

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

  // Replace og:image tags with high resolution standards for social preview
  content = content.replace(/<meta property="og:image:width" content="16" \/>/g, '<meta property="og:image:width" content="1200" />');
  content = content.replace(/<meta property="og:image:height" content="9" \/>/g, '<meta property="og:image:height" content="630" />');
  content = content.replace(/<meta property="og:image:type" content="image\/webp">/g, '<meta property="og:image:type" content="image/png">');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated OG tags in: ${path.relative(PUBLIC_DIR, filePath)}`);
  }
}

console.log('Done updating OG tags!');
