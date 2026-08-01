import { getCollection } from 'astro:content';

// ビルド時に静的生成されるJSON。Pages Functions（D1・content collectionに
// 直接アクセスできないランタイム）が no → slug/表示名 を解決するために読む。
// speciesマスタをD1に持たない方針のための橋渡し役。
export async function GET() {
  // symbiont（共生生物）は no フィールドが creature 側と重複する運用のため、
  // category で絞らないと同じ no を持つ2件がヒットし species_id 解決が
  // 曖昧になる（通知対象外でもある）。category: creature のみに限定する
  const all = await getCollection(
    'creatures',
    ({ data }) => data.status === 'published' && data.category === 'creature',
  );

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
