import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../config/firebase.config"
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"

/**
 * Function gets array of objects, assigns the ID value 
 * of each object as the ID property of that object
 * and returns new array of objects
 * @returns {Array} items - data from database 
 */
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
    }
    return items
}

/**
 * Function for saving todo item to database
 * in case of the new task creating (the element does not have an ID),
 * it creates a new element of collection in database, 
 * in another case it modifies an existing collection element 
 * @param {Object} item - todo item data
 */
export const saveTodoItem = async (item) => {
    const { id, ...rest } = item
    try {
        if (id) {
            await setDoc(doc(db, "todos", id), rest)
        } else {
            await addDoc(collection(db, "todos"), rest)
        }
    } catch (e) {
        console.error(e)
    }
}

/**
 * Function for deleting todo item from database
 * it deletes element of collection that have same ID as 
 * item ID passed as a parameter
 * and deletes a File from storage that have same fileUrl 
 * as an item property 'attachment'  
 * @param {Object} item - todo item data
 */
export const deleteTodoItem = async (item) => {
    try {
        await deleteDoc(doc(db, 'todos', item.id))
        if (item.attachment) {
            const storage = getStorage()
            const desertRef = ref(storage, item.attachment)
            await deleteObject(desertRef)
        }
    } catch (e) {
        console.error(e)
    }
}

/**
 * Function for loading file to storage
 * and get file in storage url for using 
 * it as an item property 'attachment'  
 * @param {File} file - todo item data
 */
export const loadFile = async (file) => {
    try {
        const storage = getStorage()
        const storageRef = ref(storage, file.name)
        await uploadBytes(storageRef, file)
        const fileUrl = await getDownloadURL(storageRef)
        return fileUrl
    } catch (e) {
        console.error(e)
    }
}
