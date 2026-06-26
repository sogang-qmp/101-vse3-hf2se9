/* site.js — offline-first project-site shell (no fetch, file://-safe).
 * Builds: sidebar tree (from window.SITE_TREE), sticky top bar, light/dark theme,
 * syntax highlighting + copy buttons, prev/next nav, KaTeX, and the per-page
 * output-file viewer. Heavy libs (highlight.js) come from the shared assets/lib/,
 * depth-resolved from this script's own src so any page depth works.            */
(() => {
  const tag  = [...document.scripts].find(s => /assets\/site\.js(\?|$)/.test(s.getAttribute('src') || ''));
  const ROOT = (tag ? tag.getAttribute('src') : '').replace(/assets\/site\.js.*$/, ''); // "", "../", "../../"
  const T    = window.SITE_TREE;
  const trim = u => u.replace(/index\.html$/, '');
  const here = trim(location.href.split(/[?#]/)[0]);
  const abs  = p => trim(new URL(ROOT + p, location.href).href);
  const esc  = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const navEl = document.getElementById('nav');
  const brand = navEl ? (navEl.dataset.brand || '') : '';
  const repo  = navEl ? (navEl.dataset.repo  || '') : '';
  const root  = document.documentElement;

  const ICON = {
    menu:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 4h12M2 8h12M2 12h12"/></svg>',
    theme: '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 14.5V1.5a6.5 6.5 0 0 1 0 13z"/></svg>',
    repo:  '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .2a8 8 0 0 0-2.5 15.6c.4.07.5-.17.5-.38v-1.3c-2.2.48-2.7-1.07-2.7-1.07-.36-.92-.9-1.17-.9-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.5-1.08-1.76-.2-3.6-.88-3.6-3.9 0-.86.3-1.57.82-2.12-.08-.2-.36-1.01.08-2.1 0 0 .67-.22 2.2.8a7.6 7.6 0 0 1 4 0c1.53-1.02 2.2-.8 2.2-.8.44 1.09.16 1.9.08 2.1.51.55.82 1.26.82 2.12 0 3.03-1.85 3.7-3.61 3.89.28.25.54.73.54 1.48v2.2c0 .21.14.46.55.38A8 8 0 0 0 8 .2z"/></svg>',
  };

  // ── theme ───────────────────────────────────────────────────────
  const setTheme = t => {
    root.dataset.theme = t;
    try { localStorage.setItem('site-theme', t); } catch (e) {}
    const hl = document.getElementById('hljs-theme');
    if (hl) hl.href = ROOT + 'assets/lib/highlight-github' + (t === 'dark' ? '-dark' : '') + '.min.css';
  };
  const saved = (() => { try { return localStorage.getItem('site-theme'); } catch (e) { return null; } })();
  setTheme(saved === 'dark' || saved === 'light' ? saved
           : (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  // ── sidebar tree ────────────────────────────────────────────────
  const inBranch = n => abs(n.path) === here || (n.children || []).some(inBranch);
  function item(n){
    const cur  = abs(n.path) === here ? ' aria-current="page"' : '';
    const link = `<a href="${ROOT + n.path}"${cur}>${esc(n.title)}</a>`;
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
  const cur = find(T);
  if (navEl && T){
    // Sections: [Home, Log] · [content roots] · [Iterations] — divider between each.
    const kids = T.children || [];
    const logNode  = kids.find(c => c.path === 'log/index.html');
    const iterNode = kids.find(c => c.path === 'iterations/index.html');
    const rest = kids.filter(c => c !== logNode && c !== iterNode);
    const homeCur = abs(T.path) === here ? ' aria-current="page"' : '';
    navEl.innerHTML =
        (brand ? `<a class="brand" href="${ROOT}index.html">${esc(brand)}</a>` : '')
      + `<div class="nav-sec"><a href="${ROOT}index.html"${homeCur}>Home</a>`
      + (logNode ? item(logNode) : '')
      + '</div><div class="nav-divider"></div>'
      + `<div class="nav-sec">${rest.map(item).join('')}</div>`
      + (iterNode ? '<div class="nav-divider"></div><div class="nav-sec">' + item(iterNode) + '</div>' : '');
    const active = navEl.querySelector('a[aria-current="page"]');
    if (active) active.scrollIntoView({ block: 'nearest' });
  }

  // ── top bar + page wrapper ──────────────────────────────────────
  const main = document.querySelector('main');
  if (main){
    const page = document.createElement('div'); page.className = 'page';
    main.parentNode.insertBefore(page, main);
    const bar = document.createElement('div'); bar.id = 'topbar';
    bar.innerHTML =
        `<button class="tb-btn" id="tb-menu" aria-label="Toggle sidebar">${ICON.menu}</button>`
      + `<span class="tb-title">${esc((cur && cur.title) || brand || '')}</span>`
      + '<span class="spacer"></span>'
      + (repo ? `<a class="tb-btn" href="${esc(repo)}" target="_blank" rel="noopener" title="Repository">${ICON.repo}</a>` : '')
      + `<button class="tb-btn" id="tb-theme" aria-label="Toggle theme" title="Toggle theme">${ICON.theme}</button>`;
    page.appendChild(bar);
    page.appendChild(main);

    const scrim = document.createElement('div'); scrim.className = 'nav-scrim';
    document.body.appendChild(scrim);
    bar.querySelector('#tb-menu').addEventListener('click', () => {
      if (innerWidth > 980) document.body.classList.toggle('nav-hidden');
      else document.body.classList.toggle('nav-open');
    });
    scrim.addEventListener('click', () => document.body.classList.remove('nav-open'));
    bar.querySelector('#tb-theme').addEventListener('click',
      () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
  }

  // ── resizable sidebar (drag the right edge; width persisted) ─────
  (function(){
    const KEY = 'site-sidebar-w', MIN = 200, MAX = 560;
    try { const w = parseInt(localStorage.getItem(KEY), 10);
          if (w >= MIN && w <= MAX) root.style.setProperty('--sidebar-w', w + 'px'); } catch(e){}
    if (innerWidth <= 980) return;                  // overlay mode: no resize handle
    const handle = document.createElement('div');
    handle.id = 'nav-resize'; handle.setAttribute('aria-hidden', 'true');
    handle.title = 'Drag to resize · double-click to reset';
    document.body.appendChild(handle);
    let dragging = false;
    const move = e => { if (!dragging) return;
      root.style.setProperty('--sidebar-w', Math.min(MAX, Math.max(MIN, e.clientX)) + 'px'); };
    const up = () => { if (!dragging) return; dragging = false; document.body.classList.remove('resizing');
      removeEventListener('pointermove', move); removeEventListener('pointerup', up);
      try { localStorage.setItem(KEY, parseInt(getComputedStyle(root).getPropertyValue('--sidebar-w'), 10)); } catch(e){} };
    handle.addEventListener('pointerdown', e => { e.preventDefault(); dragging = true;
      document.body.classList.add('resizing');
      addEventListener('pointermove', move); addEventListener('pointerup', up); });
    handle.addEventListener('dblclick', () => { root.style.removeProperty('--sidebar-w');
      try { localStorage.removeItem(KEY); } catch(e){} });
  })();

  // ── Notion-style sub-page cards ─────────────────────────────────
  const holder = document.querySelector('nav.subpages');
  if (holder && cur && (cur.children || []).length){
    holder.innerHTML = cur.children.map(c => `<a href="${ROOT + c.path}">${esc(c.title)}</a>`).join('');
  }

  // ── prev / next (reading order = depth-first tree) + arrow keys ──
  const flat = []; (function walk(n){ if (!n) return; flat.push(n); (n.children || []).forEach(walk); })(T);
  const idx = flat.findIndex(n => abs(n.path) === here);
  if (main && idx >= 0 && flat.length > 1){
    const prev = flat[idx - 1], next = flat[idx + 1];
    const pn = document.createElement('nav'); pn.className = 'prevnext';
    pn.innerHTML =
        (prev ? `<a class="prev" href="${ROOT + prev.path}"><span class="pn-dir">← 이전</span><span class="pn-title">${esc(prev.title)}</span></a>` : '<span style="flex:1"></span>')
      + (next ? `<a class="next" href="${ROOT + next.path}"><span class="pn-dir">다음 →</span><span class="pn-title">${esc(next.title)}</span></a>` : '<span style="flex:1"></span>');
    main.appendChild(pn);
    addEventListener('keydown', e => {
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowLeft'  && prev) location.href = ROOT + prev.path;
      if (e.key === 'ArrowRight' && next) location.href = ROOT + next.path;
    });
  }

  // ── KaTeX (loaded in <head>) ────────────────────────────────────
  window.renderMathInElement?.(document.body, {
    delimiters:[
      {left:'$$',right:'$$',display:true}, {left:'\\[',right:'\\]',display:true},
      {left:'$',right:'$',display:false},  {left:'\\(',right:'\\)',display:false},
    ],
    throwOnError:false,
  });

  // ── highlight.js from shared assets/lib + copy buttons ──────────
  const hcss = document.createElement('link'); hcss.rel = 'stylesheet'; hcss.id = 'hljs-theme';
  hcss.href = ROOT + 'assets/lib/highlight-github' + (root.dataset.theme === 'dark' ? '-dark' : '') + '.min.css';
  document.head.appendChild(hcss);
  const hjs = document.createElement('script'); hjs.src = ROOT + 'assets/lib/highlight.min.js';
  hjs.addEventListener('load', () => {
    document.querySelectorAll('main pre > code').forEach(code => {
      try { window.hljs.highlightElement(code); } catch (e) {}
      const pre = code.parentElement;
      const btn = document.createElement('button'); btn.className = 'copy-btn'; btn.type = 'button'; btn.textContent = 'copy';
      btn.addEventListener('click', () => {
        navigator.clipboard?.writeText(code.textContent).then(() => {
          btn.textContent = 'copied'; btn.classList.add('ok');
          setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('ok'); }, 1200);
        });
      });
      pre.appendChild(btn);
    });
  });
  hjs.addEventListener('error', () => {});
  document.head.appendChild(hjs);

  // ── per-page output files (figures/data/scripts) + viewer modal ─
  // Data from {page}/files.js (window.PAGE_FILES), text inlined → no fetch.
  const hsize = n => n < 1024 ? n + ' B' : n < 1048576 ? (n/1024).toFixed(0) + ' KB' : (n/1048576).toFixed(1) + ' MB';
  const LABELS = { figures: 'Figures', data: 'Data', scripts: 'Scripts' };
  function renderOutputs(groups){
    const m = document.querySelector('main');
    if (!m || !groups) return;
    let inner = '';
    for (const key of ['figures', 'data', 'scripts']){
      const items = groups[key];
      if (!items || !items.length) continue;
      inner += `<h3>${LABELS[key]}</h3><ul class="filelist">`
        + items.map((f, i) =>
            `<li><a href="${esc(f.path)}" class="fileitem" data-grp="${key}" data-i="${i}">${esc(f.name)}</a>`
            + `<span class="fsize">${hsize(f.size)}</span></li>`).join('')
        + '</ul>';
    }
    if (!inner) return;
    const sec = document.createElement('section'); sec.className = 'outputs';
    sec.innerHTML = `<h2>Output files</h2>${inner}`;
    const pn = m.querySelector('.prevnext');
    m.insertBefore(sec, pn || null);

    const modal = document.createElement('div'); modal.className = 'filemodal'; modal.hidden = true;
    modal.innerHTML =
        '<div class="filemodal-bd"></div>'
      + '<div class="filemodal-box" role="dialog" aria-modal="true">'
      + '<div class="filemodal-head"><span class="filemodal-title"></span>'
      + '<a class="filemodal-open" target="_blank" rel="noopener">open ↗</a>'
      + '<button class="filemodal-x" type="button" aria-label="Close">✕</button></div>'
      + '<div class="filemodal-body"></div></div>';
    document.body.appendChild(modal);
    const close = () => { modal.hidden = true; };
    modal.querySelector('.filemodal-bd').addEventListener('click', close);
    modal.querySelector('.filemodal-x').addEventListener('click', close);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });
    sec.querySelectorAll('.fileitem').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const f = groups[a.dataset.grp][+a.dataset.i];
      modal.querySelector('.filemodal-title').textContent = f.name;
      modal.querySelector('.filemodal-open').href = f.path;
      const body = modal.querySelector('.filemodal-body');
      if (f.kind === 'img')       body.innerHTML = `<img src="${esc(f.path)}" alt="${esc(f.name)}">`;
      else if (f.kind === 'text') body.innerHTML = `<pre>${esc(f.content)}</pre>`;
      else body.innerHTML = `<p class="filemodal-note">Binary or large file — `
                          + `<a href="${esc(f.path)}" target="_blank" rel="noopener">open ↗</a></p>`;
      modal.hidden = false;
    }));
  }
  const fjs = document.createElement('script'); fjs.src = 'files.js';   // relative to the page
  fjs.addEventListener('load', () => renderOutputs(window.PAGE_FILES));
  fjs.addEventListener('error', () => {});
  document.head.appendChild(fjs);
})();
