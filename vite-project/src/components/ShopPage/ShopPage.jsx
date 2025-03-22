import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";

const stores = [
  {
    id: 1,
    name: "Shop Name",
    farmer: "Om Patel",
    price: "₹100",
    address: "A-5/86, ABC Nagar, Nr XYZ Road, Surat, Bhavnagar",
  },
  {
    id: 2,
    name: "Shop Name",
    farmer: "Om Patel",
    price: "₹100",
    address: "A-5/86, ABC Nagar, Nr XYZ Road, Surat, Bhavnagar",
  },
];

export default function ShopPage() {
  const [location, setLocation] = useState("");

  return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        <span style={{ color: "#88b04b" }}>Our Best</span> Shop
      </Typography>

      <FormControl sx={{ mb: 4, minWidth: 200 }}>
        <Select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          displayEmpty
          sx={{ backgroundColor: "#f7e6b5", borderRadius: "10px" }}
        >
          <MenuItem value="">Select Location</MenuItem>
          <MenuItem value="Surat">Surat</MenuItem>
          <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
          <MenuItem value="Mumbai">Mumbai</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={3} justifyContent="center">
        {stores.map((store) => (
          <Grid item key={store.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: "center",
                backgroundColor: "#faf3dd",
                p: 2,
                borderRadius: "15px",
              }}
            >
              <CardContent>
                <img src="/ShopIcon.png" alt="Shop" width="50" height="50" />
                <Typography variant="h6" fontWeight="bold">
                  {store.name}
                </Typography>
                <Typography variant="body2">Farmer Name</Typography>
                <Typography variant="body1" fontWeight="bold">
                  {store.farmer}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#88b04b", fontWeight: "bold" }}
                >
                  {store.price}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {store.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
