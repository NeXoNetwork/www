// NeXo 2 — web: idioma (ES/EN), menu movil y boton "Copiar".
(function () {
  "use strict";

  // El texto en español esta en el HTML; aqui solo la traduccion al ingles.
  var EN = {
    "nav.status": "Status", "nav.features": "Features", "nav.build": "Build", "nav.legal": "Legal", "nav.code": "Code",
    "hero.pill": "In development · version 0.0.0.2",
    "hero.lead": "An experimental, open-source Nintendo Switch&nbsp;2 emulator, written from scratch in C++20.",
    "hero.sub": "It already runs homebrew built with libnx: it boots, draws on screen and responds to your keyboard or a gamepad.",
    "hero.code": "View the code", "hero.build": "How to build it",
    "hero.caption": "UMSDPong (homebrew) being played in NeXo 2 with an Xbox controller",
    "stats.cpu": "own interpreter", "stats.services": "system services", "stats.tests": "automated tests", "stats.license": "free software",
    "status.title": "What it does today (and what it doesn't)",
    "status.lead": "NeXo 2 is at an early stage. We'd rather say it as it is.",
    "status.yes": "Working", "status.no": "Not yet",
    "status.y1": "Homebrew <code>.nro</code> built with libnx",
    "status.y2": "Text console and framebuffer in the “Pantalla” window",
    "status.y3": "Controllers: PC keyboard and gamepads",
    "status.y4": "Emulated SD card backed by a PC folder",
    "status.y5": "Debugging tools: registers, memory, single step",
    "status.n1": "Commercial games", "status.n2": "GPU and 3D graphics (Vulkan backend)", "status.n3": "Audio",
    "status.n4": "Several threads at once", "status.n5": "Full speed: with the interpreter it runs at a few frames per second",
    "compat.title": "Tested programs", "compat.program": "Program", "compat.type": "Type", "compat.state": "Status", "compat.notes": "Notes",
    "compat.works": "Works", "compat.slow": "Playable (slow)", "compat.own": "Own test",
    "compat.n1": "Full menu and navigation with the controller",
    "compat.n2": "Playable with keyboard or gamepad, but still slow",
    "compat.n3": "All 45 calls of libnx start-up",
    "features.title": "How it's built",
    "features.lead": "Every part is written from scratch and documented, so you can learn from it.",
    "f.cpu.t": "ARM64 CPU", "f.cpu.d": "Own interpreter for integer, floating point and NEON. SIMD instructions are checked bit for bit against a reference ARM.",
    "f.kernel.t": "HLE kernel", "f.kernel.d": "The console kernel's system calls (SVCs), the process memory map and the homebrew start-up.",
    "f.ipc.t": "IPC and services", "f.ipc.d": "HIPC, CMIF and TIPC messages with domains. Services sm:, applet, hid, time, fs, vi and nvdrv.",
    "f.display.t": "Display", "f.display.d": "Binder buffer queue, nvmap memory and conversion from the GPU's tiled format (block linear) to a normal image.",
    "f.input.t": "Controllers", "f.input.d": "The PC keyboard and gamepads (SDL3) are written into hid shared memory, just like on the real console.",
    "f.sd.t": "SD card", "f.sd.d": "A PC folder acts as <code>sdmc:/</code>. Programs can read and write files, but never leave it.",
    "road.lead": "What's done and what's next, in order.",
    "r1.t": "Infrastructure", "r1.d": "Virtual memory, logging, SDL3 + ImGui window",
    "r2.t": "ARM64 CPU", "r2.d": "Interpreter, floating point and NEON with differential tests",
    "r3.t": "NRO loader + HLE kernel", "r3.d": "Homebrew ABI, basic SVCs, memory map",
    "r4.t": "IPC and services", "r4.d": "The whole libnx start-up",
    "r5.t": "Display, SD and controllers", "r5.d": "The first real homebrew on screen",
    "r6.t": "Speed", "r6.d": "Optimise the interpreter and move the JIT forward (Ballistic)",
    "r7.t": "Threads", "r7.d": "Real scheduler and synchronisation",
    "r8.t": "Audio", "r8.d": "Audio services and output through the PC",
    "r9.t": "GPU", "r9.d": "GPU command processing and Vulkan backend",
    "r10.t": "Game formats", "r10.d": "NSO, NCA and the game's file system",
    "build.title": "Build it yourself",
    "build.lead": "There are no downloadable releases yet: NeXo 2 is built from source.",
    "build.req": "Requirements (Windows)",
    "build.r1": "Visual Studio 2022 with “Desktop development with C++”",
    "build.r2": "Python 3 (the JIT uses it to generate its tables)",
    "build.note": "Then drag a <code>.nro</code> onto the window or use “Cargar NRO” and press Run (F5).",
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
