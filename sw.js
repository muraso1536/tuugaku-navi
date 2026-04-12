const CACHE_NAME = 'tuugaku-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './icon-192.png'
];

// インストール時にファイルをキャッシュに保存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// オフラインの時はキャッシュからデータを返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});