import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 4000;

// Database and service connections
(async () => {
  try {
    await connectDB();
    await connectCloudinary();
    console.log('All services connected successfully');
  } catch (error) {
    console.error('Failed to initialize services:', error);
    process.exit(1);
  }
})();

// Middleware
app.use(express.json({ limit: '10mb' })); // Added payload limit
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// API endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    message: 'E-commerce API is working',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));