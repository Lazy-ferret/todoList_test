import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../config/firebase.config"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

const storage = getStorage()

export const getTodoList = async () => {
    const querySnapshot = await getDocs(collection(db, 'todos'))
    const items = []
    try {
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch (e) {
        console.error(e)
    } finally {
        return items
    }
}

/**
 * save todo item to database
 * @param item todoItem
 */
export const saveTodoItem = async (item) => {
    const { id, ...rest } = item
    try {
        if (id !== undefined) {
            await setDoc(doc(db, "todos", id), rest)
        } else {
            await addDoc(collection(db, "todos"), rest)
        }
    } catch (e) {
        console.error(e)
    }
}

export const deleteTodoItem = async (item) => {
    try {
        await deleteDoc(doc(db, 'todos', item.id))
        if (item.attachment) {
            const desertRef = ref(storage, item.attachment)
            await deleteObject(desertRef)
        }
    } catch (e) {
        console.error(e)
    }
}

export const loadFile = async (file) => {
    try {
        const storageRef = ref(storage, file.name)
        await uploadBytes(storageRef, file)
        const fileUrl = await getDownloadURL(storageRef)
        return fileUrl
    } catch (e) {
        console.error(e)
    }
}
