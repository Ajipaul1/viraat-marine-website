const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(__dirname, 'public');
const VESSELS_DIR = path.join(PUBLIC_DIR, 'vessels');

if (!fs.existsSync(VESSELS_DIR)) {
  fs.mkdirSync(VESSELS_DIR, { recursive: true });
}

// 15 Master Categories from Excel
const MASTER_VESSEL_SERIES = [
  {
    group: 'tourism',
    slug: 'house-boats',
    name: 'Houseboat (Kerala Style & Ship Shape)',
    tagline: '1 to 16 Bedroom Luxury Floating Villas',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Custom-designed 1 to 16 bedroom traditional Kerala style and ship-shape houseboats. Features luxury air-conditioned suites, upper sun deck lounges, and eco-friendly solar integration.',
    specs: [
      { label: 'Bedrooms Available', val: '1, 2, 3, 4, 6, 8, 10, 12, 14, 16 BR' },
      { label: 'Hull Style', val: 'Traditional Kettuvallam / Steel Ship Shape' },
      { label: 'Power Source', val: 'Inboard Engine + Solar Backup' },
      { label: 'Classification', val: 'Kerala Port Department / KIV Rules' }
    ]
  },
  {
    group: 'tourism',
    slug: 'shikkara-boats',
    name: 'Kerala Model Shikkara',
    tagline: '10 to 50 Pax Traditional Backwater Cruise Boats',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Traditional Kerala Shikkara boats built with lightweight marine hull structures and comfortable seating for canal tours and lake sightseeing.',
    specs: [
      { label: 'Pax Capacity', val: '10, 20, 30, 50 Passengers' },
      { label: 'Engine Type', val: 'Inboard Marine Engine (IBM)' },
      { label: 'Hull Material', val: 'FRP / Treated Marine Teak' },
      { label: 'Operation', val: 'Calm Waters & Backwater Sightseeing' }
    ]
  },
  {
    group: 'tourism',
    slug: 'excursion-boats',
    name: 'Excursion Boats',
    tagline: '20 to 80 Pax Group Sightseeing Vessels',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Spacious high-capacity excursion craft engineered for island hopping, eco-tourism, and river safari tours with low-wake hull performance.',
    specs: [
      { label: 'Pax Capacity', val: '20, 50, 80 Passengers' },
      { label: 'Deck Type', val: 'Open Canopy / Enclosed Seating' },
      { label: 'Hull Material', val: 'Marine Grade Aluminium / FRP' },
      { label: 'Safety Standards', val: 'IRS / Inland Waterways Standards' }
    ]
  },
  {
    group: 'tourism',
    slug: 'speed-boats',
    name: 'Speed Boats',
    tagline: '4 to 14 Seater High-Speed Sports Craft',
    img: '/public/2_FrontEnd/img/vessels/sentinel_18.png',
    desc: 'High-performance deep-V hull speed boats built for watersports, rapid personnel transfer, and thrill rides.',
    specs: [
      { label: 'Seater Models', val: '4, 6, 8, 10, 12, 14 Seater' },
      { label: 'Propulsion', val: 'Outboard OBM / Inboard Marine' },
      { label: 'Speed Range', val: '25 to 45 Knots' },
      { label: 'Hull Material', val: 'High Strength FRP Composite' }
    ]
  },
  {
    group: 'tourism',
    slug: 'mini-yachts',
    name: 'Recreational Speed Boat (Mini Yacht)',
    tagline: '8 to 14 Seater Luxury Personal Yachts',
    img: '/public/2_FrontEnd/img/vessels/sentinel_18.png',
    desc: 'Compact luxury yachts featuring premium upholstered seating, cabin amenities, and high-speed cruising for private charters.',
    specs: [
      { label: 'Seater Models', val: '8 & 14 Seater Luxury Layouts' },
      { label: 'Features', val: 'Enclosed Cabin + Audio & Bar Station' },
      { label: 'Hull Material', val: 'Infused FRP / Aluminium' },
      { label: 'Classification', val: 'Pleasure Craft Standards' }
    ]
  },
  {
    group: 'tourism',
    slug: 'passenger-ferries',
    name: 'Passenger Ferries',
    tagline: '30 to 120 Seater High-Capacity Ferries',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Low-wash catamaran passenger ferries designed for public transportation routes, harbor crossings, and commuter lines.',
    specs: [
      { label: 'Capacity Options', val: '30, 50, 80, 120 Passengers' },
      { label: 'Hull Style', val: 'Catamaran Low-Wash Hull' },
      { label: 'Speed', val: '12 to 22 Knots' },
      { label: 'Classification', val: 'IRS Passenger Craft Class' }
    ]
  },
  {
    group: 'commercial',
    slug: 'work-boats',
    name: 'Work Boats',
    tagline: '18m & 24m Ship & Barge Shape Utility Craft',
    img: '/public/2_FrontEnd/img/vessels/workmax_28.png',
    desc: 'Multipurpose utility workboats engineered in 18m and 24m length options with both Barge Shape and Ship Shape hull geometries.',
    specs: [
      { label: 'Hull Lengths', val: '18 Meters & 24 Meters' },
      { label: 'Hull Geometries', val: 'Barge Shape & Ship Shape' },
      { label: 'Payload Capacity', val: 'Up to 45 Tonnes Deck Cargo' },
      { label: 'Equipment', val: 'Deck Crane & Towing Hook Mount' }
    ]
  },
  {
    group: 'commercial',
    slug: 'ro-ro-barges',
    name: 'Barge (RO-RO)',
    tagline: '50 to 120 Tonne Vehicular Heavy Duty Barges',
    img: '/public/2_FrontEnd/img/vessels/workmax_28.png',
    desc: 'Heavy-duty Roll-on/Roll-off (Ro-Ro) vehicular transportation barges built for heavy trucks, equipment, and river ferry crossings.',
    specs: [
      { label: 'Tonnage Options', val: '50 Ton, 80 Ton, 120 Ton' },
      { label: 'Ramp System', val: 'Hydraulic / Mechanical Front Ramp' },
      { label: 'Hull Material', val: 'Heavy Duty Structural Steel' },
      { label: 'Classification', val: 'IRS Industrial Barge Class' }
    ]
  },
  {
    group: 'commercial',
    slug: 'tug-boats',
    name: 'Tugs & Towage Craft',
    tagline: 'Harbor & Ocean ASD Towing Vessels',
    img: '/public/2_FrontEnd/img/vessels/tug_3200.png',
    desc: 'High bollard pull Azimuth Stern Drive (ASD) tugboats built for ship assist, port towage, and offshore escort operations.',
    specs: [
      { label: 'Bollard Pull', val: '30 to 70 Tonnes Pull' },
      { label: 'Propulsion', val: '360° Azimuth Thrusters' },
      { label: 'Engine Power', val: 'Dual High Horsepower Engines' },
      { label: 'Classification', val: 'IRS / ABS / DNV Tug Class' }
    ]
  },
  {
    group: 'commercial',
    slug: 'fishing-vessels',
    name: 'Fishing Vessels',
    tagline: 'Trawlers, Gillnetters & Traditional Vanji Boats',
    img: '/public/2_FrontEnd/img/vessels/sentinel_18.png',
    desc: 'Commercial deep-sea fishing craft including mechanized Trawlers, Gillnetters, and reinforced Vanji fishing boats.',
    specs: [
      { label: 'Vessel Types', val: 'Trawler, Gillnetter, Vanji' },
      { label: 'Cold Storage', val: 'Insulated Ice Holds & RSW Systems' },
      { label: 'Hull Material', val: 'Steel / Reinforced FRP' },
      { label: 'Deck Machinery', val: 'Hydraulic Trawl Winch' }
    ]
  },
  {
    group: 'hospitality',
    slug: 'floating-cottages',
    name: 'Floating Cottages',
    tagline: '1, 2 & 4 Bedroom Floating Eco-Resort Units',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Stationary floating resort cottages designed for eco-tourism hubs, featuring 1, 2, and 4 bedroom waterfront living spaces.',
    specs: [
      { label: 'Bedroom Options', val: '1, 2, 4 Deluxe Bedrooms' },
      { label: 'Pontoon Type', val: 'Unsinkable Polyethylene / Steel Float' },
      { label: 'Amenities', val: 'En-suite Baths & Private Balcony' },
      { label: 'Waste System', val: 'Bio-Tank / Eco Treatment Unit' }
    ]
  },
  {
    group: 'hospitality',
    slug: 'floating-restaurant',
    name: 'Floating Restaurant',
    tagline: 'Multi-Deck Floating Dining & Event Venues',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Commercial multi-deck floating restaurants designed for waterfront dining, banquet halls, and corporate receptions.',
    specs: [
      { label: 'Seating Capacity', val: '100 to 300 Dining Guests' },
      { label: 'Facilities', val: 'Commercial Kitchen & Cocktail Bar' },
      { label: 'Pontoon Type', val: 'Heavy Duty Structural Steel' },
      { label: 'Safety', val: 'IRS Floating Structure Rules' }
    ]
  },
  {
    group: 'hospitality',
    slug: 'floating-lodge',
    name: 'Floating Lodge',
    tagline: '20 & 50 Pax Floating Hotel Accommodation',
    img: '/public/2_FrontEnd/img/vessels/pass_120.png',
    desc: 'Large floating accommodation lodges designed for remote resort locations, offshore projects, and hospitality operators.',
    specs: [
      { label: 'Pax Capacity', val: '20 & 50 Pax Lodging' },
      { label: 'Features', val: 'Multiple Guest Rooms & Mess Hall' },
      { label: 'Mooring System', val: 'Heavy Duty Spud / Cable Mooring' },
      { label: 'Power & Water', val: 'Genset & Desalination Plant' }
    ]
  },
  {
    group: 'innovation',
    slug: 'car-boats',
    name: 'Car Boat Series',
    tagline: 'Sedan, Hatchback & SUV Water-Cars',
    img: '/public/2_FrontEnd/img/vessels/sentinel_18.png',
    desc: 'Unique amphibious and car-styled watercraft designed in Sedan, Hatchback, and SUV automobile shapes for theme parks and rental operations.',
    specs: [
      { label: 'Models Available', val: 'Sedan, Hatchback, SUV Water-Cars' },
      { label: 'Seating', val: '4 Seater Automobile Interior' },
      { label: 'Control', val: 'Steering Wheel & Pedal Throttle' },
      { label: 'Hull Material', val: 'Molded Marine FRP' }
    ]
  },
  {
    group: 'innovation',
    slug: 'adventure-innovative-boats',
    name: 'Adventure & Innovative Craft',
    tagline: 'Kayaks, Canoes, Pedal Boats & Pool Houseboats',
    img: '/public/2_FrontEnd/img/vessels/ctv_24.png',
    desc: 'Viraat Marine innovative custom craft lineup including Kayaks, Canoes, Dinghies, Pedal Boats, and Houseboats equipped with onboard Swimming Pools.',
    specs: [
      { label: 'Craft Types', val: 'Kayak, Canoe, Dinghy, Pedal Boat' },
      { label: 'Special Series', val: 'Houseboat with Onboard Swimming Pool' },
      { label: 'Use Cases', val: 'Resort Activities & Custom R&D' },
      { label: 'Build Material', val: 'High-Impact FRP & Polyethylene' }
    ]
  }
];

// Original Footer HTML
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

// Common Header HTML with 4 Structured Submenus
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
                                <ul class="sub-dropdown-menu" style="min-width: 290px;">
                                    <li class="dropdown-header-title">Viraat Marine Series</li>
                                    <li><a href="/vessels">All 15 Vessel Categories</a></li>
                                    
                                    <li class="dropdown-header-title" style="margin-top:8px;">Tourism & Passenger</li>
                                    <li><a href="/vessels/house-boats">Houseboat Series (1-16 BR)</a></li>
                                    <li><a href="/vessels/shikkara-boats">Kerala Shikkara Boats</a></li>
                                    <li><a href="/vessels/excursion-boats">Excursion Boats</a></li>
                                    <li><a href="/vessels/speed-boats">Speed Boats (4-14 Seater)</a></li>
                                    <li><a href="/vessels/mini-yachts">Recreational Mini Yachts</a></li>
                                    <li><a href="/vessels/passenger-ferries">Passenger Ferries</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Commercial & Workboats</li>
                                    <li><a href="/vessels/work-boats">Work Boats (Ship & Barge Shape)</a></li>
                                    <li><a href="/vessels/ro-ro-barges">RO-RO Barges (50-120 Ton)</a></li>
                                    <li><a href="/vessels/tug-boats">Tugs & Towage Craft</a></li>
                                    <li><a href="/vessels/fishing-vessels">Fishing Vessels</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Floating Hospitality</li>
                                    <li><a href="/vessels/floating-cottages">Floating Cottages</a></li>
                                    <li><a href="/vessels/floating-restaurant">Floating Restaurants</a></li>
                                    <li><a href="/vessels/floating-lodge">Floating Lodges</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Recreational & Innovation</li>
                                    <li><a href="/vessels/car-boats">Car Boats (Sedan/SUV Water-Cars)</a></li>
                                    <li><a href="/vessels/adventure-innovative-boats">Kayaks, Canoes & Pool Boats</a></li>
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

// 1. Generate vessels.html Fleet Overview Page
const VESSELS_MAIN_HTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Master Vessel Series | Viraat Marine</title>
    <meta name="description" content="Explore Viraat Marine's 15 official vessel categories: Houseboats, Shikkara, Excursion Boats, Speedboats, Mini Yachts, Barges, Workboats, Ferries, Car Boats, Floating Cottages, Restaurants & Lodges.">
    <link rel="icon" href="/public/2_FrontEnd/img/favico.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/style.css?version=5">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/media.css?version=5">
</head>
<body id="body" class="light-mode">

    ${HEADER_HTML}

    <!-- Single Unified Hero Banner -->
    <section style="position:relative; padding-top: 180px; padding-bottom: 90px; background: linear-gradient(135deg, rgba(9, 29, 62, 0.88), rgba(5, 19, 41, 0.92)), url('/2_FrontEnd/img/banner-2.webp') center/cover no-repeat;">
        <div class="container text-center">
            <h1 style="color:#fff; font-size:48px; font-weight:800; margin-bottom:15px;">Viraat Marine Vessel Series</h1>
            <p style="color:#0fbed2; font-size:20px; max-width:850px; margin: 0 auto; font-weight:500;">Official Master Catalog of Custom Naval Architecture & Boat Building Solutions</p>
        </div>
    </section>

    <!-- Categories Grid Section -->
    <section class="common-section-pad">
        <div class="container">
            <div class="row g-4">
                ${MASTER_VESSEL_SERIES.map(c => `
                <div class="col-lg-4 col-md-6">
                    <div class="vessel-card">
                        <div class="vessel-img-wrapper">
                            <img src="${c.img}" alt="${c.name}">
                            <span class="vessel-badge">${c.name.split('(')[0].trim()}</span>
                        </div>
                        <div class="vessel-card-body">
                            <h3>${c.name}</h3>
                            <p>${c.tagline}</p>
                            <div class="vessel-specs-grid">
                                ${c.specs.map(s => `<div class="spec-item"><strong>${s.label}</strong> ${s.val}</div>`).join('')}
                            </div>
                            <a href="/vessels/${c.slug}" class="btn-vessel-details">Explore ${c.name.split('(')[0].trim()} Specifications ➔</a>
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

// 2. Generate 15 Category Detail Pages
for (const c of MASTER_VESSEL_SERIES) {
  const CATEGORY_HTML = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${c.name} | Viraat Marine Vessel Series</title>
    <meta name="description" content="${c.desc}">
    <link rel="icon" href="/public/2_FrontEnd/img/favico.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/style.css?version=5">
    <link rel="stylesheet" href="/public/2_FrontEnd/css/media.css?version=5">
</head>
<body id="body" class="light-mode">

    ${HEADER_HTML}

    <!-- Single Unified Hero Banner -->
    <section style="position:relative; padding-top: 180px; padding-bottom: 80px; background: linear-gradient(135deg, rgba(9, 29, 62, 0.88), rgba(5, 19, 41, 0.92)), url('/2_FrontEnd/img/banner-2.webp') center/cover no-repeat;">
        <div class="container">
            <a href="/vessels" style="color:#0fbed2; text-decoration:none; font-weight:600; margin-bottom:10px; display:inline-block;">⬅ Back to Master Vessel Series</a>
            <h1 style="color:#fff; font-size:45px; font-weight:800; margin-bottom:10px;">${c.name}</h1>
            <p style="color:#0fbed2; font-size:18px; font-weight:500;">${c.tagline}</p>
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
                    
                    <h4 style="color:#0fbed2; font-weight:700; margin-bottom:15px;">Available Configurations & Specs</h4>
                    <table class="table table-bordered table-striped">
                        <tbody>
                            ${c.specs.map(s => `<tr><td><strong>${s.label}</strong></td><td>${s.val}</td></tr>`).join('')}
                            <tr><td><strong>Classification Standard</strong></td><td>IRS / DNV / Kerala Port Department Rules</td></tr>
                        </tbody>
                    </table>

                    <div style="margin-top:30px;">
                        <a href="/contact" class="primary-btn" style="background:#0fbed2; color:#091d3e; font-weight:700; display:inline-block;">Request ${c.name.split('(')[0].trim()} Quote ➔</a>
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
}

// Update header in all html files across public/
function updateAllHTMLForMasterSeriesHeader(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      updateAllHTMLForMasterSeriesHeader(fullPath);
    } else if (file.endsWith('.html')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const oldDropdownPattern = /<ul class="sub-dropdown-menu"[\s\S]*?<\/ul>/g;
      const newDropdownHTML = `<ul class="sub-dropdown-menu" style="min-width: 290px;">
                                    <li class="dropdown-header-title">Viraat Marine Series</li>
                                    <li><a href="/vessels">All 15 Vessel Categories</a></li>
                                    
                                    <li class="dropdown-header-title" style="margin-top:8px;">Tourism & Passenger</li>
                                    <li><a href="/vessels/house-boats">Houseboat Series (1-16 BR)</a></li>
                                    <li><a href="/vessels/shikkara-boats">Kerala Shikkara Boats</a></li>
                                    <li><a href="/vessels/excursion-boats">Excursion Boats</a></li>
                                    <li><a href="/vessels/speed-boats">Speed Boats (4-14 Seater)</a></li>
                                    <li><a href="/vessels/mini-yachts">Recreational Mini Yachts</a></li>
                                    <li><a href="/vessels/passenger-ferries">Passenger Ferries</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Commercial & Workboats</li>
                                    <li><a href="/vessels/work-boats">Work Boats (Ship & Barge Shape)</a></li>
                                    <li><a href="/vessels/ro-ro-barges">RO-RO Barges (50-120 Ton)</a></li>
                                    <li><a href="/vessels/tug-boats">Tugs & Towage Craft</a></li>
                                    <li><a href="/vessels/fishing-vessels">Fishing Vessels</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Floating Hospitality</li>
                                    <li><a href="/vessels/floating-cottages">Floating Cottages</a></li>
                                    <li><a href="/vessels/floating-restaurant">Floating Restaurants</a></li>
                                    <li><a href="/vessels/floating-lodge">Floating Lodges</a></li>

                                    <li class="dropdown-header-title" style="margin-top:8px;">Recreational & Innovation</li>
                                    <li><a href="/vessels/car-boats">Car Boats (Sedan/SUV Water-Cars)</a></li>
                                    <li><a href="/vessels/adventure-innovative-boats">Kayaks, Canoes & Pool Boats</a></li>
                                </ul>`;
      
      if (content.includes('class="sub-dropdown-menu"')) {
        content = content.replace(oldDropdownPattern, newDropdownHTML);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
    }
  }
}

updateAllHTMLForMasterSeriesHeader(PUBLIC_DIR);
console.log('Successfully built all 15 master vessel series pages & updated header dropdown!');
