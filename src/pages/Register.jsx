import { useState } from "react";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Padding } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);

      setErrorMsg("");
      setOpen(true);
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifiContent: "center",
        }}
      >
        <Paper
          elevation={4}
          sc={{
            Padding: 4,
            width: "100%",
            borderRadius: 3,
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setOpen(false)}
          >
            <Alert
              severity={errorMsg ? "error" : "success"}
              variant="filled"
              onClose={() => setOpen(false)}
            >
              {errorMsg ? errorMsg : "Usuario creado correctamente 🎉"}
            </Alert>
          </Snackbar>

          <Typography
            variant="h5"
            mb={3}
            textAlign="center"
          >
            Registro
          </Typography>

          <Box
            component="form"
            onSubmit={handleRegister}
          >
            <TextField
              fullWidth
              type="email"
              label="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              fullWidth
              type="password"
              label="Contraseña"
              margin="normal"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2 }}
            >
              Crear Cuenta
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
