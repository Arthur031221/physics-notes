繳交標題：清大 111022201 物理26 李騏維 物理筆記站

---

【專案簡介】
物理筆記站（Physics Notes）是大學物理的複習筆記網站，一個主題一頁。每篇筆記都分成同樣的五段：核心概念、重要公式、範例題（詳解可以展開）、常見誤區、重點整理。
目前有 3 篇：力學的牛頓運動定律、簡諧運動，以及量子物理的薛丁格方程式入門。網站用純 HTML、CSS、JavaScript 寫成，數學式用 KaTeX 顯示，首頁可以依分類篩選和搜尋。

【GitHub Repository 連結】
https://github.com/Arthur031221/physics-notes

【網頁連結】
https://arthur031221.github.io/physics-notes/

【CLAUDE.md】
https://github.com/Arthur031221/physics-notes/blob/main/CLAUDE.md
（另外放了一份 AGENTS.md 指向同一份規則，Codex 等其他 AI 工具也讀得到）
CLAUDE.md 包含：
1. 專案目的與讀者
2. 檔案結構與每個檔案的用途
3. 網頁風格：語言、語氣、寫作限制、字型、配色、KaTeX 寫法、單位格式、可用的 CSS class
4. 筆記頁面的固定結構（5 個 section 的 id、順序和內容要求）
5. 檔名規則（notes/<分類>-<主題>.html，附正確和錯誤的例子）
6. 新增筆記的 8 個步驟，以及修改舊筆記的規則
7. AI 每次都要做和不能做的事
8. 可以直接複製使用的指令範例
9. 部署方式

【之後要新增頁面時，這套規則怎麼幫 AI 完成？】
我只要跟 AI 說「請依照 CLAUDE.md 新增一篇『庫倫定律』的筆記，分類電磁學，難度基礎」，AI 就會照 CLAUDE.md 第 6 節的步驟做：
1. 依命名規則把檔案取名為 notes/electromagnetism-coulomb-law.html。
2. 複製 templates/note-template.html，換掉 {{TITLE}} 這些佔位符。
3. 照固定的五段結構寫內容，只用規定的 CSS class 和 KaTeX 寫法，所以新頁面的樣子會和舊頁面一樣。
4. 在 data/notes.js 加一筆資料。首頁卡片、分類篩選、麵包屑和上一篇／下一篇連結都由 main.js 產生，規則也禁止 AI 手動改首頁。
5. 執行 python3 scripts/check.py。它會檢查檔名格式、五個 section 是否齊全且順序正確、有沒有忘記換掉的佔位符、有沒有登記到清單，以及有沒有違規的 inline style。
AI 如果漏了步驟，第 5 步的檢查會列出錯在哪裡。要加新分類（例如相對論），在 CATEGORIES 加一行名稱和顏色，再照同樣的步驟寫筆記就可以。
