import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featuredImg, setFeaturedImg] = useState(""); 
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!token) {
      setError("You must be logged in to create a blog.");
      return;
    }

    if (!title || !synopsis || !content || !featuredImg) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5678/api/blogs", 
        {
          title,
          synopsis,
          featuredImg,
          content,
        },
        {
          headers: {
        Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

          console.log("Blog created:", res.data);
      setSuccess(true);
      navigate("/blogs");
    } catch (err: any) {
      console.error("Create blog error:", err.response);
         setError(err.response?.data?.message || "Failed to create blog");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Create New Blog
      </Typography>

      {error && (
    <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
       Blog created successfully!
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
         fullWidth
          label="Title"
         value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
            required
        />
        <TextField
          fullWidth
          label="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Featured Image URL"
          value={featuredImg}
          onChange={(e) => setFeaturedImg(e.target.value)}
          sx={{ mb: 2 }}
          required
        />
        <TextField
          fullWidth
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          rows={6}
          sx={{ mb: 3 }}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Create Blog
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBlogPage;
