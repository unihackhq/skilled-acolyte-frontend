'use strict';

// noop service worker. No caching at all
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
  self.clients.matchAll({ type: 'window' }).then((windowClients) => {
    for (const windowClient of windowClients) {
      windowClient.navigate(windowClient.url);
    }
  });
});

// notification stuff
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }
  const payload = event.data.json();
  const { event: eventId, topic, title, body } = payload;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/img/favicon-96x96.png',
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clientList) => {
      if (clientList.length > 0) {
        return clientList[0].focus();
      }

      return self.clients.openWindow('/');
    })
  );
});
