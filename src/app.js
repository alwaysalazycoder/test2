// PACKAGES IMPORTS
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// IMPORTS FROM FILES
import { connectDB } from "./database/index.js";
import authRoutes from "./routes/authRouter.js";
import errorHandler from "./middleware/errorMiddlewar.js";

dotenv.config();

// Database connection
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/',(req,res)=>{
    res.send('🔥🔥 live')
})
app.use("/auth", authRoutes);

// Error middleware
app.use(errorHandler);

export default app;
