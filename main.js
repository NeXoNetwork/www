// NeXo 2 — web. Un solo archivo para las 4 paginas: idioma (ES/EN), tema claro/oscuro, menu movil,
// animaciones al entrar, capturas que se turnan, contadores, terminal y "Copiar".
(function () {
  "use strict";
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // ------------------------------------------------------------------
  // Traduccion al ingles (el español esta en el HTML)
  // ------------------------------------------------------------------
  var EN = {
    "skip": "Skip to content",
    "meta.home": "NeXo 2 — Experimental Nintendo Switch 2 emulator",
    "meta.compat": "Compatibility — NeXo 2", "meta.inside": "Inside — NeXo 2", "meta.build": "Build — NeXo 2",
    "nav.home": "Home", "nav.compat": "Compatibility", "nav.inside": "Inside", "nav.build": "Build",
    "home.meta1": "In development · v0.0.2", "home.meta2": "C++20 · Open source · GPLv3",
    "home.h": ["Switch 2,", "from", "<span class=\"red\">scratch.</span>"],
    "home.lede": "NeXo 2 is an experimental Nintendo Switch 2 emulator. The CPU, the kernel and the GPU are written by hand, documented and checked with tests. It doesn't run commercial games yet; homebrew it does: a 3D shooter is already playable with sound, it opens the homebrew menu, and the App Store downloads its catalogue over https.",
    "home.cta1": "View on GitHub", "home.cta2": "What works",
    "home.capnote": "real NeXo screenshot",
    "home.f1": "ARM64 CPU identical to a real ARM across 78&nbsp;000 random instructions",
    "home.f2": "faster with the JIT: ~1&nbsp;100 million instructions per second",
    "home.f3": "emulated cores, each on its own PC thread; the GPU, on another",
    "home.f4": "automated tests, with the interpreter and with the JIT",
    "home.i2": "Screenshots and the list of what already runs",
    "home.i3": "How it's built and where it's going",
    "home.i4": "Requirements, commands and documentation",
    "nav.compat.h": ["What", "runs"],
    "compat.lede": "Screenshots taken from NeXo as they are, untouched. The 3D samples are the official ones from deko3d, the graphics library of Switch homebrew.",
    "c.teapot.t": "Lit teapot", "c.teapot": "24&nbsp;000 triangles · 4× MSAA · sRGB",
    "c.tex.t": "Textured cube", "c.tex": "BC1 from the RomFS",
    "c.msaa.t": "3D cube", "c.msaa": "Depth and MSAA",
    "c.tri.t": "The first triangle", "c.tri": "Real Maxwell shaders",
    "c.pong.t": "UMSDPong", "c.pong": "Playable with a controller",
    "c.nzp.t": "Nazi Zombies Portable", "c.nzp": "3D shooter with OpenGL and sound",
    "c.n9": "Playable in 3D, with sound. Slow with the software GPU (about 7 frames per second).",
    "c.hb.t": "hbmenu", "c.hb": "The homebrew menu, with the system font",
    "c.as.t": "Homebrew App Store", "c.as": "Real catalogue downloaded over https",
    "c.n6": "Lists the .nro files on the SD card, shows their icons and opens other programs (chain loading).",
    "c.n7": "Downloads the catalogue over https (real TLS) and is navigated with the controller.",
    "c.n8": "Boots and asks for its data files, which aren't included.",
    "c.port": "Homebrew port", "c.s8": "Boots",
    "c.list": "Tested programs",
    "c.listnote": "Homebrew only. NeXo doesn't include or help to get games, firmware or keys.",
    "c.th1": "Program", "c.th2": "Type", "c.th3": "Notes", "c.th4": "Status",
    "c.n1": "Triangle, cubes, textures, MSAA, lighting and deferred shading. Tessellation and compute are missing.",
    "c.n2": "Playable with keyboard or an Xbox controller.",
    "c.n3": "Full menu and controller navigation.",
    "c.n4": "libnx start-up, threads on 4 cores and the GPU channel.",
    "c.n5": "Needs Vulkan, audio and the game formats (NSO, NCA).",
    "c.own": "Own tests", "c.games": "Commercial games",
    "c.s1": "7 of 9", "c.s2": "Playable", "c.s3": "Works", "c.s5": "Not yet",
    "nav.inside.h": ["Built", "by hand"],
    "in.lede": "From the ARM64 instruction to the pixel on your screen. Every piece is written from scratch and has its own page in the docs.",
    "in.cpu.t": "ARM64", "in.cpu": "Our own interpreter for all of ARMv8.2: integer, floating point with ARM's exact rules, NEON, AES/SHA and CRC32. A fuzzer compares it with a reference ARM, instruction by instruction.",
    "in.jit.t": "Translation", "in.jit": "dynarmic turns ARM64 code into x86-64 code and runs it directly, six times faster. Anything it can't handle, the interpreter does.",
    "in.os.t": "System", "in.os": "System calls, HIPC/CMIF messages with domains, 6 emulated cores on real PC threads, and the services libnx uses.",
    "in.gpu.t": "Graphics", "in.gpu": "Maxwell GPU commands and macros on their own thread, a shader interpreter, a multithreaded software rasterizer with a texture cache, BC1–BC5, mipmaps and MSAA. Now, Vulkan.",
    "in.aud.t": "Sound", "in.aud": "The console's audio output (audout) plays through the PC's sound card with SDL3, and each buffer is released on time so the program runs at its own pace.",
    "in.net.t": "Network", "in.net": "Sockets, DNS and https over the PC's network. The TLS is real, with mbedTLS, and servers are checked against the system's certificates.",
    "in.road": "The roadmap", "in.roadnote": "In order and without dates: each step comes when the previous one is done right and tested.",
    "in.progress": "Overall progress",
    "r1.t": "Foundations", "r1": "Memory, NRO loader, HLE kernel and IPC",
    "r2.t": "Display and controllers", "r2": "The first real homebrew on screen",
    "r3.t": "Complete CPU", "r3": "ARMv8.2 at 100 %, decode cache and JIT",
    "r4.t": "Threads", "r4": "6 emulated cores on real threads, and the GPU on its own",
    "r5.t": "Software GPU", "r5": "Shaders, textures, 3D",
    "r6.t": "Vulkan", "r6": "Drawing on the graphics card",
    "r7.t": "Audio", "r7": "audout already plays on the PC; audren is next",
    "r8.t": "Game formats", "r8": "NSO, NCA and RomFS",
    "r9.t": "Network and https", "r9": "Sockets, DNS and TLS with mbedTLS",
    "st.done": "Done", "st.now": "In progress", "st.next": "Later",
    "in.tests": "Checked", "in.testsnote": "Every change runs the test suite twice: with the interpreter and with the JIT.",
    "nav.build.h": ["Build", "it yourself"],
    "b.lede": "Every commit is built automatically and published as a prerelease on GitHub (Windows x64): unzip it, put your .nro files in sdmc/switch and open NeXo2.exe. Or build it yourself in a few minutes.",
    "b.dl": "Download prerelease",
    "b.req": "You need",
    "b.r1": "With “Desktop development with C++”.", "b.r2": "From cmake.org, or the one bundled with Visual Studio.",
    "b.r3": "To get the code and its submodules.", "b.r4t": "A Vulkan GPU", "b.r4": "Optional for now: without it, NeXo draws in software.",
    "b.copy": "Copy",
    "b.note": "<code>build.bat</code> finds Visual Studio's CMake (even with devkitPro installed), builds in Release and, with <code>test</code>, runs the tests. If you cloned it before, fetch the new submodules (like mbedTLS) with <code>git submodule update --init --recursive</code>. Then drag a <code>.nro</code> onto the window (or “Cargar NRO”) and press Run or F5.",
    "b.docs": "Documentation", "b.docsnote": "Hardware, operating system, formats and how each part of NeXo works inside.",
    "b.docsbtn": "Read the docs",
    "b.legal": "Legal notice",
    "b.l1": "NeXo 2 is an independent research and learning project. It is not affiliated with, associated with or endorsed by Nintendo. “Nintendo Switch” is a registered trademark of Nintendo.",
    "b.l2": "NeXo 2 does not include firmware, keys or games, and does not help to obtain them. Use it with homebrew or with software you legally own.",
    "foot.about": "NeXo 2",
    "foot.legal": "Independent research and learning project, unrelated to Nintendo. No firmware, keys or games included. Free software under the GPLv3.",
    "foot.pages": "Pages", "foot.project": "Project", "foot.code": "Source code", "foot.docs": "Documentation", "foot.bug": "Report a bug"
  };
  var UI = {
    es: { copy: "Copiar", copied: "Copiado", tests: "tests", checks: "comprobaciones", fails: "fallos", lang: "EN", toDark: "Cambiar a tema oscuro", toLight: "Cambiar a tema claro" },
    en: { copy: "Copy", copied: "Copied", tests: "tests", checks: "checks", fails: "failures", lang: "ES", toDark: "Switch to dark theme", toLight: "Switch to light theme" }
  };

  // Guardar el español original de cada texto
  var ES = {};
  $$("[data-i18n]").forEach(function (el) { ES[el.getAttribute("data-i18n")] = el.innerHTML; });
  $$("[data-i18n-lines]").forEach(function (el) {
    ES[el.getAttribute("data-i18n-lines")] = $$(".line > span", el).map(function (s) { return s.innerHTML; });
  });
  var lang = "es";

  function setLang(l) {
    lang = l;
    var dict = l === "en" ? EN : ES;
    $$("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v === undefined) return;
      if (el.tagName === "TITLE") document.title = v; else el.innerHTML = v;
    });
    $$("[data-i18n-lines]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-lines")];
      if (!v) return;
      $$(".line > span", el).forEach(function (s, i) { if (v[i] !== undefined) s.innerHTML = v[i]; });
    });
    document.documentElement.lang = l;
    var b = $("#lang");
    if (b) b.textContent = UI[l].lang;
    try { localStorage.setItem("nexo-lang", l); } catch (e) { /* sin almacenamiento */ }
    if (termShown) renderTerm(TERM.length);
    updateThemeButton();
  }

  // ------------------------------------------------------------------
  // Tema claro / oscuro. El script del <head> ya lo puso antes de pintar
  // (sin destello); aqui solo el boton. Sin eleccion guardada, sigue al sistema.
  // ------------------------------------------------------------------
  var root = document.documentElement;
  function theme() { return root.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
  function updateThemeButton() {
    var b = $("#theme");
    if (!b) return;
    var dark = theme() === "dark";
    b.setAttribute("aria-pressed", dark ? "true" : "false");
    b.setAttribute("aria-label", dark ? UI[lang].toLight : UI[lang].toDark);
    b.title = b.getAttribute("aria-label");
  }
  function setTheme(t, save) {
    if (!reduced) {
      root.classList.add("theme-anim");
      setTimeout(function () { root.classList.remove("theme-anim"); }, 400);
    }
    root.setAttribute("data-theme", t);
    var meta = $("#theme-color");
    if (meta) meta.setAttribute("content", t === "dark" ? "#121211" : "#f2efe7");
    if (save) { try { localStorage.setItem("nexo-theme", t); } catch (e) { /* sin almacenamiento */ } }
    updateThemeButton();
  }

  // ------------------------------------------------------------------
  // Terminal (pagina "Por dentro")
  // ------------------------------------------------------------------
  var TERM = [
    ["dim", "> build\\Release\\nexo2_tests.exe"],
    ["", "===== CPU: interprete ====="],
    ["ok", "[ OK ] CpuFuzz_AgainstReferenceArm"],
    ["ok", "[ OK ] Shader_Fuzz"],
    ["ok", "[ OK ] Texture_MipmapsLodAndGrad"],
    ["ok", "[ OK ] Draw_PerspectiveFromUniformMatrix"],
    ["ok", "[ OK ] Network_LoopbackTcp"],
    ["", "===== CPU: JIT (dynarmic) ====="],
    ["ok", "[ OK ] [JIT] Vulkan_ComputeSmoke"],
    ["ok", "[ OK ] [JIT] Draw_NroTriangle"],
    ["sum", ""]
  ];
  var term = $("#term"), termShown = false;
  function renderTerm(n) {
    if (!term) return;
    term.textContent = "";
    for (var i = 0; i < n; i++) {
      var s = document.createElement("span");
      s.className = TERM[i][0];
      s.textContent = TERM[i][0] === "sum"
        ? "196 " + UI[lang].tests + ", 1558 " + UI[lang].checks + ", 0 " + UI[lang].fails
        : TERM[i][1];
      term.appendChild(s);
      term.appendChild(document.createTextNode("\n"));
    }
    if (n >= TERM.length) { var c = document.createElement("span"); c.className = "caret"; term.appendChild(c); }
  }
  function playTerm() {
    termShown = true;
    if (reduced) { renderTerm(TERM.length); return; }
    var i = 0;
    (function step() { renderTerm(++i); if (i < TERM.length) setTimeout(step, i === 1 ? 450 : 220 + Math.random() * 260); })();
  }

  var saved = null;
  try { saved = localStorage.getItem("nexo-lang"); } catch (e) {}
  var nav = (navigator.language || "es").slice(0, 2).toLowerCase();
  setLang(saved || (nav === "es" ? "es" : "en"));
  var langBtn = $("#lang");
  if (langBtn) langBtn.addEventListener("click", function () { setLang(lang === "es" ? "en" : "es"); });
  var themeBtn = $("#theme");
  if (themeBtn) themeBtn.addEventListener("click", function () { setTheme(theme() === "dark" ? "light" : "dark", true); });
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var follow = function (e) {
      var savedTheme = null;
      try { savedTheme = localStorage.getItem("nexo-theme"); } catch (err) {}
      if (savedTheme !== "light" && savedTheme !== "dark") setTheme(e.matches ? "dark" : "light", false);
    };
    if (mq.addEventListener) mq.addEventListener("change", follow); else if (mq.addListener) mq.addListener(follow);
  }

  // ------------------------------------------------------------------
  // Menu movil
  // ------------------------------------------------------------------
  var burger = $("#burger"), menu = $("#menu");
  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // ------------------------------------------------------------------
  // Animaciones al entrar en pantalla
  // ------------------------------------------------------------------
  function countUp(el) {
    var to = parseInt(el.getAttribute("data-to"), 10);
    if (reduced || isNaN(to)) return;
    var t0 = null, dur = 1300;
    el.textContent = "0";
    (function f(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) requestAnimationFrame(f);
    })(performance.now());
  }
  function enter(el) {
    el.classList.add("is-in");
    $$(".count", el).forEach(countUp);
    if (el.id === "term" || $("#term", el)) { if (!termShown) playTerm(); }
  }
  // Los titulos grandes entran al cargar la pagina
  requestAnimationFrame(function () {
    $$(".display, h1.title").forEach(function (h) { h.classList.add("is-in"); });
  });
  var targets = $$(".reveal, .wipe");
  if ("IntersectionObserver" in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { enter(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.15, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(enter);
  }
  // Barra de progreso: empieza vacia y se llena al verla
  $$(".bar i").forEach(function (b) {
    var w = b.style.getPropertyValue("--w");
    b.style.setProperty("--w", "0%");
    var bar = b.parentNode;
    var check = function () { if (bar.classList.contains("is-in")) b.style.setProperty("--w", w); else requestAnimationFrame(check); };
    check();
  });

  // ------------------------------------------------------------------
  // Capturas de la portada: se turnan cada 3,5 s
  // ------------------------------------------------------------------
  var screen = $("#screen");
  if (screen) {
    var imgs = $$(".screen-inner img", screen), dots = $$(".dots i", screen), cap = $("#cap");
    var cur = 0, timer = null;
    var show = function (n) {
      imgs[cur].classList.remove("on"); dots[cur].classList.remove("on");
      cur = n;
      imgs[cur].classList.add("on"); dots[cur].classList.add("on");
      if (cap) cap.textContent = imgs[cur].getAttribute("data-cap");
    };
    var start = function () { if (!reduced) timer = setInterval(function () { show((cur + 1) % imgs.length); }, 3500); };
    dots.forEach(function (d, i) { d.addEventListener("click", function () { clearInterval(timer); show(i); start(); }); });
    document.addEventListener("visibilitychange", function () { clearInterval(timer); if (!document.hidden) start(); });
    start();
  }

  // ------------------------------------------------------------------
  // Copiar comandos (sin el "> " del principio)
  // ------------------------------------------------------------------
  $$(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = document.getElementById(btn.getAttribute("data-copy")).textContent
        .split("\n").map(function (l) { return l.replace(/^>\s?/, ""); }).join("\n");
      var done = function () {
        btn.textContent = UI[lang].copied;
        setTimeout(function () { btn.textContent = UI[lang].copy; }, 1500);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      else done();
    });
  });
})();
