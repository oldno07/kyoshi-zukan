# SOLD OUT個体のshopUrl/soldOutデータ登録 実装メモ

日付：2026年7月28日
ブランチ：`claude/mobile-firstview-ec-redesign-f1l7y6`
対象：`astro-src/src/content/creatures/*/index.md`

## 経緯

「販売状態が入っていない個体のリンクをECトップリンクにしてSOLDOUTのステータスにしてほしい」という依頼に対し、当初は

1. `shopUrl` が未設定の17個体に `shopUrl: "https://agavest.stores.jp/"`（STORESトップ）と `soldOut: true` を追加（データ登録）
2. あわせて `.cd-shop-soldout` / `.cd-transfer-mini-soldout`（SOLD OUT表示）を `<div>` から `<a href={data.shopUrl}>` に変更し、実際にSTORESトップへ遷移できるようにする（テンプレート・CSS変更）

の両方を実装し、PR #18としてmainへマージした。

### 差し戻し

マージ後、依頼者より「意味が違う。リンクは登録だけでいい。SOLD OUTパネルを実際にクリック可能なリンクにするのは不要。ここは将来、販売情報を告知するメール登録リンクを表示したいエリアなので、今リンク化すると後で作り直しになる。作業ファイルは生物のmdだけでよい」との指摘を受けた。

これを受けて、テンプレート（`astro-src/src/pages/zukan/[slug].astro`）とCSS（`astro-src/src/styles/global.css`）に加えた変更のみを取り消し、mdファイルのデータ登録（`shopUrl` / `soldOut: true`）はそのまま維持した。

## 最終的な状態

### 変更したもの（維持）

`shopUrl` が未設定だった17個体の frontmatter に以下を登録。

```yaml
shopUrl: "https://agavest.stores.jp/"
soldOut: true
```

対象：No.005, 006, 007, 008, 009, 010, 011, 012, 014, 016, 017, 018, 020, 022, 023, 024, 025
（005 / 006 / 012 は既に `soldOut: true` だったため `shopUrl` の追加のみ。残り14件は `shopUrl` 追加とあわせて `soldOut: false → true` に変更）

### 取り消したもの（PR #18の一部をrevert）

- `.cd-shop-soldout`（デスクトップ）と `.cd-transfer-mini-soldout`（モバイル）を `<a href={data.shopUrl}>` にしてSTORESトップへのリンクにする変更
- CTA文言「ほかの個体を見る →」「この個体の販売は終了しました。ほかの個体はこちら →」の追加
- CSS側の `.cd-shop-soldout { display:block; text-decoration:none; }` 追加

いずれも `git diff` でPR #18直前のコミットと完全に一致（差分ゼロ）することを確認済み。SOLD OUTパネルは元通り非クリックの `<div>` 表示に戻っている。

## 理由

SOLD OUT表示エリアは将来的に「販売情報を告知するメール登録」へのリンクを表示する想定になっており、現時点でSTORESトップへの汎用リンクとして実装してしまうと、のちにメール登録機能を実装する際に作り直しが必要になる。そのため、今回は `shopUrl` のデータだけを frontmatter に登録しておき、表示側（リンク化）の実装は見送ることになった。

`shopUrl` の値自体（STORESトップURL）は、将来の判断次第でメール登録リンクに差し替えられる想定。

## 変更ファイル

- `astro-src/src/content/creatures/{005,006,007,008,009,010,011,012,014,016,017,018,020,022,023,024,025}-*/index.md`（データ登録・維持）
- `astro-src/src/pages/zukan/[slug].astro`（PR #18分をrevert・変更なしの状態に復元）
- `astro-src/src/styles/global.css`（PR #18分をrevert・変更なしの状態に復元）
