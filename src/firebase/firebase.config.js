// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB15U_EfYIyTFoMDzMAXUTgSv9T5RUzXcQ",
  authDomain: "scic-job-task-2.firebaseapp.com",
  projectId: "scic-job-task-2",
  storageBucket: "scic-job-task-2.appspot.com",
  messagingSenderId: "991159598435",
  appId: "1:991159598435:web:ed8cf6ac2fb90544166756",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
