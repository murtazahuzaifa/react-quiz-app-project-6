

const cacheName = 'v1';

/*
const cacheAssets = [
  'serviceRegister.js',

  '/index.html',
  '/static/js/bundle.js',
  '/static/js/0.chunk.js',
  '/static/js/main.chunk.js',
  '/App.js',
  '/',


];

*/


const cacheAssets = [
  './static/css/main.3d0797e8.chunk.css',
  './static/js/2.c37db9c6.chunk.js',
  './static/js/main.7f068d44.chunk.js',
  './static/media/bg.941bbe01.jpg',
  './index.html',
  'favicon.ico',
  'logo192.png',
  'logo512.png',
  'manifest.json',
  'precache-manifest.48baa4ceca12dd1a5bd024edd84bf245.js',
  'robots.txt',
  '/'
];


// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});


self.addEventListener('fetch', function (e) {
  console.log('[ServiceWorker] Fetch', e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(

    // Check in cache for the request being made
    caches.match(e.request)

      .then(function (response) {

        // If the request is in the cache
        if (response) {
          console.log("[ServiceWorker] Found in Cache", e.request.url, response);
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        return fetch(requestClone)
          .then(function (response) {

            if (!response) {
              console.log("[ServiceWorker] No response from fetch ")
              return response;
            }

            var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function (cache) {

              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log('[ServiceWorker] New Data Cached', e.request.url);

              // Return the response
              return response;

            }); // end caches.open
          })
          .catch(function (err) {
            console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
});


// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});






