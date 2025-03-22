import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import Swal from "sweetalert2";

const SellRequests = () => {
  const now = new Date();
  const localDateTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  const uf_id = localStorage.getItem("uf_id");
  console.log(uf_id);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const product_response = await axios.get(`http://127.0.0.1:8000/api/products_get/`);
      console.log(product_response.data);
      setProducts(product_response.data);
    };
    fetchData();
  }, []);





  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {

    const dataToSend = {
      uf_id: uf_id,
      p_id: product,
      p_price: price,
      p_qty: quantity,
      bid_price: 0, 
      mt_id: 1,
      status:1,
      create_datetime:localDateTime
    };
    
    const response = await axios.post("http://127.0.0.1:8000/api/sell_request_post/",dataToSend);
    if (response.status == 201){
      Swal.fire({
        title: "Sell Request!",
        text: "Sell Request Created Successfully!",
        icon: "success",
        confirmButtonColor: "#6A0DAD",
      }).then(()=>{
        window.location.reload();
      })
      console.log("Sell request generate successfully:", response.data);
    }else{
      console.log("Sell request not generate successfully:", response.data);
    }
  };

  return (
    <div style={{ marginLeft: "250px", padding: "20px" }}>
    <Box display="flex" justifyContent="center" mt={8}>
      <Sidebar/>
   <Card
  sx={{

    width: "100%",
    height: 500, // Adjust height as needed
    padding: 3,
    backgroundColor: "#d8f3dc", // Light green
    boxShadow: 3,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Centers content inside the card
  }}
>

      <CardContent>
        <Typography variant="h5" color="#316731" align="center" gutterBottom>
          Sell Request
        </Typography>

        <form>
          <TextField
            select
            fullWidth
            label="Product"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
            margin="normal"
          >
            <MenuItem value="">Select Product</MenuItem>
            {products.map((pro) => {
              return <MenuItem key={pro.p_id} value={pro.p_id}>{pro.p_name}</MenuItem>;
            })}

          </TextField>

          <TextField
            fullWidth
            label="Price (per kg)"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Quantity (Kg)"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            margin="normal"
          />

          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#316731",
              marginTop: 2,
              "&:hover": { backgroundColor: "#285a28" },
            }}
          >
            Send Request
          </Button>
        </form>
      </CardContent>
    </Card>
    </Box>
    </div>
  );
};

export default SellRequests;
