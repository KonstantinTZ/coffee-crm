import { initializeApp } from 'firebase/app';
import { getAuth, EmailAuthProvider } from 'firebase/auth';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

// todo перенести в env переменную
const firebaseConfig = {
  apiKey: "AIzaSyDMNYerKGBceZ-W2sNE0omnJ5Og1Y89CyU",
  authDomain: "fir-test-cbe9b.firebaseapp.com",
  projectId: "fir-test-cbe9b",
  storageBucket: "fir-test-cbe9b.firebasestorage.app",
  messagingSenderId: "1097233531016",
  appId: "1:1097233531016:web:7e4026ea981c2f53a91f3d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const emailProvider = new EmailAuthProvider();

// Включаем оффлайн-режим (опционально)
// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.log('Оффлайн-режим уже включен в другой вкладке');
//   }
// });