import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";

export default function Profile() {
  // Initial user data (Replace with actual user data from API or Context API)
  const [user, setUser] = useState({
    username: "Om Patel",
    email: "ompatel@example.com",
    mobile: "+91 98765 43210",
    gender: "Male",
    address: "A-5/86, ABC Nagar, Nr XYZ Road",
    city: "Surat",
    pincode: "395007",
    dob: "2001-03-10",
    profilePic: "https://source.unsplash.com/100x100/?profile",
  });

  // State to control Edit Profile Modal
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  // Handle opening the dialog
  const handleOpen = () => {
    setEditedUser(user); // Reset edited user state
    setOpen(true);
  };

  // Handle closing the dialog
  const handleClose = () => setOpen(false);

  // Handle input change in the form
  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  // Handle save changes
  const handleSave = () => {
    setUser(editedUser); // Update user state
    handleClose();
  };

  return (
    <Container sx={{ py: 5, textAlign: "center", maxWidth: "600px" }}>
      <Card sx={{ p: 3, borderRadius: "15px", boxShadow: 3 }}>
        <CardContent>
          {/* Profile Image */}
          
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {user.username}
          </Typography>

          {/* User Details */}
          <Box sx={{ textAlign: "left", mx: "auto", maxWidth: "400px" }}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Mobile:</strong> {user.mobile}
            </Typography>
            <Typography variant="body1">
              <strong>Gender:</strong> {user.gender}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {user.address}
            </Typography>
            <Typography variant="body1">
              <strong>City:</strong> {user.city}
            </Typography>
            <Typography variant="body1">
              <strong>Pincode:</strong> {user.pincode}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {user.dob}
            </Typography>
          </Box>

          {/* Edit Profile Button */}
          <Button
            variant="contained"
            sx={{ mt: 3, backgroundColor: "#2c5e1a", "&:hover": { backgroundColor: "#234517" } }}
            onClick={handleOpen}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog (Popup) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          {/* Form Fields */}
          <TextField fullWidth margin="dense" label="Username" name="username" value={editedUser.username} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Email" name="email" value={editedUser.email} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Mobile" name="mobile" value={editedUser.mobile} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Gender" name="gender" value={editedUser.gender} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Address" name="address" value={editedUser.address} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="City" name="city" value={editedUser.city} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Pincode" name="pincode" value={editedUser.pincode} onChange={handleChange} />
          <TextField fullWidth margin="dense" label="Date of Birth" name="dob" type="date" value={editedUser.dob} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">Cancel</Button>
          <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
