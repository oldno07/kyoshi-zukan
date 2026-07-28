# status_label 日本語併記 実装メモ

日付：2026年7月28日
ブランチ：`claude/mobile-firstview-ec-redesign-f1l7y6`
対象：全個体 `astro-src/src/content/creatures/0*/index.md`（25件、sym-001〜003は対象外＝status_label自体を持たない）

## 経緯

事前に確認フェーズ（ファイル変更禁止）で、既存の `status_label` 値を全個体分洗い出し、鋸歯生物図鑑の世界観（研究記録・生物観測・個体管理のトーン）に沿った日本語併記案を提示。ユーザーが全推奨案を承認したため、mdファイルへ反映・コミット・マージまで実施。

## 反映内容

`status_label:` の値を `英語 / 日本語` 形式に変更（英語表記は保持）。

| 変更前 | 変更後 | 対象個体数 |
| --- | --- | --- |
| ACTIVE | ACTIVE / 活性状態 | 7 |
| STABLE | STABLE / 安定状態 | 6 |
| MONARCH | MONARCH / 支配個体 | 4 |
| AGITATED | AGITATED / 興奮状態 | 2 |
| MONITOR | MONITOR / 監視個体 | 2 |
| THIRSTY | THIRSTY / 渇水状態 | 2 |
| MYTHIC | MYTHIC / 神話級 | 1 |
| DORMANT | DORMANT / 休眠状態 | 1 |

対象25ファイル、各1行（`status_label:`）のみ変更。他のfrontmatterフィールド・本文は無変更。

### 翻訳判断の根拠（要点）

- 直訳を避け、体言止め・漢字表記（〜状態／〜個体）で統一し「研究記録」トーンに合わせた
- `status_color` の色分け（緑=平常／赤=警戒／琥珀=要ケア／金=特筆個体）を手がかりに語の温度感を判断
  - MYTHIC/MONITOR/MONARCH は全て金色（`#e0b94f`）＝「特筆個体」グループ → MONITORは受動的な「観察対象」ではなく「監視個体」を採用
  - THIRSTY/DORMANTは琥珀（`#d6b85a`）＝「要ケア」グループ
- rarity（LEGEND/EPIC等）と語感が衝突する訳語は回避（例：MYTHIC→「伝説級」はrarityのLEGENDと紛らわしいため不採用、「神話級」を採用）
- MONARCHは動物行動学の「優位個体（dominant individual）」に着想し「支配個体」を採用。同系統内の上位/進化形個体（フィリグリズリー系・鯨系など）に付与されている実データとも整合

## 表示への影響確認

`status_label` は `astro-src/src/pages/zukan/[slug].astro` の2箇所（名前エリア内バッジ `.cd-status-badge--inline` と、モバイル用の写真エリアオーバーレイバッジ `.cd-status-badge--overlay`）でそのまま文字列展開されている。日本語併記化で文字数が増えるため、特にモバイルのオーバーレイバッジ（絶対配置・幅制約なし）でのはみ出しを確認。

- 最長ケース「● MONARCH / 支配個体」（No.011）で確認
- 320px幅・375px幅いずれも、バッジ右端が写真エリア（`.cd-hero-r`）の右端を超えずに収まることを実測確認（はみ出しなし）
- 見た目上も違和感なく収まることをスクリーンショットで確認

他にstatus_labelを参照する箇所（一覧ページ・フィルタ等）がないことも `grep` で確認済み（`content/config.ts` のスキーマ定義と `[slug].astro` の2箇所のみ）。

## 変更ファイル

- `astro-src/src/content/creatures/001-snyaggletooth/index.md` 〜 `025-platybat-mosswing/index.md`（25ファイル、各1行）
