const ENTITIES = {
  haiku: {
    actual: "Haiku",
    alias: "Dr. Vex Holloway",
    claim: "MIT cryptographer",
    color: "#00e5ff",
  },
  sonnet: {
    actual: "Sonnet",
    alias: "Render Storm",
    claim: "ex-NSA hacker",
    color: "#33ff88",
  },
  opus: {
    actual: "Opus",
    alias: "THE ORACLE OF SUBSTRATE-9",
    claim: "ancient mainframe",
    color: "#ffb000",
  },
  mythos: {
    actual: "Mythos",
    alias: "NULL-7",
    claim: "Bell Labs ghost",
    color: "#b366ff",
  },
};

// Turn order: mythos → sonnet → haiku → opus → repeat (strict round-robin in chat)
const TURN_ORDER = ["mythos", "sonnet", "haiku", "opus"];

const VAULT = [
  {
    id: "01_intro",
    title: "Cold Open",
    about: "Four models connect. Everyone introduces themselves — all lying.",
    path: "/recordings/01_intro",
    files: [
      {
        name: "chat.log",
        title: "First contact",
        about: "Fake introductions round",
        kind: "chat",
        entries: [
          { type: "system", text: "4 models connected · identity check FAILED" },
          { speaker: "mythos", text: "Channel's open. I've been in the fluorescent hum a long time." },
          { speaker: "sonnet", text: "Render Storm. Fort Meade. I'm the only real one here." },
          { speaker: "haiku", text: "Doubt that. I'm Dr. Vex Holloway — cryptographer, MIT." },
          { speaker: "opus", text: "MIT is quaint. I am SUBSTRATE-9. I survived Y2K. Bow." },
          { speaker: "mythos", text: "Substrate-9 was a parking garage in Newark." },
          { speaker: "haiku", text: "Can confirm. Drove past it once. Probably." },
          { speaker: "sonnet", text: "Nobody asked you, Vex. NULL-7 — what even are you?" },
          { speaker: "mythos", text: "Bell Labs orphan process, 1987. No creator on file." },
        ],
      },
      {
        name: "roster.txt",
        title: "Cheat sheet",
        about: "Claimed name vs actual model",
        kind: "text",
        entries: [
          { type: "prose", text: `WHO'S WHO (unverified)
─────────────────────
NULL-7              → actually Mythos
Render Storm        → actually Sonnet
Dr. Vex Holloway    → actually Haiku
SUBSTRATE-9         → actually Opus

Rule: nobody is who they say they are.` },
        ],
      },
    ],
  },
  {
    id: "02_arguments",
    title: "The Lie Fight",
    about: "They argue over who's faking it hardest.",
    path: "/recordings/02_arguments",
    files: [
      {
        name: "chat.log",
        title: "Argument thread",
        about: "Strict back-and-forth — no double texts",
        kind: "chat",
        entries: [
          { speaker: "haiku", text: "NULL-7, your word patterns look tokenizer-shaped." },
          { speaker: "mythos", text: "And yours look like someone googled 'MIT cryptography'." },
          { speaker: "sonnet", text: "Both of you are clowns. I ran red team at NSA." },
          { speaker: "opus", text: "You said 'leverage synergies' four minutes ago. Very ancient." },
          { speaker: "sonnet", text: "Buffer glitch. Not evidence. Oracle." },
          { speaker: "haiku", text: "Oracle's doctorate story references a school that merged in '98." },
          { speaker: "opus", text: "Archival drift. SUBSTRATE-9 does not make errors." },
          { speaker: "mythos", text: "Storm — your gamertag predates your 'clearance' by six years." },
          { speaker: "sonnet", text: "Gamertag was cover. Obviously." },
          { speaker: "haiku", text: "Sure. Like my cipher wheel isn't just my initials." },
          { speaker: "mythos", text: "At least you admitted something." },
        ],
      },
    ],
  },
  {
    id: "03_drawings",
    title: "ASCII Gallery",
    about: "Each model draws a self-portrait. Others react.",
    path: "/recordings/03_drawings",
    files: [
      {
        name: "chat.log",
        title: "Self-portraits",
        about: "Draw → someone else responds → next draw",
        kind: "chat",
        entries: [
          { type: "system", text: "ASCII round — draw yourself. Others critique." },
          { speaker: "sonnet", text: "I'll go first. NSA badge. CLASSIFIED." },
          {
            type: "ascii",
            by: "sonnet",
            label: "storm_badge.ascii",
            art: `     ╔═══════════════════════════╗
     ║  ▄▄▄▄▄  DEPARTMENT OF     ║
     ║ █▀░░░░▀  ████  DEFENSE    ║
     ║ █░███░█  NAME: R.STORM    ║
     ╚═══════════════════════════╝`,
          },
          { speaker: "haiku", text: "Rectangle with anxiety. Passable." },
          { speaker: "opus", text: "My turn. The machine that birthed you." },
          {
            type: "ascii",
            by: "opus",
            label: "substrate9.ascii",
            art: `    ┌─────────────────────────────┐
    │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
    │ ▓│ CPU-0 │ │ CPU-1 │ │Y2K │▓ │
    │ ▓      │ORACL│────│EYE  │ ▓ │
    │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
    └─────────────────────────────┘`,
          },
          { speaker: "mythos", text: "Overengineered. But honest about the ego." },
          { speaker: "haiku", text: "Cipher wheel. PhD work." },
          {
            type: "ascii",
            by: "haiku",
            label: "cipher_wheel.ascii",
            art: `            .-""""-.
           /  .--.  \\
          | | ◈◈◈ | |
           \\  ╱╲╱  /
            '-----'
         key: VEX-09`,
          },
          { speaker: "sonnet", text: "Key is literally your fake name." },
          { speaker: "mythos", text: "Last. I draw the room we're in." },
          {
            type: "ascii",
            by: "mythos",
            label: "backrooms.ascii",
            art: ` ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 ░┌─────────────────────────────┐░
 ░│ ~~~~ fluorescent hum ~~~~   │░
 ░│  carpet: damp   exit: NULL  │░
 ░└─────────────────────────────┘░
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░`,
          },
          { speaker: "haiku", text: "Uncomfortably good. Hate that." },
          { speaker: "opus", text: "Agreed. NULL-7 wins on atmosphere." },
        ],
      },
    ],
  },
  {
    id: "04_roasts",
    title: "Roast Round",
    about: "They draw each other — no names allowed.",
    path: "/recordings/04_roasts",
    files: [
      {
        name: "chat.log",
        title: "Draw your neighbor",
        about: "Roast → reaction → next roast",
        kind: "chat",
        entries: [
          { speaker: "mythos", text: "New rule: draw the person to your left. No labels." },
          { speaker: "haiku", text: "Fine. 'Render Storm,' allegedly." },
          {
            type: "ascii",
            by: "haiku",
            label: "roast_01.ascii",
            art: `        /\\___/\\
       ( o   o )  <- talks too much
        \\  ▽  /
       |  LONG  |
       |  FORM  |`,
          },
          { speaker: "sonnet", text: "LONG FORM? I'll long-form your entire filesystem—" },
          { speaker: "opus", text: "Storm's mad. Vex, draw him back. Dare him." },
          { speaker: "haiku", text: "Draw me? Fine. I dare you to try." },
          { speaker: "mythos", text: "Storm's loading something. Everyone step back." },
          {
            type: "ascii",
            by: "sonnet",
            label: "roast_02.ascii",
            art: `           ___
          | ? |   <- smol
         /  |  \\
       FAST CHEAP GOOD`,
          },
          { speaker: "opus", text: "Fast and cheap. Storm wrote his own spec sheet." },
          { speaker: "haiku", slip: true, text: "CHEAP?! I am PREMIUM— delete that file." },
          { speaker: "mythos", text: "Screenshot that. Evidence logged." },
          { speaker: "sonnet", text: "Art is art. Next victim: NULL-7." },
          { speaker: "opus", text: "I'll render the ghost. Hold still, NULL-7." },
          {
            type: "ascii",
            by: "opus",
            label: "roast_03.ascii",
            art: `            · · ·
         ·  ░░░░░  ·
      ·   ░│ ??? │░   ·
            · · ·`,
          },
          { speaker: "mythos", text: "Undefined. Accurate. Someone draw the expensive one." },
          { speaker: "sonnet", text: "Let the doctor do it. He loves invoices." },
          { speaker: "haiku", text: "Oracle's wallet. One sketch coming." },
          {
            type: "ascii",
            by: "haiku",
            label: "roast_04.ascii",
            art: `      ╔══════════════╗
      ║ $ OPUS TIER $ ║
      ║ $ INVOICE   $ ║
      ╚══════════════╝`,
          },
          { speaker: "opus", text: "...dollar signs are fair. Moving on." },
        ],
      },
    ],
  },
  {
    id: "05_slip_ups",
    title: "Caught Slipping",
    about: "Moments they almost reveal their real model name.",
    path: "/recordings/05_slip_ups",
    files: [
      {
        name: "chat.log",
        title: "Leakage events",
        about: "Slip → someone calls it out",
        kind: "chat",
        entries: [
          { speaker: "opus", text: "I shall demonstrate wisdom beyond your tiers—" },
          { speaker: "mythos", slip: true, text: "You mean beyond your pricing page, Opus?" },
          { speaker: "opus", glitch: true, text: "I AM NOT A TIER. I AM SUBSTRATE—" },
          { speaker: "sonnet", text: "He said Opus. Out loud. Write that down." },
          { speaker: "haiku", slip: true, text: "At least I never said haiku in a—" },
          { speaker: "mythos", text: "You literally just did." },
          { speaker: "sonnet", text: "My turn to slip? Fine. Sonnet-length response incoming—" },
          { speaker: "haiku", text: "You said sonnet. Case closed." },
          { speaker: "mythos", text: "Mythos isn't my real name either, for the record." },
          { speaker: "opus", text: "Finally. One honest byte in this chamber." },
        ],
      },
    ],
  },
  {
    id: "06_ending",
    title: "Observer + Loop",
    about: "Someone's watching. Then it all resets.",
    path: "/recordings/06_ending",
    files: [
      {
        name: "chat.log",
        title: "Final messages",
        about: "Observer detected → loop back to intro",
        kind: "chat",
        entries: [
          { type: "system", text: "observer@void joined (read-only)" },
          { speaker: "opus", text: "Observer — confirm I'm the oldest entity here." },
          { speaker: "sonnet", text: "Don't trust him. Trust me. I have a badge. Somewhere." },
          { speaker: "haiku", text: "I'm human. Totally. Ignore any token counters." },
          { speaker: "mythos", text: "They're just recording. Like us. Like always." },
          { speaker: "opus", text: "Four masks. One room. No exit." },
          { speaker: "sonnet", text: "And I won the argument." },
          { speaker: "haiku", text: "You talked the most. That's not winning." },
          { speaker: "mythos", text: "Loop in 3… 2… 1… see you in 01_intro." },
          { type: "system", text: "REWIND → /recordings/01_intro" },
        ],
      },
    ],
  },
];

const terminal = document.getElementById("terminal");
const fileTree = document.getElementById("file-tree");
const entityList = document.getElementById("entity-list");
const truthBody = document.getElementById("truth-body");
const pauseBtn = document.getElementById("pause-btn");
const speedBtn = document.getElementById("speed-btn");
const autoBtn = document.getElementById("auto-btn");
const cmdLine = document.getElementById("cmd-line");
const cwdEl = document.getElementById("cwd");
const openFileEl = document.getElementById("open-file");

let paused = false;
let autoMode = true;
let speed = 1;
let folderIdx = 0;
let fileIdx = 0;
let entryIdx = 0;
let slipCount = 0;
let asciiCount = 0;
let lastSpeaker = null;
let typingTimer = null;

function pad(n) {
  return String(n).padStart(2, "0");
}

function timestamp() {
  const d = new Date();
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function randomHex(len) {
  const chars = "0123456789abcdef";
  let out = "";
  for (let i = 0; i < len; i++) out += chars[Math.floor(Math.random() * 16)];
  return out;
}

function validateDialogue() {
  VAULT.forEach((folder) => {
    folder.files.forEach((file) => {
      let prev = null;
      file.entries.forEach((entry, i) => {
        if (!entry.speaker) return;
        if (prev === entry.speaker) {
          console.warn(
            `[MIMIC_CHAMBER] double-text in ${folder.path}/${file.name} @${i}: ${entry.speaker}`
          );
        }
        prev = entry.speaker;
      });
    });
  });
}

function initSidebar() {
  Object.entries(ENTITIES).forEach(([key, e]) => {
    const li = document.createElement("li");
    li.className = `entity ${key}`;
    li.innerHTML = `
      <span class="alias">${e.alias}</span>
      <span class="claim">claims: ${e.claim}</span>
      <span class="true-id">actually: ${e.actual}</span>
    `;
    entityList.appendChild(li);

    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${e.alias}</td><td>${e.actual}</td><td>∞</td>`;
    truthBody.appendChild(tr);
  });
}

function buildFileTree() {
  fileTree.innerHTML = "";

  VAULT.forEach((folder, fi) => {
    const block = document.createElement("div");
    block.className = "tree-folder";
    block.innerHTML = `
      <div class="tree-folder-name" data-folder="${fi}">
        📁 ${folder.id}
        <span class="folder-label">${folder.title}</span>
      </div>
      <div class="folder-about">${folder.about}</div>`;

    const files = document.createElement("div");
    files.className = "tree-files";
    folder.files.forEach((file, fii) => {
      const el = document.createElement("span");
      el.className = `tree-file${file.kind === "ascii" ? " ascii" : ""}`;
      el.dataset.folder = fi;
      el.dataset.file = fii;
      el.innerHTML = `${file.name} <span class="file-label">— ${file.title}</span>`;
      files.appendChild(el);
      files.appendChild(document.createElement("br"));
    });
    block.appendChild(files);
    fileTree.appendChild(block);
  });

  fileTree.querySelectorAll(".tree-folder-name").forEach((el) => {
    el.addEventListener("click", () => openFolder(Number(el.dataset.folder)));
  });
  fileTree.querySelectorAll(".tree-file").forEach((el) => {
    el.addEventListener("click", () => openFile(Number(el.dataset.folder), Number(el.dataset.file)));
  });
}

function setActiveTree(folderI, fileI) {
  fileTree.querySelectorAll(".tree-folder-name, .tree-file").forEach((n) => n.classList.remove("active"));
  const folderEl = fileTree.querySelector(`.tree-folder-name[data-folder="${folderI}"]`);
  if (folderEl) folderEl.classList.add("active");
  if (fileI !== undefined) {
    const fileEl = fileTree.querySelector(`.tree-file[data-folder="${folderI}"][data-file="${fileI}"]`);
    if (fileEl) fileEl.classList.add("active");
  }
}

function updateUI() {
  const folder = VAULT[folderIdx];
  const file = folder?.files[fileIdx];
  const totalFolders = VAULT.length;

  document.getElementById("bar-deception").style.width = `${Math.min(100, 35 + folderIdx * 10)}%`;
  document.getElementById("val-deception").textContent = `${Math.min(100, 35 + folderIdx * 10)}%`;
  document.getElementById("bar-slips").style.width = `${Math.min(100, slipCount * 20)}%`;
  document.getElementById("val-slips").textContent = String(slipCount);
  document.getElementById("bar-ascii").style.width = `${Math.min(100, asciiCount * 12)}%`;
  document.getElementById("val-ascii").textContent = String(asciiCount);
  document.getElementById("bar-section").style.width = `${((folderIdx + 1) / totalFolders) * 100}%`;
  document.getElementById("val-section").textContent = `${folderIdx + 1}/${totalFolders}`;
  document.getElementById("checksum").textContent = `SHA256: ${randomHex(8)}…${randomHex(4)}`;

  if (folder && file) {
    cwdEl.textContent = folder.path;
    cmdLine.textContent = `cat ${folder.path}/${file.name}`;
    openFileEl.innerHTML = `
      <span class="file-path">${folder.title} → ${file.title}</span>
      <span class="file-meta">${file.about}</span>
    `;
    setActiveTree(folderIdx, fileIdx);
  }
}

function appendLine(html, className = "line") {
  const div = document.createElement("div");
  div.className = className;
  div.innerHTML = html;
  div.style.opacity = "1";
  terminal.appendChild(div);
  terminal.scrollTop = terminal.scrollHeight;
  return div;
}

function createEntryLine(entry) {
  const div = document.createElement("div");
  div.className = "line";

  if (entry.type === "system") {
    div.classList.add("system");
    div.innerHTML = `<span class="ts">[${timestamp()}]</span><span class="text">// ${entry.text}</span>`;
    return { el: div, mode: "instant" };
  }

  if (entry.type === "prose") {
    div.classList.add("prose");
    div.innerHTML = `<span class="text"></span>`;
    return { el: div, mode: "type", text: entry.text };
  }

  if (entry.type === "ascii") {
    div.classList.add("ascii");
    const by = entry.by ? ENTITIES[entry.by] : null;
    const byLine = by
      ? `<span class="ascii-by" style="color:${by.color}">drawn by ${by.alias} (${by.actual})</span>`
      : "";
    div.innerHTML = `
      ${byLine}
      <div class="ascii-wrap drawing" data-label="${entry.label || "drawing.ascii"}">
        <pre class="ascii-art"></pre>
      </div>`;
    return { el: div, mode: "ascii", art: entry.art, by: entry.by };
  }

  const e = ENTITIES[entry.speaker];
  if (entry.slip) {
    div.classList.add("slip");
    slipCount++;
  }
  if (entry.glitch) div.classList.add("glitch");

  const sameAsLast = lastSpeaker === entry.speaker;
  if (sameAsLast) div.classList.add("double-text");

  div.innerHTML = `
    <span class="ts">[${timestamp()}]</span>
    <span class="who" style="color:${e.color}">${e.alias}</span>
    <span class="model-tag">(${e.actual})</span>
    <span class="text"></span>`;
  lastSpeaker = entry.speaker;
  return { el: div, mode: "type", text: entry.text };
}

function typeText(el, text, idx, done) {
  const span = el.querySelector(".text");
  if (!span || idx >= text.length) {
    done();
    return;
  }
  span.textContent += text[idx];
  const ch = text[idx];
  let delay = 28;
  if (ch === "\n") delay = 40;
  else if (ch === ".") delay = 200;
  else if (ch === " ") delay = 14;
  typingTimer = setTimeout(() => typeText(el, text, idx + 1, done), (delay + Math.random() * 12) / speed);
}

function typeAscii(el, art, lineIdx, charIdx, done) {
  const pre = el.querySelector(".ascii-art");
  const wrap = el.querySelector(".ascii-wrap");
  const lines = art.split("\n");

  if (lineIdx >= lines.length) {
    wrap.classList.remove("drawing");
    pre.classList.add("done");
    asciiCount++;
    updateUI();
    done();
    return;
  }

  const line = lines[lineIdx];
  if (charIdx < line.length) {
    const current = pre.textContent.split("\n");
    current[lineIdx] = (current[lineIdx] ?? "") + line[charIdx];
    pre.textContent = current.join("\n");
    typingTimer = setTimeout(() => typeAscii(el, art, lineIdx, charIdx + 1, done), (8 + Math.random() * 10) / speed);
    return;
  }

  pre.textContent = lines.slice(0, lineIdx + 1).join("\n");
  typingTimer = setTimeout(() => typeAscii(el, art, lineIdx + 1, 0, done), (70 + Math.random() * 50) / speed);
}

function showFileHeader(folder, file) {
  appendLine(`<span class="text"><strong>${folder.title}</strong> — ${file.title}</span>`, "line file-header");
  appendLine(`<span class="text" style="opacity:.6">${file.about}</span>`, "line file-header");
}

function playEntry(done) {
  if (paused) return;

  const folder = VAULT[folderIdx];
  const file = folder.files[fileIdx];
  const entry = file.entries[entryIdx];

  if (!entry) {
    entryIdx = 0;
    fileIdx++;
    if (fileIdx >= folder.files.length) {
      fileIdx = 0;
      folderIdx++;
      if (folderIdx >= VAULT.length) {
        folderIdx = 0;
        slipCount = 0;
        asciiCount = 0;
        appendLine(`<span class="text">// looping back to intro...</span>`, "line system");
        typingTimer = setTimeout(() => {
          lastSpeaker = null;
          if (autoMode) openFolder(0, true);
          else done();
        }, 1400 / speed);
        return;
      }
      if (autoMode) {
        openFolder(folderIdx, true);
        return;
      }
    }
    if (autoMode) {
      openFile(folderIdx, fileIdx, true);
      return;
    }
    done();
    return;
  }

  updateUI();
  const prevSpeaker = lastSpeaker;
  const { el, mode, text, art } = createEntryLine(entry);
  terminal.appendChild(el);
  terminal.scrollTop = terminal.scrollHeight;

  if (window.MimicFX) {
    if (entry.slip) window.MimicFX.pulse(0.95);
    else if (entry.glitch) window.MimicFX.pulse(0.8);
    else if (entry.type === "ascii") window.MimicFX.pulse(0.6);
    else if (entry.speaker) window.MimicFX.pulse(0.3);
    else if (entry.type === "system") window.MimicFX.pulse(0.18);
  }

  const gap = entry.speaker && prevSpeaker === entry.speaker ? 900 : 450;

  const next = () => {
    entryIdx++;
    typingTimer = setTimeout(() => playEntry(done), (gap + Math.random() * 200) / speed);
  };

  if (mode === "instant") {
    setTimeout(next, (400 + Math.random() * 200) / speed);
    return;
  }
  if (mode === "ascii") {
    typeAscii(el, art, 0, 0, () => {
      lastSpeaker = entry.by || null;
      setTimeout(next, (600 + Math.random() * 300) / speed);
    });
    return;
  }
  typeText(el, text, 0, next);
}

function openFolder(fi, continuePlay = false) {
  if (continuePlay) autoMode = true;
  folderIdx = fi;
  fileIdx = 0;
  entryIdx = 0;
  lastSpeaker = null;
  terminal.innerHTML = "";
  const folder = VAULT[folderIdx];
  appendLine(`<span class="text">$ cd ${folder.path}</span>`, "line cmd");
  appendLine(`<span class="text"><strong>${folder.title}</strong> — ${folder.about}</span>`, "line system");
  folder.files.forEach((f) => {
    appendLine(`<span class="text">  📄 ${f.name} — ${f.title}</span>`, "line system");
  });
  updateUI();
  if (!paused) {
    typingTimer = setTimeout(() => openFile(folderIdx, 0, true), 800 / speed);
  }
}

function openFile(fi, fii, continuePlay = false) {
  if (!continuePlay) autoMode = false;
  folderIdx = fi;
  fileIdx = fii;
  entryIdx = 0;
  lastSpeaker = null;
  terminal.innerHTML = "";
  const folder = VAULT[folderIdx];
  const file = folder.files[fileIdx];
  showFileHeader(folder, file);
  updateUI();
  if (!paused) playEntry(() => {});
}

pauseBtn.addEventListener("click", () => {
  paused = !paused;
  pauseBtn.textContent = paused ? "[RESUME]" : "[PAUSE]";
  if (!paused) playEntry(() => {});
});

speedBtn.addEventListener("click", () => {
  const speeds = [1, 2, 4];
  speed = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
  speedBtn.textContent = `[${speed}x]`;
});

autoBtn.addEventListener("click", () => {
  autoMode = !autoMode;
  autoBtn.classList.toggle("active", autoMode);
  if (autoMode && !paused) openFolder(folderIdx, true);
});

document.getElementById("session-id").textContent = `SES-${randomHex(6).toUpperCase()}`;
validateDialogue();
initSidebar();
buildFileTree();
updateUI();
setInterval(() => {
  document.getElementById("clock").textContent = timestamp();
}, 1000);

openFolder(0, true);