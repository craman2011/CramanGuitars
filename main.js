/* ============================================================
   CRAMAN GUITARS — Main JavaScript
   File: js/main.js
   Compatibility: Dreamweaver 2020, IE11+, Chrome 60+

   HOW THE FADE-IN WORKS (important for beginners):
   -------------------------------------------------
   The CSS does NOT hide articles by default.
   Instead, this script first adds the class "js-fade"
   to the <html> element. The CSS THEN hides articles
   (using the selector ".js-fade article.content-block").

   This means:
     - If JavaScript is OFF or blocked → articles are always visible
     - If JavaScript is ON              → articles fade in on scroll

   This pattern is called "progressive enhancement".
   ============================================================ */


/* ============================================================
   STEP 1 — Add .js-fade to <html> immediately.
   This must happen BEFORE the rest of the page renders,
   so the CSS can hide elements before they flash visible.
   ============================================================ */
document.documentElement.className += ' js-fade';


/* ============================================================
   2. SCROLL REVEAL
   Checks whether articles and guitar cards have scrolled
   into view. When they have, adds class "visible" which
   triggers the CSS fade-in transition.
   ============================================================ */

function initScrollReveal() {

  var elements = document.querySelectorAll(
    'article.content-block, .guitar-card'
  );

  var triggerOffset = 80;

  function checkVisibility() {
    var windowBottom = window.scrollY + window.innerHeight - triggerOffset;

    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];

      if (el.classList.contains('visible')) {
        continue;
      }

      var elementTop = el.getBoundingClientRect().top + window.scrollY;

      if (elementTop < windowBottom) {
        el.classList.add('visible');
      }
    }
  }

  /* Run immediately so items already on screen appear */
  checkVisibility();

  /* Run every time the user scrolls */
  window.addEventListener('scroll', checkVisibility);
}


/* ============================================================
   3. MOBILE NAVIGATION
   ============================================================ */

function initMobileNav() {

  var toggleBtn = document.querySelector('.nav-toggle');
  var navLinks  = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) { return; }

  toggleBtn.addEventListener('click', function() {
    var isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    } else {
      navLinks.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    }
  });

  var links = navLinks.querySelectorAll('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  }
}


/* ============================================================
   4. ACTIVE NAV LINK
   ============================================================ */

function initActiveNav() {

  var path        = window.location.pathname;
  var parts       = path.split('/');
  var currentPage = parts[parts.length - 1];

  if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

  var navLinks = document.querySelectorAll('.nav-links a');

  for (var i = 0; i < navLinks.length; i++) {
    var href      = navLinks[i].getAttribute('href');
    var hrefParts = href.split('/');
    var linkPage  = hrefParts[hrefParts.length - 1];

    if (linkPage === currentPage) {
      navLinks[i].classList.add('active');
    }
  }
}


/* ============================================================
   RUN WHEN PAGE HAS LOADED
   ============================================================ */

window.onload = function() {
  initScrollReveal();
  initMobileNav();
  initActiveNav();
};
