import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy, doc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from './firebase'
import { getMonthRange } from "../utils/getMonthRange"



export const deleteExpense = async (id) => {
  try {
    await deleteDoc(doc(db, "expenses", id))
  } catch (error) {
    console.error("Error eliminando:", error)
  }
}

export const addExpense = async (user, expense) => {

    if(!user) throw new Error('Usuario no autenticado')

    try{
        const docRef = await addDoc(collection(db,"expenses"),{
            ...expense,
            uid: user.uid,
            createdAt: serverTimestamp(),
            createdAtClient: new Date(),
        })
        return docRef.id
    }catch(error){
        console.error('Error al guardar gasto:', error)
    }  
}

export const listenExpenses = (uid, callback, month, year) => {
    
    if (!uid || month === undefined || year === undefined) return () => {}

    const { start, end } = getMonthRange(year, month)
    
    
    const q = query(
        collection(db, "expenses"),
        where("uid", "==", uid),
        where("createdAt", ">=", Timestamp.fromDate(start)),
        where("createdAt", "<=", Timestamp.fromDate(end)),
        orderBy("createdAt", "desc")
    )

    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

        callback(data)
    })
}