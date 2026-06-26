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
    //001スニャグルトゥース
    // Basic identification
    no: "001",
    sort: 10,
    createdAt: "2026-05-13",
    firstObserved: "2024-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "スニャグルトゥース",
    en: "Snyaggletooth",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Classification system
    species: "Snyaggletooth",
    lineage: "BEAST-DOMINANT",
    dangerClass: "OBSERVE",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 30,
    animal: 78,
    danger: 5,

    // Detailed description
    notes:
      "こんな生き物を見るのは初めてだ。猫のようにも見えるが、尻尾には植物のような鋸歯がある。いったい何者なのか、観測を続ける。",

    desc: `
    アガベ（スナグルトゥース）周辺で最初に確認された鋸歯生物。

アガベ（スナグルトゥース）の近くで最初に確認された、
ネコ型鋸歯生物。

見た目は小さな猫に似ていますが、
尻尾にはアガベの葉のような鋸歯が並んでいます。

鋸歯の形や並び方には個体差があり、
同じ姿の個体はまだ確認されていません。

普段は鉢の縁や棚の上で丸まって休んでおり、
気配を感じると尻尾を広げる姿が見られます。

特にプレステラ周辺で発見されることが多く、
鉢にぶら下がったまま眠っている個体もいます。

現在確認されている鋸歯生物の中でも、
最初期に発見された代表的な個体です。
  `,

    // Abilities and traits
    abilities: ["影ねこ休眠", "ぶら下がりプレステラ"],

    // Habitat and physical traits
    top: 'Agave Titanota "Snaggle Tooth"',
    habitat: "アガベ棚周辺",
    size: "166mm",
    mobility: "緩慢",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl:
      "https://agavest.stores.jp/items/65c627d48fd8872275cc50db?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_001",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Variants
    variants: [
      {
        id: "001-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_001_a.png",
        shopUrl:
          "https://agavest.stores.jp/items/65c627d48fd8872275cc50db?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_001",
        price: "",
        soldOut: false,
      },
      {
        id: "001-b",
        label: "寝そべり種",
        labelEn: "Sitting Type",
        image: "images/no_001_b.png",
        shopUrl:
          "https://agavest.stores.jp/items/65c627d48fd8872275cc50db?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_001",
        price: "",
        soldOut: false,
      },
      {
        id: "001-c",
        label: "招き猫種",
        labelEn: "Maneki Type",
        image: "images/no_001_c.png",
        shopUrl:
          "https://agavest.stores.jp/items/65c627d48fd8872275cc50db?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_001",
        price: "",
        soldOut: false,
      },
    ],

    // Image
    image: "images/no_001.png",

    // Gallery
    gallery: [
      {
        image: "images/no_001_01.png",
        title: "プレステラにぶら下がる個体",
        titleEn: "Individual Hanging on Prestra",
        description: "基本はこの姿勢をとっています。",
      },
      {
        image: "images/no_001_02.png",
        title: "何とも言えない表情を見せます",
        titleEn: "Indescribable Expression",
        description: "どんな気分なのかは不明です。",
      },
      {
        image: "images/no_001_03.png",
        title: "尻尾はアガベのようです。",
        titleEn: "Tail resembles Agave leaves",
        description: "擬態のために進化したのかもしれません。",
      },
      {
        image: "images/no_001_04.png",
        title: "地面に降りると怯えたように丸まります",
        titleEn: "Curls up when on the ground",
        description: "かわいいですが、危険を感じているのかもしれません。",
      },
    ],

    // Observation Videos
    videos: [
      {
        youtubeId: "ymeYShzFxz8",
        title: "スニャグルの研究レポートです",
        observedAt: "2026-06-26",
        duration: 40,
      },
      {
        youtubeId: "R_BYUPtk_lE",
        title: "Unknown Species Detected Near Prestera Habitat",
        observedAt: "2026-05-23",
        duration: 30,
      },
      {
        youtubeId: "vb-Hvxywtzs",
        title: "プレステラに住み着く猫を捕獲しました😼🌵",
        observedAt: "2026-06-01",
        duration: 40,
      },
    ],
  },

  {
    //002ブラックにゃんこブルー
    // Basic identification
    no: "002",
    sort: 20,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "ブラックにゃんこブルー",
    en: "Black Nyanko Blue",
    rarity: "COMMON",
    rarityClass: "rar-c",

    // Biological stats (0-100)
    plant: 10,
    animal: 85,
    danger: 20,

    // Detailed description
    notes:
      "青色毛玉は定期的に排出される。回収された毛玉の用途について質問されることが多いが、研究所としてはコメントを控える。また脱走した。アガベスト",

    desc: `
    プレステラ周辺で高頻度に観測される鋸歯生物。

夜間に活動が活発化し、
棚内の鋸歯構造を持つ対象へ接近する傾向がある。

接触後、
体表から青色の毛状物質を排出する現象が確認されている。

この排出物は一時的に形状を保持し、
環境によって性質変化を起こすことがあるが詳細は不明。

本個体はアガベ棚環境において安定して観測されている。
  `,

    // Abilities and traits
    abilities: ["青化反応", "プレステラ探知"],

    // Habitat and physical traits
    top: 'Agave Titanota "Black &Blue"',
    habitat: "アガベ棚周辺",
    size: "164mm",
    mobility: "夜間活性",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl:
      "https://agavest.stores.jp/items/6a07e6cca30c09e1667757ee?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_002",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Variants
    variants: [
      {
        id: "002-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_002_a.png",
        shopUrl:
          "https://agavest.stores.jp/items/6a07e6cca30c09e1667757ee?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_002",
        price: "",
        soldOut: false,
      },
    ],

    // Image
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

    // Observation Videos
    videos: [
      {
        youtubeId: "m9hoQHRjxck",
        title:
          "Agave Creature Observation Log No.002 – Black Nyanko Blue (Caught on Prestra)",
        observedAt: "2026-06-02",
        duration: 30,
      },
    ],
  },

  {
    //003レッドキャットミーズル
    // Basic identification
    no: "003",
    sort: 30,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "レッドキャットミーズル",
    en: "Red Cat meezle",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 20,
    animal: 80,
    danger: 25,

    // Detailed description
    notes: "ストレス時に赤色化を確認。",

    desc: `
    スポットライト環境下で色彩変化が観測される鋸歯生物。

通常時は低彩度の体色を維持するが、
光量変動・乾燥・外的刺激に反応し、
体表色素が赤色へ遷移する現象が確認されている。

この変化は防御行動というより、
環境情報を可視化する反応機構である可能性が高い。
  `,

    // Abilities and traits
    abilities: ["ストレスカラーシフト", "あかいろはんのう"],

    // Habitat and physical traits
    top: 'Agave Titanota "Red Catweezle"',
    habitat: "スポットライト直下",
    size: "164mm",
    mobility: "夜間活性",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl:
      "https://agavest.stores.jp/items/6a080c2e9797c79a78b9a4f0?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_003",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Variants
    variants: [
      {
        id: "003-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_003_a.png",
        shopUrl:
          "https://agavest.stores.jp/items/6a080c2e9797c79a78b9a4f0?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_003",
        price: "",
        soldOut: false,
      },
    ],

    // Image
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
  },

  {
    //004にゃガベ チタノタ
    // Basic identification
    no: "004",
    sort: 40,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "にゃガベ チタノタ",
    en: "NyAgabe titanota",
    rarity: "COMMON",
    rarityClass: "rar-c",

    // Biological stats (0-100)
    plant: 40,
    animal: 70,
    danger: 15,

    // Detailed description
    notes: "植物と動物の特徴を併せ持つ個体群を確認。鋸歯構造との関連性あり。",

    desc: `
    鋸歯生物群において広域分布が確認されている基礎個体。

特定環境への強い依存は見られず、
森林・乾燥地・人工環境においても安定した観測記録が存在する。

形態変化よりも環境適応の安定性を優先する傾向があり、
構造的変化よりも恒常性維持に重きを置いていると推定される。
  `,

    // Abilities and traits
    abilities: ["エコシステムアダプト", "かんきょうてきおう"],

    // Habitat and physical traits
    top: 'Agave Titanota "No Name"',
    habitat: "アガベ棚全域",
    size: "172mm",
    mobility: "夜間活性",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl:
      "https://agavest.stores.jp/items/6a080ce79797c7aacab9a479?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_004",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Variants
    variants: [
      {
        id: "004-a",
        label: "フチネコ種",
        labelEn: "Fuchi-Neko Type",
        image: "images/no_004_a.png",
        shopUrl:
          "https://agavest.stores.jp/items/6a080ce79797c7aacab9a479?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_004",
        price: "",
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

    // Image
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
  },

  {
    //005ゴリラホリダ
    // Basic identification
    no: "005",
    sort: 50,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "ゴリラホリダ",
    en: "Gorillahorrida",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Biological stats (0-100)
    plant: 25,
    animal: 90,
    danger: 60,

    // Detailed description
    notes:
      "驚いた。ネコ型生物以外にも、ゴリラのような個体を密林の奥深くで発見した。どのような進化を遂げてきたのだろうか。頭部に見えるのはホリダの葉っぱのように見える。アガベスト",

    desc: `
    アガベ棚大型領域で観測された大型鋸歯生物。

本個体は高重量構造を持ち、
移動速度は著しく制限される代わりに、
周囲環境への影響力が強いと考えられている。

頭部にはホリダ様の鋸歯葉構造が発達しており、
これが防御器官なのか、
あるいは状態伝達構造なのかは未確定である。

観測時には周囲の個体が一定距離を保つ行動が確認されている。
  `,

    // Abilities and traits
    abilities: ["マッスルビルダー", "おもみしずめ"],

    // Habitat and physical traits
    top: "Agave Horrida",
    habitat: "棚外縁重圧域",
    size: "2.4m",
    mobility: "重量型",

    // Status
    status: "● STABLE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //006キンタ魔丸
    // Basic identification
    no: "006",
    sort: 60,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "キンタ魔丸",
    en: "GoldenBall Magan",
    rarity: "LEGEND",
    rarityClass: "rar-l",

    // Biological stats (0-100)
    plant: 15,
    animal: 95,
    danger: 90,

    // Detailed description
    notes:
      "ある日荒野を歩いていると、私はそれを見つけました。あまりにも大きなキンタマを持つそいつに私は名付けました。キンタ魔丸。その名の通り。恐ろしくデカいです。クラフトセブンティ",

    desc: `
      禁域生態圏において観測された大型鋸歯生物。

本個体は全身構造の中で特定部位に極端な質量集中が確認されており、
重力バランスおよび運動制御に著しい影響を与えている。

当該構造は通常個体群との比較において例外的であり、
現行分類体系では説明不能領域に属する。

その存在は「禁域個体」として特別記録に分類されている。
    `,
    namer: "@craft_seventy",

    // Abilities and traits
    abilities: ["オーバーリバランス", "りょくばくぞうふく"],

    // Habitat and physical traits
    top: 'Agave Titanota "魔丸"',
    habitat: "棚禁域",
    size: "4.1m",
    mobility: "群体統率",

    // Status
    status: "● MONARCH",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //007スカイブルーニャンダホー
    // Basic identification
    no: "007",
    sort: 70,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT Aerial Type",
    jp: "スカイブルーニャンダホー",
    en: "Sky Blue Nyanda Ho",
    rarity: "uncommon",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 10,
    animal: 60,
    danger: 0,

    // Detailed description
    notes: "領空域で浮遊する鋸歯ネコ型生物を確認。体表に空色変化あり。",

    desc: `
      領空域において観測される鋸歯ネコ型生物。

本個体は上昇気流および高湿度環境下で浮遊状態を維持する傾向があり、
特定条件下では長時間の滞空行動が確認されている。

浮遊時には体表色が空色へと変化し、
周囲の気流に微細な変化を与える現象が観測されているが、
その因果関係は未解明である。

また人工環境下では、
棚上部構造への定着行動が確認されることがあり、
休息時の安定化プロセスとして記録されている。
  `,
    namer: "@fukuboo",

    // Abilities and traits
    abilities: ["エアロバランサー", "かぜのり"],

    // Habitat and physical traits
    top: 'Agave Titanota "Black &Blue"',
    habitat: "アガベ棚上層環境",
    size: "160mm",
    mobility: "高速飛行",

    // Status
    status: "● MONARCH",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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

    missingState: "SIGNAL_LOST",
  },

  {
    //008アガベカブトトカゲ
    // Basic identification
    no: "008",
    sort: 80,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "アガベカブトトカゲ",
    en: "Agave Kabutotokage",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Biological stats (0-100)
    plant: 70,
    animal: 85,
    danger: 35,

    // Detailed description
    notes: "草食傾向を持つトカゲ型個体を確認。体表に葉状構造あり。",

    desc: `
草原から湿潤境界帯にかけて観測される、
トカゲ型鋸歯生物。

本個体は全身に鱗片状構造と植物由来と考えられる硬質繊維を持ち、
外観上は部分的にアガベ類との類似性が確認されている。

外敵接触時には頭部周辺が赤色へ変化する反応が観測され、
その後、周囲の植物環境へ溶け込むような静止行動を取ることがある。

これらの挙動は防御行動なのか、
あるいは環境同化現象なのかは未解明である。

`,

    // Abilities and traits
    abilities: ["リーフアーマーフュージョン", "しょくぶつどうか"],

    // Habitat and physical traits
    top: "Agave Oteroi",
    habitat: "棚外縁環境",
    size: "248mm",
    mobility: "俊敏",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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

    missingState: "DATA_LOST", // 欠損状態を設定
  },

  {
    //009フィリグリズリー
    // Basic identification
    no: "009",
    sort: 90,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリー",
    en: "Filigrizzly",
    rarity: "COMMON",
    rarityClass: "rar-c",

    // Biological stats (0-100)
    plant: 35,
    animal: 80,
    danger: 30,

    // Detailed description
    notes: "クマ型の群体鋸歯生物を確認。二足歩行および集団行動あり。",

    desc: `
       群体行動を示す鋸歯生物。

クマ型の外観を持つ個体群が複数確認されており、
二足歩行による移動および集団での定位置保持行動が観測されている。

幼体から成長段階にかけて個体呼称が変化し、
若齢個体は「ファリグリズリー」と呼称される傾向がある。

群体内では鋸歯構造の大きさよりも、
姿勢および静止時の存在感が優先的に認識されると考えられている。

成熟個体は肩部鋸歯を展開したまま長時間静止することがあり、
これは群体間の情報伝達の一形態である可能性がある。
    `,
    namer: "@craft_seventy",

    // Abilities and traits
    abilities: ["スウォームコンダクト", "なかまよび"],

    // Habitat and physical traits
    top: 'Agave Titanota "filigree"',
    habitat: "棚外縁群体領域",
    size: "1.8m",
    mobility: "群行型",

    // Status
    status: "● STABLE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //010フィリグリズリーデビル
    // Basic identification
    no: "010",
    sort: 100,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリーデビル",
    en: "Filigrizzly Devil",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Biological stats (0-100)
    plant: 20,
    animal: 95,
    danger: 85,

    // Detailed description
    notes: "背部に視線反応。観測中に瞬き同期あり。アガベスト",

    desc: `
   群体競争環境下で発生した変異鋸歯生物。

本個体は競争に敗北した個体群を自身の体表へ固定化する性質を持ち、
その結果として背部に顔状構造が複数形成されることが確認されている。

これらの構造は完全な器官ではなく、
微弱な視線反応および表情変化が観測されることから、
一部機能が維持されている可能性がある。

背部構造の数と群体内階級には相関が見られるが、
その因果関係は未確定である。
`,

    // Abilities and traits
    abilities: ["ハイパーインシデント", "きょうかかいろ"],

    // Habitat and physical traits
    top: 'Agave Titanota "filigree"',
    habitat: "棚禁域群体崩壊層",
    size: "2.7m",
    mobility: "重装型",

    // Status
    status: "● AGITATED",
    statusColor: "#d65a5a",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //011フィリグリズリーモナーク
    // Basic identification
    no: "011",
    sort: 110,
    createdAt: "2026-05-13",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "フィリグリズリーモナーク",
    en: "Filigrizzly Monarch",
    rarity: "EPIC",
    rarityClass: "rar-e",

    // Biological stats (0-100)
    plant: 15,
    animal: 95,
    danger: 95,

    // Detailed description
    notes:
      "世界は広いことを知った。 キンター魔族の住む禁域森林を後にした私は、深い森の奥で小さな池を見つけた。 渇いた喉を潤そうと近づいた、その時だった。 奴らは池を取り囲み、狂気じみた踊りを捧げていた。 フィリグリズリーの群れだ。 その視線の先を追う。 木々を組み上げた巨大な玉座。 そして、その頂で微動だにせず群れを見下ろす一体の巨獣。 あれは長ではない。王ですらない。 群れ全てが跪き、その存在を称えている。 私は直感した。 ――君主だ。 新種個体として記録する。 クラフトセブンティ",

    desc: `
  フィリグリズリー群において観測される高位個体。

本個体は木質構造を用いた高所に定位し、
周囲群体の行動が同調する現象が確認されている。

当該個体の移動に伴い、
群体全体の行動開始が同期する傾向があり、
生態系に対して強い影響を及ぼすと考えられている。

また周辺では群体内の衝突頻度が著しく低下しており、
特定個体を中心とした安定構造が形成されている可能性がある。
  `,

    // Abilities and traits
    abilities: ["コロニーオーバーライド", "しはいどうちょう"],

    // Habitat and physical traits
    top: 'Agave Titanota "filigree"',
    habitat: "棚禁域群体中枢",
    size: "4.1m",
    mobility: "群体統率",

    // Status
    status: "● MONARCH",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //012緑犀牛
    // Basic identification
    no: "012",
    sort: 120,
    createdAt: "2026-05-14",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "緑犀牛",
    en: "Green Rhino",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 60,
    animal: 85,
    danger: 30,

    // Detailed description
    notes: "岩状の大型鋸歯生物を確認。移動に伴い周辺植物群が活性化。アガベスト",

    desc: `
  草原地帯にて観測された大型鋸歯生物。

本個体は岩状の外観を持ち、静止時には周囲環境と同化するように見えるが、
移動時には明確な生体運動が確認されている。

体表は葉緑様構造を含む特殊組織で構成され、
高照度環境下では淡い緑色を呈する。

周辺植物群は本個体の移動に同期するように活性化する傾向があり、
その因果関係は未解明である。

頭部鋸歯器官は地中探索に関与している可能性があり、
環境情報の取得手段として機能していると考えられる。
`,

    // Abilities and traits
    abilities: ["クロロコンダクター", "どしょくれんどう"],

    // Habitat and physical traits
    top: 'Agave Titanota "緑犀牛"',
    habitat: "棚外縁地表層",
    size: "2.1m",
    mobility: "重量型",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //013白鯨
    // Basic identification
    no: "013",
    sort: 130,
    createdAt: "2026-05-13",

    // Display info
    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "白鯨",
    en: "Hakugei White Cetus",
    rarity: "COMMON",
    rarityClass: "rar-c",

    // Biological stats (0-100)
    plant: 20,
    animal: 95,
    danger: 80,

    // Detailed description
    notes: "深海から白色の大型個体が浮上。周囲海流に変化を確認。アガベスト",

    desc: `
深海域で観測された巨大な白色鋸歯生物。

海面は本個体の浮上と同時に不自然に隆起し、
水流には葉状の鋸歯構造が混ざり込んでいた。

その影響は海流全体に広がり、
周囲の環境そのものが変化したように見える。

これは生物なのか、それとも現象なのか。
観測記録は未だ分類を保留している。
`,

    // Abilities and traits
    abilities: ["ハイドロモジュレーター", "すいあつばいそう"],

    // Habitat and physical traits
    top: 'Agave Titanota "白鯨"',
    habitat: "棚水圏",
    size: "18m+",
    mobility: "浮遊型",

    // Status
    status: "● MYTHIC",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl:
      "https://agavest.stores.jp/items/681f990c80278e0a7b078b64?utm_source=zukan&utm_medium=internal&utm_campaign=species_link&utm_content=species_013",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //014黒鯨
    // Basic identification
    no: "014",
    sort: 140,
    createdAt: "2026-05-14",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "黒鯨",
    en: "Kokugei Black Cetus",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 25,
    animal: 90,
    danger: 75,

    // Detailed description
    notes:
      "黒い潮煙の中心から浮上した個体。周囲の生物群が逃げずに集まる異常行動を確認。これは生物というより環境に近い。アガベスト",

    desc: `
  深海域にて黒い潮煙状の現象が発生し、その中心から巨大な鋸歯生物が浮上した。

周囲の小型個体群は逃走行動を示さず、
むしろその周辺へと集積する傾向が確認されている。

本個体の周囲では水質および生物分布が変化しており、
一時的に“環境そのものが個体に従属している”状態が観測された。
`,

    // Abilities and traits
    abilities: ["ディープシンクアダプト", "しんかいどうか"],

    // Habitat and physical traits
    top: 'Agave Titanota "黒鯨"',
    habitat: "棚水圏中枢干渉域",
    size: "18m級",
    mobility: "遊泳型",

    // Status
    status: "● MONITOR",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },
  {
    //015メタル白鯨
    // Basic identification
    no: "015",
    sort: 150,
    createdAt: "2026-05-14",

    // Display info
    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "メタル白鯨",
    en: "Metal Hakugei Cetus",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Biological stats (0-100)
    plant: 5,
    animal: 90,
    danger: 56,

    // Detailed description
    notes:
      "海底で金属反応が検出された直後、巨大な白鯨型個体を確認。通過後の地形が変形している。これは生物というより構造物に近い。アガベスト",

    desc: `
  深海極圧環境にて確認された、白鯨系統の金属化変異個体。

外殻は鉱物層と生体組織が融合した構造へと変化しており、
葉状鋸歯は鋭利な金属片として再構成されている。

頭頂部から放出される高圧噴流は周囲地形を削り取りながら移動し、
通過後には海底構造の再形成が確認されている。

本個体は環境を変化させるのではなく、
環境そのものを書き換える存在として記録されている。
`,

    // Abilities and traits
    abilities: ["メタルバイオシフト", "まてりあるへんか"],

    // Habitat and physical traits
    top: 'Agave Titanota "白鯨"',
    habitat: "棚水圏構造改変域",
    size: "18m+",
    mobility: "浮遊型",

    // Status
    status: "● MONARCH",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //016金鯨
    // Basic identification
    no: "016",
    sort: 160,
    createdAt: "2026-05-14",

    // Display info
    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "金鯨",
    en: "Kingei Golden Cetus",
    rarity: "LEGEND",
    rarityClass: "rar-l",

    // Biological stats (0-100)
    plant: 10,
    animal: 90,
    danger: 70,

    // Detailed description
    notes:
      "金色発光を伴う巨大個体が海底を通過。通過後、鉱物粒子の沈殿帯が形成された。アガベスト",

    desc: `
  深海熱水域にて確認された、白鯨系統の金属光沢変異個体。

通過時、周囲海域は強い発光現象を示し、
鉱物粒子が帯状に沈殿する現象が確認されている。

外皮は光環境に応じて金色から琥珀色へ変化し、
その存在自体が海域の鉱物分布に影響を与えている。

本個体は移動する生物というよりも、
“海に残る現象の起点”として記録されている。
`,

    // Abilities and traits
    abilities: ["オーロラミネラルフロー", "こうたくばいぞう"],

    // Habitat and physical traits
    top: 'Agave Titanota "金鯨"',
    habitat: "棚水圏沈殿域",
    size: "18m+",
    mobility: "浮遊型",

    // Status
    status: "● STABLE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //017ライオンズニャーン
    // Basic identification
    no: "017",
    sort: 170,
    createdAt: "2026-05-14",

    // Display info
    tag: "BEAST-DOMINANT",
    jp: "ライオンズニャーン",
    en: "Lions Nyaan",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 55,
    animal: 75,
    danger: 35,

    // Detailed description
    notes:
      "草原でこちらを見つめる小型個体を確認した。ライオンのような鬣を持つが、近づいて観察すると葉そのものだった。風が吹くたびに葉同士が微かに共鳴しており、周囲の植物群も同調するように揺れていた。アガベスト",

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

    // Abilities and traits
    abilities: ["センサリーフラクタル", "ひかりきょうかん"],

    // Habitat and physical traits
    top: 'Agave Titanota "ライオンズメーン"',
    habitat: "草原地帯",
    size: "170mm",
    mobility: "緩慢",

    // Status
    status: "● ACTIVE",
    statusColor: "var(--g)",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //018鋸歯機獣ゴリボーグ
    // Basic identification
    no: "018",
    sort: 180,
    createdAt: "2026-05-14",

    // Display info
    tag: "MECHA-BEAST-JOINT",
    jp: "鋸歯機獣ゴリボーグ",
    en: "Goriborg Serrate Beast",
    rarity: "RARE",
    rarityClass: "rar-r",

    // Biological stats (0-100)
    plant: 30,
    animal: 85,
    danger: 70,

    // Detailed description
    notes:
      '廃棄区域で金属音を伴う大型個体を確認した。動きは機械のように正確だったが、こちらを視認した直後だけ数秒間停止した。あの挙動には"迷い"のようなものを感じた。アガベスト',

    desc: `
 植物棚の廃材エリア周辺で確認された、
機械の特徴を持つ大型鋸歯生物。

金属のような外皮と生き物のような動きを合わせ持ち、
遠くから見ると古い機械が動いているようにも見えます。

体にはたくさんの接合跡があり、
どの部分が生まれつきのものなのか、まだよく分かっていません。

口元にはアガベの葉に似た大きな装甲があり、
体を守るために使っていると考えられています。

動きは規則的でゆっくりですが、
観察しているこちらを見ると、突然立ち止まることがあります。

その姿から、ただの機械ではなく、
何かを覚えている個体なのではないかとも考えられています。
`,

    // Abilities and traits
    abilities: ["改造趣味", "意思を持ってやがる"],

    // Habitat and physical traits
    top: 'Agave Titanota "FO-76"',
    habitat: "境界地帯",

    size: "2.6m",
    mobility: "機械歩行型",

    // Status
    status: "● MONITOR",
    statusColor: "#e0b94f",

    // Shop information
    shopUrl: "",
    price: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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
  },

  {
    //019もち鯨
    // Basic identification
    no: "019",
    sort: 190,
    createdAt: "2026-05-14",

    // Display info
    tag: "AQUATIC-SUCCULENT HYBRID",
    jp: "もち鯨",
    en: "Mochi Cetus",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",

    // Biological stats (0-100)
    plant: 25,
    animal: 88,
    danger: 20,

    // Detailed description
    notes:
      "植物棚の水場に浮かぶ白い物体を、石や飾りだと思っていた。しかし触れた瞬間、大きく沈み込み、そのまま弾むように移動を開始した。想像以上に柔らかい。群れ同士が反発するような動きで交流しているようにも見える。アガベスト",
    desc: `
  植物棚の水場エリアで群れを作って暮らす、
鯨型鋸歯生物。

海面に浮かぶ姿は、遠くから見ると白い岩や漂流物に見えることがあります。

しかし近づいて触れてみると、体全体が大きく沈み込み、餅のように跳ねながら泳ぎ始める姿が確認されています。

体はやわらかく弾力があり、押すとゆっくり元に戻る不思議な性質を持っています。

また、もち鯨は周囲の環境によって体色が変化する珍しい特徴があります。

春の環境では淡いピンク色のさくらもち鯨、
湿った植物域では緑色のよもぎもち鯨など、
地域によってさまざまな姿が確認されています。

現在も色の変化と環境の関係について観測が続いています。
`,

    // Abilities and traits
    abilities: ["和菓子反応", "もちもちボディ"],

    // Habitat and physical traits
    top: "Agave Titanota 白鯨",
    habitat: "植物棚の水場",
    size: "12m〜18m",
    mobility: "遊泳型",

    // Status
    status: "● STABLE",

    // Shop information
    price: "",
    shopUrl: "",
    soldOut: false, // 完売時は true に変えるだけ

    // Image
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

    // Variants
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
    //020グラキりす
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
  長期乾燥環境下でも活動を維持。  

  人工環境下では、
  プレステラ型基底環境へ固定化する行動が確認されており、
  根圧安定化を目的とした適応行動と考えられている。  

  また、湿潤周期によって
  成長速度が大きく変動する特徴を持つ。
`,
    abilities: ["デザートストレージコア", "みずほぞん"],
    top: "Pachypodium Gracilius",
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
    //021ニャキリス
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
        image: "images/no_021_01.jpg",
        title: "グニャキリス郡を発見",
        titleEn: "",
        description: "色も見た目も多種多様な生物です。",
      },
      {
        image: "images/no_021_02.jpg",
        title: "植物棚での人工飼育に成功",
        titleEn: "",
        description: "脱走に気をつけて飼育しています。",
      },
      {
        image: "images/no_021_03.jpg",
        title: "より猫に酷似した個体を観測",
        titleEn: "",
        description: "口周りまで猫化していますね。",
      },
    ],

    tag: "SUCCULENT-TYPE",
    jp: "グニャキリス",
    en: "Gnyacilius",
    desc: `
 乾燥棚にて確認された、ネコ型塊根鋸歯生物です。

乾燥した場所を好み、植物棚の隅や鉢の影でじっとしている姿がよく見られます。

丸い塊根部分には水分を蓄える力があり、乾燥が続く環境でも元気に過ごせるようです。

ただし、水分が少なくなると体がやわらかくなり、少し機嫌が悪くなる傾向があります。

また、一見すると足や尻尾に見える部分ですが、実は歩くためのものではなく、鉢の中へ伸びていく根っこのような器官だと考えられています。

ときどき鉢から姿を消すこともあります。
過去には雪見だいふくのケース内で発見された個体もおり、狭く落ち着いた場所を好む性質があるようです。

植物棚の中でどんな暮らしをしているのか、現在も観測が続いています。
`,
    abilities: ["すり抜け脱走", "なんちゃって足根"],
    namer: "@miyamoyo0520",
    notes:
      "見た目は完全にネコだが、触れると塊根植物に近い弾力を持っていた。水分状態によって機嫌が極端に変化するらしく、水切れ直前には明確な威嚇反応を示した。アガベスト ",
    top: "Pachypodium Gracilius",
    habitat: "乾燥棚地帯",
    size: "112mm",
    mobility: "緩慢",
    status: "● THIRSTY",
    statusColor: "#d6b85a",
    shopUrl: "https://agavest.stores.jp/?category_id=6a3e0ce35d38e9155cdbef88",
    price: "",
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
植物棚の乾燥したエリアで確認された、 亀型塊根鋸歯生物。 

遠くから見ると、ただの岩や植物に見えることがあります。 

背中にはブーファン系統に似た葉が広がっており、 この葉の集まりは甲羅のように身を守る役割を持っているようです。 

葉の内側には水分を蓄える力があり、 乾燥した場所でもゆっくりと過ごすことができます。 

危険を感じると、背中の葉を閉じるように縮め、 岩になりきって身を隠す姿も確認されています。 

近づいて初めて動き出すことから、 「見つけるのが難しい鋸歯生物」として知られています。
`,
    abilities: ["いわ擬態", "ハイマンカメデス"],
    notes:
      "遠目には完全に植物だった。しかし近づいた瞬間、岩だと思っていた塊がゆっくり動き出した。甲羅部分はブーファンの葉そのもので構成されており、乾燥時には完全に閉じて休眠状態へ入るらしい。アガベスト",

    top: "Boophane haemanthoides",
    habitat: "乾燥棚",
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
      "初観測時、倒木と完全に同化していたため生物だと認識できなかったのです。こちらを見た瞬間、角を広げる姿が見られました。アガベスト",

    desc: `
湿った植物棚の森林エリアで確認された、
大型の鹿型鋸歯生物。

頭にはヘラジカのような大きな角がありますが、
よく見るとその正体はビカクシダに似た葉でできています。

角の表面には苔が住みついており、
ビカクシカと一緒に暮らす仲間のような存在です。

この苔は体の湿り気を保ったり、周囲の環境になじむために役立っていると考えられています。

腰のあたりには、ビカクシダの貯水葉に似た器官があり、
水分や落ち葉などをためながら生活しています。

普段はゆっくり過ごしていますが、縄張りに近づくものには注意が必要です。

怒ったビカクシカは角を大きく広げ、
苔をまとった姿で威嚇することがあります。
  `,
    namer: "@miyamoto0520",
    // Abilities and traits
    abilities: ["倒木まぎれ", "苔っこくらし"],

    // Habitat and physical traits
    top: "Platycerium",
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
      湿った植物棚や水辺エリアで確認された、
ウシ型大型鋸歯生物。

ビカクシカの群れを観察していた際に発見された個体で、
最初は少し変わったビカクシカだと思われていました。

しかし、よく見ると体つきや歩き方は鹿とは異なり、
ゆったりとした牛のような特徴を持っていることが分かりました。

頭にはビカクシダに似た大きな角状の葉を持ち、
その間には苔や小さな植物が住みついています。

湿度の高い朝には、角の周辺から白い霧のようなものが見られることもあります。

体はとても大きいですが、動きはゆっくり。
水辺でじっとしている姿は、時々「大きな岩」と間違われるようです。
  `,
    namer: "@fukuboo",
    // Abilities and traits
    abilities: ["鹿じゃない", "らくれん"],

    // Habitat and physical traits
    top: "Platycerium",
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
  {
    // Basic identification
    no: "025",
    sort: 250,
    createdAt: "2026-06-03",
    firstObserved: "2026-06-03",

    // Classification system
    species: "Platybat Mosswing",
    lineage: "MOSS-SYMBIOSIS",
    dangerClass: "CAUTION",
    classification: "SAFE",

    // Biological stats (0-100)
    plant: 68,
    animal: 42,
    danger: 4,

    // Display info
    tag: "Plant-Dominant Aerial Type",
    jp: "ビカクモリ",
    en: "Platybat Mosswing",
    rarity: "uncommon",
    rarityClass: "rar-u",

    // Detailed description
    notes:
      "プレステラ周辺で定着する吊り鉢擬態型個体群の中から確認された、ビカクシダとコウモリの中間的特徴を持つ独立種。",

    desc: `
湿った植物棚や吊り鉢で確認された、
コウモリに似た姿を持つ鋸歯生物。

ビカクシダの葉のような大きな前肢を持ち、
植物の間に混ざって静かに暮らしています。

この葉のような部分は飛ぶためではなく、
湿った環境で水分を集める役割があるようです。

胸元には水苔のようなものが広がっており、
小さな生き物たちと一緒に暮らしている姿も確認されています。

後ろ足は長く発達していて、
プレステラの縁や棚の隙間につかまり、逆さまの状態で過ごします。

動きはとてもゆっくりで、
「吊る」「じっとする」「風に揺れる」姿がよく見られます。

植物だと思って近づいたら、
ゆっくりこちらを見返すことがあるようです。
  `,

    namer: "@agadai_6213",

    // Abilities and traits
    abilities: ["つかまりプレステラ", "水苔まとい"],

    // Habitat and physical traits
    top: 'Platycerium "ellisii"',
    habitat: "アガベ棚・湿潤吊り鉢環境",
    size: "180mm",
    mobility: "吊下型低速移動",

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
    image: "images/no_025.png",

    // Gallery
    gallery: [
      {
        image: "images/no_025_01.png",
        title: "プレステラ擬態状態",
        description: "襟元の水苔を膨らませて、植物として誤認される状態。",
      },
      {
        image: "images/no_025_02.png",
        title: "獣型狩猟状態",
        description: "後肢を伸ばして固定し、獲物を狙撃する状態。",
      },
    ],

    missingState: "",
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
    top: "",
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
    plant: "",
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
` 
console.log('File written');
`;
