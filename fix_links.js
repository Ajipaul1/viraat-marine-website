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

  // Fix logo link: <a href="" class="logo"> -> <a href="/" class="logo">
  content = content.replace(/<a href="" class="logo">/g, '<a href="/" class="logo">');
  
  // Fix nav home link: <li><a href="">Home</a></li> or <li><a href="" class="active">Home</a></li>
  content = content.replace(/<li><a href="">Home<\/a><\/li>/g, '<li><a href="/">Home</a></li>');
  content = content.replace(/<li><a href="" class="active">Home<\/a><\/li>/g, '<li><a href="/" class="active">Home</a></li>');
  content = content.replace(/<li><a href="">Home<\/a> > <\/li>/g, '<li><a href="/">Home</a> > </li>');
  
  // Fix breadcrumb career link: <li><a href="">Career</a></li> -> <li><a href="/career">Career</a></li>
  content = content.replace(/<li><a href="">Career<\/a><\/li>/g, '<li><a href="/career">Career</a></li>');

  // Fix footer copyright link
  content = content.replace(/<a href="www\.viraatmarine\.com">/g, '<a href="/">');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated links in: ${path.relative(PUBLIC_DIR, filePath)}`);
  }
}

console.log('Finished updating HTML links!');
