import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import { connectDB } from './config/db.js';
import router from './routes/route.js';
import adminRouter from './routes/adminRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT ||  5001;

// Middleware
app.use(cors());
app.use(express.json());

app.use("",router)
app.use("/admin",adminRouter)

connectDB();    

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
