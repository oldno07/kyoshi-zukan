window.ENTRIES = [
  {
    no: "001",
    sort: 10,
    createdAt: "2026-05-13",
    plant: 30,
    animal: 78,
    danger: 35,
    notes:
      "こんな動物を見るのは初めてだ。いや、植物のようでもある。どういった生命体なのだろうか、随時記録していきたいと思う。アガベスト",
    image: "images/no_001.png",
    tag: "BEAST-DOMINANT-動物優性型",
    jp: "スニャグルトゥース",
    en: "Snyaggletooth",
    rarity: "UNCOMMON",
    rarityClass: "rar-uc",
    desc: `
    深林域において確認された鋸歯ネコ型生物。

    本個体は典型的な捕食性外観を有するが、活動時間の大半は休眠状態にあり、
    実際の運動性および捕食行動頻度は極めて低い。

    鋸歯配列には個体差が顕著であり、ランダム性は認められず、
    幾何学的整列または美的秩序に基づく配置である可能性が高い。
    当該構造は防御機能ではなく、個体識別または種内シグナル伝達に関与していると推定される。
  `,
    abilities: ["シャドーステイシス", "ねむりうごき"],
    habitat: "深林",
    size: "166mm",
    mobility: "緩慢",
    status: "● ACTIVE",
    statusColor: "var(--g)",
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
  },

  {
    no: "004",
    sort: 100,
    createdAt: "2026-05-13",
    plant: 40,
    animal: 70,
    danger: 15,
    notes:
      "植物の特性を持ちながら、動物的な行動も示す、非常に興味深い生き物だ。私はこの生物群のことを「鋸歯生物」と呼称することにした。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_004.png",
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
    tag: "BEAST-DOMINANT",
    jp: "キンタ魔丸",
    en: "GoldenBall Magan",
    desc: `
      めちゃくちゃキンタマがでかい悪魔。<br>
      めちゃくちゃキンタマがデカい。
    `,
    abilities: ["オーバーリバランス", "りょくばくぞうふく"],
    habitat: "禁域森林",
    size: "4.1m",
    mobility: "群体統率",
    status: "● MONARCH",
    statusColor: "#e0b94f",
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
    abilities: ["エアロバランサー", "かぜのり"],
    habitat: "領空",
    size: "160mm",
    mobility: "高速飛行",
    status: "● MONARCH",
    statusColor: "#e0b94f",
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
  },

  {
    no: "009",
    sort: 90,
    createdAt: "2026-05-13",
    plant: 35,
    animal: 80,
    danger: 30,
    notes:
      "クマがいると思い逃げようとしたが、どうやらこれも鋸歯生物の一種のようだ。クマのような見た目をしているが、常に二足歩行をし、集団生活をおこなっている。アガベスト",
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_009.png",
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
  },

  {
    no: "021",
    sort: 210,
    createdAt: "2026-05-16",
    plant: 75,
    animal: 70,
    danger: 15,
    rarity: "COMMON",
    rarityClass: "rar-c",
    image: "images/no_021.png",
    tag: "SUCCULENT-TYPE",
    jp: "グラねっこ",
    en: "Granekko",
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
    notes:
      "見た目は完全にネコだが、触れると塊根植物に近い弾力を持っていた。水分状態によって機嫌が極端に変化するらしく、水切れ直前には明確な威嚇反応を示した。アガベスト",
    habitat: "乾燥地帯",
    size: "212mm",
    mobility: "緩慢",
    status: "● THIRSTY",
    statusColor: "#d6b85a",
  },
];
