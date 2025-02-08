// public/service-worker.js

self.addEventListener('push', function(event) {
    let data = {};
    if (event.data) {
      data = event.data.json();
    }
    console.log('Push event!! ', data);
    const title = data.title || 'Thông báo mới';
    const options = {
      body: data.body || 'Bạn có thông báo mới!',
      icon: data.icon || '/icon.png',  // đặt icon thông báo
      data: data.url || '/'
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  });
  