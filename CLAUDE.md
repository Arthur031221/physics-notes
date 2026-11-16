# CLAUDE.md — 物理筆記站 Physics Notes

> 這份文件是給 AI 助手（Claude Code、Codex、Cursor 等）讀的專案規則。
> 開始任何修改前，請先完整讀完本文件，並嚴格遵守。

---

## 1. 專案目的

「物理筆記站」是一個**大學物理系課程筆記網站**，把每個物理主題整理成一頁「一頁看懂」的筆記。

- **讀者**：大學物理系學生、準備期中期末考的人。
- **目標**：每一頁都能讓讀者在 10 分鐘內抓到該主題的核心觀念、關鍵公式、一題完整範例與常見錯誤。
- **長期目標**：用同一套格式持續新增主題（力學 → 電磁學 → 熱力學 → 量子物理），讓網站變成一份完整的物理複習講義。

網站是**純靜態網頁**（HTML + CSS + 原生 JavaScript），部署在 GitHub Pages，不需要任何建置工具。

---

## 2. 檔案結構

```
physics-notes/
├── CLAUDE.md                  # 本文件：AI 必讀的專案規則
├── AGENTS.md                  # 指向本文件（給讀 AGENTS.md 的工具）
├── README.md                  # 給人看的專案說明
├── index.html                 # 首頁：自動列出所有筆記（不要手動寫卡片）
├── .nojekyll                  # 讓 GitHub Pages 不經過 Jekyll
├── assets/
│   ├── style.css              # 全站唯一的樣式表
│   └── main.js                # 首頁卡片、篩選、筆記頁麵包屑與上下篇導覽
├── data/
│   └── notes.js               # ★ 筆記清單（唯一的資料來源）
├── notes/
│   └── <分類>-<主題>.html     # 每篇筆記一個檔案
├── templates/
│   └── note-template.html     # ★ 新增筆記時複製這個檔案
└── scripts/
    └── check.py               # 檢查規則是否被遵守
```

**不要**新增其他資料夾、框架、npm 套件或建置步驟。

---

## 3. 網頁風格

| 項目 | 規則 |
|---|---|
| 語言 | 繁體中文為主，物理名詞第一次出現時附英文，例如「簡諧運動（Simple Harmonic Motion）」 |
| 語氣 | 像學長姐寫的筆記：簡潔、口語但精確，不寫廢話 |
| 字型 | Noto Sans TC（已在 HTML `<head>` 引入，不要換） |
| 主色 | 深藍 `--primary: #1e3a8a`，背景米白 `--bg: #fafaf7` |
| 分類色 | 每個分類有固定顏色，定義在 `data/notes.js` 的 `CATEGORIES`，**不要在 HTML 裡寫死顏色** |
| 數學式 | 一律使用 KaTeX：行內用 `\( ... \)`，獨立一行用 `$$ ... $$`。不要用圖片貼公式 |
| 單位 | 使用 SI 制，數字與單位間空一格：`9.8 m/s²`、`200 N/m` |
| 樣式 | 只能使用 `assets/style.css` 中已存在的 class；**不要寫 inline style**、不要在頁面裡加 `<style>` |

### 可用的 CSS class（只用這些）

| class | 用途 |
|---|---|
| `.formula-box` | 包住一條重要公式＋一句說明 |
| `.example` | 範例題外框 |
| `.solution` | 放在 `<details>` 上，做成可展開的詳解 |
| `.pitfall-list` | 「常見誤區」的 `<ul>` |
| `.summary-list` | 「重點整理」的 `<ol>` |
| `.tag` | 小標籤（例如難度） |

---

## 4. 筆記頁面結構（每篇都必須一樣）

每篇筆記必須**依序**包含以下 5 個 `<section>`，`id` 不可更改：

| 順序 | section id | 標題 | 內容要求 |
|---|---|---|---|
| 1 | `concept` | 一、核心概念 | 2–4 段文字，說明這個主題「在講什麼」與物理直覺 |
| 2 | `formulas` | 二、重要公式 | 3–6 個 `.formula-box`，每個公式下方一句話說明符號意義 |
| 3 | `examples` | 三、範例題 | 1–2 題 `.example`，題目＋可展開的 `<details class="solution">` 完整詳解，答案要有數值與單位 |
| 4 | `pitfalls` | 四、常見誤區 | 3–5 點，格式為「❌ 錯誤想法 → ✅ 正確觀念」 |
| 5 | `summary` | 五、重點整理 | 3–5 點編號清單，每點一句話 |

其他規則：

- `<body>` 必須有 `data-note-id="<id>"`，值與 `data/notes.js` 中的 `id` 相同。
- 頁首的麵包屑 `<nav id="breadcrumb">` 與頁尾的上下篇 `<nav id="pager">` **保持空白**，由 `assets/main.js` 自動產生。
- 範例題的數值必須自己驗算過一次再寫上去。

---

## 5. 檔案命名與放置

- 筆記檔案放在 `notes/`，檔名格式：`<分類id>-<主題英文>.html`
  - 全小寫、單字用 `-` 連接、不用中文或空白
  - ✅ `mechanics-newton-laws.html`、`quantum-schrodinger-equation.html`
  - ❌ `Newton.html`、`牛頓定律.html`、`mechanics_newton.html`
- 檔名去掉 `.html` 就是這篇筆記的 `id`。
- 分類 id 只能用 `data/notes.js` 裡 `CATEGORIES` 已定義的值：
  `mechanics`（力學）、`electromagnetism`（電磁學）、`thermodynamics`（熱力學）、`waves`（波動與光學）、`quantum`（量子物理）。
  需要新分類時，先在 `CATEGORIES` 新增（含名稱與顏色），再建立筆記。

---

## 6. 新增一篇筆記的標準流程（SOP）

當使用者說「幫我新增一篇 OOO 的筆記」時，**照以下步驟做**：

1. **決定 id**：選分類，依第 5 節規則命名，例如 `electromagnetism-gauss-law`。
2. **複製模板**：把 `templates/note-template.html` 複製成 `notes/<id>.html`。
3. **替換佔位符**：模板中所有 `{{...}}` 都要換掉：
   - `{{TITLE}}` 中文標題、`{{TITLE_EN}}` 英文標題
   - `{{NOTE_ID}}` 筆記 id
   - `{{SUMMARY}}` 一句話摘要（也用於 `<meta name="description">`）
4. **填內容**：依第 4 節，依序寫完 5 個 section。
5. **登記到清單**：在 `data/notes.js` 的 `NOTES` 陣列**同分類的最後面**加入一筆：
   ```js
   {
     id: "electromagnetism-gauss-law",
     title: "高斯定律",
     titleEn: "Gauss's Law",
     category: "electromagnetism",
     level: "基礎",            // 只能是：基礎 / 進階 / 挑戰
     summary: "一句話摘要，30 字以內。",
     updated: "YYYY-MM-DD"
   },
   ```
6. **不要動 `index.html`**：首頁卡片、分類篩選、上下篇導覽都會自動更新。
7. **執行檢查**：`python3 scripts/check.py`，必須看到 `All checks passed`。
8. **本機預覽**（可選）：`python3 -m http.server 8000`，打開 http://localhost:8000。

### 修改既有筆記時

- 只改內容，不改 section 結構與 id。
- 修改後更新 `data/notes.js` 中該筆的 `updated` 日期。
- 如果改了檔名，必須同步改 `id`、`data-note-id` 與 `notes.js`。

---

## 7. AI 必須遵守的規則

**必須做：**
- 每次新增或修改筆記後執行 `python3 scripts/check.py`。
- 公式與數值必須正確；不確定的物理內容寧可不寫，也不要編造。
- 保持所有筆記格式一致：看起來要像同一個人寫的同一套講義。

**禁止做：**
- ❌ 不要引入 React、Vue、Tailwind、jQuery 或任何建置工具。
- ❌ 不要在 `index.html` 手動加筆記卡片。
- ❌ 不要寫 inline style、不要在單一頁面加 `<style>` 或 `<script>`（KaTeX 載入除外，已在模板中）。
- ❌ 不要刪除或改名 5 個固定的 section id。
- ❌ 不要修改 `CLAUDE.md` 的規則，除非使用者明確要求。

---

## 8. 範例指令（使用者可以直接這樣對 AI 說）

```
請依照 CLAUDE.md 新增一篇「庫倫定律」的筆記，分類是電磁學，難度基礎。
```

```
請依照 CLAUDE.md 把「簡諧運動」的範例題再加一題單擺的題目。
```

```
請依照 CLAUDE.md 新增分類「相對論」(relativity)，顏色用紫色，並寫一篇「勞倫茲變換」。
```

---

## 9. 部署

- `main` 分支的根目錄直接由 GitHub Pages 發布，push 後約 1 分鐘生效。
- 網址：https://arthur031221.github.io/physics-notes/
- 所有連結使用**相對路徑**（例如 `../assets/style.css`），不要寫死網域。
