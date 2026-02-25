import useExpenses from "../hooks/useExpenses";
import { formatDate } from "../utils/date";
import { deleteExpense } from "../services/expenseService";
import { getCategory } from "../utils/getCategory";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ExpenseList = ({ month, year }) => {
  const expenses = useExpenses(month, year);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const formatCurrency = (value) => {
    return value.toLocaleString("es-AR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };
  if (!expenses || expenses.length === 0)
    return (
      <Container
        maxWidth="sm"
        sx={{ mt: 4 }}
      >
        <Typography textAlign="center">No hay Gastos Cargados</Typography>
      </Container>
    );
  const total = expenses.reduce((acc, e) =>{
   return acc + Number(e.amount)
     },0)
   
  return (
    <Container
      maxWidth="sm"
      sx={{ mt: 4 }}
    >
      <Paper
        sx={{ p: 3, borderRadius: 3 }}
        elevation={3}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Mis Gastos
        </Typography>
        <Typography
          variant="h5"
          mb={3}
        >
          Total Gastado: ${formatCurrency(total)}
        </Typography>

        <Stack spacing={2}>
          {expenses.map((e) => {
            const cat = getCategory(e.category);
            return (
              <Card
                key={e.id}
                variant="outlined"
                sx={{
                  borderLeft: `6px solid ${cat.color}`,
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <div>
                      <Typography fontWeight="bold">{e.title}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        ${formatCurrency(e.amount)}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="textSecondary"
                      >
                        {formatDate(e.createdAt)}
                      </Typography>
                    </div>
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Chip
                        label={cat.name}
                        size="small"
                        sx={{
                          backgroundColor: cat.color,
                          color: "#fff",
                        }}
                      />

                      <IconButton
                        size="small"
                        sx={{
                          color: "text.secondary",
                          "&:hover": {
                            color: "error.main",
                            backgroundColor: "rgba(255,0,0,0.08)",
                          },
                        }}
                        onClick={() => {
                          setSelectedId(e.id);
                          setOpenDialog(true);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
        <Divider sx={{ mt: 3 }} />
      </Paper>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>Eliminar Gasto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro que querés eliminar este gasto? Esta acción no se
            puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            color="error"
            onClick={() => {
              deleteExpense(selectedId);
              setOpenDialog(false);
            }}
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ExpenseList;
