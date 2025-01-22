import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemRoutes from './routes/item.routes'; // Import item routes

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'; // Replace with your MongoDB connection string

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', itemRoutes); // Use item routes

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!!!!');
});

// Start the server
app.listen(port, () => {
  console.log(`MONGO_URI :=> ${mongoURI}`)
  console.log(`Server running at http://localhost:${port}`);
});


//     // "dev": "ts-node-dev --respawn --transpile-only src/index.ts",

//    //   "dev": "ts-node-dev -r tsconfig-paths/register src/index.ts",