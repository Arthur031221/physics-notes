# 物理筆記站：AI 專案規則

這份文件寫給在這個專案裡工作的 AI 助手（Claude Code、Codex、Cursor 等）。修改任何檔案前先讀完，並照著做。

## 1. 專案目的

物理筆記站是大學物理的複習筆記網站，一個主題一頁。讀者是物理系學生，多半在準備期中或期末考，所以每頁要讓人在 10 分鐘內看完核心觀念、關鍵公式、一題完整範例和常見錯誤。

主題會用同一套格式繼續增加，大致從力學、電磁學、熱力學寫到量子物理，最後累積成一份物理複習講義。

網站是純靜態網頁（HTML、CSS、原生 JavaScript），部署在 GitHub Pages，沒有建置步驟。

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
│   └── notes.js               # 筆記清單（唯一的資料來源）
├── notes/
│   └── <分類>-<主題>.html     # 每篇筆記一個檔案
├── templates/
│   └── note-template.html     # 新增筆記時複製這個檔案
└── scripts/
    └── check.py               # 檢查規則是否被遵守
```

不要新增其他資料夾、框架、npm 套件或建置步驟。

## 3. 網頁風格

| 項目 | 規則 |
|---|---|
| 語言 | 以繁體中文為主，物理名詞第一次出現時附英文，例如「簡諧運動（Simple Harmonic Motion）」 |
| 語氣 | 像學長姐寫的筆記，口語但用詞精確，句子短 |
| 寫作 | 不用「不是 A，而是 B」的對比句、破折號（——）和段落結尾的總結金句，段首也不加粗體標籤 |
| 字型 | Noto Sans TC（已在 HTML `<head>` 引入，不要換） |
| 主色 | 深藍 `--primary: #1e3a8a`，背景米白 `--bg: #fafaf7` |
| 分類色 | 每個分類有固定顏色，定義在 `data/notes.js` 的 `CATEGORIES`。不要在 HTML 裡寫死顏色 |
| 數學式 | 用 KaTeX：行內用 `\( ... \)`，獨立一行用 `$$ ... $$`。不要用圖片貼公式 |
| 單位 | SI 制，數字與單位間空一格：`9.8 m/s²`、`200 N/m` |
| 樣式 | 只用 `assets/style.css` 裡已有的 class。不要寫 inline style，也不要在頁面裡加 `<style>` |

### 可用的 CSS class

只用下面這些：

| class | 用途 |
|---|---|
| `.formula-box` | 包住一條重要公式和一句說明 |
| `.example` | 範例題外框 |
| `.solution` | 放在 `<details>` 上，做成可展開的詳解 |
| `.pitfall-list` | 「常見誤區」的 `<ul>` |
| `.summary-list` | 「重點整理」的 `<ol>` |
| `.tag` | 小標籤（例如難度） |

## 4. 筆記頁面結構

每篇筆記依序包含以下 5 個 `<section>`，`id` 不能改：

| 順序 | section id | 標題 | 內容要求 |
|---|---|---|---|
| 1 | `concept` | 一、核心概念 | 2 到 4 段文字，說明這個主題在講什麼、物理直覺是什麼 |
| 2 | `formulas` | 二、重要公式 | 3 到 6 個 `.formula-box`，每個公式下方用一句話說明符號意義 |
| 3 | `examples` | 三、範例題 | 1 到 2 題 `.example`，題目加上可展開的 `<details class="solution">` 完整詳解，答案要有數值與單位 |
| 4 | `pitfalls` | 四、常見誤區 | 3 到 5 點，格式為「❌ 錯誤想法 → ✅ 正確觀念」 |
| 5 | `summary` | 五、重點整理 | 3 到 5 點編號清單，每點一句話 |

其他規則：

- `<body>` 要有 `data-note-id="<id>"`，值和 `data/notes.js` 裡的 `id` 相同。
- 麵包屑 `<nav id="breadcrumb">` 和上下篇導覽 `<nav id="pager">` 保持空白，`assets/main.js` 會填入內容。
- 範例題的數值寫上去之前，自己再驗算一次。

## 5. 檔案命名與放置

- 筆記放在 `notes/`，檔名格式是 `<分類id>-<主題英文>.html`，全小寫，單字用 `-` 連接，不用中文或空白。
  - 正確：`mechanics-newton-laws.html`、`quantum-schrodinger-equation.html`
  - 錯誤：`Newton.html`、`牛頓定律.html`、`mechanics_newton.html`
- 檔名去掉 `.html` 就是這篇筆記的 `id`。
- 分類 id 只能用 `data/notes.js` 裡 `CATEGORIES` 已定義的值：
  `mechanics`（力學）、`electromagnetism`（電磁學）、`thermodynamics`（熱力學）、`waves`（波動與光學）、`quantum`（量子物理）。
  需要新分類時，先在 `CATEGORIES` 加上名稱和顏色，再建立筆記。

## 6. 新增一篇筆記的步驟

使用者說「幫我新增一篇 OOO 的筆記」時，照以下步驟做：

1. 決定 id：選分類，依第 5 節命名，例如 `electromagnetism-gauss-law`。
2. 把 `templates/note-template.html` 複製成 `notes/<id>.html`。
3. 換掉模板裡所有 `{{...}}` 佔位符：
   - `{{TITLE}}` 中文標題、`{{TITLE_EN}}` 英文標題
   - `{{NOTE_ID}}` 筆記 id
   - `{{SUMMARY}}` 一句話摘要（也用在 `<meta name="description">`）
4. 依第 4 節的順序寫完 5 個 section。
5. 在 `data/notes.js` 的 `NOTES` 陣列裡，同分類的最後面加入一筆：
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
6. 不要改 `index.html`。首頁卡片、分類篩選和上下篇導覽會自己更新。
7. 執行 `python3 scripts/check.py`，要看到 `All checks passed`。
8. 想在本機預覽，就執行 `python3 -m http.server 8000`，再打開 http://localhost:8000。

### 修改既有筆記

- 只改內容，不改 section 結構和 id。
- 改完後更新 `data/notes.js` 裡這篇的 `updated` 日期。
- 如果改了檔名，`id`、`data-note-id` 和 `notes.js` 要一起改。

## 7. AI 必須遵守的規則

每次都要做：

- 新增或修改筆記後執行 `python3 scripts/check.py`。
- 確認公式和數值正確。不確定的物理內容就不要寫。
- 新筆記的格式、語氣和用詞要和現有筆記一致。

不要做：

- 引入 React、Vue、Tailwind、jQuery 或任何建置工具。
- 在 `index.html` 手動加筆記卡片。
- 寫 inline style，或在單一頁面加 `<style>`、`<script>`（模板裡載入 KaTeX 的部分除外）。
- 刪除或改名 5 個固定的 section id。
- 修改 `CLAUDE.md` 的規則，除非使用者要求。

## 8. 範例指令

使用者可以直接這樣對 AI 說：

```
請依照 CLAUDE.md 新增一篇「庫倫定律」的筆記，分類是電磁學，難度基礎。
```

```
請依照 CLAUDE.md 在「簡諧運動」的範例題加一題垂直彈簧的題目。
```

```
請依照 CLAUDE.md 新增分類「相對論」(relativity)，顏色用紫色，並寫一篇「勞倫茲變換」。
```

## 9. 部署

- GitHub Pages 發布 `main` 分支的根目錄，push 後大約 1 分鐘生效。
- 網址：https://arthur031221.github.io/physics-notes/
- 所有連結用相對路徑（例如 `../assets/style.css`），不要寫死網域。
