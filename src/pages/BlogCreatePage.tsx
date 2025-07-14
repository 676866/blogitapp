import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const BlogCreatePage = () => {
  useAuth();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [content, setContent] = useState("");
  const [featuredImg, setFeaturedImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {

      setSuccessMsg("Blog created successfully!");
      setTitle("");
      setSynopsis("");
      setContent("");
      setFeaturedImg("");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Failed to create blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom mt={4}>
        Create New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Synopsis"
          fullWidth
          margin="normal"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
        <TextField
          label="Markdown Content"
          fullWidth
          multiline
          rows={6}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <TextField
          label="Featured Image URL"
          fullWidth
          margin="normal"
          value={featuredImg}
          onChange={(e) => setFeaturedImg(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? "Submitting..." : "Create Blog"}
        </Button>
        {successMsg && <Typography color="success.main" mt={2}>{successMsg}</Typography>}
        {errorMsg && <Typography color="error" mt={2}>{errorMsg}</Typography>}
      </Box>
    </Container>
  );
};

export default BlogCreatePage;
