#!/usr/bin/env node
/**
 * fill-taxonomy.mjs
 * 各生物のfrontmatter内 tags / series / related を一括設定する
 *
 * 使い方: node scripts/fill-taxonomy.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(__dirname, '../src/content/creatures');

// ── タクソノミーマッピング（no → {tags, series, related}）──────────────────
const TAXONOMY = {
  "001": {
    tags: ["動物優性型", "ネコ型", "アガベ棚", "初期発見種"],
    series: [],
    related: ["002-black-nyanko-blue", "004-nyagabe-titanota", "021-gnyacilius"]
  },
  "002": {
    tags: ["動物優性型", "ネコ型", "アガベ棚"],
    series: [],
    related: ["001-snyaggletooth", "003-red-cat-meezle", "004-nyagabe-titanota"]
  },
  "003": {
    tags: ["動物優性型", "ネコ型"],
    series: [],
    related: ["002-black-nyanko-blue", "017-lions-nyaan"]
  },
  "004": {
    tags: ["動物優性型", "アガベ棚", "植物共生"],
    series: [],
    related: ["001-snyaggletooth", "002-black-nyanko-blue"]
  },
  "005": {
    tags: ["動物優性型", "大型種", "高危険度"],
    series: [],
    related: ["012-green-rhino", "018-goriborg-serrate-beast"]
  },
  "006": {
    tags: ["動物優性型", "禁域種"],
    series: [],
    related: []
  },
  "007": {
    tags: ["動物優性型", "飛行型", "アガベ棚"],
    series: [],
    related: ["001-snyaggletooth", "025-platybat-mosswing"]
  },
  "008": {
    tags: ["動物優性型", "爬虫類型", "アガベ棚"],
    series: [],
    related: ["001-snyaggletooth", "004-nyagabe-titanota"]
  },
  "009": {
    tags: ["動物優性型", "群体種", "フィリグリズリー族"],
    series: ["フィリグリズリー"],
    related: ["010-filigrizzly-devil", "011-filigrizzly-monarch"]
  },
  "010": {
    tags: ["動物優性型", "群体種", "フィリグリズリー族"],
    series: ["フィリグリズリー"],
    related: ["009-filigrizzly", "011-filigrizzly-monarch"]
  },
  "011": {
    tags: ["動物優性型", "群体種", "フィリグリズリー族"],
    series: ["フィリグリズリー"],
    related: ["009-filigrizzly", "010-filigrizzly-devil"]
  },
  "012": {
    tags: ["動物優性型", "大型種"],
    series: [],
    related: ["005-gorillahorrida"]
  },
  "013": {
    tags: ["水棲型", "多肉混合型", "鯨族"],
    series: ["鯨族"],
    related: ["014-kokugei-black-cetus", "015-metal-hakugei-cetus", "016-kingei-golden-cetus", "019-mochi-cetus"]
  },
  "014": {
    tags: ["動物優性型", "水棲型", "鯨族"],
    series: ["鯨族"],
    related: ["013-hakugei-white-cetus", "015-metal-hakugei-cetus", "019-mochi-cetus"]
  },
  "015": {
    tags: ["水棲型", "多肉混合型", "機械融合", "鯨族"],
    series: ["鯨族"],
    related: ["013-hakugei-white-cetus", "014-kokugei-black-cetus", "016-kingei-golden-cetus"]
  },
  "016": {
    tags: ["水棲型", "多肉混合型", "鯨族"],
    series: ["鯨族"],
    related: ["013-hakugei-white-cetus", "015-metal-hakugei-cetus"]
  },
  "017": {
    tags: ["動物優性型", "ネコ型", "草原種"],
    series: [],
    related: ["002-black-nyanko-blue", "003-red-cat-meezle"]
  },
  "018": {
    tags: ["機械融合型", "高危険度"],
    series: [],
    related: ["005-gorillahorrida"]
  },
  "019": {
    tags: ["水棲型", "多肉混合型", "鯨族"],
    series: ["鯨族"],
    related: ["013-hakugei-white-cetus", "014-kokugei-black-cetus"]
  },
  "020": {
    tags: ["多肉植物型", "乾燥地帯"],
    series: [],
    related: ["021-gnyacilius"]
  },
  "021": {
    tags: ["多肉植物型", "塊根植物", "ネコ型", "乾燥地帯"],
    series: [],
    related: ["020-graci-ris", "001-snyaggletooth"]
  },
  "023": {
    tags: ["動物優性型", "森林種", "ビカク族"],
    series: ["ビカク族"],
    related: ["024-bicacu-cow", "025-platybat-mosswing"]
  },
  "024": {
    tags: ["動物優性型", "森林種", "ビカク族"],
    series: ["ビカク族"],
    related: ["023-beautiful-horn-deer", "025-platybat-mosswing"]
  },
  "025": {
    tags: ["植物優性型", "飛行型", "ビカク族"],
    series: ["ビカク族"],
    related: ["023-beautiful-horn-deer", "024-bicacu-cow"]
  }
};

// ── YAML配列文字列生成 ──────────────────────────────────────────────────────
function toYamlArray(arr) {
  if (!arr || arr.length === 0) return '[]';
  const items = arr.map(s => `"${s}"`).join(', ');
  return `[${items}]`;
}

// ── フロントマター内の tags/series/related を置換 ──────────────────────────
function replaceTaxonomy(content, tax) {
  return content
    .replace(/^tags:.*$/m, `tags: ${toYamlArray(tax.tags)}`)
    .replace(/^series:.*$/m, `series: ${toYamlArray(tax.series)}`)
    .replace(/^related:.*$/m, `related: ${toYamlArray(tax.related)}`);
}

// ── メイン ────────────────────────────────────────────────────────────────
const dirs = readdirSync(CONTENT, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

for (const dir of dirs) {
  // no を先頭3桁から取得
  const no = dir.slice(0, 3);
  const tax = TAXONOMY[no];

  if (!tax) {
    console.log(`  skip (no mapping): ${dir}`);
    continue;
  }

  const file = join(CONTENT, dir, 'index.md');
  const content = readFileSync(file, 'utf8');
  const updated = replaceTaxonomy(content, tax);

  if (updated === content) {
    console.log(`  unchanged: ${dir}`);
    continue;
  }

  writeFileSync(file, updated);
  console.log(`  updated: ${dir}`);
}

console.log('Done!');
