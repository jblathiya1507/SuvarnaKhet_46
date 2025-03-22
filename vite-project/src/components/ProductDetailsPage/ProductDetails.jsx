import React, { useState } from "react";
import { Container, Grid, Card, CardContent, Typography, Button, Box, TextField } from "@mui/material";

export default function ProductDetails() {
  const [quantity, setQuantity] = useState(1);

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Product Image Section */}
        <Grid item xs={12} md={5}>

            <Box
              component="img"
              src="/Tomato.jpeg"
              alt="Tomato"
              sx={{ width: "100%", maxWidth: "300px", borderRadius: "12px" }}
            />
      
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight="bold">Tomato</Typography>
          <Typography variant="h6" sx={{ color: "#88b04b", fontWeight: "bold" }}>₹20/Kg</Typography>
          <Typography variant="body1" sx={{ my: 2, color: "#666" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </Typography>

          {/* Quantity Selector */}
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Choose Quantity</Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: "60px", textAlign: "center" }}
            />
          </Box>

          {/* Buttons */}
          <Box display="flex" gap={2}>
            <Button variant="contained" sx={{ backgroundColor: "#4CAF50", color: "#fff", "&:hover": { backgroundColor: "#388E3C" } }}>
              Add to Cart
            </Button>
            <Button variant="contained" sx={{ backgroundColor: "#ffeb3b", color: "#000", fontWeight: "bold", "&:hover": { backgroundColor: "#fdd835" } }}>
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Description Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" fontWeight="bold">Description</Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#666" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
      </Box>
    </Container>
  );
}
