const fs = require('fs');
const path = require('path');

const imgDir1 = path.join(__dirname, 'public', '2_FrontEnd', 'img');
const imgDir2 = path.join(__dirname, 'public', 'public', '2_FrontEnd', 'img');

console.log('Dir 1:', fs.readdirSync(imgDir1).filter(f => f.includes('logo')));
console.log('Dir 2:', fs.readdirSync(imgDir2).filter(f => f.includes('logo')));
