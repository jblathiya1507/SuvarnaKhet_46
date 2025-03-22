import React from "react";
import { Box, Typography, Card, Grid, Container } from "@mui/material";
import Sidebar from "../sidebar/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ marginLeft: "250px" }}>
      <Box
        sx={{
          backgroundImage: "url('/dashboardbackground.png')", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "1500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sidebar/>
        {/* Header with Image */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 3,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          {/* Dashboard Icon */}
          <img
            src="/dashboard.png" 
            alt="Dashboard"
            style={{
              width: "50px",
              height: "50px",
              marginRight: "15px",
            }}
          />

          {/* Dashboard Title */}
          <Typography variant="h4" fontWeight="bold" color="#316731">
            Dashboard Overview
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Container maxWidth="md">
          <Grid container spacing={3} justifyContent="center">
            {[
              { label: "Total Farmers", value: 20 },
              { label: "Total Customers", value: 100 },
              { label: "Total Orders", value: 218 },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    padding: 3,
                    backgroundColor: "#7CB342",
                    textAlign: "center",
                    color: "white",
                    borderRadius: "20px",
                    minHeight: "120px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    cursor: "pointer", // ✅ Shows pointer on hover
                    "&:hover": {
                      transform: "scale(1.11)", // ✅ Slight zoom effect
                      transition: "transform 0.3s ease-in-out", // ✅ Smooth animation
                    },
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4">{stat.value}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default Dashboard;
