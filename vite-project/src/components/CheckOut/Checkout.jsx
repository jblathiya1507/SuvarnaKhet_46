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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Checkout() {
  const navigate = useNavigate();
  const uf_id = localStorage.getItem("uf_id");
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    zipcode: "",
    phone: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const doPayement = () => {
    if(formData.address && formData.city && formData.state && formData.zipcode && formData.phone){
      const options = {
        key: "rzp_test_TcLs9fjjpAgz3u", 
        amount: (totalAmount)*100,
        currency: "INR",
        name: "SuvarnaKhet",
        description: "Checkout",
        image: `http://127.0.0.1:8000/images/logo.jpeg`,
        handler: async (response) => {
        const success_response = await axios.post(`http://localhost:8000/checkout_py?payment_id=${response.razorpay_payment_id}&signature=${response.razorpay_signature}&uf_id=${uf_id}&amount=${totalAmount}&address=${formData.address}&city=${formData.city}&state=${formData.state}&zipcode=${formData.zipcode}`);
          console.log("Success pay: ",success_response.data);
          if(success_response.data.success == true){
              navigate('/');
          }
        },
        theme: { color: "#3399cc" },
        method: {
        netbanking: true,
        card: true,
        upi: true,
        wallet: true,
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    }else{
      Swal.fire({
        title: "Alert!",
        text: "Please enter your delivery details!",
        icon: "error",
        confirmButtonColor: "#FF4500",
      });
    }
  };

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
              <TextField fullWidth label="Street" variant="outlined" onChange={handleChange} name="address" value={formData.address} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="City" variant="outlined" onChange={handleChange} name="city" value={formData.city}/>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="State" variant="outlined" onChange={handleChange} name="state" value={formData.state}/>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Zipcode" variant="outlined" onChange={handleChange} name="zipcode" value={formData.zipcode} type="text" inputProps={{ maxLength: 6 }}/>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone" variant="outlined" onChange={handleChange} name="phone" value={formData.phone}/>
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

            
            {/* Place Order Button */}
            <Button
              onClick={doPayement}
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
              PAY NOW
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
