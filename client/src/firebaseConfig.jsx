import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyDM0A-87BAZuL1SsTBw_Eam-NxwJTMZTjA",
  authDomain: "textem-58be2.firebaseapp.com",
  projectId: "textem-58be2",
  storageBucket: "textem-58be2.appspot.com",
  messagingSenderId: "965500179584",
  appId: "1:965500179584:web:34b51ea35eb240ea7b8265",
  measurementId: "G-68EMQ8GV1S",
});

const storage = getStorage(app);
export default storage;
