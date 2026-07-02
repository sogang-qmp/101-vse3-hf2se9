/* 사이트 전문 검색창 (나무위키식 즉시 이동).
 * gen-search-index.py가 만든 assets/search-index.js (window.SEARCH_INDEX)를 읽어
 * 상단 중앙 고정 검색창 + 결과 드롭다운을 그린다. 공유 셸(site.js/site.css) 무수정 — 추가 파일.
 * 위치: 상단 중앙 (우상단 테마 토글 ◐와 안 겹치게). Enter = 첫 결과로 이동, Esc = 닫기.
 */
(function () {
  function rootPrefix() {
    var s = document.querySelector('script[src$="assets/search.js"]');
    return s ? s.getAttribute("src").replace(/assets\/search\.js$/, "") : "";
  }
  function init() {
    if (!window.SEARCH_INDEX) return setTimeout(init, 80);
    var prefix = rootPrefix();
    var box = document.createElement("div");
    box.id = "site-search";
    box.style.cssText =
      "position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:1000;width:min(340px,40vw);";
    box.innerHTML =
      '<input type="search" placeholder="검색 / search  ( / )" style="width:100%;padding:.35rem .7rem;' +
      "border:1px solid var(--border,#ccc);border-radius:16px;background:var(--bg,#fff);" +
      'color:inherit;font:inherit;font-size:.9rem;outline:none"/>' +
      '<div class="ss-results" style="display:none;max-height:60vh;overflow-y:auto;margin-top:4px;' +
      "border:1px solid var(--border,#ccc);border-radius:8px;background:var(--bg,#fff);" +
      'box-shadow:0 4px 16px rgba(0,0,0,.15)"></div>';
    document.body.appendChild(box);
    var inp = box.querySelector("input");
    var res = box.querySelector(".ss-results");

    function snippet(text, q) {
      var i = text.toLowerCase().indexOf(q);
      if (i < 0) return "";
      var a = Math.max(0, i - 40);
      return (a ? "…" : "") + text.slice(a, i + q.length + 60) + "…";
    }
    function render(q) {
      q = q.trim().toLowerCase();
      if (q.length < 2) { res.style.display = "none"; res.innerHTML = ""; return; }
      var hits = [];
      window.SEARCH_INDEX.forEach(function (pg) {
        var inTitle = pg.t.toLowerCase().indexOf(q) >= 0;
        var inText = pg.x.toLowerCase().indexOf(q) >= 0;
        if (inTitle || inText)
          hits.push({ pg: pg, w: inTitle ? 0 : 1, s: snippet(pg.x, q) });
      });
      hits.sort(function (a, b) { return a.w - b.w; });
      res.innerHTML = hits.length
        ? hits.slice(0, 12).map(function (h) {
            return '<a href="' + prefix + h.pg.p + '" style="display:block;padding:.4rem .7rem;' +
              'text-decoration:none;color:inherit;border-bottom:1px solid var(--border,#eee)">' +
              "<strong>" + h.pg.t + "</strong>" +
              (h.s ? '<br><span style="font-size:.78rem;opacity:.65">' + h.s.replace(/</g, "&lt;") + "</span>" : "") +
              "</a>";
          }).join("")
        : '<div style="padding:.4rem .7rem;opacity:.6">no match</div>';
      res.style.display = "block";
    }
    inp.addEventListener("input", function () { render(inp.value); });
    inp.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { var a = res.querySelector("a"); if (a) location.href = a.href; }
      if (e.key === "Escape") { res.style.display = "none"; inp.blur(); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "/" && document.activeElement !== inp &&
          !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); inp.focus(); }
    });
    document.addEventListener("click", function (e) {
      if (!box.contains(e.target)) res.style.display = "none";
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
