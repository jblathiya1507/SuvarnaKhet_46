import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import Profile from "./Profile/Profile";

const Layout = () => {
  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      {/* Sidebar Component */}
      <Sidebar />

      {/* Profile Page */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin 0.3s ease-in-out",
        }}
      >
        <Profile />
      </Box>
    </Box>
  );
};

export default Layout;
