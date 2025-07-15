import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Container,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnPosition, setBtnPosition] = useState("center");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      shiftButton();
      return;
    }

    try {
      const res = await axios.post("http://localhost:5678/auth/login", {
        identifier: email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));
      setUser({
        id: payload.id,
        email: payload.email,
        username: payload.username,
        firstName: payload.firstName,
        lastName: payload.lastName,
      });

      toast.success("Login successful!");
      navigate("/profile");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  const shiftButton = () => {
    const positions = ["left", "right", "center"];
    const next = positions[Math.floor(Math.random() * positions.length)];
    setBtnPosition(next);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={6} sx={{ p: 4, mt: 10, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back 👋
        </Typography>
        <Typography variant="subtitle1" align="center" mb={3}>
          Login to your BlogIt account
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email or Username"
            fullWidth
            margin="normal"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent:
                btnPosition === "left"
                  ? "flex-start"
                  : btnPosition === "right"
                  ? "flex-end"
                  : "center",
              mt: 2,
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                ":hover": { backgroundColor: "#115293" },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
        <Typography variant="body2" align="center" mt={2}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#1976d2", cursor: "pointer", fontWeight: 500 }}
          >
            Register
          </span>
        </Typography>
      </Paper>
    </Container>
  );
};

export default Login;
