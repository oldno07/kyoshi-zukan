// ============================================================
// SAWTOOTH CREATURE OBSERVATION DATABASE
// Research Institution Record System
// ============================================================

/*
【エントリーデータの使い方】

各エントリーオブジェクトには以下のプロパティを設定します：

【基本情報】
- no: エントリー番号（文字列、例: "001"）
- sort: ソート用数値（表示順序）
- createdAt: 作成日（YYYY-MM-DD）
- firstObserved: 初回観測日（YYYY-MM-DD）

【分類システム】
- species: 種名（英語）
- lineage: 系統（例: "BEAST-DOMINANT", "PLANT-DOMINANT"）
- dangerClass: 危険度クラス（例: "OBSERVE", "CAUTION", "DANGER"）
- classification: 分類（例: "SAFE", "FORBIDDEN"）

【生物ステータス（0-100）】
- plant: 植物性（0-100）
- animal: 動物性（0-100）
- danger: 危険度（0-100）

【表示情報】
- tag: タグ（例: "BEAST-DOMINANT-動物優性型"）
- jp: 日本語名
- en: 英語名
- rarity: レアリティ（"LEGEND", "EPIC", "RARE", "UNCOMMON", "COMMON"）
- rarityClass: レアリティCSSクラス（"rar-l", "rar-e", "rar-r", "rar-uc", "rar-c"）

【詳細情報】
- notes: 研究者メモ
- namer: 命名研究員（例: "@aga.vest"）
- desc: 詳細説明
- abilities: 特殊能力の配列（例: ["シャドーステイシス", "ねむりうごき"]）
- habitat: 生息地
- size: サイズ
- mobility: 機動性
- status: ステータス（例: "● ACTIVE"）
- statusColor: ステータスの色（CSSカラーコード）

【ショップ情報】
- shopUrl: ショップURL
- price: 価格
- soldOut: 完売フラグ（true/false）
- variants: バリエーション配列（個体バリエーションがある場合）

【画像】
- image: 画像パス（例: "images/no_001.png"）

【観測動画】
- videos: 観測動画配列（YouTube埋め込み用）
  - youtubeId: YouTube動画ID（例: "dQw4w9WgXcQ"）
  - title: 動画タイトル（観測ログ形式）
  - observedAt: 観測日時（YYYY-MM-DD）
  - duration: 動画長（秒数、例: 60）

【欠損データ設定（ワールドビルディング用）】
- missingState: 欠損状態を設定すると、以下の効果が自動適用されます：
  * "DATA_LOST": データ消失状態、"DATA LOST"バッジ表示
  * "ACCESS_DENIED": アクス拒否状態、"ACCESS DENIED"バッジ表示（赤色パルス）
  * "REDACTED": 機密解除状態、"REDACTED"バッジ表示
  * "SIGNAL_LOST": シグナル消失状態、"SIGNAL LOST"バッジ表示

欠損状態を設定すると：
- 画像がシルエット表示になり、"NO VISUAL DATA"と表示
- 生息地、サイズ、機動性フィールドに"██████"が表示
- 日本語名が"——"、英語名が"UNKNOWN ENTITY"に変更
- 欠損状態バッジが表示
- 対応するCSSクラスが自動追加（例: missing-data-lost）

【使用例】
{
  no: "050",
  sort: 50,
  createdAt: "2024-01-15",
  plant: false,
  animal: true,
  danger: 5,
  rarity: "LEGEND",
  rarityClass: "rar-l",
  classification: "FORBIDDEN",
  // 欠損状態を設定
  missingState: "ACCESS_DENIED"
}
*/

// Main catalog entries (001-999)
window.MAIN_ENTRIES = [
  {
    // Basic identification
    no: "001",
    sort: 10,
    createdAt: "2026-05-13",
    firstObserved: "2026-05-13",

    // Classification system
    species: "Snyaggletooth",
    lineage: "BEAST-DOMINANT",
    dangerClass: "OBSERVE",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 30,
    animal: 78,
    danger: 35,

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "スニャグルトゥース",
    en: "Snyaggletooth",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Detailed description
    notes:
      "こんな動物を見るのは初めてだ。いや、植物のようでもある。どういった生命体なのだろうか、随時記録していきたいと思う。アガベスト",

    desc: `
    深林域において確認された鋸歯ネコ型生物。

    本個体は典型的な捕食性外観を有するが、活動時間の大半は休眠状態にあり、
    実際の運動性および捕食行動頻度は極めて低い。

    鋸歯配列には個体差が顕著であり、ランダム性は認められず、
    幾何学的整列または美的秩序に基づく配置である可能性が高い。
    当該構造は防御機能ではなく、個体識別または種内シグナル伝達に関与していると推定される。
  `,

    // Abilities and traits
    abilities: ["シャドーステイシス", "ねむりうごき"],

    // Habitat and physical traits
    habitat: "深林",
    size: "166mm",
    mobility: "緩慢",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Variants
    variants: [
      {
        id: "001-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_001_a.png",
        shopUrl: "https://agavest.stores.jp/items/65c627d48fd8872275cc50db",
        price: "",
        soldOut: false,
      },
      {
        id: "001-b",
        label: "寝そべり種",
        labelEn: "Sitting Type",
        image: "images/no_001_b.png",
        shopUrl: "https://agavest.stores.jp/items/65c627d48fd8872275cc50db",
        price: "",
        soldOut: false,
      },
      {
        id: "001-c",
        label: "招き猫種",
        labelEn: "Maneki Type",
        image: "images/no_001_c.png",
        shopUrl: "https://agavest.stores.jp/items/65c627d48fd8872275cc50db",
        price: "",
        soldOut: false,
      },
    ],

    // Image
    image: "images/no_001.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "成長段階：幼体",
        titleEn: "Growth Stage: Juvenile",
        description: "孵化後3ヶ月の個体",
      },
      {
        image: "",
        title: "成長段階：成体",
        titleEn: "Growth Stage: Adult",
        description: "成熟期の個体",
      },
      {
        image: "",
        title: "生息環境",
        titleEn: "Habitat",
        description: "深林域での観察記録",
      },
    ],

    // Observation Videos
    videos: [
      {
        youtubeId: "R_BYUPtk_lE",
        title: "Unknown Species Detected Near Prestera Habitat",
        observedAt: "2026-05-23",
        duration: 60,
      },
    ],
  },

  {
    no: "002",
    sort: 20,
    createdAt: "2026-05-13",
    plant: 10,
    animal: 85,
    danger: 20,
    notes:
      "植物と動物の特性を併せ持つ、非常に興味深い生命体のようだ。サンプルを捕獲しようとしたら向こうから擦り寄ってきた。今後の研究が楽しみだ。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_002.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "ブラックにゃんこブルー",
    en: "Black Nyanko Blue",
    desc: `
    岩場環境に適応した鋸歯ネコ型生物。

本個体は光環境依存性の色素変化を示し、
高照度条件下では尾部鋸歯に黒化現象が確認される。

また、人工栽培環境においては
“プレステラ型支持構造への抱着行動”が高頻度で観測されている。

さらに、外部投与された液体栄養因子に対して一時的な活動性上昇を示すが、
これは恒常的代謝変化ではなく、刺激応答性の反射的現象と考えられる。
  `,
    abilities: ["フォトクロマティクス", "ひかりかんじょう"],
    habitat: "岩場",
    size: "184mm",
    mobility: "夜間活性",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    variants: [
      {
        id: "002-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_002_a.png",
        shopUrl: "",
        price: 5000,
        soldOut: false,
      },
    ],
  },

  {
    no: "003",
    sort: 30,
    createdAt: "2026-05-13",
    plant: 20,
    animal: 80,
    danger: 25,
    notes:
      "少しわかったことがある。この生き物はストレスを感じると赤くなるようだ。何にストレスを感じるのか、引き続き観察していきたい。アガベスト",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    image: "images/no_003.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "レッドキャットミーズル",
    en: "Red Cat meezle",
    desc: `
    スポットライト環境下において顕著な色彩変化を示す鋸歯ネコ型生物。

    通常時は低彩度の体色を維持するが、
    環境ストレス（光量変動・乾燥・外的刺激）に対し、
    体表色素が急激に赤色へ遷移することが確認されている。

    当該変化は防御反応というよりも、
    環境情報の視覚的出力機構として機能している可能性が高い。
  `,
    abilities: ["ストレスカラーシフト", "あかいろはんのう"],
    habitat: "スポットライト直下",
    size: "144mm",
    mobility: "夜間活性",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    variants: [
      {
        id: "003-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_003_a.png",
        shopUrl: "",
        price: 5000,
        soldOut: false,
      },
    ],
  },
  {
    no: "004",
    sort: 40,
    createdAt: "2026-05-13",
    plant: 40,
    animal: 70,
    danger: 15,
    notes:
      "植物の特性を持ちながら、動物的な行動も示す、非常に興味深い生き物だ。私はこの生物群のことを「鋸歯生物」と呼称することにした。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_004.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "にゃガベ チタノタ",
    en: "NyAgabe titanota",
    desc: `
    鋸歯生物群における広域分布型基礎個体。

    本種は特定環境への特化適応を示さず、
    森林・乾燥地・人工環境においても安定した生存が確認されている。

    形態変化よりも恒常性維持に適応資源を配分する戦略を持つと推定され、
    環境変動に対して構造的安定性を維持する能力が特徴である。
  `,
    abilities: ["エコシステムアダプト", "かんきょうてきおう"],
    habitat: "森林",
    size: "172mm",
    mobility: "夜間活性",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    variants: [
      {
        id: "004-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_004_a.png",
        shopUrl: "",
        price: 5000,
        soldOut: false,
      },
      {
        id: "004-b",
        label: "デブネコ種",
        labelEn: "Debu-Neko Type",
        image: "images/no_004_b.png",
        shopUrl: "",
        price: 5000,
        soldOut: false,
      },
    ],
  },

  {
    no: "005",
    sort: 50,
    createdAt: "2026-05-13",
    plant: 25,
    animal: 90,
    danger: 60,
    notes:
      "驚いた。ネコ型生物以外にも、ゴリラのような個体を密林の奥深くで発見した。どのような進化を遂げてきたのだろうか。頭部に見えるのはホリダの葉っぱのように見える。アガベスト",
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_005.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "ゴリラホリダ",
    en: "Gorillahorrida",
    desc: `
    密林深部に生息する大型鋸歯生物。

    本個体は高重量構造および後頭部鋸歯葉の発達により、
    防御性能と引き換えに機動性が制限される形態を持つ。

    葉状構造は単なる物理防御器官ではなく、
    微細な角度変化を通じて個体状態を外部へ伝達する機能を持つ可能性がある。
    当該機構は非言語的な生理シグナル伝達系として分類される。
  `,
    abilities: ["マッスルビルダー", "おもみしずめ"],
    habitat: "密林深部",
    size: "2.4m",
    mobility: "重量型",
    status: "● STABLE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "006",
    sort: 60,
    createdAt: "2026-05-13",
    plant: 15,
    animal: 95,
    danger: 90,
    notes: "めちゃくちゃキンタマがでかい。アガベスト",

    rarity: "LEGEND",
    rarityClass: "rar-l",
    image: "images/no_006.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "キンタ魔丸",
    en: "GoldenBall Magan",
    desc: `
      めちゃくちゃキンタマがでかい悪魔。<br>
      めちゃくちゃキンタマがデカい。
    `,
    // namer: "@craft_seventy",
    abilities: ["オーバーリバランス", "りょくばくぞうふく"],
    habitat: "禁域森林",
    size: "4.1m",
    mobility: "群体統率",
    status: "● MONARCH",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "007",
    sort: 70,
    createdAt: "2026-05-13",
    plant: 10,
    animal: 60,
    danger: 0,
    notes:
      "空を飛ぶネコ型生物を発見した。空中適応のためか、体表が空色スペクトルを強く呈している。にゃんだほー。アガベスト",
    rarity: "uncommon",
    rarityClass: "rar-uc",
    image: "images/no_007.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "スカイブルーニャンダホー",
    en: "Sky Blue Nyanda Ho",
    desc: `
          BB系統の空中適応亜種として分類される、
      領空域鋸歯ネコ型生物。  

      上昇気流と高湿度環境を利用し、
      長時間の浮遊行動を維持する能力を持つ。  
      浮遊時には体表が空色へ変化し、
      周囲の気流を微細振動させる音響現象が確認されている。  

      また人工環境下では、
      プレステラ型基底環境への
      “着地保持行動”が観測されることがあり、
      これは休息時の重力再同期プロセスと考えられている。  
  `,
    namer: "@fukuboo",
    abilities: ["エアロバランサー", "かぜのり"],
    habitat: "領空",
    size: "160mm",
    mobility: "高速飛行",
    status: "● MONARCH",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    missingState: "SIGNAL_LOST",
  },

  {
    no: "008",
    sort: 80,
    createdAt: "2026-05-13",
    plant: 70,
    animal: 85,
    danger: 35,
    notes:
      "草を食べるトカゲのような生き物を発見した。体表が葉っぱのような質感をしている。爬虫類までもが植物の特性を兼ね備えている。アガベスト",
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_008.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "アガベカブトトカゲ",
    en: "Agave Kabutotokage",
    desc: `
草原〜湿潤境界帯にて確認された、
  トカゲ型鋸歯生物。  

  全身は鱗片とアガベ由来の硬質繊維によって
  装甲化しており、
  特に頭部には甲冑状の拡張プレートを形成する。  

  外敵接触時には、
  頭部周辺が赤色へ変化する防御反射を示し、
  危険察知後は周囲の植物へ同化するような
  擬態行動を行う。  

  「防御と静止」を基本戦略とする、
  極めて省エネルギーな鋸歯生物として分類される。

`,
    abilities: ["リーフアーマーフュージョン", "しょくぶつどうか"],
    habitat: "草原",
    size: "248mm",
    mobility: "俊敏",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "009",
    sort: 90,
    createdAt: "2026-05-13",
    plant: 35,
    animal: 80,
    danger: 30,
    // namer: "@craft_seventy",
    notes:
      "クマがいると思い逃げようとしたが、どうやらこれも鋸歯生物の一種のようだ。クマのような見た目をしているが、常に二足歩行をし、集団生活をおこなっている。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_009.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリー",
    en: "Filigrizzly",
    desc: `
       群れで行動する社会性鋸歯生物。  

  幼体から青年期にかけては
  「フォリグリズリー」と呼ばれ、
  集団内で順位を形成しながら成長する。  

  群れ内部では鋸歯の大きさよりも、
  威圧感を伴う立ち姿が重視される傾向があり、
  個体同士は独特の姿勢によって
  優劣を示すことが確認されている。  

  また、成熟個体は肩部鋸歯を展開したまま
  長時間静止する習性を持ち、
  これは縄張り誇示と群体内通信を兼ねた
  行動である可能性が示唆されている。
    `,
    abilities: ["スウォームコンダクト", "なかまよび"],
    habitat: "針葉密林",
    size: "1.8m",
    mobility: "群行型",
    status: "● STABLE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "010",
    sort: 100,
    createdAt: "2026-05-13",
    plant: 20,
    animal: 95,
    danger: 85,
    notes: "",
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_010.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリーデビル",
    en: "Filigrizzly Devil",
    notes:
      "群れから異様な視線を感じ、振り返ると背中に“顔”を持つ個体がこちらを見ていた。どうやら別個体を取り込みながら成長するらしい。観察中、背部の顔同士が同時に瞬きを行う現象を確認した。なにこれ怖い。アガベスト",

    desc: `
   群体競争環境下において発生した、
  フィリグリズリー系統の変異鋸歯個体。  

  本種は縄張り争いに敗北した個体を
  自身の体表へ吸収・固定化する性質を持ち、
  背部には複数の顔状器官を形成する。  

  当該構造では微弱な視線反応や表情変化が確認されており、
  一部神経機能が維持されている可能性が示唆されている。  

  また、背部顔面数の多い個体ほど
  群れ内部で高位階級に属する傾向があり、
  威圧および繁殖誇示器官として機能していると考えられている。
`,
    abilities: ["ハイパーインシデント", "きょうかかいろ"],
    habitat: "争域地帯",
    size: "2.7m",
    mobility: "重装型",
    status: "● AGITATED",
    statusColor: "#d65a5a",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "011",
    sort: 110,
    createdAt: "2026-05-13",
    plant: 15,
    animal: 95,
    danger: 95,
    notes:
      "森全体が静まり返った直後、巨大な個体が姿を現した。周囲にいたフィリグリズリー群は、一斉に頭を垂れ、その後完全に行動を同期させた。この個体だけは明らかに“王”として扱われている。私は本能的な危険を感じ、その場を離れた。アガベスト",
    rarity: "EPIC",
    rarityClass: "rar-e",
    image: "images/no_011.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリーモナーク",
    en: "Filigrizzly Monarch",
    desc: `
  フィリグリズリー群の頂点に立つ、
  極めて希少な王個体。  

  頭部には圓葉拇指に酷似した
  王冠状鋸歯器官を形成しており、
  群体へ行動同期信号を送っている可能性が示唆されている。  

  本個体が移動を開始すると、
  周辺群体も同時に行動を開始する傾向が確認されており、
  周囲の生態系へ大規模な影響を及ぼす。  

  また、モナーク周辺では
  群れ内部抗争が著しく減少することから、
  高位個体特有の支配行動を持つと考えられている。
  `,
    abilities: ["コロニーオーバーライド", "しはいどうちょう"],
    habitat: "禁域森林",
    size: "4.1m",
    mobility: "群体統率",
    status: "● MONARCH",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    missingState: "DATA_LOST", // 欠損状態を設定
  },

  {
    no: "012",
    sort: 120,
    createdAt: "2026-05-14",
    plant: 60,
    animal: 85,
    danger: 30,
    notes:
      "遠目には巨大な岩のように見えたが、近づくとゆっくりと草原を移動していた。周囲の植物群だけが妙に活性化していることから、この個体は単独ではなく、生態系そのものへ影響を与えている可能性がある。アガベスト",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    image: "images/no_012.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "緑犀牛",
    en: "Green Rhino",
    desc: `
  草原地帯にて確認された大型鋸歯生物。  

  外皮は葉緑様構造を含む特殊組織で構成されており、
  高照度環境下では体表が淡い緑色を呈する。  

  頭部の単一鋸歯器官は、
  攻撃用途ではなく地中根系を掘り起こす
  探索器官として機能している可能性が高い。  

  また、本種周辺では植物群落の活性化傾向が確認されており、
  群落全体を保護する
  “移動型生態層”として機能している可能性が示唆されている。
`,
    abilities: ["クロロコンダクター", "どしょくれんどう"],
    habitat: "草原地帯",
    size: "2.1m",
    mobility: "重量型",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "013",
    sort: 130,
    createdAt: "2026-05-13",
    plant: 20,
    animal: 95,
    danger: 80,
    notes:
      "海面が不自然に盛り上がった直後、巨大な白色個体が深海から浮上した。噴出された水流には葉のような鋸歯構造が混在しており、周囲の海流までも変化していた。私はあれを“生物”と呼んでいいのか未だに判断できない。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_013.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "白鯨",
    en: "Hakugei White Cetus",
    desc: `
  深海域において確認される、
  植物融合型の巨大鋸歯生物。  

  頭頂部の噴水状器官からは、
  微細な鋸歯葉片を含む水流が放出され、
  周囲水圧と干渉しながら拡散する性質を持つ。  

  これらの葉状構造は防御だけでなく、
  浮上・潜行時の推進制御にも関与している可能性が高い。  

  また、本個体通過後には
  局所的な海流変化が確認されており、
  水圧そのものを操作する
  生体構造を持つ可能性が示唆されている。
`,
    abilities: ["ハイドロモジュレーター", "すいあつばいそう"],
    habitat: "深海域",
    size: "18m+",
    mobility: "浮遊型",
    status: "● MYTHIC",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "014",
    sort: 140,
    createdAt: "2026-05-14",
    plant: 25,
    animal: 90,
    danger: 75,
    notes:
      "黒い潮煙のようなものが海面から立ち上がった直後、巨大な個体が浮上した。周囲の小型鋸歯生物群は逃げるどころか、その周辺へ集まり始めた。どうやらこの個体自体が“環境”として機能しているらしい。アガベスト",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    image: "images/no_014.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "黒鯨",
    en: "Kokugei Black Cetus",
    desc: `
  深海域にて確認される、
  鯨型鋸歯生物。  

  呼吸孔周辺にはアガベ葉片に酷似した
  多層濾過器官を形成しており、
  呼吸時には霧状の鉱物粒子を放出する。  

  当該器官は海水中の成分濃度を調整しながら、
  周囲水流へ干渉する性質を持つ可能性が高い。  

  また、本個体通過後には
  小型鋸歯生物群の一時的群集形成が確認されており、
  “移動する深海環境”として機能している可能性が示唆されている。
`,
    abilities: ["ディープシンクアダプト", "しんかいどうか"],
    habitat: "深海域",
    size: "18m級",
    mobility: "遊泳型",
    status: "● MONITOR",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },
  {
    no: "015",
    sort: 150,
    createdAt: "2026-05-14",
    plant: 5,
    animal: 90,
    danger: 56,
    notes:
      "海底調査区域に金属片のような反応が広範囲で検出された直後、白鯨に酷似した巨大個体が確認された。噴出された水流は岩盤そのものを削り取り、周囲地形を変形させていた。あれは生物というより“装置”に近い。アガベスト",
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_015.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "メタル白鯨",
    en: "Metal Hakugei Cetus",
    desc: `
  深海極圧環境下にて確認された、
  白鯨系統の機械化変異個体。  

  外殻は金属質鉱物層を含む
  生体メタル構造へ変化しており、
  葉状鋸歯も鋭利な金属葉片へ置換されている。  

  頭頂部器官からは鉱物粒子を含む
  高圧噴流が放出され、
  周囲地形を削り取りながら移動する性質を持つ。  

  また、本個体通過後には
  海底鉱物層の再形成が確認されており、
  “環境改変型鋸歯生物”として分類されている。
`,
    abilities: ["メタルバイオシフト", "まてりあるへんか"],
    habitat: "深海域",
    size: "18m+",
    mobility: "浮遊型",
    status: "● MONARCH",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "016",
    sort: 160,
    createdAt: "2026-05-14",
    plant: 10,
    animal: 90,
    danger: 70,
    notes:
      "暗い深海の中で、海そのものが発光しているように見えた。光源は巨大な金色個体だった。通過後の海域では鉱物粒子が帯状に沈殿しており、まるで海底へ“黄金の川”が形成されたようだった。アガベスト",
    rarity: "LEGEND",
    rarityClass: "rar-l",
    image: "images/no_016.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "金鯨",
    en: "Kingei Golden Cetus",
    desc: `
  深海熱水域にて確認された、
  白鯨系統の高金属化変異個体。  

  外皮には金属光沢粒子が密集しており、
  周囲光環境に応じて
  金色から琥珀色へ反射色を変化させる。  

  頭頂部器官からは
  希少金属成分を含む微細噴流が放出され、
  周辺海域の鉱物濃度を安定化させる性質を持つ。  

  また、本個体通過後には
  発光性沈殿層の形成が確認されており、
  深海生態系における
  神話的存在として扱われている。
`,
    abilities: ["オーロラミネラルフロー", "こうたくばいぞう"],
    habitat: "深海域",
    size: "18m+",
    mobility: "浮遊型",
    status: "● STABLE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "017",
    sort: 170,
    createdAt: "2026-05-14",
    plant: 55,
    animal: 75,
    danger: 35,
    notes:
      "草原でこちらを見つめる小型個体を確認した。ライオンのような鬣を持つが、近づいて観察すると葉そのものだった。風が吹くたびに葉同士が微かに共鳴しており、周囲の植物群も同調するように揺れていた。アガベスト",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    image: "images/no_017.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "BEAST-DOMINANT",
    jp: "ライオンズニャーン",
    en: "Lions Nyaan",
    desc: `
  草原地帯にて確認された、
  鋸歯ネコ系統の個体。  

  頭部周辺には放射状の
  アガベ状鋸歯葉群を形成しており、
  外見的にはライオンの鬣に酷似する。  

  当該葉群は防御構造ではなく、
  気流・光量・外敵接近を感知する
  環境感知器官として機能している可能性が高い。  

  また、強風環境下では
  葉片同士が共鳴振動を起こし、
  周囲植物群へ影響を与える現象が確認されている。
`,
    abilities: ["センサリーフラクタル", "ひかりきょうかん"],
    habitat: "草原地帯",
    size: "170mm",
    mobility: "緩慢",
    status: "● ACTIVE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "018",
    sort: 180,
    createdAt: "2026-05-14",
    plant: 30,
    animal: 85,
    danger: 70,
    notes:
      "廃棄区域で金属音を伴う大型個体を確認した。動きは機械のように正確だったが、こちらを視認した直後だけ数秒間停止した。あの挙動には“迷い”のようなものを感じた。アガベスト",
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_018.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "MECHA-BEAST-JOINT",
    jp: "鋸歯機獣ゴリボーグ",
    en: "Goriborg Serrate Beast",
    desc: `
  草原〜廃棄境界帯にて確認された、
  機械融合型鋸歯生物。  

  全身は生体組織と金属フレームによって構成されており、
  表面には多数の接合痕と
  用途不明の固定構造が確認されている。  

  下顎部には巨大なアガベ葉片状装甲を形成しており、
  生体器官か人工構造かは現在も判別されていない。  

  また、行動は機械的で規則性が高い一方、
  稀に観察対象を注視したまま停止する挙動が確認されており、
  意思残留体の可能性が示唆されている。
`,
    abilities: ["メカノイドレジスト", "かんせいざんぞう"],
    habitat: "境界地帯",
    size: "2.6m",
    mobility: "機械歩行型",
    status: "● MONITOR",
    statusColor: "#e0b94f",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "019",
    sort: 190,
    createdAt: "2026-05-14",
    plant: 25,
    animal: 88,
    danger: 20,
    notes:
      "海面に浮かぶ白い物体を岩礁だと思っていたが、触れた瞬間に大きく沈み込み、そのまま弾むように遊泳を開始した。想像以上に柔らかい。群れ同士が反発波で会話しているようにも見える。アガベスト",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    image: "images/no_019.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "もち鯨",
    en: "Mochi Cetus",
    desc: `
  沿岸域にて群れで確認される、
  鯨型鋸歯生物。  

  外皮は高密度の弾性生体組織によって構成されており、
  強い粘性と反発力を併せ持つ
  “餅状反応”を示す。  

  個体ごとの色彩変異が顕著であり、
  周辺環境に応じて体色が変化する傾向が確認されている。  

  また、外敵接近時には
  全身を急激に膨張させ、
  水中へ反発波を発生させる防御行動を行う。
`,
    abilities: ["エラスティックフォーム", "はんぱつしんどう"],
    habitat: "沿岸域",
    size: "12m〜18m",
    mobility: "遊泳型",
    status: "● STABLE",
    statusColor: "var(--g)",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    variants: [
      {
        id: "019-a",
        label: "さくら種",
        labelEn: "Sakura Type",
        image: "images/no_019_a.png",
        shopUrl: "",
        price: "",
        soldOut: false,
      },
      {
        id: "019-b",
        label: "もち種",
        labelEn: "Mochi Type",
        image: "images/no_019_b.png",
        shopUrl: "",
        price: "",
        soldOut: false,
      },
      {
        id: "019-c",
        label: "よもぎ種",
        labelEn: "Yomogi Type",
        image: "images/no_019_c.png",
        shopUrl: "",
        price: "",
        soldOut: false,
      },
    ],
  },

  {
    no: "020",
    sort: 200,
    createdAt: "2026-05-14",
    plant: 70,
    animal: 60,
    danger: 10,
    notes:
      "乾燥地帯で発見した小型個体。動きは極めて緩慢だが、水分を与えた直後だけ明確に活動量が増加した。塊根部分には想像以上の貯水能力があるらしく、環境変化そのものを蓄積しているようにも見える。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_020.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "SUCCULENT-TYPE",
    jp: "グラキりす",
    en: "Graci Ris",
    desc: `
  乾燥地帯に広域分布する、
  塊根型鋸歯生物。  

  本種は高い貯水能力を持つ塊根構造を形成しており、
  頬袋状器官へ水分を蓄積することで、
  長期乾燥環境下でも活動を維持する。  

  人工環境下では、
  プレステラ型基底環境へ固定化する行動が確認されており、
  根圧安定化を目的とした適応行動と考えられている。  

  また、湿潤周期によって
  成長速度が大きく変動する特徴を持つ。
`,
    abilities: ["デザートストレージコア", "みずほぞん"],
    habitat: "乾燥地帯",
    size: "212mm",
    mobility: "緩慢",
    status: "● THIRSTY",
    statusColor: "#d6b85a",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
  },

  {
    no: "021",
    sort: 210,
    createdAt: "2026-05-17",
    plant: 75,
    animal: 20,
    danger: 15,
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_021.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "SUCCULENT-TYPE",
    jp: "グニャキリス",
    en: "Gnyacilius",
    desc: `
  乾燥地帯に生息する、
  ネコ型塊根鋸歯生物。  

  丸みを帯びた塊根構造には高い貯水能力があり、
  長期乾燥環境下でも
  活動を維持できる特性を持つ。  

  水分不足が進行すると、
  体表組織は急速に軟化し、
  攻撃性および機嫌変動が顕著に増加する傾向を示す。  

  また、四肢および尾部に見える器官は歩行肢ではなく、
  水分吸収を担う根系構造である可能性が示唆されている。
`,
    abilities: ["塊根弾性変形", "水分依存機嫌変動"],
    namer: "@miyamoyo0520",
    notes:
      "見た目は完全にネコだが、触れると塊根植物に近い弾力を持っていた。水分状態によって機嫌が極端に変化するらしく、水切れ直前には明確な威嚇反応を示した。アガベスト ",
    habitat: "乾燥地帯",
    size: "112mm",
    mobility: "緩慢",
    status: "● THIRSTY",
    statusColor: "#d6b85a",
    shopUrl: "",
    price: "2500",
    soldOut: false, // 完売時は true に変えるだけ
  },
  {
    no: "022",
    sort: 220,
    hidden: true, //
    createdAt: "2026-05-19",
    plant: 92,
    animal: 65,
    danger: 18,
    rarity: "RARE",
    rarityClass: "rar-r",
    image: "images/no_022.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],

    tag: "beast-dominant",

    jp: "ブーファメ（仮）",
    en: "Boophame",
    desc: `
  乾燥岩場地帯にて確認された、
  亀型塊根鋸歯生物。  

  背部にはブーファン系統に酷似した
  放射状葉構造が形成されており、
  通常の甲羅とは異なる
  “生体葉装甲”として機能している。  

  葉群内部には高密度の貯水組織が存在し、
  長期乾燥環境下でも
  極めて安定した生命活動を維持する。  

  また危険接近時には、
  葉状甲羅を閉じるように収束させ、
  全身を岩石状へ擬態する行動が確認されている。
`,
    abilities: ["リーフシェルディフェンス", "かくれこうら"],
    notes:
      "遠目には完全に植物だった。しかし近づいた瞬間、岩だと思っていた塊がゆっくり動き出した。甲羅部分はブーファンの葉そのもので構成されており、乾燥時には完全に閉じて休眠状態へ入るらしい。アガベスト",

    habitat: "乾燥岩場",
    size: "320mm",
    mobility: "超緩慢",
    status: "● DORMANT",
    statusColor: "#d6b85a",
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ
    missingState: "ACCESS_DENIED", // 欠損状態を設定
  },

  {
    // Basic identification
    no: "023",
    sort: 230,
    createdAt: "2026-05-23",
    firstObserved: "2026-05-23",

    // Classification system
    species: "Staghorn Moss",
    lineage: "MOSS-SYMBIOSIS",
    dangerClass: "CAUTION",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 74,
    animal: 91,
    danger: 68,

    // Display info
    tag: "Beast-Dominant",
    jp: "美角鹿 -ビカクシカ-",
    en: "Beautiful Horn Deer",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Detailed description
    notes:
      "初観測時、倒木と完全に同化していたため生物だと認識できなかった。角状器官の表面には複数の苔類群が定着しており、移動後も周囲には高湿度状態が残存していた。なお、こちらの視線に反応した瞬間、明確な威嚇姿勢を確認している。アガベスト",

    desc: `
湿潤森林地帯にて確認された大型鋸歯生物。
頭部にはヘラジカを思わせる巨大な角状器官を形成しているが、その実態はビカクシダ系統の葉状組織が変異・硬質化したものである。

角状器官の表面には広範囲に苔類群が定着しており、本種はこれら共生苔との複雑な湿度循環関係を構築している。苔層は単なる付着物ではなく、体表湿度の維持・有機物分解・擬態補助を担う外部器官として機能している可能性が高い。

また、ビカクシダ特有の貯水葉構造は、本種において腰部へ装着されたホルダー状器官へと進化している。内部には水分や有機堆積物が蓄積されており、長時間の巡回行動時における水分維持機構として利用されていると推定される。

通常時の行動性は低いが、縄張りへ侵入した外来個体に対しては極めて高い攻撃性を示す。交戦時には角状葉器官を大きく展開し、苔胞子を周囲へ散布しながら突進する行動が観測されている。
  `,
    namer: "@miyamoto0520",
    // Abilities and traits
    abilities: ["擬態ステイシス", "苔類共生"],

    // Habitat and physical traits
    habitat: "湿潤森林",
    size: "3.4m",
    mobility: "突進型",

    // Status
    status: "● AGITATED",
    statusColor: "#d65a5a",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false,

    // Variants
    variants: [],

    // Image
    image: "images/no_023.png",

    // Gallery
    gallery: [
      {
        image: "images/no_023_01.png",
        title: "角状器官周辺",
        titleEn: "",
        description: "角状器官の表面には広範囲に苔類群が定着し、共生関係を形成",
      },
      {
        image: "images/no_023_02.png",
        title: "貯水葉構造",
        titleEn: "",
        description: "ビカクシダ特有の貯水葉構造は、腰部のホルダー状器官へ進化",
      },

      {
        image: "images/no_023_03.png",
        title: "脚部特長は偶蹄目",
        titleEn: "",
        description: "脚部先端は偶蹄目に近い二分構造を形成している",
      },
      {
        image: "images/no_023_04.png",
        title: "成長段階：幼体",
        titleEn: "",
        description: "角状器官は未発達であり、見た目は若干、馬に似ている",
      },
      {
        image: "images/no_023_05.png",
        title: "成長段階：成体",
        titleEn: "",
        description: "角状器官が完全に発達し、苔類群との共生関係が成熟",
      },
    ],

    missingState: "", // 欠損状態を設定
    // Observation Videos
    videos: [
      {
        youtubeId: "NrEHuSjY4CQ",
        title: "Creating Specimen #023 | Classification Pending",
        observedAt: "2026-05-23",
        duration: "",
      },
    ],
  },

  {
    // Basic identification
    no: "024",
    sort: 240,
    createdAt: "2026-05-24",
    firstObserved: "2026-05-24",

    // Classification system
    species: "Staghorn Moss",
    lineage: "MOSS-SYMBIOSIS",
    dangerClass: "CAUTION",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 34,
    animal: 55,
    danger: 3,

    // Display info
    tag: "Beast-Dominant",
    jp: "ビカクウシ",
    en: "Bicacu Cow",
    rarity: "common",
    rarityClass: "rar-c",

    // Detailed description
    notes:
      "ビカクシカ系幼体の標本化作業中、群れの中で明らかに異なる個体を確認した。体格や脚部構造はむしろ水牛に近い。アガベスト",

    desc: `
      湿地帯や森林の浅瀬付近で確認される、ウシ型の大型鋸歯生物。

  ビカクシカ系統の幼体選別中に偶然発見された個体であり、当初は異常成長した近縁種だと考えられていた。しかし観測を続けるうちに、骨格構造や行動傾向が大きく異なる独立種である可能性が高まっている。

  頭部にはビカクシダ由来とみられる巨大な角状葉を持ち、その隙間には常に苔や小型植物が繁殖している。特に湿度の高い朝方には、頭部から霧のような水蒸気を発する様子が確認されている。

  巨大な体格に反して動きはゆったりとしており、水辺に半身だけ浸かったまま長時間静止していることも多い。その姿から、一部地域では“沼の岩”と誤認されることもある。
  `,
    namer: "@fukuboo",
    // Abilities and traits
    abilities: ["鹿擬態", "らくれん"],

    // Habitat and physical traits
    habitat: "湿潤森林",
    size: "1.8m",
    mobility: "重量突進型",

    // Status
    status: "● STABLE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false,

    // Variants
    variants: [],

    // Image
    image: "images/no_024.png",

    // Gallery
    gallery: [
      {
        image: "images/no_024_01.png",
        title: "どう見ても鹿じゃない",
        titleEn: "",
        description: "ビカクシカとは違う種であることが判明した。",
      },
    ],

    missingState: "", // 欠損状態を設定
  },
];

// EX catalog entries (EX-001~)
// Special observation entries - separated from main lineage
window.EX_ENTRIES = [
  // Example EX entry - Special observation
  {
    // Basic identification
    no: "001",
    sort: 1000,
    createdAt: "2026-05-17",
    firstObserved: "2026-05-17",

    // Classification system
    species: "Collaboration Variant",
    lineage: "SPECIAL-OBSERVATION",
    dangerClass: "OBSERVE",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 50,
    animal: 50,
    danger: 10,

    // Display info
    tag: "COLLABORATION-VARIANT",
    jp: "コラボ変異体",
    en: "Collaboration Variant",
    rarity: "LEGEND",
    rarityClass: "rar-l",

    // Detailed description
    notes: "外部因子による変異個体。通常系統とは分離して管理。",
    desc: `
    外部要因によって発生した特殊変異個体。

    本個体は通常の鋸歯生物とは異なる進化経路を経ており、
    外部からの影響（コラボレーション等）によって
    独自の形態を獲得した。

    LIMITED OBSERVATION状態として分類され、
    通常系統とは別個のカテゴリで管理される。
  `,

    // Abilities and traits
    abilities: ["外部変異", "限定観測"],

    // Habitat and physical traits
    habitat: "特殊環境",
    size: "—",
    mobility: "—",

    // Status
    status: "● LIMITED",
    statusColor: "#a855f7",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false,

    // Variants
    variants: [],

    // Image
    image: "images/unknown.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],
  },
];

// Missing number entries (intentional worldbuilding)
// These represent DATA_LOST, ACCESS_DENIED, REDACTED states
window.MISSING_ENTRIES = [
  {
    no: "022",
    sort: 220,
    createdAt: "2026-05-17",
    firstObserved: "2026-05-17",

    // Missing number state (intentional worldbuilding)
    missingState: "DATA_LOST",

    // Classification system
    species: "Unknown",
    lineage: "UNKNOWN",
    dangerClass: "UNKNOWN",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 0,
    animal: 0,
    danger: 0,

    // Display info
    tag: "UNKNOWN",
    jp: "——",
    en: "UNKNOWN ENTITY",
    rarity: "UNKNOWN",
    rarityClass: "rar-c",

    // Detailed description
    notes: "",
    desc: "記録なし",

    // Abilities and traits
    abilities: [],

    // Habitat and physical traits
    habitat: "—",
    size: "—",
    mobility: "—",

    // Status
    status: "——",
    statusColor: "var(--ink3)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false,

    // Variants
    variants: [],

    // Image
    image: "images/unknown.png",

    // Gallery
    gallery: [
      {
        image: "",
        title: "",
        titleEn: "",
        description: "",
      },
    ],
  },
];

// ============================================================
// DATA VALIDATION
// ============================================================

function validateDatabase() {
  const errors = [];
  const warnings = [];

  // Check for duplicate IDs within each array
  function checkDuplicates(entries, arrayName) {
    const seen = new Set();
    entries.forEach((entry, index) => {
      if (!entry.no) {
        errors.push(`${arrayName}[${index}]: Missing 'no' field`);
        return;
      }
      if (seen.has(entry.no)) {
        errors.push(`${arrayName}: Duplicate ID '${entry.no}' found`);
      }
      seen.add(entry.no);
    });
  }

  checkDuplicates(window.MAIN_ENTRIES, "MAIN_ENTRIES");
  checkDuplicates(window.EX_ENTRIES, "EX_ENTRIES");
  checkDuplicates(window.MISSING_ENTRIES, "MISSING_ENTRIES");

  // Check for required fields
  function checkRequiredFields(entries, arrayName) {
    const requiredFields = [
      "no",
      "sort",
      "createdAt",
      "jp",
      "en",
      "rarity",
      "desc",
    ];
    entries.forEach((entry, index) => {
      requiredFields.forEach((field) => {
        if (entry[field] === undefined || entry[field] === null) {
          errors.push(
            `${arrayName}[${index}]: Missing required field '${field}'`,
          );
        }
      });
    });
  }

  checkRequiredFields(window.MAIN_ENTRIES, "MAIN_ENTRIES");
  checkRequiredFields(window.EX_ENTRIES, "EX_ENTRIES");

  // Check for missing state entries (intentional worldbuilding)
  window.MISSING_ENTRIES.forEach((entry, index) => {
    if (!entry.missingState) {
      warnings.push(
        `MISSING_ENTRIES[${index}]: Missing 'missingState' field (should be DATA_LOST, ACCESS_DENIED, or REDACTED)`,
      );
    }
  });

  // Output validation results
  if (errors.length > 0) {
    console.error("[DATABASE VALIDATION ERROR]:");
    errors.forEach((err) => console.error("  -", err));
  }

  if (warnings.length > 0) {
    console.warn("[DATABASE VALIDATION WARNING]:");
    warnings.forEach((warn) => console.warn("  -", warn));
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log("[DATABASE VALIDATION]: All checks passed");
  }

  return { errors, warnings };
}

// Run validation on load
validateDatabase();

// Legacy compatibility - merge all entries for existing code
// This will be removed once all code is updated to use separate arrays
window.ENTRIES = [
  ...window.MAIN_ENTRIES,
  ...window.EX_ENTRIES,
  ...window.MISSING_ENTRIES,
];
