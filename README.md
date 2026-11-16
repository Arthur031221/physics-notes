# 物理筆記站 Physics Notes

大學物理「一頁看懂」筆記網站。每篇筆記都用同一套結構：**核心概念 → 重要公式 → 範例題 → 常見誤區 → 重點整理**。

- 網站：https://arthur031221.github.io/physics-notes/
- AI 開發規則：[`CLAUDE.md`](./CLAUDE.md)（[`AGENTS.md`](./AGENTS.md) 指向同一份規則）

## 目前的筆記

| 分類 | 筆記 |
|---|---|
| 力學 | [牛頓運動定律](https://arthur031221.github.io/physics-notes/notes/mechanics-newton-laws.html)、[簡諧運動](https://arthur031221.github.io/physics-notes/notes/mechanics-simple-harmonic-motion.html) |
| 量子物理 | [薛丁格方程式入門](https://arthur031221.github.io/physics-notes/notes/quantum-schrodinger-equation.html) |

## 這個專案怎麼運作

```
data/notes.js               筆記清單（唯一資料來源）→ 首頁卡片、篩選、上下篇導覽自動產生
templates/note-template.html 新筆記的模板（5 個固定 section）
notes/<分類>-<主題>.html     每篇筆記
scripts/check.py            自動檢查是否符合 CLAUDE.md 規則
```

## 新增一篇筆記

對 AI 說：

> 請依照 CLAUDE.md 新增一篇「庫倫定律」的筆記，分類是電磁學，難度基礎。

AI 會依 `CLAUDE.md` 第 6 節的 SOP：複製模板 → 填 5 個 section → 登記 `data/notes.js` → 執行 `python3 scripts/check.py`。首頁不用手動改。

## 本機預覽

```bash
python3 -m http.server 8000
# 打開 http://localhost:8000
```

## 技術

純 HTML / CSS / JavaScript，數學式使用 [KaTeX](https://katex.org/)，部署於 GitHub Pages。
