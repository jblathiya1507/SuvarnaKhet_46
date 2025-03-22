import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, Chip, Button } from "@mui/material";
import axios from "axios";

const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "warning";
    case 2://Shipped
      return "primary";
    case 3://Delivered
      return "success";
    case 4://Cancelled
      return "error";
    default:
      return "default";
  }
};

const UserOrderHistory = () => {
  const uf_id = localStorage.getItem("uf_id");

  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const hist_response = await axios.get(`http://127.0.0.1:8000/api/orders_get/`, { params: { uf_id } });
      console.log(hist_response.data);
      setUserOrderHistory(hist_response.data);

      const product_response = await axios.get(`http://127.0.0.1:8000/api/products_get/`);
      console.log(product_response.data);
      setProducts(product_response.data);

      const cart_response = await axios.get(`http://127.0.0.1:8000/api/cart_get/`, { params: { uf_id } });
      console.log(cart_response.data);
      setCarts(cart_response.data);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="h4"
        sx={{
          marginBottom: "20px",
          fontWeight: "bold",
          fontSize: "28px",
          color: "#316731",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          borderBottom: "3px solid #4a8b4a",
          display: "inline-block",
          paddingBottom: "5px",
        }}
      >
        Order History
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: "0px 4px 8px rgba(0,0,0,0.1)", maxWidth: "90%" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#316731" }}>
            <TableRow>
              {["Order ID", "Product", "Quantity", "Price (₹)", "Date", "Status"].map((header) => (
                <TableCell key={header} sx={{ color: "white", fontWeight: "bold", whiteSpace: "nowrap" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userOrderHistory.map((order) => {
              const product = products.find((product) => product.p_id === order.p_id);
              const cart = carts.find((cart) => cart.cart_id === order.cart_id);
              const quantity = cart ? cart.qty : 0;
              const price = product ? product.p_price : 0;

              // Calculate total
              const totalPrice = quantity * price;

              return (
                <TableRow key={order.id} hover>
                  <TableCell>{order.order_id}</TableCell>
                  <TableCell>{product?.p_name || "N/A"}</TableCell>
                  <TableCell>{quantity || "N/A"}</TableCell>
                  <TableCell>₹{totalPrice || "N/A"}</TableCell>
                  <TableCell>{order.create_datetime}</TableCell>
                  <TableCell>
                    <Chip 
                      label={
                        order.status === 1
                        ? "Pending"
                        : order.status === 2
                        ? "Shipped"
                        : order.status === 3
                        ? "Delivered"
                        : "Cancelled"
                      }
                      color={getStatusColor(order.status)} // Use the getStatusColor function for dynamic color
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default UserOrderHistory;
