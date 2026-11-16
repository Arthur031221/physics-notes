# AGENTS.md

這個專案的 AI 開發規則寫在 [`CLAUDE.md`](./CLAUDE.md)。Codex、Cursor、Gemini CLI 等 AI 工具修改專案前，請先讀完 `CLAUDE.md`。最常用到的是這三條：

1. 每篇筆記都有固定的 5 個 section。
2. 檔名格式是 `notes/<分類>-<主題>.html`。
3. 新增筆記時，複製模板、填內容、登記到 `data/notes.js`，最後執行 `python3 scripts/check.py`。
