const CACHE_NAME = 'calculator-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/calculator.js',
  'https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.1/math.min.js'
];

// تثبيت الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// تفعيل الكاش وحذف القديم لو موجود
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) return caches.delete(name);
        })
      )
    )
  );
});

// استرجاع الملفات من الكاش أو الشبكة
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          new Response('⚠️ No internet connection', {
            headers: { 'Content-Type': 'text/plain' }
          })
        )
      );
    })
  );
});
