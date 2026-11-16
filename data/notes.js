// 物理筆記站：筆記清單（唯一資料來源）
// 新增筆記時，在 NOTES 中「同分類的最後面」加入一筆。規則見 CLAUDE.md 第 6 節。

window.CATEGORIES = {
  mechanics:        { name: "力學",       nameEn: "Mechanics",         color: "#2563eb" },
  electromagnetism: { name: "電磁學",     nameEn: "Electromagnetism",  color: "#d97706" },
  thermodynamics:   { name: "熱力學",     nameEn: "Thermodynamics",    color: "#dc2626" },
  waves:            { name: "波動與光學", nameEn: "Waves & Optics",    color: "#0891b2" },
  quantum:          { name: "量子物理",   nameEn: "Quantum Physics",   color: "#7c3aed" }
};

window.NOTES = [
  {
    id: "mechanics-newton-laws",
    title: "牛頓運動定律",
    titleEn: "Newton's Laws of Motion",
    category: "mechanics",
    level: "基礎",
    summary: "慣性、F = ma、作用力與反作用力，古典力學的起點。",
    updated: "2026-11-17"
  },
  {
    id: "mechanics-simple-harmonic-motion",
    title: "簡諧運動",
    titleEn: "Simple Harmonic Motion",
    category: "mechanics",
    level: "基礎",
    summary: "回復力與位移成正比的振動，彈簧與單擺的共同模型。",
    updated: "2026-11-17"
  },
  {
    id: "quantum-schrodinger-equation",
    title: "薛丁格方程式入門",
    titleEn: "Introduction to the Schrödinger Equation",
    category: "quantum",
    level: "進階",
    summary: "波函數、機率詮釋與無限位能井的能階量子化。",
    updated: "2026-11-17"
  }
];
