const CACHE_NAME = "pim-cache-v2";

const urlsToCache = [
  "/",
  "/index.html",
  "/dashboard.html",
  "/style.css",
  "/script.js"
  "/producao.html"
  "/producao.css"
  "/producao.js"
  "/fornecedores.html"
  "/fornecedores.css"
  "/fornecedores.js"
  "/clientes.html"
  "/clientes.css"
  "/clientes.js"

];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});