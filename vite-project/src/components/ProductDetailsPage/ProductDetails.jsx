import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, Box, TextField } from "@mui/material";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const now = new Date();
  const localDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  const navigate = useNavigate();
  const uf_id = localStorage.getItem("uf_id");
  const { productName } = useParams();

  console.log(productName);

  const[products, setProduct] = useState([]);
  
  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/products_get/`,{params:{"p_id":productName}});
      console.log(response.data);
      setProduct(response.data[0]);
    }
    fetchData();
  },[]);

  const [quantity, setQuantity] = useState(1);

  // Add to Cart Function
  const handleAddToCart = async () => {
    if (uf_id === null){
      Swal.fire({
        title: "Login Alert!",
        text: "Please login first, then you can add to cart!",
        icon: "error",
        confirmButtonColor: "#FF4500",
      }).then(()=>{
        navigate("/login");
      })
    }else{
      const dataToSend = {
        uf_id: uf_id,
        p_id: productName,
        status: 1,
        create_datetime: localDateTime
      };
      const response = await axios.get(`http://127.0.0.1:8000/add_cart_py`, {params:{uf_id:uf_id,p_id:productName,quantity:quantity}});
      if(response.data.success){
        Swal.fire({
          title: "Add to Cart!",
          text: `${products.p_name} add to cart successfully!`,
          icon: "success",
          confirmButtonColor: "#6A0DAD",
        });
      }
      console.log("Add cart:",response);
    }


    // let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage
    
    // // Check if product already exists in cart
    // const existingProductIndex = cart.findIndex((item) => item.id === products.p_id);
    
    // if (existingProductIndex !== -1) {
    //   // Update quantity if product already exists
    //   cart[existingProductIndex].quantity += quantity;
    // } else {
    //   // Add new product to cart
    //   cart.push(products);
    // }
    
    // localStorage.setItem("cart", JSON.stringify(cart)); // Update cart in localStorage
    // alert("Added to Cart!"); // Show confirmation message
  };

  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Product Image Section */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src={products.p_image}
            alt={products.p_name}
            sx={{ width: "100%", maxWidth: "300px", borderRadius: "12px" }}
          />
        </Grid>

        {/* Product Details Section */}
        <Grid item xs={12} md={7}>
          <Typography variant="h5" fontWeight="bold">{products.p_name}</Typography>
          <Typography variant="h6" sx={{ color: "#88b04b", fontWeight: "bold" }}>₹{products.p_price}/Kg</Typography>
          <Typography variant="body1" sx={{ my: 2, color: "#666" }}>
          {products.p_description}
          </Typography>

          {/* Quantity Selector */}
          <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>Choose Quantity</Typography>
            <TextField
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              inputProps={{ min: 1 }}
              size="small"
              sx={{ width: "60px", textAlign: "center" }}
            />
          </Box>

          {/* Add to Cart Button */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4CAF50", color: "#fff", "&:hover": { backgroundColor: "#388E3C" } }}
            onClick={handleAddToCart} // 👈 Click event
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
