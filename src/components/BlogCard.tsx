import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Link } from "react-router-dom";

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

type BlogCardProps = {
  blog: Blog;
};

const BlogCard = ({ blog }: BlogCardProps) => {
    
  return (
    <Card sx={{ maxWidth: 800, margin: 'auto', mb: 4, boxShadow: 3, borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="250"
        image={blog.featuredImg}
        alt={blog.title}
        sx={{
          objectFit: 'cover',
          width: 250,
          height: 'auto',
          borderRadius: '8px 0 0 8px',

          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
        }}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.synopsis}
        </Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
         {blog.author?.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
  component={Link}
  to={`/blogs/${blog.id}`}
  variant="outlined"
  sx={{ mt: 2 }}
>
  Read More
</Button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
