var DEFAULT_ME = { id: 'F', x: 405, y: 422, name: 'Guard House (F)' };
var state = { me: DEFAULT_ME, sel: null, dest: null, picking: false, kind: 'all', mapRot: -30 };
var VB0 = [325, 18, 417, 470], vb = VB0.slice(), dragged = false;

try {
  var saved = JSON.parse(localStorage.getItem('tungo-me'));
  if (saved && saved.x) state.me = saved;
} catch (e) {}

function byId(id) { return ITEMS.find(function (i) { return i.id === id; }); }
function $(id) { return document.getElementById(id); }

/* ---------------- ROUTING (uses walkway graph G from mapdata.js) ---------------- */
var ADJ = null;
function initGraph() {
  ADJ = G.n.map(function () { return []; });
  G.e.forEach(function (e) {
    var d = Math.hypot(G.n[e[0]][0] - G.n[e[1]][0], G.n[e[0]][1] - G.n[e[1]][1]);
    ADJ[e[0]].push([e[1], d]); ADJ[e[1]].push([e[0], d]);
  });
}
function nodeFor(p) {
  if (p.id && G.door[p.id] !== undefined) return G.door[p.id];
  var b = 0, bd = 1e9;
  G.n.forEach(function (n, i) { var d = Math.hypot(n[0] - p.x, n[1] - p.y); if (d < bd) { bd = d; b = i; } });
  return b;
}
var routeMemo = { k: null, pts: null };
function findRoute(from, to) {
  var key = (from.id || from.x + ':' + from.y) + '>' + (to.id || to.x + ':' + to.y);
  if (routeMemo.k === key) return routeMemo.pts;
  var a = nodeFor(from), b = nodeFor(to), dist = {}, prev = {}, done = {}, q = [a];
  dist[a] = 0;
  while (q.length) {
    var bi = 0;
    q.forEach(function (v, i) { if (dist[v] < dist[q[bi]]) bi = i; });
    var u = q.splice(bi, 1)[0];
    if (done[u]) continue;
    done[u] = 1;
    if (u === b) break;
    ADJ[u].forEach(function (e) {
      var nd = dist[u] + e[1];
      if (dist[e[0]] === undefined || nd < dist[e[0]]) { dist[e[0]] = nd; prev[e[0]] = u; q.push(e[0]); }
    });
  }
  if (dist[b] === undefined) return null;
  var pts = [], k = b;
  while (k !== undefined) { pts.unshift(G.n[k]); k = prev[k]; }
  routeMemo = { k: key, pts: pts };
  return pts;
}

/* ---------------- 3D SCENE (shared by home overview AND full campus map) ---------------- */
var H3 = null;
function polyOf(b) { return [[b[0], b[1]], [b[2], b[3]], [b[4], b[5]], [b[6], b[7]]]; }
function pointIn(x, y, p) {
  var c = false;
  for (var i = 0, j = p.length - 1; i < p.length; j = i++)
    if ((p[i][1] > y) !== (p[j][1] > y) && x < (p[j][0] - p[i][0]) * (y - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0]) c = !c;
  return c;
}
function heights() {
  return H3 = H3 || BLDG.map(function (b) {
    var p = polyOf(b), a = 0;
    for (var i = 0; i < 4; i++) a += p[i][0] * p[(i + 1) % 4][1] - p[(i + 1) % 4][0] * p[i][1];
    return Math.min(30, 7 + Math.sqrt(Math.abs(a) / 2) / 2.2);
  });
}
function heightAt(x, y) {
  var hs = heights();
  for (var i = 0; i < BLDG.length; i++) if (pointIn(x, y, polyOf(BLDG[i]))) return hs[i];
  return 0;
}
function scene3D(deg, interactive) {
  var th = deg * Math.PI / 180, c = Math.cos(th), sn = Math.sin(th), K = .58, cx = 520, cy = 260;
  function P(x, y, z) { var dx = x - cx, dy = y - cy; return [cx + dx * c - dy * sn, cy + (dx * sn + dy * c) * K - (z || 0)]; }
  function str(a) { return a.map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' '); }
  var campus = [[322,100],[432,88],[505,58],[534,205],[567,300],[642,400],[642,464],[655,490],[388,490],[396,455],[330,215]];
  var pond = [[500,40],[700,25],[710,75],[520,78]];
  var all = campus.concat(pond).map(function (p) { return P(p[0], p[1], 0); });
  var xs = all.map(function (p) { return p[0]; }), ys = all.map(function (p) { return p[1]; });
  var x0 = Math.min.apply(null, xs) - 14, y0 = Math.min.apply(null, ys) - 46;
  var vb = [x0, y0, Math.max.apply(null, xs) + 14 - x0, Math.max.apply(null, ys) + 26 - y0];
  var s = '';
  [campus, pond].forEach(function (g) {
    s += '<polygon points="' + str(g.map(function (p) { var q = P(p[0], p[1], 0); return [q[0], q[1] + 9]; })) + '" fill="#A9B39F"/>';
    s += '<polygon points="' + str(g.map(function (p) { return P(p[0], p[1], 0); })) + '" fill="#E6EFDD" stroke="#D3DEC8"/>';
  });
  var ell = [];
  for (var a = 0; a < 40; a++) ell.push(P(465 + 62 * Math.cos(a / 40 * 6.283), 312 + 88 * Math.sin(a / 40 * 6.283), 0));
  s += '<polygon points="' + str(ell) + '" fill="#C8E6B8" stroke="#fff" stroke-width="1.5"/>';
  [[[347,112],[374,330],[402,462]], [[392,481],[650,481]]].forEach(function (r) {
    var pp = str(r.map(function (p) { return P(p[0], p[1], 0); }));
    s += '<polyline points="' + pp + '" fill="none" stroke="#DADCE0" stroke-width="15" stroke-linecap="round"/><polyline points="' + pp + '" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round"/>';
  });
  [[[347,112],[374,330],'Notre Dame Avenue'], [[420,481],[640,481],'Quezon Avenue']].forEach(function (r) {
    var A = P(r[0][0], r[0][1], 0), B = P(r[1][0], r[1][1], 0);
    var ang = Math.atan2(B[1] - A[1], B[0] - A[0]) * 180 / Math.PI;
    if (ang > 90 || ang < -90) ang += 180;
    var mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2;
    s += '<text x="' + mx.toFixed(1) + '" y="' + (my + 3).toFixed(1) + '" transform="rotate(' + ang.toFixed(1) + ' ' + mx.toFixed(1) + ' ' + my.toFixed(1) + ')" font-size="8.5" fill="#70757A" text-anchor="middle" letter-spacing="1">' + r[2] + '</text>';
  });
  var d = '';
  G.e.forEach(function (e) { var a = P(G.n[e[0]][0], G.n[e[0]][1], 0), b = P(G.n[e[1]][0], G.n[e[1]][1], 0); d += 'M' + a[0].toFixed(1) + ' ' + a[1].toFixed(1) + 'L' + b[0].toFixed(1) + ' ' + b[1].toFixed(1); });
  s += '<path d="' + d + '" fill="none" stroke="#DFDBCB" stroke-width="3.4" stroke-linecap="round" opacity=".65"/><path d="' + d + '" fill="none" stroke="#fff" stroke-width="1.7" stroke-linecap="round" opacity=".8"/>';
  var hs = heights(), order = BLDG.map(function (b, i) {
    var p = polyOf(b), mx = (p[0][0] + p[2][0]) / 2, my = (p[0][1] + p[2][1]) / 2;
    return { i: i, d: P(mx, my, 0)[1] };
  }).sort(function (a, b) { return a.d - b.d; });
  order.forEach(function (o) {
    var p = polyOf(BLDG[o.i]), h = hs[o.i], walls = [];
    for (var k = 0; k < 4; k++) {
      var A = p[k], B = p[(k + 1) % 4], a0 = P(A[0], A[1], 0), b0 = P(B[0], B[1], 0);
      walls.push({ d: (a0[1] + b0[1]) / 2, pts: [a0, b0, P(B[0], B[1], h), P(A[0], A[1], h)], f: (b0[0] - a0[0]) * (b0[1] - a0[1]) > 0 ? '#CFC8B7' : '#B9B19D' });
    }
    walls.sort(function (a, b) { return a.d - b.d; }).forEach(function (w) { s += '<polygon points="' + str(w.pts) + '" fill="' + w.f + '" stroke="#A89F8A" stroke-width=".6"/>'; });
    s += '<polygon points="' + str(p.map(function (q) { return P(q[0], q[1], h); })) + '" fill="#F4F0E6" stroke="#CFC8B7" stroke-width=".8"/>';
  });
  var dst = state.dest && byId(state.dest);
  if (dst && state.me) {
    var rt = findRoute(state.me, dst);
    if (rt) {
      var rp = str(rt.map(function (p) { return P(p[0], p[1], 1.5); }));
      s += '<polyline points="' + rp + '" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity=".85"/>';
      s += '<polyline points="' + rp + '" fill="none" stroke="#1A73E8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    }
  }
  ITEMS.forEach(function (i) {
    var cls = 'it ' + i.kind + (state.sel === i.id ? ' sel' : '') + (state.dest === i.id ? ' dst' : '');
    if (i.kind === 'b') {
      var q = P(i.x, i.y, heightAt(i.x, i.y) + 1), fs = i.w < 14 || i.id.length > 2 ? 6.5 : 8.5;
      var t = '<text x="' + q[0].toFixed(1) + '" y="' + (q[1] + 3).toFixed(1) + '" font-size="' + fs + '" font-weight="700" text-anchor="middle" fill="#3C4043" stroke="#fff" stroke-width="2.2" paint-order="stroke">' + i.id + '</text>';
      s += interactive ? '<g class="' + cls + '" data-id="' + i.id + '"><circle class="hx" cx="' + q[0].toFixed(1) + '" cy="' + (q[1] - 2).toFixed(1) + '" r="' + (fs + 7) + '"/>' + t + '</g>' : t;
    } else {
      var g0 = P(i.x, i.y, 0), t2 = P(i.x, i.y, 13 + heightAt(i.x, i.y));
      var pin = '<line x1="' + g0[0].toFixed(1) + '" y1="' + g0[1].toFixed(1) + '" x2="' + t2[0].toFixed(1) + '" y2="' + t2[1].toFixed(1) + '" stroke="#8A8F94" stroke-width="1"/><circle cx="' + t2[0].toFixed(1) + '" cy="' + t2[1].toFixed(1) + '" r="7" fill="#E8710A" stroke="#fff" stroke-width="1.5"/><text x="' + t2[0].toFixed(1) + '" y="' + (t2[1] + 2.8).toFixed(1) + '" font-size="7.5" font-weight="800" text-anchor="middle" fill="#fff">' + i.id + '</text>';
      s += interactive ? '<g class="' + cls + '" data-id="' + i.id + '"><circle class="hx" cx="' + t2[0].toFixed(1) + '" cy="' + t2[1].toFixed(1) + '" r="12"/>' + pin + '</g>' : pin;
    }
  });
  if (dst) {
    var dq = P(dst.x, dst.y, heightAt(dst.x, dst.y) + 2);
    s += '<circle cx="' + dq[0].toFixed(1) + '" cy="' + dq[1].toFixed(1) + '" r="4.5" fill="#EA4335" stroke="#fff" stroke-width="2" pointer-events="none"/>';
  }
  if (state.me) {
    var m = state.me, g = P(m.x, m.y, 0), top = P(m.x, m.y, heightAt(m.x, m.y) + 18);
    s += '<ellipse class="pulse" cx="' + g[0].toFixed(1) + '" cy="' + g[1].toFixed(1) + '" rx="10" ry="5.8"/>';
    s += '<line x1="' + g[0].toFixed(1) + '" y1="' + g[1].toFixed(1) + '" x2="' + top[0].toFixed(1) + '" y2="' + top[1].toFixed(1) + '" stroke="#1A73E8" stroke-width="2"/>';
    s += '<circle cx="' + top[0].toFixed(1) + '" cy="' + top[1].toFixed(1) + '" r="6" fill="#1A73E8" stroke="#fff" stroke-width="2"/>';
    s += '<rect x="' + (top[0] - 28).toFixed(1) + '" y="' + (top[1] - 24).toFixed(1) + '" width="56" height="14" rx="7" fill="#1A73E8"/><text x="' + top[0].toFixed(1) + '" y="' + (top[1] - 14).toFixed(1) + '" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">You are here</text>';
  }
  return { s: s, vb: vb };
}

/* ---------------- RENDER ---------------- */
function render3D() {
  var r = scene3D(+$('rot').value, false);
  $('homeMap').setAttribute('viewBox', r.vb.join(' '));
  $('homeMap').innerHTML = r.s;
}
function renderFull() {
  var r = scene3D(state.mapRot, true);
  $('fullMap').innerHTML = r.s;
  return r;
}
function fitMap(r) {
  VB0 = (r || scene3D(state.mapRot, true)).vb.slice();
  vb = VB0.slice();
  setView();
}
function mapRot(v) {
  state.mapRot = +v;
  fitMap(renderFull());
}
function render() {
  render3D();
  renderFull();
  $('hereName').textContent = state.me.name;
}

/* ---------------- MAP INTERACTION ---------------- */
function svgPoint(svg, e) {
  var p = svg.createSVGPoint();
  p.x = e.clientX; p.y = e.clientY;
  return p.matrixTransform(svg.getScreenCTM().inverse());
}
/* screen (projected) point -> ground point, so "Set my location" works on the 3D map */
function unproject(sx, sy) {
  var th = state.mapRot * Math.PI / 180, c = Math.cos(th), sn = Math.sin(th), K = .58, cx = 520, cy = 260;
  var a = sx - cx, b = (sy - cy) / K;
  return [cx + a * c + b * sn, cy - a * sn + b * c];
}
function setView() { $('fullMap').setAttribute('viewBox', vb.join(' ')); }
function zoom(f) {
  var cx = vb[0] + vb[2] / 2, cy = vb[1] + vb[3] / 2;
  var w = Math.min(VB0[2], Math.max(120, vb[2] * f)), h = w * VB0[3] / VB0[2];
  vb = [Math.min(VB0[0] + VB0[2] - w, Math.max(VB0[0], cx - w / 2)), Math.min(VB0[1] + VB0[3] - h, Math.max(VB0[1], cy - h / 2)), w, h];
  setView();
}
function resetView() { vb = VB0.slice(); setView(); }

function initMap() {
  var svg = $('fullMap'), sx, sy, v0, down = false;
  svg.addEventListener('pointerdown', function (e) {
    down = true; dragged = false; sx = e.clientX; sy = e.clientY; v0 = vb.slice();
  });
  window.addEventListener('pointermove', function (e) {
    if (!down) return;
    var dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) + Math.abs(dy) > 6) dragged = true;
    if (!dragged || vb[2] >= VB0[2]) return;
    var k = vb[2] / svg.getBoundingClientRect().width;
    vb[0] = Math.min(VB0[0] + VB0[2] - vb[2], Math.max(VB0[0], v0[0] - dx * k));
    vb[1] = Math.min(VB0[1] + VB0[3] - vb[3], Math.max(VB0[1], v0[1] - dy * k));
    setView();
  });
  window.addEventListener('pointerup', function () { down = false; });
  svg.addEventListener('click', function (e) {
    if (dragged) return;
    var g = e.target.closest('.it');
    if (state.picking) {
      var it = g && byId(g.dataset.id);
      if (it) { setMe({ id: it.id, x: it.x, y: it.y, name: it.name + ' (' + it.id + ')' }); return; }
      var p = svgPoint(svg, e), q = unproject(p.x, p.y);
      setMe({ x: Math.round(q[0]), y: Math.round(q[1]), name: 'Pinned spot' });
      return;
    }
    if (g) selectItem(g.dataset.id);
  });
  $('homeMap').addEventListener('click', function () { go('map'); });
  if (GEO) $('gpsBtn').hidden = false;
}

function setMe(m) {
  state.me = m; state.picking = false;
  try { localStorage.setItem('tungo-me', JSON.stringify(m)); } catch (e) {}
  setHint();
  render();
  if (state.sel) showSheet(state.sel);
  toast('Location set: ' + m.name);
}
function startPick() {
  state.picking = true; setHint(); closeSheet();
}
function setHint() {
  var h = $('hint');
  h.className = 'hint' + (state.picking ? ' pick' : '');
  h.textContent = state.picking ? 'Tap the map where you are standing.' : 'Tap a building or facility for details.';
}
function useGPS() {
  if (!navigator.geolocation) return toast('GPS is not available');
  navigator.geolocation.getCurrentPosition(function (p) {
    var fx = (p.coords.longitude - GEO.nwLng) / (GEO.seLng - GEO.nwLng);
    var fy = (p.coords.latitude - GEO.nwLat) / (GEO.seLat - GEO.nwLat);
    if (fx < 0 || fx > 1 || fy < 0 || fy > 1) return toast('You appear to be outside the campus');
    setMe({ x: Math.round(VB0[0] + fx * VB0[2]), y: Math.round(VB0[1] + fy * VB0[3]), name: 'GPS location' });
  }, function () { toast('Could not get your location'); });
}

/* ---------------- DETAILS ---------------- */
function direction(a, b) {
  var dx = b.x - a.x, dy = b.y - a.y;
  if (Math.abs(dx) < 12 && Math.abs(dy) < 12) return 'You are right next to it.';
  var v = Math.abs(dy) > Math.abs(dx) * .4 ? (dy < 0 ? 'top' : 'bottom') : '';
  var h = Math.abs(dx) > Math.abs(dy) * .4 ? (dx < 0 ? 'left' : 'right') : '';
  return 'From ' + a.name + ', head toward the ' + [v, h].filter(Boolean).join('-') + ' of the map.';
}
function selectItem(id) {
  state.sel = id; render(); showSheet(id);
}
function showSheet(id) {
  var i = byId(id);
  $('sBadge').textContent = i.id;
  $('sBadge').style.borderRadius = i.kind === 'f' ? '50%' : '10px';
  $('sName').textContent = i.name;
  $('sMeta').textContent = i.kind === 'b' ? 'Building ' + i.id + ' on the campus directory' : 'Campus facility ' + i.id;
  $('sDir').textContent = direction(state.me, i);
  $('sGo').onclick = function () { state.dest = id; render(); closeSheet(); toast(findRoute(state.me, i) ? 'Route to ' + i.name : 'No walkable path to this spot on the map'); };
  $('sHere').onclick = function () { setMe({ id: i.id, x: i.x, y: i.y, name: i.name + ' (' + i.id + ')' }); };
  $('sheet').hidden = false;
}
function closeSheet() { $('sheet').hidden = true; state.sel = null; render(); }
function clearRoute() { state.dest = null; render(); }

/* ---------------- DIRECTORY ---------------- */
function setKind(k) {
  state.kind = k;
  document.querySelectorAll('#chips button').forEach(function (b) { b.classList.toggle('on', b.dataset.k === k); });
  renderList();
}
function renderList() {
  var q = $('q').value.toLowerCase().trim();
  var r = ITEMS.filter(function (i) {
    return (state.kind === 'all' || i.kind === state.kind) &&
      (!q || i.name.toLowerCase().indexOf(q) > -1 || i.id.toLowerCase() === q);
  });
  $('count').textContent = r.length ? r.length + ' result' + (r.length > 1 ? 's' : '') : 'No match. Try a shorter name, a number, or a letter.';
  $('list').innerHTML = r.map(function (i) {
    return '<div class="item" onclick="openOnMap(\'' + i.id + '\')"><div class="n ' + i.kind + '">' + i.id + '</div><div><b>' + i.name + '</b><small>' + (i.kind === 'b' ? 'Building ' : 'Facility ') + i.id + '</small></div></div>';
  }).join('');
}
function openOnMap(id) { go('map'); resetView(); selectItem(id); }
function goKind(k) { go('dir'); setKind(k); }
function initHome() {
  $('featured').innerHTML = ['20', '10', '14', '1'].map(function (id) {
    var i = byId(id);
    return '<div class="fcard" onclick="openOnMap(\'' + id + '\')"><div class="n">' + i.id + '</div><b>' + i.name + '</b><small>Building ' + i.id + '</small><span>View on map</span></div>';
  }).join('');
}
function heroGo() {
  $('q').value = $('heroQ').value.trim();
  go('dir');
}

/* ---------------- NAV ---------------- */
function go(p) {
  document.querySelectorAll('.page').forEach(function (e) { e.classList.toggle('on', e.id === 'pg-' + p); });
  document.querySelectorAll('nav a').forEach(function (a) { a.classList.toggle('on', a.dataset.p === p); });
  window.scrollTo(0, 0);
  if (p === 'dir') renderList();
  if (p !== 'map') { state.picking = false; setHint(); }
}
function toast(m) {
  var t = $('toast'); t.textContent = m; t.classList.add('on');
  clearTimeout(toast.t); toast.t = setTimeout(function () { t.classList.remove('on'); }, 2400);
}

document.addEventListener('DOMContentLoaded', function () {
  ['logo', 'heroLogo'].forEach(function (id) {
    $(id).innerHTML = '<img src="image/ndmc-logo.png" alt="NDMC seal" onerror="this.parentNode.textContent=\'NDMC\'">';
  });
  initGraph(); initMap(); initHome();
  render();
  fitMap();
  go('home');
});
