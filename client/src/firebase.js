//import firebase from 'firebase/app'
//import 'firebase/auth'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAARMdx81V3qGCe0FP3aOzrRRZYFokjrSg",
  authDomain: "fyp-1-82732.firebaseapp.com",
  projectId: "fyp-1-82732",
  storageBucket: "fyp-1-82732.appspot.com",
  messagingSenderId: "486075527936",
  appId: "1:486075527936:web:250591dff697f4c7daf9e5",
  measurementId: "G-C1X3R6N972"
};

const app = firebase.initializeApp(firebaseConfig)

// export const auth = getAuth(app)
export const auth = app.auth()
export default app