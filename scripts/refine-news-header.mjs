import fs from 'node:fs';const p='app/exploration-reference.tsx';let s=fs.readFileSync(p,'utf8');
s=s.replace('<a href="?view=archive">Search the archive ↗</a></header><nav className="dn-news-links" aria-label="Journal destinations">','<nav className="news-compact-nav" aria-label="News navigation"><a href="?view=news">Home</a><a href="#news-stories">Stories</a><a href="#news-evidence">Sources</a><a href="#news-digest">Newsletter</a></nav><a href="?view=archive">Search the archive ↗</a></header><details className="news-filter-drawer"><summary>Search, topics & saved stories</summary><nav className="dn-news-links" aria-label="Journal destinations">');
s=s.replace('<div className="xr-stories">','</details><div className="xr-stories" id="news-stories">');
fs.writeFileSync(p,s);
