import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type Blog = {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  createdAt: string;
};



const ProfilePage = () => {

  const navigate = useNavigate(); 


  const { user } = useAuth();

  const name = (user as any)?.firstName || "User Name";
  const email = (user as any)?.email || "user@example.com";

  const [editOpen, setEditOpen] = useState(false);
  const [formData, setFormData] = useState({ name, email });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = () => {
    
    console.log("Saving profile:", formData);
    setEditOpen(false);
  };

 
const {
  data: blogs,
  isLoading,
  isError,
  error,
} = useQuery<Blog[], Error>({
  queryKey: ["myBlogs"],
  queryFn: async () => {
    const res = await axios.get("http://localhost:5678/api/user/blogs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  },
});

console.log({ blogs, isLoading, isError, error });


  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,rgb(128, 155, 197),rgb(131, 170, 232))",
        py: 6,
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                bgcolor: "#6E77EE",
                fontSize: 36,
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {email}
            </Typography>

            <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="contained"     sx={{ minWidth: '100px', height: '45px' }}
 onClick={() => setEditOpen(true)}>
                Edit Profile
              </Button>
              <Button variant="outlined"     sx={{ minWidth: '150px', height: '45px' }}
 href="/blogs">
                View All Blogs
              </Button>

<Button 
  variant="contained" 
    sx={{ minWidth: '100px', height: '45px' }}
  onClick={() => navigate("/my-blogs")}
>
  My Blogs
</Button>

            </Box>

          
            <Box sx={{ mt: 6, textAlign: "left" }}>
  <Typography variant="h6" gutterBottom>
    My Blogs
  </Typography>

  {isLoading ? (
    <Typography>Loading...</Typography>
  ) : isError ? (
    <Typography color="error">Failed to load blogs.</Typography>
  ) : blogs && blogs.length > 0 ? (
    blogs.map((blog) => (
      <Paper key={blog.id} sx={{ p: 2, mb: 2 }}>
        <Typography variant="subtitle1">{blog.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.synopsis}
        </Typography>
      </Paper>
    ))
  ) : (
    <Typography>You haven't created any blogs yet.</Typography>
  )}
</Box>

          </Paper>
        </motion.div>
      </Container>

     
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            name="name"
            fullWidth
            value={formData.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            fullWidth
            value={formData.email}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveProfile} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
