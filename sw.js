const CACHE_NAME = 'kinen-v2';
const ASSETS = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './bg-hero.png',
  './bg-hero-male.jpg',
  './bg-hero-male-v2.jpg',
  './bg-hero-warm.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
