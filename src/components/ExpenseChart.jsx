import { Pie } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

import { categories } from '../data/categories'
import useExpenses from '../hooks/useExpenses'
import { Box, Paper, Typography } from "@mui/material"

const ExpenseChart = ({month, year}) =>{
    
    const expenses = useExpenses(month, year)
    
    const totals = {}
    expenses.forEach(exp => {
        const catId = exp.category 
        totals[catId] = (totals[catId] || 0) + exp.amount
    })

    const data = {
        labels: categories.map(c=> c.name),
        datasets: [
            {
                data: categories.map(c=> totals[c.id] || 0),
                backgroundColor: categories.map(c=> c.color),
                borderWidth: 1
            }
        ]
    }
    return (
       
       <Box sx={{display: 'flex', justifyContent: 'center',mt:4}}>
        <Paper elevation={3}
          sx={{p:3, borderRadius:3,width:'100%', maxWidth:400}}
        >
            <Typography variant="h6" fontWeight='bold' gutterBottom textAlign='center'>
                 Gastos por Categorias
            </Typography>
            <Box sx={{height: 300}}  >
                 <Pie data={data} />    
            </Box>

        </Paper>
            
            
        </Box>
    )
}

export default ExpenseChart
