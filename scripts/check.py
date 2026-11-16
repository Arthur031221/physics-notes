#!/usr/bin/env python3
"""檢查物理筆記站是否遵守 CLAUDE.md 的規則。

用法：python3 scripts/check.py
全部通過時輸出 "All checks passed"，否則列出錯誤並以 exit code 1 結束。
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REQUIRED_SECTIONS = ["concept", "formulas", "examples", "pitfalls", "summary"]
LEVELS = {"基礎", "進階", "挑戰"}
ID_PATTERN = re.compile(r"^[a-z]+(-[a-z0-9]+)+$")

errors = []


def err(msg):
    errors.append(msg)


notes_js = (ROOT / "data" / "notes.js").read_text(encoding="utf-8")

# 讀取分類
cat_block = re.search(r"window\.CATEGORIES\s*=\s*\{(.*?)\};", notes_js, re.S)
categories = re.findall(r"^\s*(\w+)\s*:\s*\{", cat_block.group(1), re.M) if cat_block else []
if not categories:
    err("data/notes.js：找不到 CATEGORIES")

# 讀取筆記清單
notes_block = re.search(r"window\.NOTES\s*=\s*\[(.*)\];", notes_js, re.S)
entries = re.findall(r"\{(.*?)\}", notes_block.group(1), re.S) if notes_block else []
notes = []
for raw in entries:
    fields = dict(re.findall(r'(\w+)\s*:\s*"([^"]*)"', raw))
    notes.append(fields)

ids = [n.get("id", "") for n in notes]
for dup in {i for i in ids if ids.count(i) > 1}:
    err(f"notes.js：id 重複 {dup}")

for n in notes:
    nid = n.get("id", "")
    for key in ["id", "title", "titleEn", "category", "level", "summary", "updated"]:
        if not n.get(key):
            err(f"notes.js：{nid or '(無 id)'} 缺少欄位 {key}")
    if not ID_PATTERN.match(nid):
        err(f"notes.js：id 格式錯誤 {nid}（須為小寫英文、以 - 連接）")
    cat = n.get("category", "")
    if cat not in categories:
        err(f"notes.js：{nid} 的分類 {cat} 不在 CATEGORIES 中")
    elif not nid.startswith(cat + "-"):
        err(f"notes.js：{nid} 必須以分類前綴 {cat}- 開頭")
    if n.get("level") not in LEVELS:
        err(f"notes.js：{nid} 的 level 必須是 基礎／進階／挑戰")
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", n.get("updated", "")):
        err(f"notes.js：{nid} 的 updated 格式須為 YYYY-MM-DD")

    page = ROOT / "notes" / f"{nid}.html"
    if not page.exists():
        err(f"缺少檔案 notes/{nid}.html")
        continue
    html = page.read_text(encoding="utf-8")
    if f'data-note-id="{nid}"' not in html:
        err(f"notes/{nid}.html：<body> 的 data-note-id 必須是 {nid}")
    if "{{" in html:
        err(f"notes/{nid}.html：還有未替換的 {{{{...}}}} 佔位符")
    positions = []
    for sid in REQUIRED_SECTIONS:
        m = re.search(rf'<section id="{sid}">', html)
        if not m:
            err(f"notes/{nid}.html：缺少 <section id=\"{sid}\">")
        else:
            positions.append(m.start())
    if len(positions) == len(REQUIRED_SECTIONS) and positions != sorted(positions):
        err(f"notes/{nid}.html：5 個 section 順序錯誤")
    if 'style="' in html or "<style" in html:
        err(f"notes/{nid}.html：禁止 inline style 或 <style>")
    for marker in ['id="breadcrumb"', 'id="pager"', 'class="formula-box"', 'class="example"', 'class="solution"']:
        if marker not in html:
            err(f"notes/{nid}.html：缺少 {marker}")

# 反向檢查：notes/ 裡的每個檔案都要登記
for page in sorted((ROOT / "notes").glob("*.html")):
    if page.stem not in ids:
        err(f"notes/{page.name} 沒有登記在 data/notes.js")

if errors:
    print(f"✗ {len(errors)} 個問題：")
    for e in errors:
        print("  -", e)
    sys.exit(1)

print(f"All checks passed（{len(notes)} 篇筆記，{len(categories)} 個分類）")
