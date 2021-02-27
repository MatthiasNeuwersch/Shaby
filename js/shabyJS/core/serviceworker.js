let cache = 'shaby-cache';

let filesToCache = [
    'index.html'
];

self.addEventListener('install', function(e) {
    //console.log('Install!');
    e.waitUntil(
        caches.open(cache).then(function(cache) {
            //console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache).then(() => console.log('Assets added to cache'))
                .catch(err => console.log('Error while fetching assets', err));
        })
    );
});
self.addEventListener("activate", event => {
    // console.log('Activate!');
});
self.addEventListener('fetch', function(event) {
    // console.log('Fetch!', event.request);
});