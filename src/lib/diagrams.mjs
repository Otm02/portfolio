/*
 * Inline diagrams for case studies. In a case study's Markdown, write
 *   <!-- diagram: name | caption -->
 * and markdown-diagrams.mjs swaps it for the figure below. Diagrams are
 * schematic: they restate what the text says, never new data.
 */

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Vertical stepper: steps = [[title, note?], ...]. */
const steps = (items, { loop } = {}) =>
  `<ol class="dg-steps">${items
    .map(([t, n], i) => `<li${i === items.length - 1 ? ' class="dg-end"' : ''}><b>${esc(t)}</b>${n ? `<span>${esc(n)}</span>` : ''}</li>`)
    .join('')}</ol>${loop ? `<p class="dg-loop"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.34-5.66"/><path d="M20 4v5h-5"/></svg>${esc(loop)}</p>` : ''}`;

/** Schematic sine of thermal swings with a barely sloping leak trend. */
function signalScale() {
  const x0 = 56, x1 = 464, mid = 112, amp = 50, periods = 6;
  let d = '';
  for (let i = 0; i <= 240; i++) {
    const x = x0 + ((x1 - x0) * i) / 240;
    const y = mid - amp * Math.sin((i / 240) * periods * 2 * Math.PI);
    d += `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return `<svg class="dg-svg" viewBox="0 0 480 214" role="img" aria-label="Schematic: large periodic pressure swings from temperature, with a nearly flat leak trend through the middle.">
  <path class="dg-muted" d="M${x0} 14h22"/><text class="dg-t dg-t-m" x="${x0 + 30}" y="18">pressure swing with temperature</text>
  <path class="dg-acc" d="M${x0} 36h22"/><text class="dg-t dg-t-acc" x="${x0 + 30}" y="40">1%/year leak: ~0.27 mbar per day</text>
  <path class="dg-grid" d="M${x0} 182H${x1}"/>
  <path class="dg-muted" d="${d}"/>
  <path class="dg-acc" d="M${x0} ${mid}L${x1} ${mid + 5}"/>
  <path class="dg-ink" d="M34 ${mid - amp}V${mid + amp}M29 ${mid - amp}h10M29 ${mid + amp}h10"/>
  <text class="dg-t" x="22" y="${mid}" text-anchor="middle" transform="rotate(-90 22 ${mid})">~40 mbar per °C</text>
  <text class="dg-t dg-t-m" x="${x0}" y="204">day 0</text>
  <text class="dg-t dg-t-m" x="${x1}" y="204" text-anchor="end">day 30</text>
</svg>`;
}

/** Stacked 30-day windows one day apart, then random vs grouped splits. */
function overlappingWindows() {
  const day = 4.2, w = 30 * day, x0 = 150;
  const bars = [0, 1, 2, 3, 4]
    .map((i) => `<rect class="dg-bar" x="${(x0 + i * day).toFixed(1)}" y="${16 + i * 9}" width="${w}" height="6" rx="3"/>`)
    .join('');
  // 16 consecutive windows. Random: test windows sit between training windows.
  const random = 'TTtTtTTtTTtTtTTt';
  const grouped = 'TTTTTTTTTT--tttt';
  const row = (pattern, y) =>
    [...pattern]
      .map((c, i) => (c === '-' ? '' : `<rect class="${c === 't' ? 'dg-test' : 'dg-train'}" x="${x0 + i * 19}" y="${y}" width="15" height="15" rx="3.5"/>`))
      .join('');
  return `<svg class="dg-svg" viewBox="0 0 470 200" role="img" aria-label="Schematic: five 30-day windows offset by one day overlap almost entirely. In a random split, test windows sit between training windows that share their days. In a segment-grouped split, all training windows come first, then a gap, then the test windows.">
  <text class="dg-t" x="0" y="40">30-day windows</text>
  <text class="dg-t dg-t-m" x="0" y="58">1 day apart</text>
  ${bars}
  <text class="dg-t" x="0" y="122">Random split</text>
  ${row(random, 110)}
  <text class="dg-t" x="0" y="160">Grouped split</text>
  ${row(grouped, 148)}
  <rect class="dg-train" x="${x0}" y="182" width="11" height="11" rx="3"/><text class="dg-t dg-t-m" x="${x0 + 17}" y="192">train</text>
  <rect class="dg-test" x="${x0 + 74}" y="182" width="11" height="11" rx="3"/><text class="dg-t dg-t-m" x="${x0 + 91}" y="192">test</text>
</svg>`;
}

const agents = () => `<div class="dg-tree" role="img" aria-label="The sales agent sends each question to a broad or a narrow query agent; both call SQL Server stored procedures over the ERP's data.">
  <div class="dg-node dg-node-acc"><b>Sales agent</b><span>orchestrates</span></div>
  <div class="dg-branch">
    <div class="dg-node"><b>Broad query agent</b><span>overall figures</span></div>
    <div class="dg-node"><b>Narrow query agent</b><span>specifics</span></div>
  </div>
  <div class="dg-node dg-node-base"><b>SQL Server stored procedures</b><span>over the ERP's data</span></div>
</div>`;

const DIAGRAMS = {
  'signal-scale': signalScale,
  'overlapping-windows': overlappingWindows,
  'detector-pipeline': () =>
    steps([
      ['93 candidate features'],
      ['Invariance screen', 'keeps 34 stable across healthy time blocks'],
      ['L1-regularized logistic regression'],
      ['Threshold from healthy data only', 'exact Poisson upper bound'],
      ['7-day persistence rule'],
      ['Dispatch', 'counted per dispatch, not per episode'],
    ]),
  'sales-agents': agents,
  'advisory-loop': () =>
    steps(
      [
        ['Live SCADA data', 'logged to SQL Server'],
        ['Online model', 'recursive least squares, EWMA percentile bands'],
        ['One speed proposal', 'for the one input speed operators control'],
        ['Operator decides', 'accept, modify or refuse, through a chat interface'],
      ],
      { loop: 'Operator feedback flows back into the system.' },
    ),
  'soma-pipeline': () =>
    steps([
      ['One marker per soma', 'center and radius'],
      ['3D median filter', 'removes salt-and-pepper noise'],
      ['Local Otsu threshold', 'computed inside the marker’s sphere'],
      ['3D region growing', 'from the center, constrained to the sphere'],
      ['Binary 3D mask', 'threshold saved in the marker for per-soma override'],
    ]),
};

export function renderDiagram(name, caption) {
  const make = DIAGRAMS[name];
  if (!make) throw new Error(`Unknown diagram "${name}"`);
  return `<figure class="dg">${make()}<figcaption>${esc(caption)}</figcaption></figure>`;
}
