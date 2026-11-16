繳交標題：清大 111022201 物理26 李騏維 物理筆記站

---

【專案簡介】
「物理筆記站（Physics Notes）」是一個大學物理課程筆記網站，把每個物理主題整理成「一頁看懂」的筆記。每篇筆記都使用完全相同的五段結構：一、核心概念 → 二、重要公式 → 三、範例題（可展開詳解）→ 四、常見誤區 → 五、重點整理。
目前已完成 3 篇筆記：牛頓運動定律、簡諧運動（力學）、薛丁格方程式入門（量子物理）。網站為純 HTML / CSS / JavaScript，數學式用 KaTeX 呈現，首頁可依分類篩選與搜尋。

【GitHub Repository 連結】
https://github.com/Arthur031221/physics-notes

【網頁連結】
https://arthur031221.github.io/physics-notes/

【CLAUDE.md】
https://github.com/Arthur031221/physics-notes/blob/main/CLAUDE.md
（另有 AGENTS.md 指向同一份規則，讓 Codex 等其他 AI 工具也能讀到）
CLAUDE.md 內容包含：
1. 專案目的與目標讀者
2. 檔案結構（每個檔案／資料夾的用途）
3. 網頁風格（語言、字型、配色、KaTeX 公式寫法、單位格式、可用的 CSS class 清單）
4. 筆記頁面固定結構（5 個 section 的 id、順序與內容要求）
5. 檔案命名與放置規則（notes/<分類>-<主題>.html，附正確／錯誤範例）
6. 新增筆記的標準流程 SOP（8 個步驟）與修改既有筆記的規則
7. AI 必須做／禁止做的事
8. 可直接使用的範例指令
9. 部署方式

【如果之後要新增頁面，這套規則如何幫助 AI 繼續完成？】
只要對 AI 說「請依照 CLAUDE.md 新增一篇『庫倫定律』的筆記，分類電磁學，難度基礎」，AI 就能照 CLAUDE.md 第 6 節的 SOP 自己完成：
1. 依命名規則決定檔名 notes/electromagnetism-coulomb-law.html；
2. 複製 templates/note-template.html，替換 {{TITLE}} 等佔位符；
3. 依固定的 5 段結構填寫內容，只使用規定的 CSS class 和 KaTeX 寫法，所以新頁面的風格會和舊頁面一致；
4. 在 data/notes.js 登記一筆資料。首頁卡片、分類篩選、麵包屑、上一篇／下一篇導覽都由程式自動產生，AI 不需要（也被禁止）手動修改首頁；
5. 執行 python3 scripts/check.py 自動檢查：檔名格式、5 個 section 是否齊全且順序正確、是否有未替換的佔位符、是否登記到清單、有沒有違規的 inline style。
「規則文件 + 模板 + 單一資料來源 + 自動檢查」這四樣東西讓 AI 每次新增內容的結果都一致、可以驗證。要新增分類（例如相對論）也只要在 CATEGORIES 加一行，整個網站就能繼續擴充成完整的物理複習講義。
