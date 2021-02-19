self.addEventListener('install', e => {
    e.waitUntil(
      caches.open('pwa').then(cache => {
        return cache.addAll([
          '/',
          '/manifest.json',
          '/serviceWorker.js',
          '/index.html',
          '/favicon.ico',
          '/128.png',
          '/144.png',
          '/152.png',
          '/192.png',
        ])
        .then(() => self.skipWaiting());
      })
    )
});

self.addEventListener('activate',  event => {
    event.waitUntil(self.clients.claim());
  });

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
});