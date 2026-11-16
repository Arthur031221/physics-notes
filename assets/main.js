// 物理筆記站：共用腳本
// - 首頁（body#home）：依 data/notes.js 產生分類篩選、搜尋與筆記卡片
// - 筆記頁（body[data-note-id]）：產生麵包屑、分類色、上一篇／下一篇導覽

(function () {
  const NOTES = window.NOTES || [];
  const CATEGORIES = window.CATEGORIES || {};

  // 依 CATEGORIES 的順序排列，同分類內保留 NOTES 中的順序
  const catOrder = Object.keys(CATEGORIES);
  const ordered = NOTES
    .map((n, i) => ({ ...n, _i: i }))
    .sort((a, b) => catOrder.indexOf(a.category) - catOrder.indexOf(b.category) || a._i - b._i);

  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "text") node.textContent = v;
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => node.appendChild(c));
    return node;
  }

  function setCatColor(node, catId) {
    const cat = CATEGORIES[catId];
    if (cat) node.style.setProperty("--cat", cat.color);
  }

  // ---------- 首頁 ----------
  function renderHome() {
    const grid = document.getElementById("note-grid");
    const filters = document.getElementById("filters");
    const search = document.getElementById("search");
    const count = document.getElementById("note-count");
    let active = "all";

    const usedCats = catOrder.filter((c) => NOTES.some((n) => n.category === c));
    const buttons = [["all", "全部"]].concat(usedCats.map((c) => [c, CATEGORIES[c].name]));
    buttons.forEach(([id, label]) => {
      const btn = el("button", { type: "button", "data-cat": id, text: label });
      if (id !== "all") setCatColor(btn, id);
      btn.addEventListener("click", () => { active = id; draw(); });
      filters.appendChild(btn);
    });

    search.addEventListener("input", draw);

    function draw() {
      const q = search.value.trim().toLowerCase();
      filters.querySelectorAll("button").forEach((b) =>
        b.classList.toggle("active", b.dataset.cat === active));

      const shown = ordered.filter((n) =>
        (active === "all" || n.category === active) &&
        (!q || [n.title, n.titleEn, n.summary].join(" ").toLowerCase().includes(q)));

      grid.innerHTML = "";
      shown.forEach((n) => {
        const cat = CATEGORIES[n.category] || { name: n.category };
        const card = el("a", { class: "card", href: "notes/" + n.id + ".html" }, [
          el("div", { class: "card-meta" }, [
            el("span", { class: "cat-badge", text: cat.name }),
            el("span", { class: "tag", text: n.level })
          ]),
          el("h3", { text: n.title }),
          el("p", { class: "card-en", text: n.titleEn }),
          el("p", { class: "card-summary", text: n.summary }),
          el("p", { class: "card-date", text: "更新：" + n.updated })
        ]);
        setCatColor(card, n.category);
        grid.appendChild(card);
      });
      if (!shown.length) grid.appendChild(el("p", { class: "empty", text: "找不到符合的筆記。" }));
      count.textContent = "共 " + NOTES.length + " 篇筆記・" + usedCats.length + " 個分類";
    }
    draw();
  }

  // ---------- 筆記頁 ----------
  function renderNote(id) {
    const idx = ordered.findIndex((n) => n.id === id);
    const note = ordered[idx];
    if (!note) return;
    const cat = CATEGORIES[note.category] || { name: note.category };
    setCatColor(document.body, note.category);

    const crumb = document.getElementById("breadcrumb");
    if (crumb) {
      crumb.appendChild(el("a", { href: "../index.html", text: "首頁" }));
      crumb.appendChild(el("span", { text: " / " + cat.name + " / " + note.title }));
    }

    const meta = document.getElementById("note-meta");
    if (meta) {
      meta.appendChild(el("span", { class: "cat-badge", text: cat.name }));
      meta.appendChild(el("span", { class: "tag", text: note.level }));
      meta.appendChild(el("span", { class: "note-date", text: "更新：" + note.updated }));
    }

    const pager = document.getElementById("pager");
    if (pager) {
      const prev = ordered[idx - 1];
      const next = ordered[idx + 1];
      pager.appendChild(prev
        ? el("a", { class: "prev", href: prev.id + ".html", text: "← " + prev.title })
        : el("span"));
      pager.appendChild(next
        ? el("a", { class: "next", href: next.id + ".html", text: next.title + " →" })
        : el("span"));
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.id === "home") renderHome();
    else if (document.body.dataset.noteId) renderNote(document.body.dataset.noteId);
  });
})();
