// ==UserScript==
// @name         R3CON-X HUD
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Compact hacker-style recon HUD for bug bounty hunters
// @author       samael0x4
// @match        *://*/*
// @grant        GM_setClipboard
// ==/UserScript==

(function () {
  'use strict';

  /* ===================== CORE ===================== */

  const TARGET = location.hostname.replace(/^www\./, '');

  const FILE_EXT = {
    pdf: /\.pdf(\?|$)/i,
    doc: /\.(doc|docx)(\?|$)/i,
    txt: /\.txt(\?|$)/i,
    log: /\.log(\?|$)/i,
    sql: /\.sql(\?|$)/i,
    env: /\.env(\?|$)/i,
    bak: /\.(bak|old|backup)(\?|$)/i,
    zip: /\.(zip|tar|gz|7z|rar)(\?|$)/i,
    php: /\.php(\?|$)/i
  };

  /* ===================== HELPERS ===================== */

  const normalize = u => {
    try { return new URL(u, location.href).href; }
    catch { return null; }
  };

  function collectURLs() {
    const out = new Set();

    // DOM
    document.querySelectorAll('a[href],form[action],iframe[src]').forEach(e => {
      const u = normalize(e.href || e.action || e.src);
      if (u) out.add(u);
    });

    // Attributes
    document.querySelectorAll('[src],[data-url],[data-endpoint]').forEach(e => {
      const u = normalize(
        e.getAttribute('src') ||
        e.getAttribute('data-url') ||
        e.getAttribute('data-endpoint')
      );
      if (u) out.add(u);
    });

    // Network
    if (performance.getEntriesByType) {
      performance.getEntriesByType('resource').forEach(r => {
        const u = normalize(r.name);
        if (u) out.add(u);
      });
    }

    return [...out];
  }

  function collectJS() {
    const js = new Set();

    // Script tags
    document.querySelectorAll('script[src]').forEach(s => {
      const u = normalize(s.src);
      if (u) js.add(u);
    });

    // URLs ending in .js
    collectURLs().forEach(u => {
      if (/\.js(\?|$)/i.test(u)) js.add(u);
    });

    return [...js];
  }

  function filterByExt(regex) {
    return collectURLs().filter(u => regex.test(u));
  }

  function urlsWithParams() {
    return collectURLs().filter(u => u.includes('='));
  }

  /* ===================== UI ===================== */

  const panel = document.createElement('div');
  panel.style.cssText = `
    position:fixed;
    top:70px;
    right:10px;
    width:230px;
    background:rgba(5,15,5,0.85);
    border:1px solid #1aff1a;
    border-radius:10px;
    padding:8px;
    z-index:999999;
    font-family:monospace;
    color:#b6ffb6;
  `;

  panel.innerHTML = `
    <div style="color:#1aff1a;font-weight:bold;font-size:13px">
      ☠ R3CON-X HUD
    </div>
    <div style="font-size:11px;opacity:.7;margin-bottom:6px">
      by samael0x4<br>Target: ${TARGET}
    </div>
  `;

  const section = t => {
    const d = document.createElement('div');
    d.style.cssText = 'margin-top:6px;color:#1aff1a;font-weight:bold;font-size:11px';
    d.textContent = t;
    panel.appendChild(d);
  };

  const btn = (t, fn) => {
    const b = document.createElement('button');
    b.textContent = t;
    b.style.cssText = `
      width:100%;
      margin-top:4px;
      background:#1f7a1f;
      color:#eaffea;
      border:none;
      border-radius:6px;
      padding:5px;
      cursor:pointer;
      font-size:11px;
    `;
    b.onclick = fn;
    panel.appendChild(b);
  };

  /* ===================== BLOCKS ===================== */

  // URLs + JS
  section('🔗 Surface');
  btn('Copy URLs', () => {
    const u = collectURLs();
    if (!u.length) return alert('No URLs found');
    GM_setClipboard(u.join('\n'));
    alert(`Copied ${u.length} URLs`);
  });

  btn('Copy JS Files', () => {
    const j = collectJS();
    if (!j.length) return alert('No JS files found');
    GM_setClipboard(j.join('\n'));
    alert(`Copied ${j.length} JS files`);
  });

  // Shodan + FOFA
  section('🌐 Search');
  btn('Copy Shodan Query', () => {
    GM_setClipboard(`ssl.cert.subject.CN:"${TARGET}"`);
    alert('Shodan query copied');
  });

  btn('Copy FOFA Query', () => {
    GM_setClipboard(`domain="${TARGET}"`);
    alert('FOFA query copied');
  });

  // High-value files
  section('📂 High-Value Files');
  btn('Copy PDF URLs', () => GM_setClipboard(filterByExt(FILE_EXT.pdf).join('\n')));
  btn('Copy DOC URLs', () => GM_setClipboard(filterByExt(FILE_EXT.doc).join('\n')));
  btn('Copy TXT URLs', () => GM_setClipboard(filterByExt(FILE_EXT.txt).join('\n')));
  btn('Copy LOG URLs', () => GM_setClipboard(filterByExt(FILE_EXT.log).join('\n')));
  btn('Copy SQL URLs', () => GM_setClipboard(filterByExt(FILE_EXT.sql).join('\n')));
  btn('Copy ENV URLs', () => GM_setClipboard(filterByExt(FILE_EXT.env).join('\n')));
  btn('Copy BAK URLs', () => GM_setClipboard(filterByExt(FILE_EXT.bak).join('\n')));
  btn('Copy ZIP URLs', () => GM_setClipboard(filterByExt(FILE_EXT.zip).join('\n')));
  btn('Copy PHP URLs', () => GM_setClipboard(filterByExt(FILE_EXT.php).join('\n')));
  btn('Copy URLs with "="', () => GM_setClipboard(urlsWithParams().join('\n')));

  document.body.appendChild(panel);

})();
