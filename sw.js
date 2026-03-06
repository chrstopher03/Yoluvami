const CACHE_NAME = 'yoluvami-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './23.jpeg',
  './style.css'  // si tienes CSS externo, inclúyelo
];

// Instalación del SW
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => {
      console.log('Cache abierto');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación y limpieza de caches viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if(key !== CACHE_NAME){
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch para servir contenido cacheado
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      return response || fetch(event.request);
    })
  );
});