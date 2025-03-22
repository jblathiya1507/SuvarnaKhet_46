import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";
import Swal from "sweetalert2";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const validCredentials = {
    username: "admin",
    password: "admin",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      formData.username === validCredentials.username &&
      formData.password === validCredentials.password
    ) {
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonColor: "#7BAE4C",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials!",
        text: "Please enter the correct username and password.",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100vw"
      sx={{
        backgroundColor: "#7BAE4C",
        padding: 0,
        margin: 0,
        overflow: "hidden",
      }}
    >
      {/* Rounded Box with Background Image */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        maxWidth="900px"
        minHeight="100vh"
        sx={{
          backgroundImage: `url(/service-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "30px",
          overflow: "hidden",
        }}
      >
        {/* Transparent Login Card */}
        <Card
          sx={{
            width: "380px",
            padding: "30px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={2} sx={{ color: "#FFF" }}>
            Sign In
          </Typography>

          <form onSubmit={handleLogin}>
            {/* Username Field */}
            <TextField
              fullWidth
              label="Enter Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#7BAE4C" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#F4E7C5",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              type="password"
              label="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#7BAE4C" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#F4E7C5",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
            />

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#7BAE4C",
                color: "#FFF",
                fontWeight: "bold",
                borderRadius: "25px",
                padding: "10px",
                "&:hover": { backgroundColor: "#6AAE4C" },
              }}
            >
              Login
            </Button>

            
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
