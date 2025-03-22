import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

const products = [
  { name: "Tomato", price: "₹20/Kg", image: "Tomato.jpeg" },
  { name: "Lettuce", price: "₹30/Kg", image: "Lettuce.jpeg" },
  { name: "Garlic", price: "₹70/Kg", image: "Garlic.jpeg" },
];

export default function LatestProducts() {

  const[product, setProduct] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const response = await axios.get(`http://127.0.0.1:8000/api/products_get/`);
      console.log(response.data);
      setProduct(response.data);
    }
    fetchData();
  },[]);

  

  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h5" color="textSecondary">
        Recently Added
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        Latest Product
      </Typography>

      {product && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
        {product.slice(0, 3).map((product, index) => (
          <Card key={index} sx={{ width: 250, boxShadow: 3 }}>
            <CardMedia component="img" height="200" image={product.p_image} alt={product.p_name} />
            <CardContent sx={{ bgcolor: "#7AA34E", color: "#fff", textAlign: "center" }}>
              <Typography variant="h6">{product.p_name}</Typography>
              <Typography>₹{product.p_price}/Kg</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      )}
      

      <Button variant="contained" sx={{ mt: 4, bgcolor: "#7AA34E" }}>
        More Product
      </Button>
    </Box>
  );
}
