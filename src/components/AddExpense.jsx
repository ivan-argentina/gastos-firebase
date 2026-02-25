import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addExpense } from "../services/expenseService";
import { categories } from "../data/categories";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const formatCurrency = (value) => {
  return value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const AddExpense = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  //paso el monto a numerico
  const handleAmountChange = (e) => {
    let value = e.target.value;
    // permitir solo numeros + coma/punto
    value = value.replace(/[^\d.,]/g, "");

    setAmount(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Esperando la autenticacion...");
      return;
    }
    try {
      await addExpense(user, {
        title: title,
        amount: parseFloat(amount.replace(",", ".")),
        category: category,
      });
      setTitle("");
      setAmount("");
      setCategory("");
    } catch (error) {
      console.error(error);
      alert("Error al Guardar");
    }
  };
  return (
    <Container maxWidth="sm">
      
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="Descripcion"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              fullWidth
            />
            <TextField
              type="number"
              inputMode="decimal"
              label="Monto"
              value={formatCurrency(amount)}
              onChange={handleAmountChange}
              required
            />
            <TextField
              select
              label="Categoria"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              fullWidth
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id}  value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 1 }}
            >
              Guardar
            </Button>
          </Box>
        
      
    </Container>
  );
};
export default AddExpense;
