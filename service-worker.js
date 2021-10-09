importScripts("/precache-manifest.043060ba8be1e74686b6b5f0560ebcaf.js");

importScripts('/workbox/workbox-sw.js');
workbox.setConfig({
  modulePathPrefix: '/workbox/'
});
// //
let { registerRoute } = workbox.routing;
let { NetworkFirst } = workbox.strategies;
let { CacheFirst } = workbox.strategies;
let { ExpirationPlugin } = workbox.expiration;
let { CacheableResponsePlugin } = workbox.cacheableResponse;

let googleAnalytics = workbox.googleAnalytics;
googleAnalytics.initialize();

registerRoute(
  '/js/sponsored.js',
  new NetworkFirst({
    cacheName: 'sponsored',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);
registerRoute(
  '/js/advertise.js',
  new NetworkFirst({
    cacheName: 'advertise',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  }),
);


// store images
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  }),
);





workbox.core.setCacheNameDetails({ prefix: "type.af" });

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, { ignoreURLParametersMatching: [/.*/] });

