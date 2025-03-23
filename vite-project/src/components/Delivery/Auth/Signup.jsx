import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  TextField,
  Button,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { Person, Phone, CalendarToday, Lock } from "@mui/icons-material";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    gender: "",
    dob: "",
    otp: "",
  });

  const [otpSent, setOtpSent] = useState(false); // State to show OTP input

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle OTP send
  const handleSendOtp = () => {
    if (formData.mobile.length === 10) {
      setOtpSent(true);
      console.log("OTP Sent to:", formData.mobile);
    } else {
      alert("Enter a valid mobile number.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#A4C96F" }}
    >
      <Card
        sx={{
          display: "flex",
          width: 800,
          borderRadius: 5,
          overflow: "hidden",
          boxShadow: 5,
        }}
      >
        {/* Left Side - Form */}
        <Box sx={{ flex: 1, backgroundColor: "#316731", padding: 4 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="white"
            textAlign="center"
            mb={1}
          >
            Create an Account
          </Typography>
          <Typography variant="body2" color="#d1e7d3" textAlign="center" mb={3}>
            Sign up
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#f8f8e7", borderRadius: 1 }}
            />

            {/* Mobile Number */}
            <TextField
              fullWidth
              label="Mobile No."
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#f8f8e7", borderRadius: 1 }}
            />

            {/* Gender */}
            <Typography variant="body2" color="white" mt={2} mb={1}>
              Gender
            </Typography>
            <RadioGroup
              row
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel
                value="Male"
                control={<Radio sx={{ color: "white" }} />}
                label={<Typography color="white">Male</Typography>}
              />
              <FormControlLabel
                value="Female"
                control={<Radio sx={{ color: "white" }} />}
                label={<Typography color="white">Female</Typography>}
              />
            </RadioGroup>

            {/* Date of Birth */}
            <TextField
              fullWidth
              label="Date of Birth"
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarToday />
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#f8f8e7", borderRadius: 1 }}
              InputLabelProps={{ shrink: true }}
            />
            {/* Send OTP Button */}
            {!otpSent ? (
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  backgroundColor: "#A4C96F",
                  color: "#316731",
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: "#8eb45a" },
                }}
                onClick={handleSendOtp}
              >
                Send OTP
              </Button>
            ) : (
              <>
                {/* OTP Input Field */}
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
                        <Lock />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ backgroundColor: "#f8f8e7", borderRadius: 1 }}
                />

                {/* Submit Button */}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    backgroundColor: "#A4C96F",
                    color: "#316731",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#8eb45a" },
                  }}
                >
                  Submit
                </Button>
              </>
            )}

            {/* Login Link */}
            <Typography textAlign="center" mt={2} color="white">
              Have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#A4C96F", fontWeight: "bold" }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Box>

        {/* Right Side - Image */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: "url('/farmer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "0 5px 5px 0",
          }}
        />
      </Card>
    </Box>
  );
};

export default Signup;
