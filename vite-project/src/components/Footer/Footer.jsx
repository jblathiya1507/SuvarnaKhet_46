import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "#123a1a", color: "white", py: 5, px: 3 }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              LOGO
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              It is a long established fact that a reader will be distracted by
              the readable content.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Navigation
            </Typography>
            <List>
              {["Home", "Shop", "Products", "About Us", "Contact Us"].map(
                (item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={
                        <Link
                          to={`/${item.toLowerCase().replace(" ", "")}`}
                          style={{ color: "white", textDecoration: "none" }}
                        >
                          {item}
                        </Link>
                      }
                      sx={{ textAlign: "center" }}
                    />
                  </ListItem>
                )
              )}
            </List>
          </Grid>

          <Grid item xs={12} md={4} textAlign="center">
            <Typography variant="h6" fontWeight="bold">
              Get in Touch
            </Typography>
            <List>
              <ListItem disablePadding>
                <LocationOn sx={{ mr: 1 }} />
                <ListItemText primary="99 Roving St, Big City, PKU 23456" />
              </ListItem>
              <ListItem disablePadding>
                <Email sx={{ mr: 1 }} />
                <ListItemText primary="hello@awesomesite.com" />
              </ListItem>
              <ListItem disablePadding>
                <Phone sx={{ mr: 1 }} />
                <ListItemText primary="+123-456-789" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>

      <Box
        textAlign="center"
        sx={{ mt: 3, borderTop: "1px solid rgba(255,255,255,0.2)", pt: 2 }}
      >
        <Typography variant="body2">
          Copyright 2025 © All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
}
