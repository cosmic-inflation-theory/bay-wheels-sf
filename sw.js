/* BayGlide service worker — receives Web Push and shows low-availability alerts.
   Served from the site root (/bay-wheels-sf/sw.js) so its scope covers the report
   page. Kept dependency-free and tiny. */

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = {}; }
  const title = d.title || 'BayGlide';
  const options = {
    body: d.body || '',
    tag: d.station_id || 'bayglide-alert',   // collapse repeats for the same station
    renotify: true,
    data: { lyftUrl: d.lyftUrl, mapUrl: d.mapUrl },
    actions: [
      { action: 'lyft', title: 'Open Lyft' },
      ...(d.mapUrl ? [{ action: 'map', title: 'Where' }] : []),
    ],
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const d = event.notification.data || {};
  let url = d.lyftUrl || '/';
  if (event.action === 'map' && d.mapUrl) url = d.mapUrl;
  event.waitUntil(self.clients.openWindow(url));
});
