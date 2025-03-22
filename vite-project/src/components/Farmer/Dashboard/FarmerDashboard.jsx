import React from "react";
import { Box, Typography, Card, Grid } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
// import Sidebar from "./components/Farmer/Sidebar/Sidebar";
import Sidebar from "../Sidebar/Sidebar";

const FarmerDashboard = () => {
  const bidStats = [
    {
      label: "Approved",
      value: 50,
      color: "#2E7D32",
      icon: <CheckCircleIcon fontSize="large" />,
    },
    {
      label: "Rejected",
      value: 20,
      color: "#D32F2F",
      icon: <CancelIcon fontSize="large" />,
    },
  ];

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
    <Box sx={{ backgroundColor: "#F1F8E9",   padding: 4 }}>
      <Sidebar />
      <Card
        sx={{
          padding: 4,
          backgroundColor: "#4CAF50",
          color: "white",
          borderRadius: "20px",
          boxShadow: 5,
        }}
      >
        <Grid container spacing={3} sx={{ marginTop: 2 }}>
          {bidStats.map((bid, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  padding: 3,
                  textAlign: "center",
                  backgroundColor: bid.color,
                  color: "white",
                  borderRadius: "15px",
                  boxShadow: 3,
                  "&:hover": { transform: "scale(1.05)", transition: "0.3s" },
                }}
              >
                {bid.icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  {bid.label}
                </Typography>
                <Typography variant="h4" fontWeight="bold">
                  {bid.value}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
    </div>
  );
};

export default FarmerDashboard;
