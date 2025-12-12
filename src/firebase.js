import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// GANTI DENGAN CONFIG KAMU
const firebaseConfig = {
  apiKey: "AIzaSyD5OuXA5DW0aW0F3xLDJYWJ03fZmMGxRx4",
  authDomain: "student-management-26ac6.firebaseapp.com",
  databaseURL: "https://student-management-26ac6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "student-management-26ac6",
  storageBucket: "student-management-26ac6.firebasestorage.app",
  messagingSenderId: "567433156802",
  appId: "1:567433156802:web:63f5dd2d6d0d4953dac35b"
};


const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { db }