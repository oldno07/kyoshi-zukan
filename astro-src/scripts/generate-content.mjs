#!/usr/bin/env node
/**
 * generate-content.mjs
 * entries.js → Astro Content Collections markdown + public/_redirects を一括生成
 *
 * 使い方: node scripts/generate-content.mjs
 *   --force  既存ファイルを上書き（デフォルトはスキップ）
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT       = join(__dirname, '../..');
const CONTENT    = join(__dirname, '../src/content/creatures');
const REDIRECTS  = join(__dirname, '../public/_redirects');
const FORCE      = process.argv.includes('--force');

// ── entries.js を eval（window. グローバルをモック） ──────────────────────
const win = {};
const code = readFileSync(join(ROOT, 'data/entries.js'), 'utf8')
  .replace(/validateDatabase\(\);/, '')
  .replace(/function validateDatabase\(\)/, 'function _disabledValidateDB()');

// eval の中で window を参照できるよう with() ブロックを使う
new Function('window', code)(win);

const MAIN_ENTRIES = win.MAIN_ENTRIES ?? [];

// ── ヘルパー ──────────────────────────────────────────────────────────────
function toSlug(no, en) {
  const s = en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return `${String(no).padStart(3, '0')}-${s}`;
}

function statusLabel(raw) {
  if (!raw) return null;
  return raw.replace(/^●\s*/, '').trim() || null;
}

function normalizeRarity(r) {
  const v = (r ?? 'COMMON').toUpperCase();
  const allowed = ['LEGEND','EPIC','RARE','UNCOMMON','COMMON'];
  return allowed.includes(v) ? v : 'COMMON';
}

function yamlStr(s) {
  if (s == null) return '""';
  return `"${String(s).replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,' ').trim()}"`;
}

function cleanDesc(desc) {
  if (!desc) return '';
  return desc
    .split('\n')
    .map(l => l.trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// ── フロントマター生成 ─────────────────────────────────────────────────────
function buildFrontmatter(e) {
  const no     = String(e.no).padStart(3, '0');
  const hidden = e.hidden === true;
  const ms     = e.missingState && e.missingState !== '' ? e.missingState : null;
  const label  = statusLabel(e.status);
  const rarity = normalizeRarity(e.rarity);

  const gallery = (e.gallery ?? [])
    .filter(g => g.image && g.image.trim())
    .map(g => ({ path: g.image, title: g.title || null, desc: g.description || null }));

  const videos = (e.videos ?? [])
    .filter(v => v.youtubeId)
    .map(v => ({ youtubeId: v.youtubeId, title: v.title || null, observedAt: v.observedAt || null }));

  let fm = `---
no: "${no}"
status: "${hidden ? 'hidden' : 'published'}"
category: "creature"

name_jp: ${yamlStr(e.jp)}
name_en: ${yamlStr(e.en)}
tag: ${yamlStr(e.tag)}
rarity: "${rarity}"

plant: ${e.plant ?? 0}
animal: ${e.animal ?? 0}
danger: ${e.danger ?? 0}

habitat: ${yamlStr(e.habitat ?? '不明')}
size: ${yamlStr(e.size ?? '不明')}
mobility: ${yamlStr(e.mobility ?? '不明')}
`;

  if (label)                                fm += `status_label: ${yamlStr(label)}\n`;
  if (e.statusColor && e.statusColor !== 'var(--g)') fm += `status_color: ${yamlStr(e.statusColor)}\n`;
  if (e.top)                                fm += `top: ${yamlStr(e.top)}\n`;

  fm += `tags: []\nseries: []\nrelated: []\n`;

  if (e.shopUrl && typeof e.shopUrl === 'string' && e.shopUrl.startsWith('http'))
    fm += `shopUrl: ${yamlStr(e.shopUrl)}\n`;

  fm += `soldOut: ${e.soldOut === true}\n`;

  if (e.notes)  fm += `notes: ${yamlStr(e.notes)}\n`;
  if (e.namer)  fm += `namer: ${yamlStr(e.namer)}\n`;

  if (e.abilities?.length)
    fm += `abilities:\n${e.abilities.map(a => `  - ${yamlStr(a)}`).join('\n')}\n`;
  else
    fm += `abilities: []\n`;

  if (ms) fm += `missingState: "${ms}"\n`;

  const imgPath = e.image ? e.image.replace(/^images\//, '') : '';
  fm += `\ncover: "/images/${imgPath}"\n`;

  if (gallery.length) {
    fm += `gallery:\n`;
    for (const g of gallery) {
      fm += `  - path: "/images/${g.path.replace(/^images\//, '')}"\n`;
      if (g.title) fm += `    title: ${yamlStr(g.title)}\n`;
      if (g.desc)  fm += `    desc: ${yamlStr(g.desc)}\n`;
    }
  } else {
    fm += `gallery: []\n`;
  }

  if (videos.length) {
    fm += `videos:\n`;
    for (const v of videos) {
      fm += `  - youtubeId: "${v.youtubeId}"\n`;
      if (v.title)       fm += `    title: ${yamlStr(v.title)}\n`;
      if (v.observedAt)  fm += `    observedAt: "${v.observedAt}"\n`;
    }
  } else {
    fm += `videos: []\n`;
  }

  fm += `---\n`;
  return fm;
}

// ── メイン ────────────────────────────────────────────────────────────────
const slugMap = [];

for (const entry of MAIN_ENTRIES) {
  const no   = String(entry.no).padStart(3, '0');
  const slug = toSlug(no, entry.en);
  slugMap.push({ no, slug });

  const dir  = join(CONTENT, slug);
  const file = join(dir, 'index.md');

  if (!FORCE && existsSync(file)) {
    console.log(`  skip (exists): ${slug}`);
    continue;
  }

  mkdirSync(dir, { recursive: true });
  const fm   = buildFrontmatter(entry);
  const body = cleanDesc(entry.desc);
  writeFileSync(file, fm + '\n' + body + '\n');
  console.log(`  created: ${slug}`);
}

// ── _redirects 生成 ────────────────────────────────────────────────────────
let redirects = `# 鋸歯生物図鑑 — Cloudflare Pages Redirects
# 旧URL (entry.html?no=XXX) → 新URL (/zukan/[slug]/) 301リダイレクト
# フェーズ1必須タスク (要件書9-3) / pelicanworks.site ドメイン移行 (2026-07)
# スクリプト generate-content.mjs で自動生成。手動編集不要。

# 研究所（現状維持）
/land.html  /labo.html  301

`;

for (const { no, slug } of slugMap) {
  redirects += `/entry.html?no=${no}  /zukan/${slug}/  301\n`;
}

redirects += `
# 旧Astro構造 → 新構造（既に公開済みのURLを救済）
/creatures/*  /zukan/:splat  301
/about/       /zukan/about/  301
/news/        /zukan/news/   301
`;

writeFileSync(REDIRECTS, redirects);
console.log(`  generated: public/_redirects (${slugMap.length}件)`);
console.log('Done!');
