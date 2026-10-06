// NeXo 2 — web: idioma (ES/EN), menu movil y boton "Copiar".
(function () {
  "use strict";

  // El texto en español esta en el HTML; aqui solo la traduccion al ingles.
  var EN = {
    "nav.status": "Status", "nav.features": "Inside", "nav.build": "Build", "nav.legal": "Legal", "nav.code": "Code",
    "hero.pill": "In active development",
    "hero.lead": "An experimental, open-source Nintendo Switch&nbsp;2 emulator, written from scratch in C++20.",
    "hero.caption": "UMSDPong (homebrew) being played in NeXo 2 with an Xbox controller",
    "hero.code": "View the code", "hero.build": "How to build it",
    "row.status": "Status", "row.build": "Build",
    "stats.cpu": "ARM64 CPU identical to a real ARM across 78&nbsp;000 random instructions",
    "stats.jit": "faster with the JIT: ~1&nbsp;100 million instructions per second",
    "stats.cores": "emulated cores with threads, mutexes and condition variables",
    "stats.tests": "automated tests (68 with the interpreter and 68 with the JIT)",
    "status.title": "What it does today (and what it doesn't)",
    "status.lead": "NeXo 2 is at an early stage. We'd rather say it as it is.",
    "status.yes": "Working", "status.no": "Not yet",
    "status.y1": "Homebrew <code>.nro</code> built with libnx: it boots, draws and responds to the controller",
    "status.y2": "Complete ARM64 CPU (integer, floating point, NEON, crypto) and a JIT",
    "status.y3": "Threads spread across 6 emulated cores",
    "status.y4": "GPU, phase 1: commands, macros, clears, copies and blits",
    "status.y5": "Controllers, an SD card backed by a PC folder, and debugging tools",
    "status.n1": "Commercial games",
    "status.n2": "3D drawing: shaders and Vulkan backend (GPU phase 2)",
    "status.n3": "Audio",
    "status.n4": "Game formats (NSO, NCA)",
    "compat.title": "Tested programs", "compat.program": "Program", "compat.type": "Type", "compat.state": "Status", "compat.notes": "Notes",
    "compat.works": "Works", "compat.playable": "Playable", "compat.own": "Own test",
    "compat.n1": "Full menu and controller navigation; fast with the JIT",
    "compat.n2": "Playable with keyboard or gamepad",
    "compat.n3": "All 45 calls of libnx start-up",
    "compat.n4": "4 threads on 4 cores with mutex, condvar and waits",
    "compat.n5": "GPU channel driven like deko3d: macro, clear, copy and fence",
    "features.title": "How it's built",
    "features.lead": "Every part is written from scratch, documented and checked with tests, so you can learn from it.",
    "f.cpu.t": "ARM64 CPU",
    "f.cpu.d": "Our own interpreter for all of ARMv8.2: integer, floating point with ARM's exact rules, NEON, AES/SHA and CRC32. Compared against a reference ARM instruction by instruction.",
    "f.jit.d": "dynarmic translates ARM64 code to x86-64 and runs it directly: six times faster. Anything it can't handle falls back to the interpreter.",
    "f.threads.t": "Threads",
    "f.threads.d": "Scheduler with 6 emulated cores, priorities, libnx-style mutexes and condition variables, and deadlock detection.",
    "f.gpu.d": "nvhost devices, channels, pushbuffers and macros of the Maxwell GPU; clears render targets, copies and scales images. Tested with deko3d's real macros.",
    "f.ipc.t": "HLE kernel and IPC",
    "f.ipc.d": "System calls (SVCs), HIPC/CMIF/TIPC messages with domains and the libnx start-up services: sm, applet, hid, time, fs, vi and nvdrv.",
    "f.io.t": "Display, controllers and SD",
    "f.io.d": "Binder buffer queue, GPU block-linear images, PC controllers in hid shared memory and a PC folder acting as <code>sdmc:/</code>.",
    "road.lead": "What's done and what's next, in order.",
    "r1.t": "Infrastructure", "r1.d": "Virtual memory, logging, SDL3 + ImGui window",
    "r2.t": "NRO loader, HLE kernel and IPC", "r2.d": "The whole libnx start-up",
    "r3.t": "Display, SD and controllers", "r3.d": "The first real homebrew on screen",
    "r4.t": "Complete CPU", "r4.d": "ARMv8.2 at 100 % against a reference ARM",
    "r5.t": "Speed", "r5.d": "Decode cache and a dynarmic JIT (×6)",
    "r6.t": "Threads", "r6.d": "6 emulated cores, mutexes and condvars",
    "r7.t": "GPU", "r7.d": "Phase 1 done (commands, macros, clears, copies). Next: shaders and Vulkan",
    "r8.t": "Audio", "r8.d": "Audio services and output through the PC",
    "r9.t": "Game formats", "r9.d": "NSO, NCA and the game's file system",
    "build.title": "Build it yourself",
    "build.lead": "There are no downloadable releases yet: NeXo 2 is built from source.",
    "build.req": "Requirements (Windows)",
    "build.r1": "Visual Studio 2022 with “Desktop development with C++”",
    "build.note": "The first build takes a few extra minutes (the JIT). Then drag a <code>.nro</code> onto the window or use “Cargar NRO” and press Run (F5).",
    "build.copy": "Copy",
    "docs.title": "Documentation",
    "docs.d": "Hardware, operating system, formats, and how each part of NeXo works inside.",
    "docs.btn": "Read the docs",
    "legal.title": "Legal notice",
    "legal.p1": "NeXo 2 is an independent research and learning project. It is not affiliated with, associated with or endorsed by Nintendo. “Nintendo Switch” is a registered trademark of Nintendo.",
    "legal.p2": "NeXo 2 does not include firmware, keys or games, and does not help to obtain them. Use it with homebrew or with software you legally own.",
    "foot.code": "Source code", "foot.bug": "Report a bug", "foot.license": "Free software under the GPLv3 licence."
  };
  var META = {
    es: { title: "NeXo 2 — Emulador experimental de Nintendo Switch 2", now: "En curso", copied: "¡Copiado!", copy: "Copiar" },
    en: { title: "NeXo 2 — Experimental Nintendo Switch 2 emulator", now: "In progress", copied: "Copied!", copy: "Copy" }
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
    var now = document.querySelector(".timeline .now b");
    if (now) now.setAttribute("data-now", META[lang].now);
    langBtn.textContent = lang === "en" ? "ES" : "EN";
    try { localStorage.setItem("nexo-lang", lang); } catch (e) { /* sin almacenamiento: da igual */ }
  }

  var saved = null;
  try { saved = localStorage.getItem("nexo-lang"); } catch (e) {}
  var browser = (navigator.language || "es").slice(0, 2).toLowerCase();
  setLang(saved || (browser === "es" ? "es" : "en"));
  langBtn.addEventListener("click", function () { setLang(current === "es" ? "en" : "es"); });

  // Menu en movil
  var burger = document.getElementById("burger");
  var links = document.getElementById("links");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  links.addEventListener("click", function (e) {
    if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
  });

  // Copiar los comandos de compilacion
  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var text = document.getElementById(btn.getAttribute("data-copy")).textContent;
      var done = function () {
        btn.textContent = META[current].copied;
        setTimeout(function () { btn.textContent = META[current].copy; }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () {});
      else done();
    });
  });
})();
