import React, { useState, useRef } from "react";
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
import SimpleFooter from "../components/footer"
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnStyle, setBtnStyle] = useState({ top: "0px", left: "0px" });

  const btnRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
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

  const handleMouseEnter = () => {
    if (email && password) return;

    if (containerRef.current && btnRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const btnWidth = 120;
      const btnHeight = 48;

      const maxX = container.width - btnWidth;
      const maxY = container.height - btnHeight;

      const newLeft = Math.floor(Math.random() * maxX);
      const newTop = Math.floor(Math.random() * maxY);

      setBtnStyle({
        left: `${newLeft}px`,
        top: `${newTop}px`,
      });
    }
  };

  return (
    <>
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
          </form>

          <Box
            ref={containerRef}
            sx={{
              position: "relative",
              height: "120px",
              mt: 4,
            }}
          >
            <Button
              ref={btnRef}
              type="submit"
              variant="contained"
              onMouseEnter={handleMouseEnter}
              onClick={handleLogin}
              sx={{
                position: "absolute",
                transition: "all 0.3s ease",
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                ":hover": { backgroundColor: "#115293" },
                ...btnStyle,
              }}
            >
              Login
            </Button>
          </Box>

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

      <SimpleFooter /> 
    </>
  );
};

export default Login;
