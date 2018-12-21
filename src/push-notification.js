import firebase from 'firebase';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: '1001985884179' // troque pelo seu sender id 
  });

  // use other service worker
  navigator.serviceWorker
    .register('./registerServiceWorker.js')
    .then((registration) => {
      firebase.messaging().useServiceWorker(registration);
    });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {

    const messaging = firebase.messaging();

    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('user token: ', token);
    messaging.onMessage(payload => {
      console.log("Notification Received", payload.notification.body);
      //this is the function that gets triggered when you receive a 
      //push notification while you’re on the page. So you can 
      //create a corresponding UI for you to have the push 
      //notification handled.
      return payload.notification.body;
   });
  
  } catch (error) {
    console.error(error);
  }
}
