/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-restricted-globals */
const CACHE_NAME = 'pwa-notepad-cache-v1';
const CACHE_NAME_DYNAMIC = 'pwa-notepad-cache-dynamic';

const URLS = [
  '/',
  '/index.html',
];

self.addEventListener("install", async (_) => {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(URLS);
});

self.addEventListener('activate', async (_) => {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter(name => name !== CACHE_NAME && name !== CACHE_NAME_DYNAMIC)
      .map(name => caches.delete(name))
  )
});

self.addEventListener('fetch', event => {
  event.respondWith(cacheFirst(event.request));
});


async function cacheFirst(request) {
  const cached = await caches.match(request);



  
  try { 
    return cached ?? await fetch(request).then(response => {
      return networkFirst(request);
    });

  } catch (error) {
    console.log('no data in cache: ', error)
    return networkFirst(request);
  }
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME_DYNAMIC);
  try {
    const response = await fetch(request);
    await cache.put(request, response.clone());
    return response;
  } catch (error) {
    console.error('network request failed, trying to get data from cache');
    const cached = await cache.match(request);
    return cached ?? '404 not found';
  }
}
