import { Box, Container, Typography, Link, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        color: "#fff",
        py: { xs: 4, md: 6 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
          }}
        >
        
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              About <strong>BlogIt</strong>
            </Typography>
            <Typography variant="body2">
              BlogIt is your go-to platform for writing, sharing, and discovering blogs that inspire.
             
            </Typography>
          </Box>

          
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <HomeIcon fontSize="small" />
                Home
              </Link>
              <Link href="/blogs" color="inherit" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <ArticleIcon fontSize="small" />
                Blogs
              </Link>
              <Link href="/login" color="inherit" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <LoginIcon fontSize="small" />
                Login
              </Link>
              <Link href="/register" color="inherit" underline="hover" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonAddIcon fontSize="small" />
                Register
              </Link>
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EmailIcon fontSize="small" />
                frankit@blogit.com
              </Typography>
              <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PhoneIcon fontSize="small" />
                +254 794 603 876
              </Typography>
            </Stack>
          </Box>
        </Box>

     
        <Box sx={{ mt: 4, textAlign: "center" }}>

          <Typography variant="body2" sx={{ mb: 1 }}>
    Built with <span style={{ color: "#ef060eff" }}>❤️</span> by Kober
  </Typography>
          <Typography variant="body2">
            © {new Date().getFullYear()} <strong>BlogIt</strong>. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
