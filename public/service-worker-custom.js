/** workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

const { routing, core } = workbox

core.skipWaiting()

routing.registerRoute(
  // Cache CSS files
  /.*\.css/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'quiz-css-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 3600,
      })
    ]
  })
)

routing.registerRoute(
  // Cache image files
  /.*\.(?:png|jpg|jpeg|svg|gif)/,
  // Use the cache if it's available
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'quiz-image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images
        maxEntries: 20,
        maxAgeSeconds: 3600,
      })
    ],
  })
)

routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'quiz-font-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 86400,
      }),
    ],
  })
)

routing.registerRoute(
  /\w+.\w+.(chunk.js)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'quiz-js-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 3600, /** 20min */
      })
    ]
  })
)


routing.registerRoute(
  /^(https:\/\/)/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'quiz-pre-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 86400, /** 20min */
      })
    ]
  })
)


self.addEventListener('activate', (event) => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of `pindura-cache-${Date.now()}`
  const expectedCacheNames = [
    'quiz-css-cache',
    'quiz-image-cache',
    'quiz-font-cache',
    'quiz-pre-cache',
    'quiz-js-cache'
  ]

  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (expectedCacheNames.indexOf(key) === -1) {
          return caches.delete(key)
        }
      })
    )).then(() => {
      console.log('< CACHE UPDATED >')
    })
  )

})