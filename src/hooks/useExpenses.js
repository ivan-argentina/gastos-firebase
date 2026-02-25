import { useEffect, useState } from "react"
import { useAuth } from '../context/AuthContext'
import { listenExpenses } from "../services/expenseService"

const useExpenses = (month, year) => {
    const { user } = useAuth()
    const [expenses, setExpenses] = useState([])

    useEffect(() => {
       if(!user || month === undefined || year === undefined ) return
        const unsubscribe = listenExpenses(user.uid, setExpenses, month, year)

       return () => unsubscribe && unsubscribe()

    },[user,month,year])
    
    return expenses
}
export default useExpenses
