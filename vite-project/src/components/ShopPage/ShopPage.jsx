import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const farmers = [
  {
    id: 1,
    name: "Om Patel",
    address: "A-5/86, ABC Nagar, Nr XYZ Road, Surat, Bhavnagar",
    description:
      "Experienced organic farmer specializing in fresh vegetables and fruits.",
    image: "https://source.unsplash.com/200x200/?man,portrait",
  },
  {
    id: 2,
    name: "Ravi Mehta",
    address: "B-10, Green Valley, Ahmedabad, Gujarat",
    description:
      "Expert in sustainable farming techniques with over 15 years of experience.",
    image: "https://source.unsplash.com/200x200/?person,smile",
  },
];

export default function ShopPage() {
  return (
    <Container sx={{ py: 5, textAlign: "center" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
        <span style={{ color: "#88b04b" }}>Meet Our</span> Farmers
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {farmers.map((farmer) => (
          <Grid item key={farmer.id} xs={12} sm={6} md={4}>
            <Card
              sx={{
                textAlign: "center",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease",
                "&:hover": { transform: "scale(1.05)" },
                p: 3,
              }}
            >
              <Avatar
                src={farmer.image}
                alt={farmer.name}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "auto",
                  border: "3px solid #88b04b",
                }}
              />
              <CardContent>
                {/* User Name Tag */}
                <Stack direction="row" justifyContent="left" spacing={1} sx={{ mt: 2 }}>
                  <Chip
                    icon={<PersonIcon />}
                    label={farmer.name}
                    sx={{ backgroundColor: "#d1f5c4", fontWeight: "bold" }}
                  />
                </Stack>

                {/* Location Tag */}
                <Stack direction="row" justifyContent="left" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    icon={<LocationOnIcon />}
                    label={farmer.address}
                    sx={{ backgroundColor: "#d1f5c4", fontWeight: "bold" }}
                  />
                </Stack>

                {/* Description Tag */}
                <Stack direction="row" justifyContent="left" spacing={1} sx={{ mt: 1 }}>
                  <Chip
                    icon={<InfoIcon />}
                    label={farmer.description}
                    sx={{
                      backgroundColor: "#d1f5c4",
                      fontWeight: "bold",
                      maxWidth: "80%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
