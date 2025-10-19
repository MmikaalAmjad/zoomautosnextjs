import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyASfCwu8kA8hjZWtWMUSR0Sh4v_V8sGANw",
  authDomain: "zoomautos-186eb.firebaseapp.com",
  projectId: "zoomautos-186eb",
  storageBucket: "zoomautos-186eb.appspot.com",
  messagingSenderId: "299531883684",
  appId: "1:299531883684:web:74e4634888e394148fc231",
  measurementId: "G-C7XNTS7HWH",
  databaseURL: "https://zoomautos-186eb-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
