// firebaseとReactを連携するための設定を記述
// 基本的にfirebaseのサイトからコードを取得
// 必要な機能のimport,exportを行う

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCjBnfbp0kuSuDJKtkPQ0PvbCCmKkNXj0U",
    authDomain: "my-app-56857.firebaseapp.com",
    projectId: "my-app-56857",
    storageBucket: "my-app-56857.appspot.com",
    messagingSenderId: "81055792376",
    appId: "1:81055792376:web:475946720a7bd216ae8f0d",
    measurementId: "G-V8WRMS5298"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export {auth,provider,db};