import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import axios from "axios";

// Product Data
const products = [
  { name: "Tomato", price: "₹20/Kg", img: "/Tomato.jpeg" },
  { name: "Lettuce", price: "₹30/Kg", img: "/Lettuce.jpeg" },
  { name: "Garlic", price: "₹70/Kg", img: "/Garlic.jpeg" },
  { name: "Carrot", price: "₹50/Kg", img: "/Carrot.jpeg" },
  { name: "Grapes", price: "₹150/Kg", img: "/Grapes.jpeg" },
  { name: "Onions", price: "₹40/Kg", img: "/Onion.jpeg" },
];

const ProductPage = () => {
  const navigate = useNavigate();

  const[product, setProduct] = useState([]);
  
    useEffect(()=>{
      const fetchData = async () => {
        const response = await axios.get(`http://127.0.0.1:8000/api/products_get/`);
        // console.log(response.data);
        setProduct(response.data);
      }
      fetchData();
    },[]);

  return (
    <Box sx={{ textAlign: "center", py: 5, px: 2 }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
        All Products
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center", paddingLeft:"150px" }}>
        {product.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "20px",
                boxShadow: 3,
                textAlign: "center",
                overflow: "hidden",
                transition: "transform 0.3s",
                width: "350px",
                "&:hover": { transform: "scale(1.05)", cursor: "pointer" },
              }}
              onClick={() => navigate(`/product/${product.p_id}`)} // Navigate to details
            >
              <CardContent sx={{ bgcolor: "#FAF8F1", pb: 0, height: "300px", width: "350px" }}>
                <img
                  src={product.p_image}
                  alt={product.p_name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              </CardContent>
              <Box sx={{ bgcolor: "green", color: "white", py: 2 }}>
                <Typography fontWeight="bold">{product.p_name}</Typography>
                <Typography>₹{product.p_price}/Kg</Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductPage;