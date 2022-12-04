// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAc6RGtzTKk-y3Y3V1ozlOKtg4Ntx5cEVM',
  authDomain: 'capstone-marketplace-house-app.firebaseapp.com',
  projectId: 'capstone-marketplace-house-app',
  storageBucket: 'capstone-marketplace-house-app.appspot.com',
  messagingSenderId: '689695420365',
  appId: '1:689695420365:web:09fa66f53a14e3341b5e84',
  measurementId: 'G-JWMRZ60HFB',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

export const db = getFireStore()
