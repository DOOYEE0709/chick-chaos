// build/palettes/*.mjs 를 읽어 themes/*.json 을 생성한다.
//   node build/build.mjs
import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), '..');
const template = (await import('./template.mjs')).default;

const palDir = path.join(root, 'build/palettes');
const files = fs.readdirSync(palDir).filter(f => f.endsWith('.mjs')).sort();

const themes = [];
for (const f of files) {
  const p = (await import(url.pathToFileURL(path.join(palDir, f)).href)).default;
  const out = path.join(root, 'themes', `${p.slug}-color-theme.json`);
  fs.writeFileSync(out, JSON.stringify(template(p), null, 2) + '\n');
  themes.push({ label: p.name, uiTheme: p.uiTheme, path: `./themes/${p.slug}-color-theme.json` });
  console.log(`  ${p.name.padEnd(20)} → themes/${p.slug}-color-theme.json`);
}

// package.json 의 contributes.themes 를 팔레트 목록과 동기화
const pkgPath = path.join(root, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.contributes.themes = themes;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log(`\n${themes.length}개 테마 빌드 완료, package.json 동기화됨`);
