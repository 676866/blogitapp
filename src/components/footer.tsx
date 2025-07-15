import { Box, Container, Link, Typography } from "@mui/material";

const Footer = () => {

  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: { xs: 4, md: 6 },
        px: 2,
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            About BlogIt
          </Typography>
          <Typography variant="body2">
            BlogIt is your go-to platform for writing, sharing, and discovering blogs that inspire.
          </Typography>
        </Box>

        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" underline="hover" color="inherit">
              Home
            </Link>
            <Link href="/blogs" underline="hover" color="inherit">
              Blogs
            </Link>
            <Link href="/login" underline="hover" color="inherit">
              Login
            </Link>
            <Link href="/register" underline="hover" color="inherit">
              Register
            </Link>
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2">Email: frankit@blogit.com</Typography>
          <Typography variant="body2">Phone: +254 794 603 876</Typography>
          <Typography variant="body2" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} <strong>BlogIt</strong>. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
