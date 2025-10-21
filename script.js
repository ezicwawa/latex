const map = {
  A: 'σ', a: 'σ', B: '£', b: '£', C: 'Ǝ', c: 'Ǝ', D: '₳', d: '₳',
  E: 'ε', e: 'ε', F: '╛', f: '╛', G: 'Γ', g: 'Γ', H: 'µ', h: 'µ',
  I: '∩', i: '∩', J: '⌠', j: '⌠', K: '≡', k: '≡', L: 'Œ', l: 'Œ',
  M: 'β', m: 'β', N: 'þ', n: 'þ', Ñ: '••', ñ: '••', O: '⌐', o: '⌐',
  P: 'Æ', p: 'Æ', Q: '¶', q: '¶', R: 'Ω', r: 'Ω', S: 'Φ', s: 'Φ',
  T: '╪', t: '╪', U: '↨', u: '↨', V: 'ǂ', v: 'ǂ', W: 'w', w: 'w',
  X: '⋛', x: '⋛', Y: '¥', y: '¥', Z: '√', z: '√',
  '1': '●', '2': '▬', '3': '▲', '4': '■', '5': '▱', '6': '◈', '7': '▩', '8': '▣', '9': '▶', '0': '◀'
};

const inverseMap = Object.fromEntries(
  Object.entries(map).map(([k, v]) => [v, k.toLowerCase()])
);

const latinText = document.getElementById("latin");
const symbolText = document.getElementById("latex");

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translateText(text, activeMap) {
  const keys = Object.keys(activeMap).sort((a, b) => b.length - a.length);
  const regex = new RegExp(keys.map(k => escapeRegExp(k)).join("|"), "g");
  return text.replace(regex, match => activeMap[match] || match);
}

function linkFields(source, target, activeMap) {
  let locked = false;
  source.addEventListener("input", () => {
    if (locked) return;
    locked = true;
    target.value = translateText(source.value, activeMap);
    locked = false;
  });
}

function syncScroll(a, b) {
  a.addEventListener('scroll', () => b.scrollTop = a.scrollTop);
  b.addEventListener('scroll', () => a.scrollTop = b.scrollTop);
}

linkFields(latinText, symbolText, map);
linkFields(symbolText, latinText, inverseMap);
syncScroll(latinText, symbolText);

document.querySelectorAll(".copy-btn").forEach(btn => {
  const originalText = btn.textContent;
  let timeoutId;

  btn.addEventListener("click", () => {
    const targetId = btn.getAttribute("data-target");
    const textarea = document.getElementById(targetId);

    navigator.clipboard.writeText(textarea.value)
      .then(() => {
        clearTimeout(timeoutId);
        btn.textContent = "[ ✔ ]";
        timeoutId = setTimeout(() => btn.textContent = originalText, 1200);
      })
      .catch(() => {
        clearTimeout(timeoutId);
        btn.textContent = "[ ERROR ]";
        timeoutId = setTimeout(() => btn.textContent = originalText, 1200);
      });
  });
});