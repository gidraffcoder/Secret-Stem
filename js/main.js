/* =========================================================
   Secret Stem — site script
   ========================================================= */
(() => {
  "use strict";

  /* ---------- business settings (edit these) ---------- */
  const WHATSAPP = "254769367747";

  // Opening hours, Nairobi time. 0 = Sunday … 6 = Saturday. null = closed.
  const HOURS = {
    1: ["07:30", "18:00"],
    2: ["07:30", "18:00"],
    3: ["07:30", "18:00"],
    4: ["07:30", "18:00"],
    5: ["07:30", "18:00"],
    6: ["07:30", "18:00"],
    0: null,
  };

  /* ---------- catalogue ----------
     To use a real photo, put it in /images with the file name in `img`.
     If the photo is missing, the illustrated bouquet is shown instead. */
  const PRODUCTS = [
    { id: "petite-hand", name: "Hand Bouquet", latin: "Rosa & greenery", desc: "Roses with greeneries.", price: 2000, was: 2500, cat: "hand", img: "images/petite-hand-bouquet.jpg",
      art: { kind: "wrap", tint: "#f4d9d3", paper: "#f6c4c8", ribbon: "#d77a8a", flowers: [["rose", "#f8f1e7"], ["rose", "#eef3e2"], ["mum", "#e9f0d8"]], count: 7, leaves: 6 } },
    { id: "flower-vase", name: "Flower Vase", latin: "Dianthus & Chrysanthemum", desc: "Comes with a Vase", price: 4000, was: 4500, cat: "gift", img: "images/flower-vase.jpg",
      art: { kind: "vase", tint: "#efe6ee", ribbon: "#ffffff", flowers: [["mum", "#d63a7a"], ["daisy", "#f4cf2e"], ["rose", "#f08a72"], ["mum", "#f7f2ee"]], count: 11, leaves: 4 } },
    { id: "basket-bouquet", name: "Basket Bouquet arrangement.", latin: "Dianthus & Solidago", desc: "Basket flowers arrangement.", price: 4500, was: 5000, cat: "basket", img: "images/basket-bouquet.jpg",
      art: { kind: "basket", tint: "#f1e4dc", handle: "#b48a55", flowers: [["mum", "#c8235a"], ["daisy", "#f2c81f"], ["rose", "#d6304f"], ["mum", "#e65a8c"]], count: 13, leaves: 8 } },
    { id: "mums", name: "Mumps Arrangement.", latin: "Chrysanthemum morifolium", desc: "Long lasting flowers.", price: 4500, was: 5000, cat: "hand", img: "images/mums-arrangement.jpg",
      art: { kind: "wrap", tint: "#e6e4e0", paper: "#d9dcd6", plaid: true, ribbon: "#b8243c", flowers: [["mum", "#b81f3e"], ["mum", "#f7f2ee"]], count: 9, leaves: 4 } },
    { id: "hand-classic", name: "Hand bouquet", latin: "Rosa & Gypsophila", desc: "Contains red,white roses gypsophila and red berries.", price: 5000, was: 5500, cat: "hand", img: "images/hand-bouquet.jpg",
      art: { kind: "wrap", tint: "#e9eef0", paper: "#ffffff", ribbon: "#c2304a", flowers: [["rose", "#c2213d"], ["rose", "#fbf6f0"]], count: 9, leaves: 5, gyp: true, berries: true } },
    { id: "fruit-basket", name: "Fruit Basket Bouquet", latin: "Fructus & flores", desc: "Comes with a card.", price: 5000, was: 5500, cat: "basket", img: "images/fruit-basket.jpg",
      art: { kind: "fruit", tint: "#f3e1d6", handle: "#b48a55", flowers: [["mum", "#e0467d"], ["daisy", "#f4cf2e"]], count: 5, leaves: 3 } },
    { id: "christmas", name: "Christmas Arrangement.", latin: "Ilex & Dianthus", desc: "Christmas arrangements with eye pleasing colors.", price: 5000, was: null, cat: "season", img: "images/christmas-arrangement.jpg",
      art: { kind: "wreath", tint: "#efe4d8" } },
    { id: "basket-arr", name: "Basket Arrangement.", latin: "Alstroemeria & Chrysanthemum", desc: "The arrangement contain mumps and Astro, they last UpTo 21days, all you need to do is add 1 cup of water everyday for the best results.", price: 5500, was: 6000, cat: "basket", img: "images/basket-arrangement.jpg",
      art: { kind: "basket", tint: "#ebe5ef", handle: "#c2213d", flowers: [["lily", "#a35bb5"], ["mum", "#f7f2ee"], ["lily", "#d48ad9"], ["mum", "#c9e0a8"]], count: 12, leaves: 9 } },
    { id: "hand-grand", name: "Hand bouquet", latin: "Rosa & Gypsophila", desc: "Contains red,white roses gypsophila and red berries.", price: 6000, was: 6500, cat: "hand", img: "images/hand-bouquet.jpg",
      art: { kind: "wrap", tint: "#f0e8e0", paper: "#ffffff", ribbon: "#c2304a", flowers: [["rose", "#b81c38"], ["rose", "#fbf6f0"], ["rose", "#d6304f"]], count: 13, leaves: 6, gyp: true, berries: true } },
    { id: "blooming", name: "Blooming Arrangement.", latin: "Lilium asiatica", desc: "Contains Asiatic flowers and Mumps", price: 7000, was: 7500, cat: "hand", img: "images/blooming-arrangement.jpg",
      art: { kind: "wrap", tint: "#f3dde2", paper: "#f6c4cf", ribbon: "#e0467d", flowers: [["lily", "#f7f2ee"], ["lily", "#d9e8b8"], ["mum", "#e8f0d0"]], count: 8, leaves: 10 } },
    { id: "water", name: "Water bouquet", latin: "Eustoma & Rosa", desc: "Contains very fresh flowers and long lasting, looks awesome and presentable.", price: 7000, was: 7500, cat: "hand", img: "images/water-bouquet.jpg",
      art: { kind: "water", tint: "#e7e8f0", paper: "#f4f6f8", ribbon: "#8a5bb5", flowers: [["rose", "#fbf8f2"], ["lily", "#f4f2ea"], ["rose", "#eef1e4"]], count: 12, leaves: 7 } },
    { id: "box", name: "Box bouquet.", latin: "Rosa & Theobroma", desc: "Comes with 8pieces chocolate accompanied by Card.", price: 9500, was: 10000, cat: "gift", img: "images/box-bouquet.jpg",
      art: { kind: "box", tint: "#f2e2dc", flowers: [["rose", "#c2213d"], ["rose", "#f6efe6"], ["rose", "#e88a9a"], ["rose", "#a3162f"]], count: 16, leaves: 3 } },
  ];

  /* ---------- helpers ---------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const kes = (n) => "KES " + n.toLocaleString("en-KE");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };

  function rng(seed) {
    let a = 0;
    for (const ch of seed) a = (a * 31 + ch.charCodeAt(0)) | 0;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (c) => Math.max(0, Math.min(255, Math.round(c + (amt < 0 ? c : 255 - c) * amt)));
    return "#" + [n >> 16, (n >> 8) & 255, n & 255].map(f).map((c) => c.toString(16).padStart(2, "0")).join("");
  }

  /* ---------- flower drawing ---------- */
  const draw = {
    rose(x, y, r, c) {
      const d = shade(c, -0.18), dd = shade(c, -0.35);
      return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${c}"/><circle r="${r * 0.72}" fill="${d}" opacity=".55"/>` +
        `<path d="M${-r * .5} ${-r * .1} a${r * .5} ${r * .5} 0 0 1 ${r} 0 a${r * .32} ${r * .32} 0 0 1 ${-r * .6} ${r * .1} a${r * .16} ${r * .16} 0 0 1 ${r * .3} ${-r * .05}" fill="none" stroke="${dd}" stroke-width="${Math.max(1.2, r * .12)}" stroke-linecap="round"/></g>`;
    },
    mum(x, y, r, c, rot = 0) {
      const d = shade(c, -0.15);
      let p = "";
      for (let i = 0; i < 16; i++) p += `<ellipse rx="${r * .22}" ry="${r * .55}" cy="${-r * .45}" transform="rotate(${i * 22.5 + rot})" fill="${i % 2 ? c : d}"/>`;
      return `<g transform="translate(${x} ${y})">${p}<circle r="${r * .32}" fill="${d}"/></g>`;
    },
    daisy(x, y, r, c, rot = 0) {
      let p = "";
      for (let i = 0; i < 10; i++) p += `<ellipse rx="${r * .26}" ry="${r * .5}" cy="${-r * .5}" transform="rotate(${i * 36 + rot})" fill="${c}"/>`;
      return `<g transform="translate(${x} ${y})">${p}<circle r="${r * .3}" fill="#7a4a1c"/></g>`;
    },
    lily(x, y, r, c, rot = 0) {
      const d = shade(c, -0.25);
      let p = "";
      for (let i = 0; i < 6; i++) p += `<path d="M0 0 Q${r * .35} ${-r * .5} 0 ${-r} Q${-r * .35} ${-r * .5} 0 0Z" transform="rotate(${i * 60 + rot})" fill="${c}" stroke="${d}" stroke-width=".8"/>`;
      return `<g transform="translate(${x} ${y})">${p}<circle r="${r * .14}" fill="#e2a23b"/></g>`;
    },
    leaf(x, y, len, ang, c = "#6f8a5a") {
      return `<path d="M0 0 Q${len * .5} ${-len * .28} ${len} 0 Q${len * .5} ${len * .28} 0 0Z" transform="translate(${x} ${y}) rotate(${ang})" fill="${c}"/>`;
    },
  };

  function bloomCluster(a, R, cx, cy, rx, ry, rmin, rmax) {
    const out = [];
    const n = a.count || 10;
    for (let i = 0; i < n; i++) {
      const t = R() * Math.PI * 2, s = Math.sqrt(R());
      out.push({ x: cx + Math.cos(t) * rx * s, y: cy + Math.sin(t) * ry * s - (1 - s) * 6, r: rmin + R() * (rmax - rmin), f: a.flowers[i % a.flowers.length], rot: R() * 40 });
    }
    out.sort((p, q) => p.y - q.y);
    let leaves = "";
    for (let i = 0; i < (a.leaves || 0); i++) {
      const t = Math.PI + (i / Math.max(1, a.leaves - 1)) * Math.PI;
      const lx = cx + Math.cos(t) * (rx + 4), ly = cy + Math.sin(t) * (ry + 2) + 10;
      leaves += draw.leaf(lx, ly, 26 + R() * 14, (t * 180) / Math.PI + (R() * 30 - 15), i % 2 ? "#6f8a5a" : "#55704a");
    }
    let gyp = "";
    if (a.gyp) for (let i = 0; i < 46; i++) { const t = R() * Math.PI * 2, s = Math.sqrt(R()); gyp += `<circle cx="${cx + Math.cos(t) * (rx + 6) * s}" cy="${cy + Math.sin(t) * (ry + 4) * s}" r="${1.2 + R() * 1.4}" fill="#fffdf8"/>`; }
    let berries = "";
    if (a.berries) for (let i = 0; i < 12; i++) { const t = R() * Math.PI * 2; berries += `<circle cx="${cx + Math.cos(t) * (rx + 2)}" cy="${cy + Math.sin(t) * (ry + 2)}" r="${2.4 + R() * 1.5}" fill="#9e1027"/>`; }
    const blooms = out.map((p) => draw[p.f[0]](p.x.toFixed(1), p.y.toFixed(1), p.r, p.f[1], p.rot)).join("");
    return leaves + gyp + blooms + berries;
  }

  function bouquetSVG(p) {
    const a = p.art, R = rng(p.id);
    const bg = `<rect width="200" height="216" fill="${a.tint}"/><circle cx="100" cy="100" r="78" fill="#fff" opacity=".35"/>`;
    let body = "";

    if (a.kind === "wrap" || a.kind === "water") {
      const paper = a.paper, pd = shade(paper, -0.12);
      body += `<path d="M28 70 L172 70 L128 200 L72 200Z" fill="${pd}"/>`;
      body += `<g stroke="#55704a" stroke-width="2.5">${[86, 94, 100, 106, 114].map((x) => `<line x1="${x}" y1="120" x2="${100 + (x - 100) * .3}" y2="214"/>`).join("")}</g>`;
      body += bloomCluster(a, R, 100, 82, 56, 34, 10, 16);
      const plaid = a.plaid ? `<g stroke="#8b8f88" stroke-width="1" opacity=".5">${[50, 70, 90, 110, 130, 150].map((x) => `<line x1="${x}" y1="108" x2="${100 + (x - 100) * .3}" y2="204"/>`).join("")}${[124, 144, 164, 184].map((y) => `<line x1="30" y1="${y}" x2="170" y2="${y}"/>`).join("")}</g>` : "";
      body += `<defs><clipPath id="c-${p.id}"><path d="M34 106 Q100 126 166 106 L114 204 L86 204Z"/></clipPath></defs>`;
      body += `<path d="M34 106 Q100 126 166 106 L114 204 L86 204Z" fill="${paper}"/><g clip-path="url(#c-${p.id})">${plaid}<path d="M34 106 L100 204 L50 204Z" fill="#000" opacity=".05"/></g>`;
      if (a.kind === "water") body += `<ellipse cx="100" cy="184" rx="22" ry="14" fill="#b9d6e6" opacity=".75"/><ellipse cx="94" cy="180" rx="6" ry="3" fill="#fff" opacity=".8"/>`;
      body += `<g fill="${a.ribbon}"><path d="M100 160 C80 146 70 162 82 170 C88 174 96 168 100 162Z"/><path d="M100 160 C120 146 130 162 118 170 C112 174 104 168 100 162Z"/><path d="M98 162 L90 186 L95 184 L100 166Z"/><path d="M102 162 L110 186 L105 184 L100 166Z"/><circle cx="100" cy="161" r="4.5"/></g>`;
    }

    if (a.kind === "basket" || a.kind === "fruit") {
      body += `<path d="M42 122 C42 18 158 18 158 122" fill="none" stroke="${a.handle}" stroke-width="7" stroke-linecap="round"/>`;
      if (a.kind === "fruit") {
        body += bloomCluster(a, R, 72, 92, 22, 18, 8, 12);
        body += `<circle cx="120" cy="108" r="17" fill="#e8892c"/><circle cx="96" cy="114" r="15" fill="#c42a2a"/><circle cx="142" cy="116" r="13" fill="#9bc13b"/>` +
          `<path d="M108 98 q22 -26 48 -8 q-26 -6 -46 14Z" fill="#f2cf3a" stroke="#c9a22a" stroke-width="1"/>` +
          [0, 1, 2, 3, 4, 5].map((i) => `<circle cx="${62 + (i % 3) * 8}" cy="${112 + Math.floor(i / 3) * 7}" r="5" fill="#6b2a6e"/>`).join("") +
          `<rect x="128" y="74" width="26" height="18" rx="2" fill="#fbf6f0" transform="rotate(12 141 83)" stroke="#d8c8b8"/>`;
      } else {
        body += bloomCluster(a, R, 100, 98, 60, 30, 10, 15);
      }
      body += `<path d="M30 116 L170 116 L152 196 Q100 206 48 196Z" fill="#c79a5b"/>`;
      body += `<g stroke="#a67b40" stroke-width="2" fill="none" opacity=".8">${[132, 148, 164, 180].map((y) => `<path d="M${30 + (y - 116) * .22} ${y} Q100 ${y + 8} ${170 - (y - 116) * .22} ${y}"/>`).join("")}${[50, 70, 90, 110, 130, 150].map((x) => `<line x1="${x}" y1="118" x2="${100 + (x - 100) * .85}" y2="198"/>`).join("")}</g>`;
      body += `<path d="M28 114 Q100 124 172 114 L172 120 Q100 130 28 120Z" fill="#a67b40"/>`;
    }

    if (a.kind === "vase") {
      body += `<g stroke="#55704a" stroke-width="2.4">${[84, 92, 100, 108, 116].map((x) => `<line x1="${x}" y1="96" x2="${100 + (x - 100) * .5}" y2="204"/>`).join("")}</g>`;
      body += bloomCluster(a, R, 100, 80, 58, 40, 10, 15);
      body += `<path d="M72 118 Q66 160 76 204 L124 204 Q134 160 128 118Z" fill="#dfeaf0" opacity=".55" stroke="#ffffff" stroke-width="2"/><rect x="74" y="168" width="52" height="34" fill="#b9d6e6" opacity=".4"/><path d="M80 126 Q76 160 82 196" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>`;
      body += `<g fill="#fff" stroke="#e6e0e6" stroke-width=".8"><path d="M100 128 C84 116 74 132 86 138 C92 140 98 134 100 130Z"/><path d="M100 128 C116 116 126 132 114 138 C108 140 102 134 100 130Z"/><path d="M98 130 L92 154 L100 134Z"/><path d="M102 130 L108 154 L100 134Z"/></g>`;
    }

    if (a.kind === "box") {
      body += `<rect x="40" y="112" width="120" height="86" fill="#efe3d4"/><path d="M40 112 h120 v86 h-120z" fill="url(#bx-${p.id})"/>`;
      body += `<defs><linearGradient id="bx-${p.id}" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".08"/><stop offset=".5" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity=".12"/></linearGradient></defs>`;
      body += `<ellipse cx="100" cy="198" rx="60" ry="10" fill="#e2d2c0"/><rect x="40" y="186" width="120" height="6" fill="#c9a25a"/>`;
      body += `<ellipse cx="100" cy="112" rx="60" ry="12" fill="#5a3a2a"/>`;
      body += bloomCluster(a, R, 100, 98, 58, 18, 11, 14);
      body += `<text x="100" y="160" text-anchor="middle" font-family="Fraunces, serif" font-style="italic" font-size="14" fill="#8f1d33">Secret Stem</text>`;
      body += `<g transform="translate(150 150) rotate(14)"><rect width="34" height="26" rx="2" fill="#fbf6f0" stroke="#d8c8b8"/><path d="M6 9 h22 M6 15 h16" stroke="#c2304a" stroke-width="1.5"/></g>`;
      body += `<g transform="translate(18 170)"><rect width="30" height="24" rx="3" fill="#4a2a1a"/><circle cx="8" cy="8" r="4" fill="#c9a25a"/><circle cx="22" cy="8" r="4" fill="#7a4a2a"/><circle cx="8" cy="17" r="4" fill="#7a4a2a"/><circle cx="22" cy="17" r="4" fill="#c9a25a"/></g>`;
    }

    if (a.kind === "wreath") {
      body += `<circle cx="100" cy="106" r="64" fill="none" stroke="#2f4a2c" stroke-width="30"/>`;
      for (let i = 0; i < 26; i++) {
        const t = (i / 26) * Math.PI * 2, x = 100 + Math.cos(t) * 64, y = 106 + Math.sin(t) * 64;
        body += draw.leaf(x, y, 22, (t * 180) / Math.PI + 70 + R() * 30, i % 2 ? "#4f7a46" : "#3c6236");
      }
      for (let i = 0; i < 9; i++) {
        const t = (i / 9) * Math.PI * 2 + .3, x = 100 + Math.cos(t) * 64, y = 106 + Math.sin(t) * 64;
        body += i % 3 === 2 ? draw.rose(x, y, 9, "#f4efe6") : draw.mum(x, y, 13, "#d4243e", R() * 30);
      }
      for (let i = 0; i < 18; i++) { const t = R() * Math.PI * 2, d = 50 + R() * 28; body += `<circle cx="${100 + Math.cos(t) * d}" cy="${106 + Math.sin(t) * d}" r="${2.5 + R() * 1.5}" fill="#b0122c"/>`; }
      body += `<g transform="translate(100 172)" fill="#c2213d"><path d="M0 0 C-22 -16 -32 2 -18 10 C-10 14 -2 6 0 2Z"/><path d="M0 0 C22 -16 32 2 18 10 C10 14 2 6 0 2Z"/><path d="M-2 2 L-12 30 L-6 28 L0 6Z"/><path d="M2 2 L12 30 L6 28 L0 6Z"/><circle r="5"/></g>`;
      body += `<circle cx="138" cy="70" r="6" fill="#7e8fa8"/><circle cx="62" cy="142" r="6" fill="#7e8fa8"/>`;
    }

    return `<svg viewBox="0 0 200 216" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(p.name)} illustration">${bg}${body}</svg>`;
  }

  // Product photo; falls back to the illustration if the file is missing.
  const photo = (p) => `<img src="${p.img}" alt="${esc(p.name)}" loading="lazy" data-pid="${p.id}">`;
  document.addEventListener("error", (e) => {
    const img = e.target;
    if (img.tagName !== "IMG" || !img.dataset.pid) return;
    img.outerHTML = bouquetSVG(PRODUCTS.find((p) => p.id === img.dataset.pid));
  }, true);

  /* ---------- render catalogue ---------- */
  const grid = $("[data-grid]");
  grid.innerHTML = PRODUCTS.map((p) => `
    <article class="specimen" data-cat="${p.cat}" data-id="${p.id}" style="--tint:${p.art.tint}">
      ${p.was ? `<span class="specimen__save">save ${(p.was - p.price).toLocaleString()}</span>` : ""}
      <div class="specimen__img">${photo(p)}</div>
      <div class="specimen__body">
        <p class="specimen__latin">${esc(p.latin)}</p>
        <h3 class="specimen__name">${esc(p.name)}</h3>
        <p class="specimen__desc">${esc(p.desc)}</p>
        <div class="specimen__foot">
          <span class="price"><b>${kes(p.price)}</b>${p.was ? `<s>${kes(p.was)}</s>` : "<s>&nbsp;</s>"}</span>
          <button class="add" data-add="${p.id}" aria-label="Add ${esc(p.name)} to bag">+ Add</button>
        </div>
      </div>
    </article>`).join("");

  // filters
  $$("[data-filter]").forEach((btn) => btn.addEventListener("click", () => {
    $$("[data-filter]").forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
    const f = btn.dataset.filter;
    let n = 0;
    $$(".specimen", grid).forEach((card) => {
      const show = f === "all" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      card.classList.remove("is-entering");
      if (show) { void card.offsetWidth; card.style.animationDelay = `${n++ * 60}ms`; card.classList.add("is-entering"); }
    });
  }));

  /* ---------- bag ---------- */
  let bag = store.get("ss-bag", {});
  let cardNote = store.get("ss-card", null);
  const bagEl = $("[data-bag]"), scrim = $("[data-scrim]");

  function saveBag() { store.set("ss-bag", bag); store.set("ss-card", cardNote); renderBag(); }

  function renderBag() {
    const entries = Object.entries(bag).filter(([id, q]) => q > 0 && PRODUCTS.some((p) => p.id === id));
    const count = entries.reduce((s, [, q]) => s + q, 0);
    let sum = 0, was = 0;
    $("[data-bag-items]").innerHTML = entries.map(([id, q]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      sum += p.price * q; was += (p.was || p.price) * q;
      return `<div class="line-item">
        <div class="line-item__img" style="--tint:${p.art.tint}">${photo(p)}</div>
        <div><h4>${esc(p.name)}</h4><p>${kes(p.price)}</p></div>
        <div class="qty"><button type="button" data-dec="${id}" aria-label="Remove one">−</button><span>${q}</span><button type="button" data-inc="${id}" aria-label="Add one">+</button></div>
      </div>`;
    }).join("");

    bagEl.classList.toggle("is-empty", count === 0);
    $$("[data-bag-count]").forEach((el) => { el.textContent = count; el.classList.toggle("has-items", count > 0); });
    $$("[data-bag-total]").forEach((el) => (el.textContent = count ? kes(sum) : "empty"));
    $("[data-bag-sum]").textContent = kes(sum);
    $("[data-bag-was]").textContent = was > sum ? kes(was) : "";
    $("[data-bag-save]").textContent = was > sum ? `You save ${kes(was - sum)}` : "";

    const cardBox = $("[data-bag-card]");
    cardBox.hidden = !cardNote;
    if (cardNote) $("[data-bag-card-text]").textContent = cardText(cardNote);
  }

  function addToBag(id, btn) {
    bag[id] = (bag[id] || 0) + 1;
    saveBag();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`${p.name} added to your bag`);
    const b = $(".bag-btn"); b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump");
    if (btn) { btn.classList.add("is-added"); btn.textContent = "✓ Added"; setTimeout(() => { btn.classList.remove("is-added"); btn.textContent = "+ Add"; }, 1400); }
  }

  let lastFocus = null;
  function openBag() {
    lastFocus = document.activeElement;
    scrim.hidden = false;
    requestAnimationFrame(() => { scrim.classList.add("is-open"); bagEl.classList.add("is-open"); });
    bagEl.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    bagEl.focus();
  }
  function closeBag() {
    scrim.classList.remove("is-open"); bagEl.classList.remove("is-open");
    bagEl.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    setTimeout(() => (scrim.hidden = true), 400);
    if (lastFocus) lastFocus.focus();
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-inc],[data-dec],[data-open-bag],[data-close-bag],[data-scrim],[data-remove-card]");
    if (!t) return;
    if (t.dataset.add) addToBag(t.dataset.add, t);
    else if (t.dataset.inc) { bag[t.dataset.inc]++; saveBag(); }
    else if (t.dataset.dec) { bag[t.dataset.dec]--; if (bag[t.dataset.dec] <= 0) delete bag[t.dataset.dec]; saveBag(); }
    else if (t.hasAttribute("data-open-bag")) openBag();
    else if (t.hasAttribute("data-close-bag") || t.hasAttribute("data-scrim")) closeBag();
    else if (t.hasAttribute("data-remove-card")) { cardNote = null; saveBag(); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && bagEl.classList.contains("is-open")) closeBag(); });

  // delivery date can't be in the past
  const dateInput = $("[data-checkout] [name=when]");
  dateInput.min = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Nairobi" });

  $("[data-checkout]").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const lines = Object.entries(bag).filter(([, q]) => q > 0).map(([id, q]) => {
      const p = PRODUCTS.find((x) => x.id === id);
      return `• ${q} × ${p.name} (${kes(p.price * q)})`;
    });
    if (!lines.length) return;
    const total = Object.entries(bag).reduce((s, [id, q]) => s + PRODUCTS.find((x) => x.id === id).price * q, 0);
    const date = new Date(f.get("when") + "T12:00").toLocaleDateString("en-KE", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
    let msg = `Hello Secret Stem 🌹\n\nI'd like to order:\n${lines.join("\n")}\n\nTotal: ${kes(total)}\n\nName: ${f.get("name")}\nDeliver to: ${f.get("where")}\nDate: ${date}`;
    if (cardNote) msg += `\n\nCard message:\n"${cardText(cardNote)}" (${cardNote.paper} card)`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  });

  /* ---------- card composer ---------- */
  const form = $("[data-composer]"), card = $("[data-card]");
  const defaults = { to: "Wanjiru", msg: "Happy birthday, my love. Here's to another year of you.", from: "Brian" };
  const cardText = (c) => `${c.to ? `Dear ${c.to}, ` : ""}${c.msg}${c.from ? ` — ${c.from}` : ""}`;

  function syncCard() {
    ["to", "msg", "from"].forEach((k) => { $(`[data-out="${k}"]`, card).textContent = form[k].value.trim() || defaults[k]; });
    card.dataset.paper = form.paper.value;
    $("[data-chars]").textContent = form.msg.value.length;
    $("[data-composer-ok]").hidden = true;
  }
  form.addEventListener("input", syncCard);
  $$("[data-prompt]").forEach((b) => b.addEventListener("click", () => { form.msg.value = b.dataset.prompt; syncCard(); form.msg.focus(); }));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.msg.value.trim()) { form.msg.focus(); toast("Write a message for the card first"); return; }
    cardNote = { to: form.to.value.trim(), msg: form.msg.value.trim(), from: form.from.value.trim(), paper: form.paper.value };
    saveBag();
    card.classList.remove("flash"); void card.offsetWidth; card.classList.add("flash");
    $("[data-composer-ok]").hidden = false;
    toast("Card attached to your order ✿");
  });
  if (cardNote) {
    ["to", "msg", "from"].forEach((k) => (form[k].value = cardNote[k] || ""));
    form.paper.value = cardNote.paper || "blush";
    syncCard();
  }

  /* ---------- opening hours (Nairobi time) ---------- */
  const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  function nairobiNow() {
    const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, mins: +get("hour") * 60 + +get("minute") };
  }
  const toMin = (s) => { const [h, m] = s.split(":").map(Number); return h * 60 + m; };
  const fmt = (s) => { const [h, m] = s.split(":").map(Number); return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`; };

  function nextOpening(day, mins) {
    for (let i = 0; i < 8; i++) {
      const d = (day + i) % 7, h = HOURS[d];
      if (h && (i > 0 || mins < toMin(h[0]))) return i === 0 ? `opens ${fmt(h[0])}` : i === 1 ? `opens tomorrow ${fmt(h[0])}` : `opens ${DAYS[d]}`;
    }
    return "";
  }

  function updateStatus() {
    const { day, mins } = nairobiNow();
    const h = HOURS[day];
    const open = h && mins >= toMin(h[0]) && mins < toMin(h[1]);
    const label = open ? `Open now · until ${fmt(h[1])}` : `Closed · ${nextOpening(day, mins)}`;
    $$("[data-status]").forEach((el) => {
      el.classList.toggle("is-open", !!open); el.classList.toggle("is-closed", !open);
      $("b", el).textContent = label;
    });
    $("[data-hours]").innerHTML = [1, 2, 3, 4, 5, 6, 0].map((d) =>
      `<li class="${d === day ? "is-today" : ""}"><span>${DAYS[d]}</span><span>${HOURS[d] ? `${fmt(HOURS[d][0])} – ${fmt(HOURS[d][1])}` : "Closed (WhatsApp orders open)"}</span></li>`).join("");
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  /* ---------- nav, scroll, reveal ---------- */
  const menuBtn = $("[data-menu]"), nav = $("#nav");
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") !== "true";
    menuBtn.setAttribute("aria-expanded", open);
    nav.classList.toggle("is-open", open);
  });
  $$("a", nav).forEach((a) => a.addEventListener("click", () => { menuBtn.setAttribute("aria-expanded", "false"); nav.classList.remove("is-open"); }));

  const topbar = $(".topbar");
  const onScroll = () => topbar.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const revealEls = $$(".chapter, .event, .custom, .events__cta, .care__steps li, .visit__info, .arch--map, .composer__body");
  revealEls.forEach((el) => el.classList.add("reveal"));
  const meter = $(".care__meter");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
    }), { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    [...revealEls, meter].forEach((el) => io.observe(el));
  } else {
    [...revealEls, meter].forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- toast ---------- */
  let toastTimer;
  function toast(text) {
    const t = $("[data-toast]");
    t.textContent = text; t.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove("is-on"), 2200);
  }

  $("[data-year]").textContent = new Date().getFullYear();
  renderBag();
})();
