import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCWs8gniLG0XX5vGL-srkCm-8uNnpRdkaU",
  authDomain: "works-management-bab25.firebaseapp.com",
  projectId: "works-management-bab25",
  storageBucket: "works-management-bab25.appspot.com",
  messagingSenderId: "239058031156",
  appId: "1:239058031156:web:44a0993c91f9e460dd3061"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth