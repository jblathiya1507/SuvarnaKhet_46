import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  TextField,
  Box,
  Divider,
  Button,
  Radio,
  FormControlLabel,
  Card,
} from "@mui/material";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const shippingFee = 100;

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const totalAmount = getTotalPrice() + shippingFee;

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={5}>
        {/* Delivery Information */}
        <Grid item xs={12} md={7}>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            DELIVERY <span style={{ fontWeight: "bold" }}>INFORMATION</span>
            <Divider sx={{ my: 1, width: "30px", borderBottom: "3px solid black" }} />
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Street" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="State" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Zipcode" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Country" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Phone" variant="outlined" />
            </Grid>
          </Grid>
        </Grid>

        {/* Cart Totals Section */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              p: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              CART <span style={{ fontWeight: "bold" }}>TOTALS</span>
              <Divider sx={{ my: 1, width: "30px", borderBottom: "3px solid black" }} />
            </Typography>

            <Box display="flex" justifyContent="space-between" sx={{ mb: 1 }}>
              <Typography variant="body1">Subtotal</Typography>
              <Typography variant="body1">₹{getTotalPrice().toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
              <Typography variant="body1">Shipping Fee</Typography>
              <Typography variant="body1">₹{shippingFee.toFixed(2)}</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h6" fontWeight="bold">Total</Typography>
              <Typography variant="h6" fontWeight="bold">₹{totalAmount.toFixed(2)}</Typography>
            </Box>

            
            {/* Place Order Button */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                width: "100%",
                mt: 3,
                py: 1.5,
                fontSize: "16px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#333" },
              }}
            >
              PAYNOW
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
