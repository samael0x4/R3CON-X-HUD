# ☠ R3CON-X HUD

> **Compact hacker-style recon HUD for bug bounty hunters**  
> Built for speed, signal, and real attack surface discovery.

**Author:** `samael0x4`

---

## 🧠 What is R3CON-X HUD?

**R3CON-X HUD** is a lightweight **Tampermonkey recon overlay** that lives directly in your browser.

It helps you quickly extract:
- URLs
- JavaScript files
- High-value leaked files
- Shodan & FOFA search queries

All in a **small, transparent, hacker-style HUD** that doesn’t clutter your screen.

---

## ✨ Features

### 🔗 Surface Extraction
- Copy all discovered URLs
- Copy loaded & referenced JavaScript files

### 🌐 Search Engine Pivoting
- One-click **Shodan** query  
ssl.cert.subject.CN:"target.com"
- One-click **FOFA** domain query

### 📂 High-Value Files (Bounty-Focused)
Copy URLs for file types that actually pay:
- PDF (internal docs)
- DOC / DOCX
- TXT (notes, secrets)
- LOG
- SQL
- ENV
- BAK / BACKUP
- ZIP / TAR / GZ
- PHP
- URLs containing `=` (IDOR & logic bugs)

### 🎨 UI
- Small floating HUD
- Slight transparency
- Dark green hacker vibe
- Minimal screen usage

---

## ⚙️ Installation

1. Install **Tampermonkey**
2. Create a new script
3. Paste the contents of `R3CON-X-HUD.user.js`
4. Save & visit any website

The HUD will appear automatically.

---

## 🧠 Intended Workflow

1. Open target website
2. Copy URLs → map attack surface
3. Copy JS files → find hidden logic
4. Generate Shodan / FOFA queries → find infra leaks
5. Extract high-value files → human mistakes
6. Feed results into Burp / Nuclei / manual testing

---

## ⚠️ Notes

- R3CON-X HUD works within **browser limitations**
- It does not replace crawlers like `katana`, `hakrawler`, or `gospider`
- Designed for **first-phase recon**, not full automation

---

## 🧪 Who is this for?

- Bug bounty hunters
- Web pentesters
- Red teamers
- Recon nerds who care about **signal > noise**

---

## 📜 License

MIT — use it, fork it, improve it.

---

## 🕶️ Final Words

This is not a bloated extension.  
This is a **personal recon HUD** — fast, focused, and lethal.

Happy hunting. ☠️
