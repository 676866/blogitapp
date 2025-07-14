import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { Link } from "react-router-dom";

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

const BlogListPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5678/api/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <Container sx={{ mt: 5,  py: 6}}>
      <Box  display="flex" justifyContent="space-between" mb={3}>
      <Typography variant="h4"  fontWeight={600} >
        Recent Blogs Posts
      </Typography>

     
      <Button
        variant="contained"
        component={Link}
        to="/blogs/create"
        sx={{ mb: 3 }}
      >
        Create Blog
      </Button>
 </Box>

      {loading ? (
        <Typography>Loading...

        </Typography>

      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={blog.id}
              component="div"
              {...({} as any)}
            >
              <Card
  sx={{
     mb: 4,
     display: "flex",
    flexDirection: "column",
    height: "100%",
    borderRadius: 3,
    boxShadow: 3,
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: 6,
    },
  }}
>
  <CardMedia
     component="img"
     height="180"
    image={blog.featuredImg || "https://via.placeholder.com/400x200"}
    alt={blog.title}
    sx={{
      
      //  width: "100%",
      objectFit: "cover",
    }}
  />
   <CardContent sx={{ flexGrow: 1 }}>
    <Typography variant="subtitle1"  fontWeight={600}  gutterBottom>
      {blog.title}
    </Typography>
    <Typography variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
      {blog.content.slice(0, 50)}...
    </Typography>
     <Box mt={2} display="flex" justifyContent="space-between" alignItems="center" gap={1}
    sx={{
      backgroundColor: "#96C3EB",
      p: 1,
      borderRadius: 2,
      mt: 2,
    }}>

       <Avatar sx={{ width: 30, height: 30, fontSize: 13,bgcolor: "#14AAF5",
        color: "#fff", }}>
            {blog.author?.firstName?.charAt(0).toUpperCase() || "A"}
          </Avatar>
          <Typography variant="caption" color="black">
            {blog.author?.firstName} {blog.author?.lastName} •{" "}
            {new Date(blog.createdAt).toLocaleDateString("en-GB")}
          </Typography>
     </Box>
    
  </CardContent>
  <CardActions sx={{ justifyContent: "flex-end" }}>
    <Button
      size="small"
      component={Link}
      to={`/blogs/${blog.id}`}
      variant="outlined"
    >
      Read More
    </Button>
  </CardActions>
</Card>

            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default BlogListPage;
