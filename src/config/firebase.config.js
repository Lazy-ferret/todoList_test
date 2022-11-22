import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCDbwhArUEJrvqPbSYh9p1WEfMPKRBLcY0",
    authDomain: "woman-up-todo-list-503ad.firebaseapp.com",
    projectId: "woman-up-todo-list-503ad",
    storageBucket: "woman-up-todo-list-503ad.appspot.com",
    messagingSenderId: "174134851138",
    appId: "1:174134851138:web:c3671575054e0deda45fdb"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
