-- 譲渡通知システム 初期スキーマ
--
-- species_id は content/creatures/[slug]/index.md の `no` の値をそのまま使う
-- （図鑑ナンバーは個体IDではなく品種そのものを指す。再入荷は同じページの
-- soldOut を true→false に更新する運用のため、species マスタは持たない。
-- 正本はcontent collection側、D1にはspecies_id文字列のみ保持する）。
--
-- confirmed_at 相当のカラムは今回追加しない（ダブルオプトイン未実装）。
-- 将来必要になった場合は ALTER TABLE で追加する。

CREATE TABLE subscriptions (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  species_id         TEXT NOT NULL,
  email              TEXT NOT NULL,
  created_at         TEXT NOT NULL DEFAULT (datetime('now')),
  last_notified_at   TEXT,
  unsubscribe_token  TEXT NOT NULL UNIQUE,
  unsubscribed_at    TEXT,
  UNIQUE(species_id, email)
);

-- 通知送信対象（未解除の購読者）を species_id で絞り込むためのインデックス
CREATE INDEX idx_subscriptions_species_active
  ON subscriptions(species_id)
  WHERE unsubscribed_at IS NULL;

CREATE TABLE notification_logs (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  species_id       TEXT NOT NULL,
  sent_at          TEXT NOT NULL DEFAULT (datetime('now')),
  recipient_count  INTEGER NOT NULL,
  success          INTEGER NOT NULL -- 0 or 1
);

CREATE INDEX idx_notification_logs_species
  ON notification_logs(species_id);
