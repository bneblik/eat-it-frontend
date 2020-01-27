if ('function' === typeof importScripts) {
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');
  if (workbox) {
    console.log('Workbox is loaded');
    workbox.precaching.precacheAndRoute([]);

    // custom cache rules
    workbox.routing.registerNavigationRoute('/index.html');

    workbox.routing.registerRoute(
      new RegExp('http://localhost:3000/api/v1/meals'),
      new workbox.strategies.StaleWhileRevalidate({
        cacheName: 'mealsCache',
        plugins: [new workbox.broadcastUpdate.Plugin('cache-update-plugin')]
      })
    );
  } else {
    console.log('Workbox could not be loaded. No Offline support');
  }
}

if ('serviceWorker' in navigator) {
  const updatesChannel = new BroadcastChannel('cache-update-plugin');
  updatesChannel.addEventListener('message', async (event) => {
    const { cacheName, updatedURL } = event.data.payload;
    const cache = await caches.open(cacheName);
    await cache.match(updatedURL);
  });
}

function sendPushNotification(e, title, message) {
  const options = {
    body: message,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [{ action: 'close', title: 'Close' }]
  };
  e.waitUntil(self.registration.showNotification(title, options));
}

self.addEventListener('push', function(e) {
  sendPushNotification(e, 'Hi', 'example message');
});
