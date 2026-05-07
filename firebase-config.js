// Firebase Configuration
// Replace with your Firebase project credentials from console.firebase.google.com

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
export const initializeFirebase = () => {
  firebase.initializeApp(firebaseConfig);
  return {
    auth: firebase.auth(),
    db: firebase.firestore(),
    realtimeDb: firebase.database()
  };
};

export const { auth, db, realtimeDb } = initializeFirebase();
