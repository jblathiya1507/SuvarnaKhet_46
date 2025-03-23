import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Phone, Lock } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobile: "",
    otp: "",
  });
  const [otpSent, setOtpSent] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle OTP Send
  const handleSendOtp = async () => {
    if (formData.mobile) {
      const response = await axios.get(`http://127.0.0.1:8000/send_otp_py`, {params:{mobile:formData.mobile}});
      if (response.data.success) {
        Swal.fire({
          title: "OTP Sent!",
          text: response.data.msg,
          icon: "success",
          confirmButtonColor: "#6A0DAD",
        });
      }
      else{
        Swal.fire({
          title: "Error",
          text: response.data.msg,
          icon: "error",
          confirmButtonColor: "#FF4500",
        });
      }
      setOtpSent(true);
      console.log("OTP Sent to:", formData.mobile);
    }
  };

  // Handle Verify OTP
  const handleSubmit = async (e) => {
    const response = await axios.get(`http://127.0.0.1:8000/verify_otp_py`, {params:{mobile:formData.mobile,otp:formData.otp}});
    console.log(response.data);
    if (response.data.success) {
      Swal.fire({
        title: "Login!",
        text: response.data.msg,
        icon: "success",
        confirmButtonColor: "#6A0DAD",
      }).then(()=>{
        console.log(response.data.user.uf_id);
        console.log(response.data.user);
        localStorage.setItem("uf_id", response.data.user.uf_id);
        navigate("/farmer/dashboard");
      })
      console.log(response.data);
    }else{
      Swal.fire({
        title: "Error",
        text: response.data.msg,
        icon: "error",
        confirmButtonColor: "#FF4500",
      });
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundColor: "#7BAE4C",
        // padding: "10px",
      }}
    >
      {/* Rounded Box with Image */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="90%"
        maxWidth="900px"
        height="70vh"
        sx={{
          backgroundImage: `url(/service-1.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "30px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Transparent Login Card */}
        <Card
          sx={{
            width: "380px",
            padding: "30px",
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(15px)",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            mb={2}
            sx={{ color: "#FFF" }}
          >
            Sign In
          </Typography>

          <form>
            {/* Mobile Number */}
            <TextField
              fullWidth
              label="Enter Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone sx={{ color: "#7BAE4C" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                backgroundColor: "#F4E7C5",
                borderRadius: "25px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "25px",
                },
              }}
              disabled={otpSent} // Disable when OTP is sent
            />

            {/* Send OTP Button */}
            {!otpSent && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleSendOtp}
                sx={{
                  mt: 2,
                  backgroundColor: "#7BAE4C",
                  color: "#FFF",
                  fontWeight: "bold",
                  borderRadius: "25px",
                  padding: "10px",
                  "&:hover": { backgroundColor: "#6AAE4C" },
                }}
              >
                Send OTP
              </Button>
            )}

            {/* OTP Input (Only Show After Sending OTP) */}
            {otpSent && (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  name="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: "#7BAE4C" }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    backgroundColor: "#F4E7C5",
                    borderRadius: "25px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                    },
                  }}
                />

                {/* Resend OTP */}
                <Typography
                  textAlign="center"
                  mt={1}
                  fontSize="12px"
                  sx={{ color: "#FFF" }}
                >
                  Didn't receive OTP?{" "}
                  <span
                    style={{ color: "#D4E157", fontWeight: "bold", cursor: "pointer" }}
                    onClick={handleSendOtp}
                  >
                    RESEND OTP
                  </span>
                </Typography>

                {/* Verify Button */}
                <Button
                  fullWidth
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#7BAE4C",
                    color: "#FFF",
                    fontWeight: "bold",
                    borderRadius: "25px",
                    padding: "10px",
                    "&:hover": { backgroundColor: "#6AAE4C" },
                  }}
                >
                  Verify OTP
                </Button>
              </>
            )}

            {/* Signup Link */}
            <Typography textAlign="center" mt={2} fontSize="14px" color="white">
              Didn't have an account?{" "}
              <Link
                to="/farmer/signup"
                style={{
                  color: "#D4E157",
                  fontWeight: "bold",
                  textDecoration: "none",
                }}
              >
                Create Account
              </Link>
            </Typography>
          </form>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
