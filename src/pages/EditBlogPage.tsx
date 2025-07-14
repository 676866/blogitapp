import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5678/api/blogs/${id}`);
        const blog = res.data;
        setTitle(blog.title);
        setSynopsis(blog.synopsis);
        setFeaturedImg(blog.featuredImg);
        setContent(blog.content);
      } catch (err: any) {
        setError("Failed to load blog data");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !synopsis || !content || !featuredImg) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:5678/api/blogs/${id}`,
        { title, synopsis, featuredImg, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Blog updated successfully!");
      navigate(`/blogs/${id}`);
    } catch (err: any) {
      console.error("Update blog error:", err);
      toast.error(err.response?.data?.message || "Failed to update blog");
    }
  };

  if (!token) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">You must be logged in to edit blogs.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Blog
      </Typography>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
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
          rows={2}
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
          rows={8}
          sx={{ mb: 3 }}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Update Blog
        </Button>
      </Box>
    </Container>
  );
};

export default EditBlogPage;
