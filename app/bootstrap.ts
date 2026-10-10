// Preserve the approved homepage build independently of archive changes.
// Source: e521db1, the published build immediately before the archive update.
const parameters = new URLSearchParams(window.location.search);
if (parameters.has('entry') || parameters.has('view')) {
  void import('./main');
} else {
  const base = import.meta.env.BASE_URL + 'saved-home/assets/';
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = base + 'index-BYfnTSFn.css';
  document.head.appendChild(stylesheet);
  const homepage = document.createElement('script');
  homepage.type = 'module';
  homepage.src = base + 'index-BIaDdspF.js';
  document.body.appendChild(homepage);
}
