import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      console.log('Login successful');
      navigate("/add");
    } else {
      console.error("Invalid email or password");
      alert("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        pb: "2rem",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "30rem",
          width: "90%",
          borderRadius: ".5rem",
          backgroundColor: "white",
          padding: "1rem"
        }}
      >
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          style={{ marginTop: "1rem", width: "90%" }}
        />
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          style={{ marginTop: "1rem", width: "90%" }}
        />
        <Button
          type="submit"
          sx={{
            marginTop: "1rem",
            bgcolor: "black",
            color: "white",
            width: "7rem",
          }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

export default Login;
