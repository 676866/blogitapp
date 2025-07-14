import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Container, Typography } from "@mui/material";
import BlogCard from "../components/BlogCard";

type Blog = {
  id: string;
  title: string;
  synopsis: string;
  content: string;
  featuredImg: string;
  author: {
    name: string;
  };
};

const MyBlogsPage = () => {
  const [myBlogs, setMyBlogs] = useState<Blog[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await axios.get(`/api/blogs/user/${user?.id}`);
        console.log("Response data:", res.data);
        setMyBlogs(res.data);
      } catch (error) {
        console.error("Failed to fetch user's blogs", error);
        setMyBlogs([]); 
      }
    };

    if (user?.id) {
      fetchMyBlogs();
    }
  }, [user]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Blogs
      </Typography>

      {Array.isArray(myBlogs) && myBlogs.length > 0 ? (
        myBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Container>
  );
};

export default MyBlogsPage;
