import AddExpense from "../components/AddExpense";
import ExpenseList from '../components/ExpenseList'
import ExpenseChart from "../components/ExpenseChart";
import MonthSelector from "../components/MonthSelector"
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { Box, Button, Container, Paper, Stack, Typography } from "@mui/material";

const Dashboard =() => {
  
  const [filter, setFilter] = useState({
  month: new Date().getMonth(),
  year: new Date().getFullYear()
})

 //Cierro sesion
 const handleLogout = async () => {
    try {
      await signOut(auth)
    }catch(error){
      console.error('Error al cerrar sesion', error)
    }
 }
 const user = auth.currentUser
 return (
  
  <Container maxWidth={false} sx={{ py: 4 }}>
   
   <Box sx={{display: 'flex', flexDirection: {xs:'column', md:'row'},
        justifyContent:'space-between',alignItems:{xs: 'flex-start',md:'center'},
        gap:2, mb:2 }}>
    <Typography variant="h5">Dashboard</Typography>
    <Typography variant="h6">{user?.email}</Typography>
     <Button variant='outlined' color='error' onClick={handleLogout}>
       Cerrar Sesion
     </Button>

   </Box>
   
    <Typography 
     variant="h4"
     fontWeight='bold'
     gutterBottom
     textAlign='center'
    > 
     Mi Gestor de Gastos
    </Typography>  

      
      <Box sx={{display: 'flex', flexDirection:{xs: 'column', md:'row'}, gap:3}}>
        
        {/*Formulario*/}
         <Paper elevation={2} sx={{p:2,flex: {xs:'unset', md: 1}, borderRadius: 3}} >
          <AddExpense />
        </Paper> 
         {/*lista*/}
         <Paper elevation={2} sx={{p:3, borderRadius:3,flex:{xs:'unset',md:2}} }>
         <Box sx={{width:{xs: '100%', md:320}, mx:'auto',mb:2, p:1,borderRadius:2,boxShadow:2,backgroundColor:'background.paper'}}>
           <MonthSelector onChange= {setFilter} />
          </Box>
            <ExpenseList month={filter.month} year={filter.year} />
         </Paper>
         {/*grafico*/}
         <Paper elevation={2} sx={{p:2,borderRadius: 3, flex:{xs:'unset', md: 1.5} }}>
             <ExpenseChart month={filter.month} year={filter.year}  />
         </Paper>
    </Box>
  </Container>
 )

}
export default Dashboard