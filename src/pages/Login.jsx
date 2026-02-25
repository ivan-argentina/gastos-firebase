import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CssBaseline,
} from "@mui/material";

export default function Login({ mode, setMode }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      navigate("/dashboard");
    } catch (error) {
      alert("Credenciales incorrectas");
    }
    setLoading(false);
  };
  <CssBaseline />;
  //console.log("PROPS:", { mode, setMode });
  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        display: "grid",
        placeItems: "center",
        backgroundColor: "Background.defautl",
        p: 2,
      }}
    >
      <IconButton
        onClick={() => setMode(mode === "light" ? "dark" : "light")}
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          color: "blue",
        }}
      >
        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
      </IconButton>
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: { xs: 3, sm: 4 },
          borderRadius: {
            xs: 3,
            sm: 4,
            backdropFilter: "blur(8px)",
            backgroundColor: "background.paper",
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: { xs: "1.8rem", sm: "2.1rem" } }}
        >
          Iniciar Sesión
        </Typography>
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2 }}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="contraseña"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </Box>
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3 }}
        >
          No tenes Cuenta? <Link to="/register">Crear Cuenta</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
