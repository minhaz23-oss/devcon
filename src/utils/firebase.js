import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "demoupload-eda06.firebaseapp.com",
  projectId: "demoupload-eda06",
  storageBucket: "demoupload-eda06.appspot.com",
  messagingSenderId: "210838981892",
  appId: "1:210838981892:web:9808d51dd354d7f918d451"
};

export const app = initializeApp(firebaseConfig);