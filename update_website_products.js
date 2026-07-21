const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const STYLE_CSS_PATH = path.join(PUBLIC_DIR, 'public', '2_FrontEnd', 'css', 'style.css');
const SERVER_JS_PATH = path.join(__dirname, 'server.js');
const VESSELS_DIR = path.join(PUBLIC_DIR, 'vessels');

if (!fs.existsSync(VESSELS_DIR)) {
  fs.mkdirSync(VESSELS_DIR, { recursive: true });
}

// 1. Append Dropdown CSS to style.css
const dropdownCSS = `
/* ========================================================================== */
/* PRODUCTS DROPDOWN NAVIGATION STYLING                                       */
/* ========================================================================== */
.dropdown-item-wrapper {
  position: relative;
}

.dropdown-toggle-link {
  display: flex !important;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.dropdown-toggle-link .arrow-down {
  font-size: 11px;
  transition: transform 0.3s ease;
}

.dropdown-item-wrapper:hover .arrow-down {
  transform: rotate(180deg);
  color: var(--main-blue);
}

.sub-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 250px;
  background: rgba(9, 29, 62, 0.98);
  border: 1px solid rgba(15, 190, 210, 0.25);
  border-radius: 8px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
  padding: 12px 0 !important;
  margin-top: 10px !important;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: 10000;
  display: block !important;
}

.dropdown-item-wrapper:hover .sub-dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.sub-dropdown-menu li {
  display: block !important;
  margin: 0 !important;
  width: 100%;
}

.sub-dropdown-menu li a {
  display: block !important;
  padding: 10px 20px !important;
  color: #e2e8f0 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.sub-dropdown-menu li a:hover {
  background: rgba(15, 190, 210, 0.15) !important;
  color: var(--main-blue) !important;
  border-left-color: var(--main-blue);
  padding-left: 24px !important;
}

.sub-dropdown-menu .dropdown-header-title {
  padding: 8px 20px 4px 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #94a3b8;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 4px;
}

/* Fleet Catalog Card Styles */
.vessel-card {
  background: #091d3e;
  border: 1px solid rgba(15, 190, 210, 0.2);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.35s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.vessel-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(15, 190, 210, 0.2);
  border-color: var(--main-blue);
}

.vessel-img-wrapper {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.vessel-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.vessel-card:hover .vessel-img-wrapper img {
  transform: scale(1.08);
}

.vessel-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(9, 29, 62, 0.85);
  backdrop-filter: blur(8px);
  color: var(--main-blue);
  border: 1px solid var(--main-blue);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.vessel-card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.vessel-card-body h3 {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  line-height: 1.3;
}

.vessel-card-body p {
  color: #94a3b8;
  font-size: 15px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.vessel-specs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 24px;
  background: rgba(255, 255, 255, 0.03);
  padding: 12px;
  border-radius: 8px;
}

.spec-item {
  font-size: 13px;
  color: #cbd5e1;
}

.spec-item strong {
  color: var(--main-blue);
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn-vessel-details {
  display: inline-block;
  text-align: center;
  background: transparent;
  color: var(--main-blue);
  border: 1px solid var(--main-blue);
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.3s ease;
  width: 100%;
}

.btn-vessel-details:hover {
  background: var(--main-blue);
  color: #091d3e;
}
`;

if (fs.existsSync(STYLE_CSS_PATH)) {
  let cssContent = fs.readFileSync(STYLE_CSS_PATH, 'utf8');
  if (!cssContent.includes('PRODUCTS DROPDOWN NAVIGATION STYLING')) {
    cssContent += '\n' + dropdownCSS;
    fs.writeFileSync(STYLE_CSS_PATH, cssContent, 'utf8');
    console.log('Appended Products & Vessels CSS to style.css');
  }
}

// 2. Navigation Header HTML snippet with Products Dropdown
const OLD_NAV_PATTERN = /<li><a href="\/about">About<\/a><\/li>/g;
const NEW_NAV_SNIPPET = `<li><a href="/about">About</a></li>
                            <li class="dropdown-item-wrapper">
                                <a href="/vessels" class="dropdown-toggle-link">Products <span class="arrow-down">▾</span></a>
                                <ul class="sub-dropdown-menu">
                                    <li class="dropdown-header-title">Vessel Categories</li>
                                    <li><a href="/vessels">All Fleet Overview</a></li>
                                    <li><a href="/vessels/crew-transfer-vessel">Crew Transfer Vessels (CTV)</a></li>
                                    <li><a href="/vessels/ocean-tugboat">Ocean & Harbor Tugs</a></li>
                                    <li><a href="/vessels/patrol-craft">High-Speed Patrol Craft</a></li>
                                    <li><a href="/vessels/passenger-ferry">Catamaran Ferries</a></li>
                                    <li><a href="/vessels/utility-workboat">Multipurpose Workboats</a></li>
                                </ul>
                            </li>`;

function updateHTMLHeader(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (!content.includes('class="dropdown-item-wrapper"')) {
    content = content.replace(OLD_NAV_PATTERN, NEW_NAV_SNIPPET);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated navigation header in: ${path.relative(PUBLIC_DIR, filePath)}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (file.endsWith('.html')) {
      updateHTMLHeader(fullPath);
    }
  }
}

walkDir(PUBLIC_DIR);

console.log('Products & Vessels setup script part 1 completed!');
