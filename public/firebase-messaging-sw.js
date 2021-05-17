importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyAGmRcb5e41Jcz_LOuS3cXw2Cqcc58zmgs",
  authDomain: "uc2bir-dd7ee.firebaseapp.com",
  projectId: "uc2bir-dd7ee",
  storageBucket: "uc2bir-dd7ee.appspot.com",
  messagingSenderId: "197190928694",
  appId: "1:197190928694:web:da3d1769f371f1ecaccb97",
  measurementId: "G-R79XC04VG0"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  // console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});