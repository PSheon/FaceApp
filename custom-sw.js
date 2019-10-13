importScripts("/FaceFinder/precache-manifest.a99a6182a1f7abb3ec8e4a38c3fb6f59.js", "/FaceFinder/workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "/FaceFinder/workbox-v4.3.1"});
/* eslint-disable no-undef */
// See https://developers.google.com/web/tools/workbox/guides/configure-workbox

self.addEventListener('install', event => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', event =>
  event.waitUntil(self.clients.claim())
);

workbox.routing.registerRoute(
  new RegExp('.html$'),
  workbox.strategies.cacheFirst({
    cacheName: 'poc-cache-html',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true
      })
    ]
  })
);
workbox.routing.registerRoute(
  new RegExp('.css$'),
  workbox.strategies.cacheFirst({
    cacheName: 'poc-cache-Stylesheets',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7, // cache for one week
        maxEntries: 20, // only cache 20 request
        purgeOnQuotaError: true
      })
    ]
  })
);
workbox.routing.registerRoute(
  new RegExp('.(png|svg|jpg|jpeg)$'),
  workbox.strategies.cacheFirst({
    cacheName: 'poc-cache-Images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true
      })
    ]
  })
);
workbox.routing.registerRoute(
  new RegExp('/models'),
  workbox.strategies.cacheFirst({
    cacheName: 'poc-cache-Images',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true
      })
    ]
  })
);

workbox.routing.registerRoute('/', workbox.strategies.networkFirst());
// We need this in Webpack plugin (refer to swSrc option): https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config
workbox.precaching.precacheAndRoute(self.__precacheManifest);
