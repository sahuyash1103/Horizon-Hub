// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const env = require("./../utils/get-env");

const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

function initFirebase() {
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
}

module.exports = { initFirebase };