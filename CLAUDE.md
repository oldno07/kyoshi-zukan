# CLAUDE.md — 鋸歯生物図鑑 プロジェクトルール

## CSS変更の禁止（恒久ルール）

機能修正・データ構造修正のタスクでは、既存のCSS（配色・フォント・余白・コンポーネントの見た目）を変更しないこと。

コミット前に必ず `git diff` でCSS差分を確認し、意図しない変更が混ざっていたら元に戻すこと。

デザイン変更が必要な場合は、必ず独立したタスクとして明示的に依頼されない限り行わないこと。

## 記述を最新に保つ（恒久ルール）

本ファイルと `md/` 配下の要件書は、Claude Code が作業前に読む索引である。
古い記述が1つ残るだけで、済んだ仕事の再実行や、旧仕様に基づく実装が発生する。

- 作業により本ファイルの記述が事実と食い違ったら、**同じコミットで是正する**
- 要件書の記述が覆された場合、要件書本文は書き換えず、**冒頭に注記を挿入して
  旧仕様であることを明示する**（要件書は移行時点の設計記録であり、現行仕様の正ではない）
- 見出し・ファイル名を変更した場合、**それを名指しで参照している箇所を
  `grep` で洗い、同じコミットで追従させる**
- **状態を書いた記述には、確認した日付を添える。** 日付のない「未着手」「空」は、
  いつの観測か分からないまま残り続ける

2026年8月7日、この工程を欠いたことにより、要件書の旧仕様が実装へ残存し、
`/zukan/` と `/zukan/about/` で発見数が食い違う事故が発生した。

## プロジェクト概要

- Astroプロジェクト: `astro-src/`
- ホスティング: Cloudflare Pages。正式ドメインは `pelicanworks.site`（2026年7月ドメイン移行）。
  旧ドメイン `kyoshi-zukan.pages.dev` は同一プロジェクトに残存しているが、
  `astro-src/functions/_middleware.js` により Host ヘッダー完全一致で 301 リダイレクト済み
  （パス・クエリを保持。プレビューURLは対象外）。2026年7月24日対応完了
- コンテンツ: `astro-src/src/content/creatures/[slug]/index.md`
- **creatures の正は markdown**。`data/entries.js`（旧サイトの生物DB）と、それを読んで
  markdown・`_redirects` を生成していた `generate-content.mjs` は移行完了により 2026-07 に削除済み。
  新しい個体は `src/content/creatures/[slug]/index.md` を直接作成する
  （SYM-001〜003 はこの方式で追加された。markdown には entries.js に無い
  `tags` `series` `related` `category` `cover` 等がありスキーマが進化している）
- 旧サイト一式（ルートの `*.html` `js/` `components/` `data/`）と、リニューアル検討用の
  `prototype/` は 2026-07 に削除済み。資産は `astro-src/public/` へ一本化されている。
  リポジトリルートに残るのは `astro-src/`（本体）と `md/`（要件書）のみ
- スタイル:
  - `astro-src/src/styles/global.css` — Astro共通スタイル（BaseLayout・`/zukan/` トップ・ハブページが読み込む）
  - `astro-src/public/css/style.css` — 旧サイト共通スタイル（`/zukan/` の各Astroページが読み込む）
  - `astro-src/public/css/labo.css` — 研究所 `labo.html` 専用スタイル
  - `astro-src/public/js/labo.js` — 研究所 `labo.html` 専用スクリプト
    （どちらも旧称 `land.*`。研究所まわりの名称を `labo` に統一するため 2026-07 にリネーム）
  - ハブページ `astro-src/src/pages/index.astro` は `style.css` を読み込まず、
    ページ内の scoped style で自己完結している。`style.css` には素の `header {position:fixed}` や
    `footer {background}` があり、読み込むとハブのレイアウトを壊すため戻さないこと

### URL構造（2026年7月ドメイン移行後）

```
/                      ← PelicanWorks ハブページ
/zukan/                ← 図鑑トップ
/zukan/[slug]/         ← 各生物ページ（旧 /creatures/[slug]/ から移行、301リダイレクトあり）
/zukan/about/          ← 世界観ページ
/zukan/news/           ← NEWS
/labo                  ← 研究所（実体は astro-src/public/labo.html。Cloudflareのclean URL挙動で
                          `.html` なしで配信。canonical / og:url / og:image / twitter:image も
                          `/labo` に統一済み。旧 /land.html からは301リダイレクトあり）
```

## デプロイ

Cloudflare Pages に Git リポジトリ（`oldno07/kyoshi-zukan`）が連携済みで、ビルド構成も設定済みである。
**`main` への push で本番へ自動デプロイされる。手動デプロイの操作は不要**（2026-07 時点で稼働確認済み）。

> 以前は「ビルド構成が未設定のため自動デプロイは停止中、wrangler の手動実行のみが正」としていたが、
> ビルド構成が整備されたため解消済み。

### 現行フロー（フィーチャーブランチ運用）

```
フィーチャーブランチ（開発）
  → GitHub push（履歴管理・プレビュー確認）
  → main へマージして push
  → Cloudflare Pages が自動ビルド → 本番公開
```

マージ後は Cloudflare Pages のダッシュボードでビルド結果を確認すること。

### ローカルでの確認

```bash
cd astro-src && npm run dev        # 開発サーバ
cd astro-src && npm run build      # 本番と同じ生成物を dist/ に出力
```

### 手動デプロイ（フォールバック）

自動ビルドが失敗した場合など、必要なときのみ使用する。実行には Cloudflare の認証が必要。

```bash
cd astro-src && npm run build
npx wrangler pages deploy dist/ --project-name=kyoshi-zukan --branch=main --commit-dirty=true
```

## フェーズ管理

要件書: `md/鋸歯生物図鑑_Astroリニューアル要件書_改訂版.md`

| フェーズ | 内容                                         | 状態                                                                                    |
| -------- | -------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1        | creaturesコレクション移行・OGP・リダイレクト | ✅ 完了                                                                                 |
| 2        | 情報設計の再設計・タグ・関連生物表示         | ✅ 完了                                                                                 |
| 3        | シリーズ・発見数カウンター・一覧ページ       | ✅ 完了（`zukan/index.astro`。ルートの `index.astro` はハブページなので混同しないこと） |
| 4        | news/reports移行・EC連携                     | ✅ 完了（news.json一本化 2026-07／ECパネル刷新 2026-07／譲渡通知システム 2026-08） |

> **注：** 本表の「フェーズ1〜4」は Astroリニューアルの工程を指す。
> `oldno07/jarvis-core` の `core/architecture.md` 33章にも **Phase 0〜12** の
> 体系があるが、**あちらは JARVIS Core（AI運用基盤）の構築工程であり、
> 本表とは無関係の別体系である。** 番号で言及する際は、どちらの体系かを必ず明示すること。

## Claude Code向け指示書のルール

kyoshi-zukanリポジトリに対する実装・修正指示書には、末尾に以下の記録テンプレートを標準で含めること。

### 完了後の記録

以下に該当する場合のみ、`md/YYYY-MM-DD_[件名].md` を新規作成する。
該当しない場合（typo修正・リファクタ・軽微なバグ修正等）は記録不要。

【該当条件】

- 要件書・CLAUDE.mdの記述と食い違いが生まれた（仕様変更・確定・保留）
- 今後同種の判断が必要になった時に、経緯を知らないと再現できない意思決定をした

【記録フォーマット】

- 対象：
- 変更前の前提：
- 変更後の内容：
- 理由：
- 保留・未決事項（あれば）：

記録後、通常のコード変更と同じコミットに含めて自動pushしてよい（ボスのレビューは不要）。
