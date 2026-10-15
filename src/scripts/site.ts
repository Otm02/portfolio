/*
 * The site's only script (~5 KB). Everything works without it; it adds the
 * theme toggle, copy-email, the command palette, scroll-spy, project filters,
 * "show earlier roles" and the shared-element page transitions.
 */
type PaletteItem = { label: string; kind: string; action: 'section' | 'case' | 'link' | 'copy' | 'theme' | 'paper'; target?: string; keywords?: string };
type SiteData = { e: string; palette: PaletteItem[] };

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DATA: SiteData = JSON.parse($('#site-data')?.textContent || '{"e":"","palette":[]}');
const EMAIL = [...atob(DATA.e)].reverse().join('');
const home = !!$('.hero');

/* Email: the HTML carries a human-readable form; JS fills in the real address. */
$$<HTMLAnchorElement>('[data-email]').forEach((a) => {
  a.textContent = EMAIL;
  a.href = `mailto:${EMAIL}`;
});

/* Cursor spotlight */
const spot = $('.spot');
if (spot && matchMedia('(hover: hover) and (pointer: fine)').matches && !reduce) {
  let raf = 0, x = 0, y = 0;
  addEventListener('pointermove', (e) => {
    x = e.clientX; y = e.clientY;
    if (!raf) raf = requestAnimationFrame(() => { spot.style.setProperty('--x', `${x}px`); spot.style.setProperty('--y', `${y}px`); raf = 0; });
  }, { passive: true });
}

/* Top bar border (and mini avatar on the home page) once the page scrolls */
const bar = $('.topbar');
const sentinel = $('#name') || $('main');
if (bar && sentinel) {
  new IntersectionObserver(([e]) => bar.classList.toggle('scrolled', !e.isIntersecting), { rootMargin: '-64px 0px 0px 0px' })
    .observe(home ? sentinel : ($('.page > :first-child') || sentinel));
}

/* Scroll-spy for the section index (home page) */
const spyLinks = $$('[data-spy]');
if (spyLinks.length) {
  const setCurrent = (id: string) => spyLinks.forEach((a) => a.setAttribute('aria-current', String(a.dataset.spy === id)));
  const io = new IntersectionObserver((entries) => {
    entries.filter((e) => e.isIntersecting).forEach((e) => setCurrent(e.target.id));
  }, { rootMargin: '-35% 0px -60% 0px' });
  $$('main section[id]').forEach((s) => io.observe(s));
}

/* Theme toggle with a circular reveal from the button. Light unless the visitor chose dark. */
const currentTheme = () => (root.dataset.theme === 'dark' ? 'dark' : 'light');
const syncTheme = () => {
  const dark = currentTheme() === 'dark';
  $$('.theme').forEach((b) => b.setAttribute('aria-pressed', String(dark)));
  $<HTMLMetaElement>('meta[name="theme-color"]')?.setAttribute('content', dark ? '#111113' : '#FCFCFC');
};
syncTheme();
const toggleTheme = (from?: Element) => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    if (next === 'dark') root.dataset.theme = next;
    else delete root.dataset.theme;
    try { localStorage.setItem('theme', next); } catch { /* private mode */ }
    syncTheme();
  };
  if (reduce || !document.startViewTransition || !from) return apply();
  const r = from.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  root.style.setProperty('--vx', `${cx}px`);
  root.style.setProperty('--vy', `${cy}px`);
  root.style.setProperty('--vr', `${Math.hypot(Math.max(cx, innerWidth - cx), Math.max(cy, innerHeight - cy))}px`);
  root.classList.add('vt-theme');
  const done = () => root.classList.remove('vt-theme');
  document.startViewTransition(apply).finished.then(done, done);
};
$$('.theme').forEach((b) => b.addEventListener('click', () => toggleTheme(b)));

/* Copy email + toast */
const toast = $('.toast');
let toastTimer: ReturnType<typeof setTimeout>;
const say = (msg: string) => {
  if (!toast) return;
  toast.querySelector('span')!.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
};
const copyEmail = () => {
  const fallback = () => {
    const out = $('[data-email]');
    if (out) {
      const sel = getSelection()!, range = document.createRange();
      range.selectNodeContents(out); sel.removeAllRanges(); sel.addRange(range);
      out.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
      say('Email selected. Press Ctrl+C to copy');
    } else {
      location.href = `mailto:${EMAIL}`;
    }
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(EMAIL).then(() => say(`Copied ${EMAIL}`), fallback);
  else fallback();
};
$$('[data-copy-email]').forEach((b) => b.addEventListener('click', copyEmail));

/* Show earlier roles */
$$('.toggle-more').forEach((btn) => btn.addEventListener('click', () => {
  const panel = document.getElementById(btn.getAttribute('aria-controls')!)!;
  const open = btn.getAttribute('aria-expanded') !== 'true';
  btn.setAttribute('aria-expanded', String(open));
  panel.classList.toggle('open', open);
  panel.inert = !open;
  btn.querySelector('span')!.textContent = open ? 'Show fewer' : btn.dataset.label!;
}));
$$('.more[data-collapsed]').forEach((p) => { (p as HTMLElement).inert = true; });

/* Project filters with a sliding pill */
const fbar = $('.filters');
if (fbar) {
  const pill = $('.pill', fbar)!;
  const place = (b: HTMLElement) => {
    pill.style.width = `${b.offsetWidth}px`; pill.style.height = `${b.offsetHeight}px`;
    pill.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
  };
  const pressed = () => $('button[aria-pressed="true"]', fbar)!;
  $$('button', fbar).forEach((b) => b.addEventListener('click', () => {
    $$('button', fbar).forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
    place(b);
    const f = b.dataset.filter!;
    let shown = 0;
    $$('#project-list > .item').forEach((row) => {
      const ok = f === 'All' || row.dataset.tags!.split(' ').includes(f);
      row.hidden = !ok; if (ok) shown++;
    });
    $('#project-count')!.textContent = `${shown} shown`;
  }));
  requestAnimationFrame(() => place(pressed()));
  addEventListener('resize', () => place(pressed()));
}

/* Shared-element transitions between a work card and its case study page.
   The case page names its title and metric in CSS; here we name the matching
   card only for the navigation that needs it. */
const caseSlug = (url?: string | null) => url?.match(/\/work\/([\w-]+)/)?.[1];
const nameCard = (slug: string | undefined, on: boolean) => {
  const card = slug && $(`.card[data-slug="${slug}"]`);
  if (!card) return;
  $('.ttl', card)!.style.viewTransitionName = on ? 'cs-title' : '';
  $('.fig', card)!.style.viewTransitionName = on ? 'cs-metric' : '';
};
addEventListener('pageswap', ((e: Event & { viewTransition?: ViewTransition; activation?: { entry?: { url?: string } } }) => {
  if (e.viewTransition && home) nameCard(caseSlug(e.activation?.entry?.url), true);
}) as EventListener);
addEventListener('pagereveal', ((e: Event & { viewTransition?: ViewTransition }) => {
  const from = (window as unknown as { navigation?: { activation?: { from?: { url?: string } } } }).navigation?.activation?.from?.url;
  if (!e.viewTransition || !home) return;
  const slug = caseSlug(from);
  nameCard(slug, true);
  e.viewTransition.ready.finally(() => nameCard(slug, false));
}) as EventListener);

/* Command palette */
const dlg = $<HTMLDialogElement>('dialog.cmdk');
if (dlg) {
  const input = $<HTMLInputElement>('input', dlg)!;
  const list = $('.cmdk-list', dlg)!;
  const items = DATA.palette;
  let results: PaletteItem[] = [], active = 0;
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
  const draw = () => {
    // Match ignoring case, accents and punctuation, so "vjepa" finds "V-JEPA2".
    const norm = (s: string) => s.normalize('NFD').toLowerCase().replace(/[^a-z0-9]+/g, '');
    const q = norm(input.value);
    results = items.filter((it) => !q || norm(`${it.label} ${it.kind} ${it.keywords || ''} ${it.target || ''}`).includes(q)).slice(0, 12);
    active = Math.min(active, Math.max(0, results.length - 1));
    list.innerHTML = results.length
      ? results.map((it, i) => `<li role="option" id="opt-${i}" aria-selected="${i === active}" data-i="${i}"><span>${esc(it.label)}</span><small>${esc(it.kind)}</small></li>`).join('')
      : `<li class="cmdk-empty" role="option" aria-disabled="true" aria-selected="false">Nothing matches “${esc(input.value)}”</li>`;
    if (results.length) input.setAttribute('aria-activedescendant', `opt-${active}`);
    else input.removeAttribute('aria-activedescendant');
  };
  const go = (href: string) => {
    const a = document.createElement('a');
    a.href = href;
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    a.click();
  };
  const run = (it: PaletteItem) => {
    dlg.close();
    const t = it.target || '';
    if (it.action === 'section') {
      const el = home && document.getElementById(t);
      if (el) { el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); history.replaceState(null, '', `#${t}`); }
      else go(`/#${t}`);
    }
    else if (it.action === 'case') go(`/work/${t}`);
    else if (it.action === 'paper') go(`/research#${t}`);
    else if (it.action === 'link') go(t);
    else if (it.action === 'copy') copyEmail();
    else if (it.action === 'theme') toggleTheme($('.theme') || undefined);
  };
  const openPalette = () => { input.value = ''; active = 0; draw(); dlg.showModal(); input.focus(); };
  $$('[data-cmdk]').forEach((b) => b.addEventListener('click', openPalette));
  addEventListener('keydown', (e) => {
    const typing = /input|textarea|select/i.test((document.activeElement as HTMLElement)?.tagName || '') || (document.activeElement as HTMLElement)?.isContentEditable;
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); if (dlg.open) dlg.close(); else openPalette(); }
    else if (e.key === '/' && !dlg.open && !typing) { e.preventDefault(); openPalette(); }
  });
  input.addEventListener('input', () => { active = 0; draw(); });
  input.addEventListener('keydown', (e) => {
    const n = Math.max(1, results.length);
    if (e.key === 'ArrowDown') { e.preventDefault(); active = (active + 1) % n; draw(); $(`#opt-${active}`)?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = (active - 1 + n) % n; draw(); $(`#opt-${active}`)?.scrollIntoView({ block: 'nearest' }); }
    else if (e.key === 'Enter' && results[active]) { e.preventDefault(); run(results[active]); }
  });
  list.addEventListener('click', (e) => { const li = (e.target as Element).closest<HTMLElement>('li[data-i]'); if (li) run(results[+li.dataset.i!]); });
  list.addEventListener('pointermove', (e) => { const li = (e.target as Element).closest<HTMLElement>('li[data-i]'); if (li && +li.dataset.i! !== active) { active = +li.dataset.i!; draw(); } });
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
}

export {};
