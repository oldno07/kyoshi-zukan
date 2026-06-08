/* ============================================================
   鋸歯生物図鑑 — news.js
   新しい記事を先頭に追加していく
   ============================================================

   type の種類:
     "new"     — 新作フィギュア完成
     "event"   — イベント・即売会出展
     "shop"    — 通販・販売開始
     "info"    — その他お知らせ

   status の種類（eventのみ使用）:
     "upcoming"  — 開催予定
     "ongoing"   — 開催中
     "ended"     — 終了

   ============================================================ */

window.NEWS = [
  {
    id: "008",
    date: "2026-06-03",
    type: "new",
    title: "No.025 ビカクモリ — 発見",
    body: "吊り鉢擬態型個体を発見。",
    image: "images/no_025.png",
    link: "entry.html?no=025",
    linkLabel: "図鑑で見る",
  },
  {
    id: "007",
    date: "2026-05-24",
    type: "new",
    title: "No.024 ビカクウシ — 発見",
    body: "牛型のビカク系個体を発見。",
    image: "images/no_024.png",
    link: "entry.html?no=024",
    linkLabel: "図鑑で見る",
  },
  {
    id: "006",
    date: "2026-05-23",
    type: "new",
    title: "No.023 美角鹿（ビカクシカ） — 発見",
    body: "湿潤森林地帯にて大型個体を確認。角状器官周辺に異常な苔類活性を観測。",
    image: "images/no_023.png",
    link: "entry.html?no=023",
    linkLabel: "図鑑で見る",
  },
  {
    id: "005",
    date: "2026-05-14",
    type: "new",
    title: "No.022 ブーファンハイマンソイデス系統種 — 発見",
    body: "ブーファンハイマンソイデス種の長期休眠行動を観測。現在も活動反応なし。",
    image: "images/no_022.png",
    link: "entry.html?no=022",
    linkLabel: "図鑑で見る",
  },
  {
    id: "004",
    date: "2026-05-13",
    type: "new",
    title: "No.021 グニャキリス — 発見",
    body: "乾燥地帯に生息する塊根型鋸歯生物、グラキリスねこ種「グニャキリス」が発見されましました。丸みを帯びた貯水構造と、根のような四肢が特徴です。命名者は@miyamoto5020様。図鑑エントリーも公開しましたので、ぜひご覧ください。",
    image: "images/no_021.png",
    link: "entry.html?no=021",
    linkLabel: "図鑑で見る",
  },
  {
    id: "003",
    date: "2026-05-13",
    type: "event",
    title: "第３回ガーデンマルシェ 出展",
    body: "愛媛県新居浜市サキュレントプラント様にて開催されるガーデンマルシェに出展します。鋸歯生物の新作を複数展示・販売予定です。",
    image: "images/event/260607.jpg",
    status: "ended",
    venue: "愛媛県新居浜市船木甲 5434-1 サキュレントプラント",
    eventDate: "2026-06-07 / 10:00-15:30",
    booth: "未定",
    link: null,
    linkLabel: null,
  },
  {
    id: "002",
    date: "2026-05-01",
    type: "shop",
    title: "No.001 スニャグルトゥース — 譲渡会",
    body: "スニャグルトゥースの復刻譲渡会を鋸歯生物譲渡局にて開始しました。個体数に限りがありますのでお早めにどうぞ。",
    image: "images/no_001.png",
    link: "https://agavest.stores.jp/items/65c627d48fd8872275cc50db",
    linkLabel: "購入ページへ",
  },
  {
    id: "001",
    date: "2026-04-26",
    type: "event",
    title: "THE PLANTS -Episode9- 出展",
    body: "香川県観音寺市GoriHouse様にて開催されるプランツマーケット（通称ゴリフェス）に出展します。福園藝様との同ブース出店になります。鋸歯生物の新作を複数展示・販売予定です。",
    image: "images/event/260426.jpg",
    status: "ended",
    venue: "香川県観音寺市柞田町甲908 GoriHouseみかわ工務店",
    eventDate: "2026-04-26 / 10:00-16:30",
    booth: "中央エリア",
    link: null,
    linkLabel: null,
  },
];
