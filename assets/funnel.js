/* ================== CONFIG ================== */
var EXIT_URL = "https://www.google.com";
var TOP_AD_PATH = "/23313830399/320x1005p";
var BOTTOM_AD_PATH = "/23313830399/300x250p";

/* ================== GPT AD SLOTS ================== */
/* Each real page load requests both ads fresh — no manual refresh needed. */
googletag.cmd.push(function () {
  googletag.defineSlot(TOP_AD_PATH, [320, 100], 'div-gpt-ad-1786877210701-0').addService(googletag.pubads());
  googletag.defineSlot(BOTTOM_AD_PATH, [300, 250], 'div-gpt-ad-1786877374315-0').addService(googletag.pubads());
  googletag.enableServices();
  googletag.display('div-gpt-ad-1786877210701-0');
  googletag.display('div-gpt-ad-1786877374315-0');
});

function trackDecline(stepName) {
  if (window.gtag) {
    gtag('event', 'decline', {
      step: stepName,
      page_path: location.pathname
    });
  }
}

/* ================== GEO DETECTION (country-verification page only) ================== */
function detectRegion() {
  var countryData = {
    GB: { flag: "🇬🇧", name: "United Kingdom", short: "the UK" },
    CA: { flag: "🇨🇦", name: "Canada", short: "Canada" },
    US: { flag: "🇺🇸", name: "United States", short: "the US" }
  };

  fetch("https://ipapi.co/json/")
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var code = data && data.country_code;
      var info = countryData[code] || countryData.US;
      applyRegion(info);
    })
    .catch(function () {
      applyRegion(countryData.US);
    });
}

function applyRegion(info) {
  var flagEl = document.getElementById("regionFlag");
  var nameEl = document.getElementById("regionName");
  var enterBtn = document.getElementById("regionEnterBtn");
  var exitBtn = document.getElementById("regionExitBtn");
  if (!flagEl) { return; }
  flagEl.textContent = info.flag;
  nameEl.textContent = info.name;
  enterBtn.textContent = "I am in " + info.short + " — Enter";
  exitBtn.textContent = "I am not in " + info.short + " — Exit";
}

/* ================== HUMAN CHECK ANIMATION (human-verification page only) ================== */
function runHumanCheck() {
  var visual = document.getElementById('verifyVisual');
  var bar = document.getElementById('verifyBar');
  if (!visual) { return; }
  visual.classList.add('show');
  setTimeout(function () {
    bar.style.width = '100%';
  }, 30);
}

/* ================== PAGE TRANSITION ================== */
var pageLoadTime = Date.now();
var SKELETON_MS = 1500;

function goToNextPage(url) {
  var loadingEl = document.getElementById('loadingState');
  var cardEl = document.querySelector('.card');
  if (loadingEl && cardEl) {
    cardEl.style.display = 'none';
    loadingEl.classList.add('active');
  }
  setTimeout(function () {
    window.location.href = url;
  }, SKELETON_MS);
}
