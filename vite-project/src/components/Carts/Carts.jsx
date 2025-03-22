import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Cart() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const shippingFee = 100;
  const totalAmount = getTotalPrice() + shippingFee;

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Card key={item.id} sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt={item.name}
                  sx={{ width: 100, height: 100, borderRadius: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{item.name}</Typography>
                  <Typography variant="body2">Price: ₹{item.price} / Kg</Typography>
                  <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>Qty:</Typography>
                    <TextField
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      inputProps={{ min: 1 }}
                      size="small"
                      sx={{ width: "60px", textAlign: "center" }}
                    />
                  </Box>
                </CardContent>
                <IconButton color="error" onClick={() => handleRemoveItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Card>
            ))}
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                p: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: "#333" }}>
                CART TOTALS
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

              {/* Checkout Button */}
              <Button
                variant="contained"
                onClick={() => navigate("/checkout")} // Redirect to Checkout Page
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
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
