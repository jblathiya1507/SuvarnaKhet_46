import React, { useState } from "react";
import { Card, TextField, Button, Typography, Box, InputAdornment } from "@mui/material";
import { Email, Lock } from "@mui/icons-material";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Login Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin Login Data:", formData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: "#7BAE4C",
        padding: "20px",
      }}
    >
      {/* Rounded Box with Image */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="90%"
        maxWidth="900px"
        height="90vh"
        sx={{
          backgroundImage: `url(/service-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "30px",
          overflow: "hidden",
          position: "relative",
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
            Admin Login
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <TextField
              fullWidth
              label="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: "#7BAE4C" }} />
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

            {/* Password Input */}
            <TextField
              fullWidth
              label="Enter Password"
              type="password"
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
