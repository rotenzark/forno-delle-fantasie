/* Il Forno Caffè delle Fantasie — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma del sito.
   Regole: GSAP/ScrollTrigger registrati SUBITO allo script load (mai in
   setTimeout/intro), reveal once:true, watchdog 1,5s, contenuto mai
   dipendente dall'animazione. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'forno-delle-fantasie',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [],
      1: [['07:00', '20:00']], 2: [['07:00', '20:00']], 3: [['07:00', '20:00']],
      4: [['07:00', '20:00']], 5: [['07:00', '20:00']], 6: [['07:00', '20:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 2000,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 960,
    EN: {
      'nav.storia': 'Our story', 'nav.pane': 'The bread', 'nav.fantasie': 'The fantasies',
      'nav.giornata': 'Breakfast to dinner', 'nav.recensioni': 'Reviews', 'nav.dove': 'Where & when', 'nav.chiama': 'Call',
      'hero.recensioni': '278 reviews', 'hero.pane': 'BREAD', 'hero.e': 'and', 'hero.fantasia': 'FANTASY.',
      'hero.sub': 'The mornings of San Siro come out of the Via Carlo Dolci oven since 1962: michette rolls, brioches, pizza by the slice and coffee — open all day, 7 to 8pm.',
      'hero.cta1': 'Discover the fantasies', 'hero.cta2': 'Our story',
      'ticker.orario': 'open all day 7–20', 'ticker.consegna': 'home delivery', 'ticker.forno': 'bread baked every day',
      'ticker.orario2': 'open all day 7–20', 'ticker.consegna2': 'home delivery', 'ticker.forno2': 'bread baked every day',
      'storia.kicker': 'Our story', 'storia.t1': 'ONE FAMILY,', 'storia.t2': 'one oven',
      'storia.p1': 'It all begins in 1962, when papà Edo Gavazzeni opens his first bakery in Milan, in piazza Prealpi. The bread is the everyday kind, made by hand and with patience — but next to the michette his «fantasies» appear at once: sweets, braids and focaccias that change with time and seasons.',
      'storia.p2': 'The family has never stopped baking since. Mamma Giusy taught everyone that you enter the shop as you enter a home: every customer has their greeting, and every greeting its smile. Today the children carry on oven and café in Via Carlo Dolci, with the same rhythm as ever: lit early, off late.',
      'storia.nota': '«she taught us to always have, and gladly, a smile for everyone» — this is how the family remembers Giusy',
      'storia.cap': 'At the counter, in the house apron: the Forno’s C embroidered on the chest.',
      'pane.kicker': 'The everyday register', 'pane.t1': 'THE BREAD', 'pane.t2': 'of every day',
      'pane.p1': 'Michette, ciabattine, pannocchie, arab bread, cereals, 5 seeds: the bread wall fills every morning and empties every evening. Prices written by hand, the old way — by the kilo, no surprises.',
      'pane.l1': 'Michette and pannocchie', 'pane.l2': 'Soft or crunchy ciabattine', 'pane.l3': 'Arab bread · pasta dura', 'pane.l4': 'Bocconcini', 'pane.l5': 'Cereals · 5 seeds',
      'pane.nota': 'the three-chocolate bread? «one of the best sweets they have» — Lusio, Google review',
      'carta.kicker': 'The menu, real prices', 'carta.t1': 'THE', 'carta.t2': 'FANTASIES',
      'carta.lead': 'Baked every morning from the house recipe. Prices are those of the in-shop list: reconfirm at the counter for the day’s specials.',
      'carta.chip1': 'Sweet', 'carta.chip2': 'Savoury', 'carta.chip3': 'Coffee',
      'carta.nota': '«via Dolci — “Sweet street”, nomen omen» writes a customer in the reviews. Hard to disagree.',
      'v.brioches': 'Brioches, many fillings', 'v.brioches.d': 'Plain, apricot, chocolate, raspberry, blueberry, pistachio, custard — wholegrain and vegan too.',
      'v.treccia': 'Maple and walnut braid', 'v.treccia.d': 'The fantasy that smells like a slow breakfast; also with raisins.',
      'v.krapfen': 'Custard krapfen', 'v.krapfen.d': 'Properly fried, filled at the right moment.',
      'v.strudel': 'Apple strudel', 'v.strudel.d': 'And next to it: cremonese (€0.60), doughnuts, muffins.',
      'v.crostate': 'Tarts and handmade cakes', 'v.crostate.d': 'Fresh fruit and house shortcrust; cakes to order too.',
      'v.panettone': 'The festive panettone', 'v.panettone.d': 'Seasonal: classic, chocolate or pistachio — baked right here.',
      'v.pizza': 'Pizza by the slice', 'v.pizza.d': 'Trays of the day: tomato and olives, anchovies, courgettes and cheese…', 'v.pizza.p': 'at the counter',
      'v.focacce': 'Focaccia', 'v.focacce.d': 'Tall and soft or Genoese style, with olive oil you can taste.', 'v.focacce.p': 'at the counter',
      'v.pasta': 'Fresh pasta', 'v.pasta.d': 'Tagliatelle €12/kg · ricotta-spinach tortelli, cappelletti, borage ravioli €30/kg.',
      'v.primi': 'Ready dishes, takeaway too', 'v.primi.d': 'The office lunch that tastes like home: lasagne, gratins, stuffed vegetables.', 'v.primi.p': 'of the day',
      'v.espresso': 'Espresso', 'v.espresso.d': 'At the counter or at the little café tables; macchiato same price.',
      'v.cappuccino': 'Cappuccino', 'v.cappuccino.d': 'With a brioche it’s the Via Dolci breakfast. Soy or almond too.',
      'v.marocchino': 'Marocchino', 'v.marocchino.d': 'Plus: caffè corretto €1.60, shakerato €3.00, barley and ginseng.',
      'v.cioccolata': 'Hot chocolate', 'v.cioccolata.d': 'With teas and infusions (€2.00) for slow afternoons. Takeaway +€0.10.',
      'giornata.kicker': 'Not just a bakery', 'giornata.t1': 'FROM BREAKFAST', 'giornata.t2': 'to dinner',
      'giornata.p1': 'Cappuccino and brioche at dawn, a slice at noon, fresh pasta and ready dishes for the evening: the counter changes with the hours, the oven never stops. Eat in, take away, or straight to your home.',
      'giornata.cta1': 'Order: +39 02 404 2022', 'giornata.servizi': 'eat in · pick up · home delivery',
      'rec.kicker': 'What people say', 'rec.t2': 'from 278 Google reviews',
      'rec.r1': '«Bakery and pastry shop in via Dolci — “Sweet street”, nomen omen. Besides bread, pizzas and focaccias it offers a wide choice of mignon pastries, biscuits and cakes.»',
      'rec.r2': '«Delicious pastry. Fresh cake, well balanced and visually curated. You can tell it’s an artisan product made with care. I’ll be back for sure.»',
      'rec.r3': '«Small but welcoming place, kind and polite staff; the food is truly excellent and honestly priced. I warmly recommend it.»',
      'rec.r4': '«Bakery in the Segesta area, very renowned locally. Both sweet and savoury, wide choice. The three-chocolate bread is exquisite, one of the best sweets they have.»',
      'rec.r5': '«My favourite breakfast spot ever: wonderful brioches with many different fillings, my favourite is custard. I also love their focaccias and pizzas.»',
      'dove.kicker': 'Where & when', 'dove.t1': 'ON VIA', 'dove.t2': 'Carlo Dolci',
      'dove.metro': 'Via Carlo Dolci 38, 20148 Milan · steps from the M5 Segesta station',
      'dove.nota': 'Open all day: the oven doesn’t close for lunch.',
      'dove.chiama': 'Call +39 02 404 2022', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday',
      'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you deliver?', 'faq.a1': 'Yes: besides eating in and picking up, we deliver at home. Call us on +39 02 404 2022 to order.',
      'faq.q2': 'What are your opening hours?', 'faq.a2': 'Monday to Saturday, 7:00 to 20:00 — all day long, the oven doesn’t close for lunch. On Sundays we rest.',
      'faq.q3': 'Do you also make fresh pasta and first courses?', 'faq.a3': 'Yes: tagliatelle, ricotta-spinach tortelli, cappelletti and borage ravioli, plus ready dishes to take away.',
      'faq.q4': 'Do you make cakes to order?', 'faq.a4': 'Yes, handmade cakes and tarts to order: drop by or call us to agree on flavour and pick-up date.',
      'faq.q5': 'Where are you and how do I get there?', 'faq.a5': 'Via Carlo Dolci 38, San Siro area, a few steps from the M5 Segesta station.',
      'foot.dal': 'Bread and fantasy since 1962 · Via Carlo Dolci 38, 20148 Milan · +39 02 404 2022',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0 });
    } else {
      els.forEach(function (el) { el.style.opacity = 1; });
    }
    // il fill del gesto-firma non deve mai restare invisibile
    document.querySelectorAll('.fant-fill').forEach(function (f) { f.style.clipPath = 'inset(0 0% 0 0)'; });
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, {
        opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
    // parallax hero leggero
    gsap.to('#heroPhoto', {
      yPercent: 10, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
    // GESTO-FIRMA: il fill di «FANTASIE» nella carta si disegna allo scroll
    gsap.utils.toArray('.fant-mini .fant-fill').forEach(function (fill) {
      gsap.fromTo(fill, { clipPath: 'inset(0 100% 0 0)' }, {
        clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: fill.closest('.titolo-doppio'), start: 'top 80%', once: true },
      });
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
    document.querySelectorAll('.fant-fill').forEach(function (f) { f.style.clipPath = 'inset(0 0% 0 0)'; });
  }

  /* ---------- hero entrance (chiamata a fine intro) ---------- */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) {
      document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; });
      document.querySelectorAll('.w-fantasia .fant-fill').forEach(function (f) { f.style.clipPath = 'inset(0 0% 0 0)'; });
      return;
    }
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .fromTo('.w-pane', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .6 }, .15)
      .fromTo('.w-e', { opacity: 0 }, { opacity: 1, duration: .4 }, .5)
      .fromTo('.w-fantasia', { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .6 }, .6)
      .fromTo('.w-fantasia .fant-fill', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power2.inOut' }, 1.0)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, 1.2)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, 1.4);
  }

  /* ---------- intro skippabile (non gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    heroEntrance();
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000);
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger (inert + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      lastFocus = document.activeElement;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a'); if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0');
      fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (PLUMBING_V 1) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) };
    }
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) };
    }
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    var en = root.lang === 'en';
    var txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (PLUMBING_V 1) ---------- */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function syncMirrors() {
    // gesto-firma: il layer .fant-fill rispecchia il testo dell'outline
    document.querySelectorAll('[data-i18n-mirror]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-mirror');
      var srcEl = document.querySelector('[data-i18n="' + key + '"]');
      if (srcEl) el.textContent = srcEl.textContent;
    });
  }
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    syncMirrors();
    renderHours();
    var t = document.getElementById('langToggle');
    if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(root.lang === 'en' ? 'it' : 'en');
    });
  }
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}
  syncMirrors();

  /* ---------- action-bar mobile ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ CODICE-FIRMA: chips filtro della carta ══════════ */
  var chips = document.querySelectorAll('.chip');
  var voci = document.querySelectorAll('.voce');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.toggle('is-active', c === chip); c.setAttribute('aria-selected', c === chip ? 'true' : 'false'); });
      var cat = chip.getAttribute('data-cat');
      voci.forEach(function (v) { v.classList.toggle('nascosta', v.getAttribute('data-cat') !== cat); });
    });
  });
  // stato iniziale: mostra il dolce
  voci.forEach(function (v) { v.classList.toggle('nascosta', v.getAttribute('data-cat') !== 'dolce'); });
})();
