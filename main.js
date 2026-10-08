// NeXo 2 — web: idioma (ES/EN), menu movil, animaciones al hacer scroll, contadores,
// terminal de los tests y boton "Copiar". Sin librerias.
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ------------------------------------------------------------------
  // Idioma: el español esta en el HTML; aqui solo la traduccion al ingles.
  // ------------------------------------------------------------------
  var EN = {
    "skip": "Skip to content",
    "nav.runs": "What runs", "nav.inside": "Inside", "nav.road": "Roadmap", "nav.build": "Build", "nav.code": "Code",
    "hero.eyebrow": "v0.0.2 · in active development",
    "hero.title": "A Switch&nbsp;2 emulator, written <em>from scratch</em>.",
    "hero.lead": "NeXo 2 is open source, in C++20. Every piece —the CPU, the kernel, the GPU— is hand-made, documented and checked with tests. It doesn't run commercial games yet; it does run homebrew, and it already draws in 3D.",
    "hero.code": "View the code", "hero.see": "See what already runs",
    "hero.cubenote": "This cube is CSS. The real one, drawn by NeXo, is further down.",
    "fig.cpu": "ARM64 CPU identical to a real ARM across 78&nbsp;000 random instructions",
    "fig.jit": "faster with the JIT: ~1&nbsp;100 million instructions per second",
    "fig.shaders": "random GPU programs the shader interpreter gets right",
    "fig.tests": "automated tests, with the interpreter and with the JIT",
    "runs.title": "What already runs",
    "runs.lead": "Screenshots taken from NeXo, untouched. The 3D samples are the official ones from deko3d, the graphics library of Switch homebrew.",
    "runs.pong": "Homebrew, playable with keyboard or an Xbox controller",
    "runs.tex.t": "Textured cube", "runs.tex": "BC1 texture read from the .nro's RomFS",
    "runs.teapot.t": "Lit teapot", "runs.teapot": "24&nbsp;000 triangles, 4× MSAA and sRGB",
    "runs.msaa.t": "3D cube", "runs.msaa": "Depth, perspective and multisampling",
    "runs.tri.t": "The first triangle", "runs.tri": "Real Maxwell shaders, run by our own interpreter",
    "compat.program": "Program", "compat.type": "Type", "compat.state": "Status",
    "compat.hb": "Homebrew (deko3d)", "compat.hb2": "Homebrew (libnx)",
    "compat.most": "7 of 9", "compat.playable": "Playable", "compat.works": "Works",
    "compat.commercial": "Commercial games", "compat.notyet": "Not yet",
    "inside.title": "Inside",
    "inside.lead": "From the ARM64 instruction to the pixel on your screen. Every step has its own page in the docs.",
    "flow.kernel": "HLE kernel", "flow.screen": "Screen",
    "flow.s1": "interpreter + JIT", "flow.s2": "SVC, IPC, services", "flow.s3": "shaders, textures",
    "p.cpu.t": "Full ARMv8.2",
    "p.cpu.d": "Integer, floating point with ARM's exact rules, NEON, AES/SHA and CRC32. A fuzzer compares it with a reference ARM, instruction by instruction.",
    "p.jit.t": "Translation to x86-64",
    "p.jit.d": "dynarmic turns ARM64 code into PC code and runs it directly. Anything it can't handle, the interpreter does.",
    "p.os.t": "Kernel and IPC",
    "p.os.d": "System calls, HIPC/CMIF messages with domains, 6 emulated cores with mutexes and condvars, and the services libnx uses: sm, applet, hid, time, fs, vi and nvdrv.",
    "p.gpu.t": "Shaders and textures",
    "p.gpu.d": "Maxwell shader decoder and interpreter, multithreaded software rasterizer, BC1–BC5 textures, mipmaps, MSAA and depth. Vulkan is on its way.",
    "road.title": "The roadmap",
    "road.lead": "What's done and what's next, in order. No dates: it ships when it's done right.",
    "r1.t": "Foundations", "r1.d": "Memory, NRO loader, HLE kernel and IPC",
    "r2.t": "Display and controllers", "r2.d": "The first real homebrew on screen",
    "r3.d": "ARMv8.2 at 100 %, decode cache and JIT (×6)",
    "r4.t": "Threads", "r4.d": "6 emulated cores",
    "r5.t": "Software GPU", "r5.d": "Commands, shaders, textures and 3D",
    "r6.d": "Drawing on the graphics card: device ready, shader translator under way",
    "r7.t": "Audio", "r7.d": "Audio services and output through the PC",
    "r8.t": "Game formats", "r8.d": "NSO, NCA and RomFS",
    "build.title": "Build it yourself",
    "build.lead": "There are no downloadable releases yet. With Visual Studio 2022, CMake and Git it builds in a few minutes.",
    "build.docs": "Read the docs", "build.copy": "Copy",
    "legal.p1": "NeXo 2 is an independent research and learning project. It is not affiliated with, associated with or endorsed by Nintendo. “Nintendo Switch” is a registered trademark of Nintendo.",
    "legal.p2": "NeXo 2 does not include firmware, keys or games, and does not help to obtain them. Use it with homebrew or with software you legally own.",
    "foot.code": "Source code", "foot.bug": "Report a bug", "foot.license": "Free software · GPLv3"
  };
  var META = {
    es: { title: "NeXo 2 — Emulador experimental de Nintendo Switch 2", now: "en curso", copied: "Copiado", copy: "Copiar",
          tests: "tests", checks: "comprobaciones", fails: "fallos" },
    en: { title: "NeXo 2 — Experimental Nintendo Switch 2 emulator", now: "in progress", copied: "Copied", copy: "Copy",
          tests: "tests", checks: "checks", fails: "failures" }
  };

  var nodes = document.querySelectorAll("[data-i18n]");
  var ES = {};
  nodes.forEach(function (el) { ES[el.getAttribute("data-i18n")] = el.innerHTML; });
  var langBtn = document.getElementById("lang");
  var current = "es";

  function setLang(lang) {
    current = lang;
    var dict = lang === "en" ? EN : ES;
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.documentElement.lang = lang;
    document.title = META[lang].title;
    document.querySelectorAll(".road .now b").forEach(function (b) { b.setAttribute("data-now", META[lang].now); });
    langBtn.textContent = lang === "en" ? "ES" : "EN";
    try { localStorage.setItem("nexo-lang", lang); } catch (e) { /* sin almacenamiento: da igual */ }
    if (termDone) renderTerm(TERM.length);   // la ultima linea depende del idioma
  }

  // ------------------------------------------------------------------
  // Terminal: la salida de los tests, escrita linea a linea
  // ------------------------------------------------------------------
  var TERM = [
    ["dim", "> build\\Release\\nexo2_tests.exe"],
    ["", "===== CPU: interprete ====="],
    ["ok", "[ OK ] CpuFuzz_AgainstReferenceArm"],
    ["ok", "[ OK ] Shader_Fuzz"],
    ["ok", "[ OK ] Texture_MipmapsLodAndGrad"],
    ["ok", "[ OK ] Draw_PerspectiveFromUniformMatrix"],
    ["", "===== CPU: JIT (dynarmic) ====="],
    ["ok", "[ OK ] [JIT] Vulkan_ComputeSmoke"],
    ["ok", "[ OK ] [JIT] Draw_NroTriangle"],
    ["sum", "SUM"]
  ];
  var term = document.getElementById("term");
  var termDone = false;
  function line(kind, text) {
    if (kind === "sum") {
      var m = META[current];
      text = "178 " + m.tests + ", 1334 " + m.checks + ", 0 " + m.fails;
    }
    var span = document.createElement("span");
    if (kind) span.className = kind;
    span.textContent = text;
    return span;
  }
  function renderTerm(n) {
    term.textContent = "";
    for (var i = 0; i < n; i++) {
      term.appendChild(line(TERM[i][0], TERM[i][1]));
      term.appendChild(document.createTextNode("\n"));
    }
    if (n >= TERM.length) {
      var c = document.createElement("span");
      c.className = "caret";
      term.appendChild(c);
    }
  }
  function playTerm() {
    if (reduced) { termDone = true; renderTerm(TERM.length); return; }
    var i = 0;
    (function step() {
      renderTerm(++i);
      if (i < TERM.length) setTimeout(step, i === 1 ? 500 : 260 + Math.random() * 240);
      else termDone = true;
    })();
  }

  var saved = null;
  try { saved = localStorage.getItem("nexo-lang"); } catch (e) {}
  var browser = (navigator.language || "es").slice(0, 2).toLowerCase();
  setLang(saved || (browser === "es" ? "es" : "en"));
  langBtn.addEventListener("click", function () { setLang(current === "es" ? "en" : "es"); });

  // ------------------------------------------------------------------
  // Menu movil y barra superior
  // ------------------------------------------------------------------
  var burger = document.getElementById("burger");
  var links = document.getElementById("links");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });
  var nav = document.querySelector(".nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ------------------------------------------------------------------
  // Aparecer al hacer scroll, contadores y terminal
  // ------------------------------------------------------------------
  function countUp(el) {
    var to = parseInt(el.getAttribute("data-to"), 10);
    if (reduced) { el.textContent = to.toLocaleString(current); return; }
    var start = null, dur = 1400;
    (function frame(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(to * eased).toLocaleString(current);
      if (p < 1) requestAnimationFrame(frame);
    })(performance.now());
  }

  // Retraso escalonado para los elementos que aparecen juntos
  document.querySelectorAll(".gallery, .figures, .parts, .road").forEach(function (group) {
    Array.prototype.forEach.call(group.querySelectorAll(".reveal"), function (el, i) {
      el.style.setProperty("--d", (i * 0.07).toFixed(2) + "s");
    });
  });

  var played = false;
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("in");
        e.target.querySelectorAll(".count").forEach(countUp);
        if (e.target.classList.contains("terminal") && !played) { played = true; playTerm(); }
        io.unobserve(e.target);
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll(".count").forEach(countUp);
    playTerm();
  }

  // Enlace activo en la barra segun la seccion visible
  var sections = ["corre", "dentro", "ruta", "compilar"].map(function (id) { return document.getElementById(id); });
  var navLinks = links.querySelectorAll("a");
  if ("IntersectionObserver" in window) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { if (s) so.observe(s); });
  }

  // ------------------------------------------------------------------
  // Copiar los comandos (sin los ">" del principio)
  // ------------------------------------------------------------------
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = document.getElementById(btn.getAttribute("data-copy")).textContent
        .split("\n").map(function (l) { return l.replace(/^>\s?/, ""); }).join("\n");
      var done = function () {
        btn.textContent = META[current].copied;
        setTimeout(function () { btn.textContent = META[current].copy; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      else done();
    });
  });
})();
