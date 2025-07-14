import express, { Express } from 'express';
import cors from "cors"; 
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { verifyToken, AuthRequest } from './middleware/authMiddleware';


const app: Express = express();
const client = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const allowedOrigins = ["http://localhost:5173", "http://localhost:5175"];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true               
}));

app.use(express.json());

// for registering 
app.post('/auth/register', async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  if (!firstName || !lastName || !email || !username || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await client.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await client.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      },
    });

    
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
});

// for logging in
app.post('/auth/login', async (req, res) => {
  const { identifier, password } = req.body;

  console.log("Login attempt:", identifier, password);

  try {
    const user = await client.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log("Login successful for", user.email);
    res.json({ token });
  } catch (e) {
    console.error("Login Error:", e);
    res.status(500).json({ message: 'Login failed' });
  }
});



app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'You are authenticated', user: (req as AuthRequest).user });
});


app.get('/', (_req, res) => {
  res.send('<h1>Welcome to the Blogit API</h1>');
});

// for creating blogs
app.post('/api/blogs', verifyToken, async (req: AuthRequest, res) => {
  const { title, synopsis, content, featuredImg } = req.body;

  if (!title || !synopsis || !content || !featuredImg) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const blog = await client.blog.create({
      data: {
        title,
        synopsis,
        content,
        featuredImg,
        userId: req.user.id,
      },
    });

    res.status(201).json({ message: 'Blog created successfully', blog });
  } catch (e: any) {
    console.error('Blog creation error:', e);
    res.status(500).json({ message: 'Failed to create blog', error: e.message });
  }
});

// get all blogs
app.get('/api/blogs', async (_req, res) => {
  try {
    const blogs = await client.blog.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
  include: {
    author: {
      select: {
     firstName: true,
        lastName: true,
      username: true,       
      email: true,
          },
        },
      },
    });

    res.json(blogs);
  } catch (e: any) {
    console.error('Fetch blogs error:', e);
    res.status(500).json({ message: 'Failed to fetch blogs', error: e.message });
  }
});

// get blog by id
app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await client.blog.findUnique({
      where: { id },
      include: {
        author: {
      select: {
        firstName: true,
        lastName: true,
         email: true,
         username: true,
     },
    },
      },
    });

    if (!blog || blog.isDeleted) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json(blog);
  } catch (e: any) {
    console.error('Get blog error:', e);
    res.status(500).json({ message: 'Failed to fetch blog', error: e.message });
  }
});

// foe getting loged in uder blogs
app.get('/api/user/blogs', verifyToken, async (req: AuthRequest, res) => {
  try {
    const blogs = await client.blog.findMany({
      where: {
   userId: req.user.id,
   isDeleted: false,
      },
   orderBy: { createdAt: 'desc' },
    });

    res.json(blogs);
  } catch (e) {
    console.error('Fetch user blogs error:', e);
    res.status(500).json({ message: 'Failed to fetch user blogs' });
  }
});

// for updatng blog
app.patch('/api/blogs/:id', verifyToken, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const { title, synopsis, content, featuredImg } = req.body;

  try {
    const blog = await client.blog.findFirst({
      where: {
     id,
    userId: req.user.id,
    isDeleted: false,
      },
    });

    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    const updated = await client.blog.update({
      where: { id },
      data: { title, synopsis, content, featuredImg },
    });

    res.json(updated);
  } catch (e) {
    console.error('Update blog error:', e);
    res.status(500).json({ message: 'Failed to update blog' });
  }
});

// for delting blog
app.delete('/api/blogs/:id', verifyToken, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const blog = await client.blog.findFirst({
      where: {
    id,
     userId: req.user.id,
     isDeleted: false,
      },
    });

    if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

    await client.blog.update({
      where: { id },
      data: { isDeleted: true },
    });

    res.json({ message: 'Blog deleted successfully' });
  } catch (e) {
    console.error('Delete blog error:', e);
    res.status(500).json({ message: 'Failed to delete blog' });
  }
});


const port = process.env.PORT || 5678;
app.listen(port, () => console.log(` Server running on http://localhost:${port}`));



// for getting /api/blogs/user/:userId
app.get('/blogs/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const blogs = await client.blog.findMany({
      where: {
       author: {
      id: userId,
        },
      },
    orderBy: {
     createdAt: 'desc',
     },
    include: {
     author: true,
    },
    });

    res.json(blogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    res.status(500).json({ error: 'Failed to fetch user blogs' });
  }
});





