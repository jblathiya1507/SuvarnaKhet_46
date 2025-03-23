import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LatestProducts from "./LatestProducts";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";
// import Chatbox from "./components/ChatBot/ChatBot";

export default function HomePage() {
  const navigate = useNavigate();
  // localStorage.removeItem("uf_id");
  // const navigate = useNavigate();
  // const uf_id = localStorage.getItem("uf_id");
  // console.log("uf_id",uf_id);
  // if (uf_id == null){

  // }

  const handleNavigate = () => {
    navigate('/product');
  };

  return (
    <>
    <Box
      sx={{
        position: "relative",
        height: "400px",
        backgroundImage: "url('/banners.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        color: "white",
        px: 5, // Padding left & right
      }}
    >
      {/* <Chatbox/> */}
      {/* Overlay for better text readability */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark overlay
          top: 0,
          left: 0,
        }}
      ></Box>

      {/* Content */}
      <Box sx={{ position: "relative", maxWidth: "500px" }}>
        <Typography variant="subtitle2" sx={{ letterSpacing: 1 }}>
          WELCOME TO AGROS FARMING
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold", mt: 1 }}>
          Agriculture <span style={{ color: "#99cc33" }}>& Organic</span>{" "}
          <span style={{ color: "#66aa22" }}>Market</span>
        </Typography>
        <Typography variant="body1" sx={{ my: 2 }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
        <Button
          variant="contained"
          onClick={handleNavigate}
          sx={{
            backgroundColor: "#99cc33",
            color: "#fff",
            "&:hover": { backgroundColor: "#88bb22" },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
    <Box>
      <LatestProducts />
    </Box>
    </>
  );
}
