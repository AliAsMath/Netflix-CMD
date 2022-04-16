import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyD4I39CpYZWdwHkkH8hEnEl2uAE5UQZRKw",
  authDomain: "netflix-9db44.firebaseapp.com",
  projectId: "netflix-9db44",
  storageBucket: "netflix-9db44.appspot.com",
  messagingSenderId: "220174111322",
  appId: "1:220174111322:web:20f86ab306fdd68f7ebe63",
  measurementId: "G-VMV0SV8BYW",
};
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export default storage;
