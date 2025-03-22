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
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const uf_id = localStorage.getItem("uf_id");

  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const cart_response = await axios.get(`http://127.0.0.1:8000/api/cart_get/`,{params:{"status":1,"uf_id":uf_id}});
      console.log(cart_response.data);
      setCarts(cart_response.data);

      const product_response = await axios.get(`http://127.0.0.1:8000/api/products_get/`);
      console.log(product_response.data);
      setProducts(product_response.data);
    }
    fetchData();
  },[]);

  const handleRemoveItem = async (id) => {
    const delete_response = await axios.put(`http://127.0.0.1:8000/api/cart_update/?cart_id=${id}`,{"status":3});
    console.log(delete_response.data);

    const cart_response = await axios.get(`http://127.0.0.1:8000/api/cart_get/`,{params:{"status":1,"uf_id":uf_id}});
    console.log(cart_response.data);
    setCarts(cart_response.data);
  };  

  const getTotalPrices = () => {
    // Calculate the subtotal
    const subtotal = carts.reduce((total, item) => {
      const product = products.find((product) => product.p_id === item.p_id);
      if (product) {
        total += product.p_price * item.qty;
      }
      return total;
    }, 0);
    
    return subtotal;
  };

  const shippingFee = 50;
  const totalAmount = getTotalPrices() + shippingFee;

  console.log("Total price:",getTotalPrices())

  const handleCheckout = () => {
    localStorage.setItem("subtotal",getTotalPrices());
    localStorage.setItem("shipping",shippingFee);
    localStorage.setItem("totalAmount",totalAmount);
    navigate("/checkout")
  }

  return (
    <Container sx={{ py: 5 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        Shopping Cart
      </Typography>

      {carts.length === 0 ? (
        <Typography variant="body1">Your cart is empty.</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {carts.map((item) => (
              
              <Card key={item.id} sx={{ display: "flex", alignItems: "center", p: 2, mb: 2 }}>
                <CardMedia
                  component="img"
                  image={products.find(product => product.p_id === item.p_id)?.p_image || "N/A"}
                  alt={products.find(product => product.p_id === item.p_id)?.p_name || "N/A"}
                  sx={{ width: 100, height: 100, borderRadius: 2 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{products.find(product => product.p_id === item.p_id)?.p_name || "N/A"}</Typography>
                  <Typography variant="body2">Price: ₹{products.find(product => product.p_id === item.p_id)?.p_price || "N/A"} / Kg</Typography>
                  <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>Qty:</Typography>
                    <TextField
                      type="number"
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))}
                      inputProps={{ min: 1 }}
                      size="small"
                      sx={{ width: "60px", textAlign: "center" }}
                    />
                  </Box>
                </CardContent>
                <IconButton color="error" onClick={() => handleRemoveItem(item.cart_id)}>
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
                <Typography variant="body1">₹{getTotalPrices().toFixed(2)}</Typography>
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
                onClick={() => handleCheckout()} // Redirect to Checkout Page
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
