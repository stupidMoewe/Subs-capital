import firebase from "firebase";

var config = {
    apiKey: "AIzaSyCtxFvv604OQXpvZ2q3kGQgd0uS6VXSm2s",
    authDomain: "subs-7fed6.firebaseapp.com",
    projectId: "subs-7fed6",
    storageBucket: "subs-7fed6.appspot.com",
    messagingSenderId: "273761528579",
    appId: "1:273761528579:web:9d7ce428453fa43fe89736",
    measurementId: "G-06MQ2PPXE7",
};
const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

firebase.analytics().logEvent("notification_received");

export { db };
