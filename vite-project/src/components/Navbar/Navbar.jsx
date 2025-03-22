import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import { Facebook, Twitter, Instagram, MoreVert } from "@mui/icons-material";

export default function Navbar() {
  // State to handle dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);

  // Open menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#123a1a", py: 1 }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
          LOGO
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 3 }}>
          <Button color="inherit" component={Link} to="/">
            HOME
          </Button>
          <Button color="inherit" component={Link} to="/shop">
            SHOP
          </Button>
          <Button color="inherit" component={Link} to="/product">
            PRODUCTS
          </Button>
          <Button color="inherit" component={Link} to="/contact">
            CONTACT US
          </Button>
        </Box>

        {/* Social Media Icons and More Options */}
        <Box sx={{ display: "flex", gap: 1, ml: 3 }}>
          <IconButton color="inherit">
            <Facebook />
          </IconButton>
          <IconButton color="inherit">
            <Twitter />
          </IconButton>
          <IconButton color="inherit">
            <Instagram />
          </IconButton>

          {/* More Options Dropdown */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MoreVert />
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
            <MenuItem onClick={handleMenuClose}>History</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
