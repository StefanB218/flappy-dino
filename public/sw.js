const CACHE_NAME = 'flappy-dino-cache-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  './style.css',
  './favicon.png',
  './src/main.ts',
  './manifest.json',
  './favicon1.png',
  './favicon2.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
