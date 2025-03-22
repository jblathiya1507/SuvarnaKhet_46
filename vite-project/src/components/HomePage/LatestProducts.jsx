import React from "react";
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

const products = [
  { name: "Tomato", price: "₹20/Kg", image: "Tomato.jpeg" },
  { name: "Lettuce", price: "₹30/Kg", image: "Lettuce.jpeg" },
  { name: "Garlic", price: "₹70/Kg", image: "Garlic.jpeg" },
];

export default function LatestProducts() {
  return (
    <Box sx={{ textAlign: "center", py: 5 }}>
      <Typography variant="h5" color="textSecondary">
        Recently Added
      </Typography>
      <Typography variant="h4" fontWeight="bold">
        Latest Product
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mt: 4 }}>
        {products.map((product, index) => (
          <Card key={index} sx={{ width: 250, boxShadow: 3 }}>
            <CardMedia component="img" height="200" image={product.image} alt={product.name} />
            <CardContent sx={{ bgcolor: "#7AA34E", color: "#fff", textAlign: "center" }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography>{product.price}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Button variant="contained" sx={{ mt: 4, bgcolor: "#7AA34E" }}>
        More Product
      </Button>
    </Box>
  );
}
