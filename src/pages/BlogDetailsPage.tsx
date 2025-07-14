import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; 
interface Blog {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  createdAt: string;
  author: {
    firstName: string;
    lastName: string;
    username: string;
  };
}

const BlogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth(); 

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5678/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:5678/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/blogs");
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6">Blog not found</Typography>
      </Container>
    );
  }

  const isAuthor = user?.username === blog.author.username;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        {blog.title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          {blog.synopsis}
        </Typography>

      <Typography variant="subtitle2"   style={{ fontWeight: 'bold', color: '#000' }}> 
        By {blog.author.firstName} {blog.author.lastName} •{" "}
        {new Date(blog.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Typography>

      {blog.featuredImg && (
        <Card sx={{  
          width: '45%',
          maxHeight: 300,
          objectFit: 'cover',
          borderRadius: 2,
          my: 3
             
          }}>

          

          <CardMedia
            component="img"
            height="300"
            image={blog.featuredImg}
            alt={blog.title}
          />
        </Card>
      )}

      <Box   sx={{
    mt: 2,
    whiteSpace: "pre-line",
    '& > *:first-of-type::first-letter': {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      float: 'left',
      lineHeight: '1',
      pr: 1,
    },
  }}
>
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </Box>

      
      {isAuthor && (
        <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            component={Link}
            to={`/blogs/${blog.id}/edit`}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default BlogDetailsPage;
