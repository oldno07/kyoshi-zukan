# CLAUDE.md — 鋸歯生物図鑑 プロジェクトルール

## CSS変更の禁止（恒久ルール）

機能修正・データ構造修正のタスクでは、既存のCSS（配色・フォント・余白・コンポーネントの見た目）を変更しないこと。

コミット前に必ず `git diff` でCSS差分を確認し、意図しない変更が混ざっていたら元に戻すこと。

デザイン変更が必要な場合は、必ず独立したタスクとして明示的に依頼されない限り行わないこと。

## プロジェクト概要

- Astroプロジェクト: `astro-src/`
- ホスティング: Cloudflare Pages。正式ドメインは `pelicanworks.site`（2026年7月ドメイン移行）。
  旧ドメイン `kyoshi-zukan.pages.dev` は同一プロジェクトに残存中（ドメイン単位のリダイレクトは別タスクで対応予定）
- コンテンツ: `astro-src/src/content/creatures/[slug]/index.md`
- `data/entries.js`（リポジトリルート）— **旧サイトの残骸ではなく現役の依存**。
  `astro-src/scripts/generate-content.mjs` がこれを読んで creatures のmdと `public/_redirects` を生成する。
  旧サイト一式を整理した際も、このファイルだけは残してある。削除しないこと
- 旧サイトのHTML・JS一式（ルートの `*.html` `js/` `components/` `data/config.js` `data/news.js`）は
  2026-07 に削除済み。資産は `astro-src/public/` へ一本化されている
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

| フェーズ | 内容 | 状態 |
|---------|------|------|
| 1 | creaturesコレクション移行・OGP・リダイレクト | ✅ 完了 |
| 2 | 情報設計の再設計・タグ・関連生物表示 | ✅ 完了 |
| 3 | シリーズ・発見数カウンター・一覧ページ | ✅ 完了（`zukan/index.astro`。ルートの `index.astro` はハブページなので混同しないこと） |
| 4 | news/reports移行・EC連携 | 未着手 |
