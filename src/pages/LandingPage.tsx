import { Container, Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SimpleFooter from "../components/footer"
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url('/background.avif')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          color: "white",
          backdropFilter: "brightness(0.6)",
        }}
      >
        <Container maxWidth="sm">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
              "BlogIt😎, Turn Thoughts Into Timeless Blogs"
            </Typography>
            <Typography variant="h6" sx={{ mb: 4 }}>
              Write ✍️. Inspire💡. Discover voices that matter🌍.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/blogs")}
              sx={{ borderRadius: 3, boxShadow: 4 }}
            >
              Explore Blogs
            </Button>
          </motion.div>
        </Container>
      </Box>

      <SimpleFooter /> 
    </>
  );
};

export default LandingPage;
