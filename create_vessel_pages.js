const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const VESSELS_DIR = path.join(PUBLIC_DIR, 'vessels');

if (!fs.existsSync(VESSELS_DIR)) {
  fs.mkdirSync(VESSELS_DIR, { recursive: true });
}

// Exact Original Footer HTML from index.html
const ORIGINAL_FOOTER_HTML = `
    <footer class="">
        <div class="primary-footer common-section-pad">
            <div class="row">
                <div class="col-lg-4">
                    <div class="footer-left">
                        <span class="logo"><img src="/public/2_FrontEnd/img/logo.png" class="img-fluid" alt=""></span>
                        <p class="text-small">Company offers expert design, engineering, and consulting services for a wide range of marine vessels. We specialize in creating custom solutions for ships, yachts, and boats, ensuring each vessel is safe, efficient, and built to meet industry standards</p>
                    </div>
                </div>
                <div class="col-lg-2">
                    <h4>Page Links</h4>
                    <div class="page-links-ul">
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/vessels">Vessels</a></li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/career">Career</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-3">
                   <div class="address-foot">
                    <h4>Corporate office</h4>
                        <p>61/2579 ,2nd Floor, Pattoor Chambers,<br>Alappat Cross Road, Perumanoor<br>Kochi, Kerala, India , 682016</p>
                   </div>
                </div>
                <div class="col-lg-3">
                   <div class="address-foot">
                    <h4>Contact us</h4>
                        <ul>
                            <li><a target="_blank" href="https://web.whatsapp.com/send?phone=+918075785379"><img src="/2_FrontEnd/img/phone-call.webp" class="img-fluid" alt=""> +91 8075 785 379</a></li>
                            <li><a href="mailto:operations@viraatmarine.com"><img src="/2_FrontEnd/img/chat.png" class="img-fluid" alt="">operations@viraatmarine.com</a></li>
                            <li><a class="m-0" href="mailto:amal.binoy@viraatmarine.com"><img src="/2_FrontEnd/img/chat.png" class="img-fluid" alt=""> amal.binoy@viraatmarine.com</a></li>
                        </ul>
                   </div>
                   <ul class="social-footer-icons">
                            <li><a target="_blank" href=""><img loading="lazy" data-src="/public/2_FrontEnd/img/facebook.webp" class="img-fluid lazyload" src="/public/2_FrontEnd/img/facebook.webp"></a></li>
                            <li><a target="_blank" href="https://www.linkedin.com/company/viraat-marine/"><img loading="lazy" data-src="/public/2_FrontEnd/img/linkedin.webp" class="img-fluid lazyload" src="/public/2_FrontEnd/img/linkedin.webp"></a></li>
                            <li><a target="_blank" href="https://www.instagram.com/_viraatmarine_/profilecard/?igsh=aHFvY3RrMHQzanF1"><img loading="lazy" data-src="/public/2_FrontEnd/img/instagram.webp" class="img-fluid lazyload" src="/public/2_FrontEnd/img/instagram.webp"></a></li>
                            <li><a target="_blank" href="https://youtube.com/@viraatmarine?si=2Z21ViuKRs_EzV1R"><img loading="lazy" data-src="/public/2_FrontEnd/img/youtube.webp" class="img-fluid lazyload" src="/public/2_FrontEnd/img/youtube.webp"></a></li>
                   </ul>
                </div>
            </div>
        </div>
        <div class="container-fluid secondary-footer">
            <p class="text-white m-0">@copyright <a href="/"> www.viraatmarine.com</a> 2024</p>
        </div>
    </footer>
    <div class="fixed-whatsapp">
        <a target="_blank" href="https://web.whatsapp.com/send?phone=+918075785379"><img src="/2_FrontEnd/img/whatsapp.svg" class="img-fluid" alt=""></a>
        <a href="https://wa.me/+918075785379"><img src="/2_FrontEnd/img/whatsapp.svg" class="img-fluid" alt=""></a>
    </div>
`;

// Common Header HTML with Vessels ▾ Nav
const HEADER_HTML = `
    <header class="main_nav_header">
        <div class="container-fluid p-0">
            <div class="row g-0">
                <div class="col-lg-3">
                    <div class="logo-block">
                        <a href="/" class="logo">
                            <img src="/public/2_FrontEnd/img/logo-white.png" class="img-fluid" alt="Viraat Marine">
                            <img src="/public/2_FrontEnd/img/logo.png" class="img-fluid logo-mobile" alt="Viraat Marine">
                        </a>
                    </div>
                </div>
                <div class="col-lg-9 position-relative">
                    <div class="mobile-view">
                        <ul>
                            <li>
                                <span class="navbar-mob"><img src="/public/2_FrontEnd/img/bars.png" class="img-fluid" alt=""></span>
                            </li>
                        </ul>
                    </div>
                    <div class="header-bottom-right">
                        <span class="close-ico"><img src="/public/2_FrontEnd/img/close.svg" class="img-fluid" alt=""></span>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li class="dropdown-item-wrapper">
                                <a href="/vessels" class="dropdown-toggle-link active">Vessels <span class="arrow-down">▾</span></a>
                                <ul class="sub-dropdown-menu">
                                    <li class="dropdown-header-title">Vessel Categories</li>
                                    <li><a href="/vessels">All Vessel Fleet</a></li>
                                    <li><a href="/vessels/house-boats">House Boats</a></li>
                                    <li><a href="/vessels/tourist-boats">Tourist Boats</a></li>
                                    <li><a href="/vessels/work-boats">Work Boats</a></li>
                                    <li><a href="/vessels/tugs">Tugs</a></li>
                                    <li><a href="/vessels/fishing-boats">Fishing Boats</a></li>
                                    <li><a href="/vessels/cruise-boats">Cruise Boats</a></li>
                                </ul>
                            </li>
                            <li><a href="/services">Services</a></li>
                            <li><a href="/career">Career</a></li>
                            <li><a href="/contact" class="primary-btn">Contact us</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
`;

// 6 Categories from Amal
const AMAL_CATEGORIES = [
  {
    slug: 'house-boats',
    name: 'House Boats',
    tagline: 'Luxury Luxury Floating Villas & Kettuvallam Designs',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Custom engineered luxury houseboats designed for backwater and coastal tourism. Combining traditional aesthetics with modern stability, eco-friendly solar integration, and premium interior layouts.',
    loa: '28.5 m',
    beam: '6.5 m',
    capacity: '2-4 Deluxe Bedrooms + Sun Deck',
    material: 'Aluminium / Composite / Treated Wood'
  },
  {
    slug: 'tourist-boats',
    name: 'Tourist Boats',
    tagline: 'High-Capacity Sightseeing & Passenger Craft',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Efficient, low-wash tourist passenger boats designed for safe coastal and inland waterway sightseeing tours. Features panoramic safety windows and ergonomic seating.',
    loa: '18.0 m',
    beam: '4.8 m',
    capacity: '50-100 Passengers',
    material: 'FRP / Marine Aluminium 5083'
  },
  {
    slug: 'work-boats',
    name: 'Work Boats',
    tagline: 'Multipurpose Utility & Construction Support Boats',
    img: '/public/2_FrontEnd/img/vessels/workmax_28.png',
    desc: 'Heavy-duty utility workboats designed for harbor maintenance, dive support, cargo transport, and marine construction support operations.',
    loa: '24.0 m',
    beam: '8.0 m',
    capacity: '35 Tonnes Deck Payload',
    material: 'Heavy Duty Structural Steel'
  },
  {
    slug: 'tugs',
    name: 'Tugs',
    tagline: 'Harbor & ASD Ocean Towage Tugs',
    img: '/public/2_FrontEnd/img/vessels/tug_3200.png',
    desc: 'High bollard pull Azimuth Stern Drive (ASD) and harbor tugboats engineered for ship handling, vessel escort, and emergency towing operations.',
    loa: '32.0 m',
    beam: '11.5 m',
    capacity: '70 Tonnes Bollard Pull',
    material: 'Grade A Shipbuilding Steel'
  },
  {
    slug: 'fishing-boats',
    name: 'Fishing Boats',
    tagline: 'Deep Sea & Coastal Commercial Fishing Craft',
    img: '/public/2_FrontEnd/img/vessels/sentinel_18.png',
    desc: 'Robust commercial fishing vessels designed for extended sea endurance, insulated catch holds, and optimized fuel efficiency.',
    loa: '22.0 m',
    beam: '6.2 m',
    capacity: '20 Tonnes Cold Hold Capacity',
    material: 'Marine Grade Steel / FRP'
  },
  {
    slug: 'cruise-boats',
    name: 'Cruise Boats',
    tagline: 'Premium Passenger Day Cruise & Event Vessels',
    img: '/public/2_FrontEnd/img/vessels/ctv_24.png',
    desc: 'Elegant multi-deck day cruise vessels designed for corporate events, coastal dinners, and luxury charter operations.',
    loa: '35.0 m',
    beam: '9.0 m',
    capacity: '150 Passengers + Event Stage',
    material: 'Marine Aluminium / Steel'
  }
];

// 1. Generate vessels.html Fleet Overview Page
const VESSELS_MAIN_HTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Vessels & Fleet Portfolio | Viraat Marine</title>
    <meta name="description" content="Explore Viraat Marine custom vessel designs: House Boats, Tourist Boats, Work Boats, Tugs, Fishing Boats, and Cruise Boats.">
    <link rel="icon" href="/public/2_FrontEnd/img/favico.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/style.css?version=3">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/media.css?version=3">
</head>
<body id="body" class="light-mode">

    ${HEADER_HTML}

    <!-- Hero Banner -->
    <section class="home-banner" style="padding-top:140px; background: url(/2_FrontEnd/img/banner-2.webp) center/cover; position:relative;">
        <div class="cover" style="background: rgba(9,29,62,0.85); padding: 80px 0;">
            <div class="container text-center">
                <h1 style="color:#fff; font-size:48px; font-weight:800;">Viraat Marine Vessel Categories</h1>
                <p style="color:#0fbed2; font-size:20px; max-width:800px; margin: 15px auto 0 auto;">Custom Naval Architecture, Design & Construction for Commercial and Tourist Vessels</p>
            </div>
        </div>
    </section>

    <!-- Categories Grid Section -->
    <section class="common-section-pad">
        <div class="container">
            <div class="row g-4">
                ${AMAL_CATEGORIES.map(c => `
                <div class="col-lg-4 col-md-6">
                    <div class="vessel-card">
                        <div class="vessel-img-wrapper">
                            <img src="${c.img}" alt="${c.name}">
                            <span class="vessel-badge">${c.name}</span>
                        </div>
                        <div class="vessel-card-body">
                            <h3>${c.name}</h3>
                            <p>${c.tagline}</p>
                            <div class="vessel-specs-grid">
                                <div class="spec-item"><strong>Length (LOA)</strong> ${c.loa}</div>
                                <div class="spec-item"><strong>Capacity</strong> ${c.capacity}</div>
                                <div class="spec-item"><strong>Hull Material</strong> ${c.material}</div>
                                <div class="spec-item"><strong>Beam</strong> ${c.beam}</div>
                            </div>
                            <a href="/vessels/${c.slug}" class="btn-vessel-details">Explore ${c.name} Details ➔</a>
                        </div>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    ${ORIGINAL_FOOTER_HTML}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"></script>
    <script src="/public/2_FrontEnd/js/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(PUBLIC_DIR, 'vessels.html'), VESSELS_MAIN_HTML, 'utf8');
console.log('Updated vessels.html with Amal categories and original footer!');

// 2. Generate 6 Category Detail Pages
for (const c of AMAL_CATEGORIES) {
  const CATEGORY_HTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${c.name} | Viraat Marine Vessel Design</title>
    <meta name="description" content="${c.desc}">
    <link rel="icon" href="/public/2_FrontEnd/img/favico.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/style.css?version=3">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/media.css?version=3">
</head>
<body id="body" class="light-mode">

    ${HEADER_HTML}

    <!-- Hero Banner -->
    <section class="home-banner" style="padding-top:140px; background: url(/2_FrontEnd/img/banner-2.webp) center/cover; position:relative;">
        <div class="cover" style="background: rgba(9,29,62,0.85); padding: 70px 0;">
            <div class="container">
                <a href="/vessels" style="color:#0fbed2; text-decoration:none; font-weight:600; margin-bottom:10px; display:inline-block;">⬅ Back to All Vessel Categories</a>
                <h1 style="color:#fff; font-size:45px; font-weight:800;">${c.name}</h1>
                <p style="color:#0fbed2; font-size:18px;">${c.tagline}</p>
            </div>
        </div>
    </section>

    <!-- Category Detail Content -->
    <section class="common-section-pad">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 mb-4">
                    <div style="border-radius:12px; overflow:hidden; border:1px solid rgba(15,190,210,0.3); box-shadow:0 15px 35px rgba(0,0,0,0.2);">
                        <img src="${c.img}" alt="${c.name}" class="img-fluid w-100">
                    </div>
                </div>
                <div class="col-lg-6 mb-4">
                    <h2 style="font-size:32px; font-weight:700; margin-bottom:15px; color:#091d3e;">${c.name} Design & Engineering</h2>
                    <p style="font-size:17px; line-height:1.7; color:#5f5f5f; margin-bottom:25px;">${c.desc}</p>
                    
                    <h4 style="color:#0fbed2; font-weight:700; margin-bottom:15px;">Standard Specifications</h4>
                    <table class="table table-bordered table-striped">
                        <tbody>
                            <tr><td><strong>Length Overall (LOA)</strong></td><td>${c.loa}</td></tr>
                            <tr><td><strong>Beam Overall</strong></td><td>${c.beam}</td></tr>
                            <tr><td><strong>Operational Capacity</strong></td><td>${c.capacity}</td></tr>
                            <tr><td><strong>Primary Material</strong></td><td>${c.material}</td></tr>
                            <tr><td><strong>Classification</strong></td><td>IRS / DNV / Custom Standards</td></tr>
                        </tbody>
                    </table>

                    <div style="margin-top:30px;">
                        <a href="/contact" class="primary-btn" style="background:#0fbed2; color:#091d3e; font-weight:700; display:inline-block;">Request ${c.name} Design Quote ➔</a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    ${ORIGINAL_FOOTER_HTML}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"></script>
    <script src="/public/2_FrontEnd/js/main.js"></script>
</body>
</html>
`;

  fs.writeFileSync(path.join(VESSELS_DIR, c.slug + '.html'), CATEGORY_HTML, 'utf8');
  console.log(`Created category detail page: vessels/${c.slug}.html`);
}

// Update header in all html files to show Vessels ▾ instead of Products
function updateAllHTMLForVesselsHeader(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAllHTMLForVesselsHeader(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Update header link label from Products to Vessels
      content = content.replace(/Products <span class="arrow-down">▾<\/span>/g, 'Vessels <span class="arrow-down">▾</span>');
      content = content.replace(/<a href="\/vessels" class="dropdown-toggle-link">Products/g, '<a href="/vessels" class="dropdown-toggle-link">Vessels');
      
      // Update dropdown list items to match Amal's 6 categories
      const oldDropdownPattern = /<ul class="sub-dropdown-menu">[\s\S]*?<\/ul>/g;
      const newDropdownHTML = `<ul class="sub-dropdown-menu">
                                    <li class="dropdown-header-title">Vessel Categories</li>
                                    <li><a href="/vessels">All Vessel Fleet</a></li>
                                    <li><a href="/vessels/house-boats">House Boats</a></li>
                                    <li><a href="/vessels/tourist-boats">Tourist Boats</a></li>
                                    <li><a href="/vessels/work-boats">Work Boats</a></li>
                                    <li><a href="/vessels/tugs">Tugs</a></li>
                                    <li><a href="/vessels/fishing-boats">Fishing Boats</a></li>
                                    <li><a href="/vessels/cruise-boats">Cruise Boats</a></li>
                                </ul>`;
      
      if (content.includes('class="sub-dropdown-menu"')) {
        content = content.replace(oldDropdownPattern, newDropdownHTML);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

updateAllHTMLForVesselsHeader(PUBLIC_DIR);
console.log('Updated all HTML files for Vessels ▾ header and Amal\'s 6 categories!');
