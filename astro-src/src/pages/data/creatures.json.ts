import { getCollection } from 'astro:content';

// ビルド時に静的生成されるJSON。Pages Functions（D1・content collectionに
// 直接アクセスできないランタイム）が no → slug/表示名 を解決するために読む。
// speciesマスタをD1に持たない方針のための橋渡し役。
export async function GET() {
  const all = await getCollection('creatures', ({ data }) => data.status === 'published');

  const creatures = all.map((entry) => ({
    no: entry.data.no,
    slug: entry.id.replace(/\/index\.md$/, '').replace(/\.md$/, ''),
    name_jp: entry.data.name_jp,
    name_en: entry.data.name_en,
  }));

  return new Response(JSON.stringify(creatures), {
    headers: { 'content-type': 'application/json' },
  });
}
