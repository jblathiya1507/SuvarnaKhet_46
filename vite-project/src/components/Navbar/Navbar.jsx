import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Login, ShoppingCart } from "@mui/icons-material"; // Cart Icon Added

export default function Navbar() {
  const uf_id = localStorage.getItem("uf_id");
  console.log("uf_id",uf_id);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Navigation functions
  const handleProfileClick = () => {
    navigate("/profile");
    handleMenuClose();
  };

  const handleHistoryClick = () => {
    navigate("/history");
    handleMenuClose();
  };

  const handleLoginClick = () => {
    localStorage.removeItem("uf_id");
    navigate("/login");
    handleMenuClose();
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#123a1a", py: 1 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        
        {/* Left Section: Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <Box
            component="img"
            src="/logo.png"  // Replace with your logo path
            alt="Logo"
            sx={{ height: 40, mr: 2 }} // Adjust size & margin
          /> */}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            LOGO
          </Typography>
        </Box>

        {/* Center Section: Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/product">
            PRODUCTS
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            FARMER
          </Button>
        </Box>

        {/* Right Section: Icons (Cart, Login, More Options) */}
        <Box sx={{ display: "flex", gap: 1 }}>
          {uf_id !== null && (
            <IconButton color="inherit" onClick={handleCartClick}>
              <ShoppingCart />
            </IconButton>
          )}

          {uf_id === null && (
            <IconButton color="inherit" onClick={handleLoginClick}>
              <Login />
            </IconButton>
          )} 

          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>

          {uf_id !== null && (
            <>
          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          
            <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
            <MenuItem onClick={handleHistoryClick}>Order History</MenuItem>
            <MenuItem onClick={handleLoginClick}>Logout</MenuItem>
            
            
          </Menu>
          </>
        )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
