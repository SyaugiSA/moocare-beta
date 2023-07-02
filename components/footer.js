import { Facebook, Instagram } from "@mui/icons-material";
import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function Footer() {
  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ mb: 8, flexDirection: { xs: "column", md: "row" } }}
      >
        <Box display="flex" flexDirection="column">
          <Typography variant="h5" sx={{ my: 2, fontFamily: "Poppins" }}>
            Informasi
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            Pusat Bantuan
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            polije@student.ac.id
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="h5" sx={{ my: 2, fontFamily: "Poppins" }}>
            Kantor
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            Kampus Politeknik
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            Negeri Jember
          </Typography>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="h5" sx={{ my: 2, fontFamily: "Poppins" }}>
            Social Media
          </Typography>

          <Box>
            <IconButton href="https://www.facebook.com">
              <Facebook />
            </IconButton>

            <IconButton href="https://www.instagram.com">
              <Instagram />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography variant="h5" sx={{ my: 2, fontFamily: "Poppins" }}>
            Produk
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            MooCare
          </Typography>
          <Typography component="span" sx={{ fontFamily: "Poppins" }}>
            Smartwatch
          </Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography
          component="span"
          sx={{
            opacity: 0.7,
            alignContent: "center",
            fontSize: { md: "12px", xs: "10px" },
            mb: 4,
            fontFamily: "Poppins",
          }}
        >
          Copyright@2022 Politeknik Negeri Jember
        </Typography>
      </Box>
    </Container>
  );
}
