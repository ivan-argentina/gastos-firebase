import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

import { categories } from "../data/categories"
import useExpenses from "../hooks/useExpenses"

const ExpenseChart = ({ month, year }) => {

  // 👇 ahora recibe el filtro
  const expenses = useExpenses(month, year)

  // agrupar montos por categoria
  const totals = {}

  expenses.forEach(exp => {
    const cat = exp.category || "other"
    totals[cat] = (totals[cat] || 0) + exp.amount
  })

  // datos para chartjs
  const data = {
    labels: categories.map(c => c.name),
    datasets: [
      {
        data: categories.map(c => totals[c.id] || 0),
        backgroundColor: categories.map(c => c.color),
        borderWidth: 1
      }
    ]
  }
   
  // si no hay gastos
  if (!expenses.length)
    return <p style={{ textAlign: "center" }}>No hay datos para este mes</p>

  return (
    <div style={{ maxWidth: 400, margin: "30px auto" }}>
      <h3 style={{ textAlign: "center" }}>Gastos por Categorías</h3>
      <Pie data={data} />
    </div>
  )
}

export default ExpenseChart


