// Import Firebase scripts for service worker
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js");

// Initialize Firebase inside the service worker
firebase.initializeApp({
  apiKey: "AIzaSyASfCwu8kA8hjZWtWMUSR0Sh4v_V8sGANw",
  authDomain: "zoomautos-186eb.firebaseapp.com",
  projectId: "zoomautos-186eb",
  storageBucket: "zoomautos-186eb.appspot.com", // ✅ fixed
  messagingSenderId: "299531883684",
  appId: "1:299531883684:web:74e4634888e394148fc231",
  measurementId: "G-C7XNTS7HWH"
});

const messaging = firebase.messaging();

// ✅ Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background FCM received:", payload);

  const notificationTitle = payload.notification?.title || "Zoom Autos";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new job update",
    icon: "/Logo4.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  // Forward payload to open clients (React app)
  self.clients.matchAll({ includeUncontrolled: true }).then((clients) => {
    clients.forEach((client) => {
      client.postMessage(payload.data);
    });
  });
});
