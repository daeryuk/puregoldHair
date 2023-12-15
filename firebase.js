import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBUHKPTbK1Y8VHMnd9y4ERgPyCqcYos8p4",
  authDomain: "soongeumhairshop.firebaseapp.com",
  databaseURL: "https://soongeumhairshop-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "soongeumhairshop",
  storageBucket: "soongeumhairshop.appspot.com",
  messagingSenderId: "123677295650",
  appId: "1:123677295650:web:a6b1072c9b4dd18251367b",
  measurementId: "G-EVPEXYC213"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);