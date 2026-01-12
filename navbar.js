// --- Google Analytics Setup ---
// Paste your actual snippet here
const script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-906KF8ERHN'; // Replace with your ID
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-906KF8ERHN'); // Replace with your ID

const injectSharedElements = () => {
  const isSubfolder = window.location.pathname.includes("/sectors/") ||
    window.location.pathname.includes("/bio/");
  const pathPrefix = isSubfolder ? "../" : "";
  const isHomePage = window.location.pathname.endsWith("index.html") ||
    window.location.pathname.endsWith("/") ||
    window.location.pathname === "";

  const researchLink = isHomePage ? "#sectors" : `${pathPrefix}index.html#sectors`;

  // 1. NAVBAR HTML
const navContent = `
    <div class="nav-container">
        <ul class="nav-links">
            <li><a href="${pathPrefix}index.html">Home</a></li>
            <li><a href="${pathPrefix}about.html">About</a></li>
            
            <li class="dropdown">
                <a href="#" class="dropbtn">Research Pillars <span class="chevron">▾</span></a>
                <ul class="dropdown-content">
                    <li><a href="${pathPrefix}sectors/ict.html">ICT & Quantum</a></li>
                    <li><a href="${pathPrefix}sectors/aerospace.html">Aerospace</a></li>
                    <li><a href="${pathPrefix}sectors/construction.html">Construction</a></li>
                </ul>
            </li>

            <li><a href="${pathPrefix}research-team.html">Team</a></li>
            <li><a href="${pathPrefix}news-and-impact.html">News & Impact</a></li>
            <li><a href="${pathPrefix}contact.html" class="nav-btn">Contact</a></li>
        </ul>
    </div>
`;

document.addEventListener("DOMContentLoaded", function() {
    const navContainer = document.querySelector("nav");
    const isSubpage = window.location.pathname.includes('/sectors/');
    const pathPrefix = isSubpage ? '../' : './';

    navContainer.innerHTML = `
        <div class="nav-container">
            <a href="${pathPrefix}index.html" class="logo">ILNAS-SnT Hub</a>
            
            <button class="mobile-nav-toggle">
                <span class="hamburger"></span>
            </button>

            <ul class="nav-links">
                <li><a href="${pathPrefix}index.html">Home</a></li>
                <li><a href="${pathPrefix}about.html">About</a></li>
                <li class="dropdown">
                    <a href="#" class="dropbtn">Research Pillars <span class="chevron">▾</span></a>
                    <ul class="dropdown-content">
                        <li><a href="${pathPrefix}sectors/ict.html">ICT & Quantum</a></li>
                        <li><a href="${pathPrefix}sectors/aerospace.html">Aerospace & Satellite</a></li>
                        <li><a href="${pathPrefix}sectors/construction.html">Construction & BIM</a></li>
                    </ul>
                </li>
                <li><a href="${pathPrefix}research-team.html">Team</a></li>
                <li><a href="${pathPrefix}news-and-impact.html">News & Impact</a></li>
                <li><a href="${pathPrefix}contact.html" class="nav-btn">Contact</a></li>
            </ul>
        </div>
    `;
    
    // Mobile logic
    const toggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(toggle) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
        });
    }
});

  // 2. FOOTER HTML
  const footerContent = `
    <div class="main-container">
      <div class="footer-content" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem; margin-bottom: 3rem;">
        <div class="footer-brand">
          <h4 style="color: var(--secondary); margin-bottom: 1rem;">ILNAS-SnT Research Programme</h4>
          <p style="font-size: 0.9rem; opacity: 0.7; line-height: 1.6;">A high-level partnership between the University of Luxembourg and ILNAS.</p>
        </div>
        <div class="footer-links">
    <h4 style="margin-bottom: 1rem;">Quick Links</h4>
    <ul style="list-style: none; padding: 0; font-size: 0.9rem;">
        <li style="margin-bottom: 0.5rem;">
            <a href="https://portail-qualite.public.lu/fr.html" 
               target="_blank" 
               rel="noopener" 
               style="color: white; opacity: 0.7; text-decoration: none;">
               Portail Qualité
            </a>
        </li>
        <li>
            <a href="https://www.uni.lu/snt-en/" 
               target="_blank" 
               rel="noopener" 
               style="color: white; opacity: 0.7; text-decoration: none;">
               SnT - University of Luxembourg
            </a>
        </li>
    </ul>
</div>
        <div class="footer-contact">
          <h4 style="margin-bottom: 1rem;">Locations</h4>
          <div style="font-size: 0.85rem; opacity: 0.7;">
            <p><strong>ILNAS:</strong> Southlane Tower I, 1 avenue du Swing, L-4367 Belvaux</p>
            <p><strong>SnT:</strong> Maison du Nombre 6, avenue de la Fonte, L-4364 Esch-sur-Alzette</p>
          </div>
        </div>
      </div>
      <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 2rem; text-align: center; font-size: 0.85rem; opacity: 0.6;">
        <p>Copyright © 2026 Université du Luxembourg / ILNAS.</p>
      </div>
      
      <button id="backToTop" title="Go to top" style="display: none; position: fixed; bottom: 30px; right: 30px; z-index: 99; border: none; outline: none; background-color: var(--secondary); color: white; cursor: pointer; padding: 15px; border-radius: 50%; width: 50px; height: 50px; font-size: 18px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); transition: opacity 0.3s;">
        ↑
      </button>
    </div>
    `;

  // 3. INJECTION
  const navElement = document.querySelector("nav");
  if (navElement) navElement.innerHTML = navContent;

  const footerElement = document.querySelector("footer");
  if (footerElement) {
    footerElement.innerHTML = footerContent;
    footerElement.className = "main-footer";
    footerElement.style.background = "var(--dark)";
    footerElement.style.color = "white";
    footerElement.style.padding = "4rem 0 2rem 0";
  }

  // 4. BACK TO TOP LOGIC
  const bttButton = document.getElementById("backToTop");

  window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      bttButton.style.display = "block";
      bttButton.style.opacity = "1";
    } else {
      bttButton.style.opacity = "0";
      setTimeout(() => { if (bttButton.style.opacity === "0") bttButton.style.display = "none"; }, 300);
    }
  };

  bttButton.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
};

// Toggle Archive for News Page
function toggleArchive() {
  const archive = document.getElementById("archive-content");
  const btn = document.getElementById("archive-btn");
  if (archive.style.display === "none" || archive.style.display === "") {
    archive.style.display = "block";
    btn.innerHTML = "Show Less -";
  } else {
    archive.style.display = "none";
    btn.innerHTML = "View All Past Events +";
  }
}

document.addEventListener("DOMContentLoaded", injectSharedElements);

// Dynamism: Reveal elements on scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Apply to any element you want to animate
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.reveal-on-scroll, .member-card, .strategy-intro').forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });
});

// Function to handle Navbar visibility on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    // Change '100' to the height you want (e.g., window.innerHeight * 0.5)
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});