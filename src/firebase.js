import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAGmRcb5e41Jcz_LOuS3cXw2Cqcc58zmgs',
  authDomain: 'uc2bir-dd7ee.firebaseapp.com',
  projectId: 'uc2bir-dd7ee',
  storageBucket: 'uc2bir-dd7ee.appspot.com',
  messagingSenderId: '197190928694',
  appId: '1:197190928694:web:da3d1769f371f1ecaccb97',
  measurementId: 'G-R79XC04VG0',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
  return messaging
    .getToken({
      vapidKey:
        'BO2M89XXUOTn1fRFihylclenhz6OJlJiAXdDMfvtgLAk6EaHHTlcbLPN5JodJRznz4ltc3W6Y6QYBw8wRTyfMXA',
    })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        // console.log(
        //   'No registration token available. Request permission to generate one.'
        // );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    });
  // .catch((err) => {
  //   // console.log('An error occurred while retrieving token. ', err);
  //   // catch error while creating client token
  // });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });
