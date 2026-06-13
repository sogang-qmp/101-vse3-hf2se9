/* site.js — offline-first. Builds the foldable sidebar from window.SITE_TREE (loaded by tree.js),
 * with NO fetch and NO server, so it works by double-clicking a file (file://).
 *
 *  - links are real .html files, resolved RELATIVE to the current page (works under file://)
 *  - the relative depth ("", "../", "../../") is read from this script's own src attribute,
 *    so pages at any depth need no per-page configuration.
 *  - tree.js is normally regenerated from the folder tree by gen-tree.py (filesystem = truth),
 *    but you may also hand-edit it: one node per page.
 */
(() => {
  const tag  = [...document.scripts].find(s => /assets\/site\.js(\?|$)/.test(s.getAttribute('src') || ''));
  const ROOT = (tag ? tag.getAttribute('src') : '').replace(/assets\/site\.js.*$/, ''); // "", "../", "../../"
  const T    = window.SITE_TREE;
  // Strip a trailing index.html so a node's path compares equal whether the page
  // is opened as .../page/index.html (file://) or .../page/ (served by the portal).
  const trim = u => u.replace(/index\.html$/, '');
  const here = trim(location.href.split(/[?#]/)[0]);

  const abs  = p => trim(new URL(ROOT + p, location.href).href);    // real, depth-correct, file://- & server-safe
  const inBranch = n => abs(n.path) === here || (n.children || []).some(inBranch);

  function item(n){
    const cur  = abs(n.path) === here ? ' aria-current="page"' : '';
    const link = `<a href="${ROOT + n.path}"${cur}>${n.title}</a>`;
    const kids = n.children || [];
    if (!kids.length) return link;
    return `<details${inBranch(n) ? ' open' : ''}><summary>${link}</summary>`
         + `<div>${kids.map(item).join('')}</div></details>`;
  }
  function find(n){
    if (!n) return null;
    if (abs(n.path) === here) return n;
    for (const c of (n.children || [])) { const r = find(c); if (r) return r; }
    return null;
  }

  const nav = document.getElementById('nav');
  if (nav && T){
    const brand = nav.dataset.brand ? `<p class="brand">${nav.dataset.brand}</p>` : '';
    nav.innerHTML = brand + item(T);
  }

  // Notion-style sub-page cards: fill an empty <nav class="subpages"> from the current node's children.
  const holder = document.querySelector('nav.subpages');
  const cur = find(T);
  if (holder && cur && (cur.children || []).length){
    holder.innerHTML = cur.children.map(c => `<a href="${ROOT + c.path}">${c.title}</a>`).join('');
  }

  window.renderMathInElement?.(document.body, {
    delimiters:[
      {left:'$$',right:'$$',display:true}, {left:'\\[',right:'\\]',display:true},
      {left:'$',right:'$',display:false},  {left:'\\(',right:'\\)',display:false},
    ],
    throwOnError:false,
  });
})();
