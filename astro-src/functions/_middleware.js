// 旧ドメイン kyoshi-zukan.pages.dev への直接アクセスを
// 新ドメイン pelicanworks.site へ301リダイレクトする。
//
// Host の完全一致でのみ判定する。サブドメイン付きのプレビューURL
// （例: xxxxxxxx.kyoshi-zukan.pages.dev, feat-domain-migration.kyoshi-zukan.pages.dev）は
// この文字列と完全一致しないため対象外となり、そのまま配信される。
const OLD_HOST = 'kyoshi-zukan.pages.dev';
const NEW_ORIGIN = 'https://pelicanworks.site';

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (url.hostname === OLD_HOST) {
    const destination = NEW_ORIGIN + url.pathname + url.search;
    return Response.redirect(destination, 301);
  }

  return next();
}
