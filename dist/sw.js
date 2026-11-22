const prefix = "passo-study:" + self.registration.scope + ":";
const cacheName = prefix + "campus-v2";
const assets = ["index.html", "app.js", "course.js", "style.css", "campus.css", "roma.webp", "atlas.js", "practice.js", "academy.js", "manifest.webmanifest", "icon192.png", "icon512.png"];
self.addEventListener("install", event => event.waitUntil((async () => {
  const cache = await caches.open(cacheName);
  await cache.addAll(assets.map(path => new Request(new URL(path, self.registration.scope), {cache: "reload"})));
  await self.skipWaiting();
})()));
self.addEventListener("activate", event => event.waitUntil((async () => {
  for (const name of await caches.keys()) {
    if (name.startsWith(prefix) && name !== cacheName) await caches.delete(name);
  }
  await self.clients.claim();
})()));
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  const entry = new URL("index.html", self.registration.scope).href;
  const target = event.request.mode === "navigate" ? entry : event.request.url;
  event.respondWith(caches.open(cacheName).then(async cache => (await cache.match(target)) || fetch(event.request)));
});
