// MASTER PT: network-first HTML, offline fallback; no manual cache version edits.
const CACHE = 'master-pt-app-shell-v1-9-26';
const SHELL = ['./index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png','./equipment/5749.jpg','./equipment/5748.jpg','./equipment/5747.jpg','./equipment/5746.jpg','./equipment/5745.jpg','./equipment/5744.jpg','./equipment/5743.jpg','./equipment/5742.jpg','./equipment/5741.jpg','./equipment/5740.jpg','./equipment/5739.jpg','./equipment/5738.jpg','./equipment/5737.jpg','./equipment/5736.jpg','./equipment/5735.jpg','./equipment/5734.jpg','./equipment/5733.jpg','./equipment/5732.jpg','./equipment/5731.jpg','./equipment/5730.jpg','./equipment/5729.jpg','./equipment/5728.jpg','./equipment/5727.jpg','./equipment/5726.jpg','./equipment/5725.jpg','./equipment/5724.jpg','./equipment/5723.jpg','./equipment/5722.jpg','./equipment/5721.jpg','./equipment/5720.jpg','./equipment/5719.jpg','./equipment/5718.jpg','./equipment/5717.jpg','./equipment/5716.jpg','./equipment/5715.jpg'];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(SHELL);
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith('master-pt-') && key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate' || url.pathname.endsWith('/index.html')) {
    event.respondWith((async () => {
      try {
        const response = await fetch(request, {cache:'no-store'});
        if (response.ok) {
          const cache = await caches.open(CACHE);
          await cache.put('./index.html', response.clone());
        }
        return response;
      } catch (err) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {return await fetch(request)} catch(err) {return Response.error()}
  })());
});
// MASTER PT v1.6 deployment revision
