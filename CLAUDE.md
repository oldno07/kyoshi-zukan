# CLAUDE.md — 鋸歯生物図鑑 プロジェクトルール

## CSS変更の禁止（恒久ルール）

機能修正・データ構造修正のタスクでは、既存のCSS（配色・フォント・余白・コンポーネントの見た目）を変更しないこと。

コミット前に必ず `git diff` でCSS差分を確認し、意図しない変更が混ざっていたら元に戻すこと。

デザイン変更が必要な場合は、必ず独立したタスクとして明示的に依頼されない限り行わないこと。

## プロジェクト概要

- Astroプロジェクト: `astro-src/`
- ホスティング: Cloudflare Pages（`kyoshi-zukan.pages.dev`）
- コンテンツ: `astro-src/src/content/creatures/[slug]/index.md`
- スタイル:
  - `astro-src/src/styles/global.css` — Astroプロジェクト共通スタイル
  - `css/style.css` — 旧サイト共通スタイル（index.astroのヒーロー等で使用）

## デプロイ

```bash
cd astro-src && npm run build
npx wrangler pages deploy dist/ --project-name=kyoshi-zukan --branch=<branch-name> --commit-dirty=true
```

## フェーズ管理

要件書: `md/鋸歯生物図鑑_Astroリニューアル要件書_改訂版.md`

| フェーズ | 内容 | 状態 |
|---------|------|------|
| 1 | creaturesコレクション移行・OGP・リダイレクト | ✅ 完了 |
| 2 | 情報設計の再設計・タグ・関連生物表示 | ✅ 完了 |
| 3 | シリーズ・発見数カウンター・一覧ページ | ✅ 完了（index.astro） |
| 4 | news/reports移行・EC連携 | 未着手 |
