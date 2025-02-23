import mongoose from "mongoose";
import logger from "../utils/logger.js";

export const connectDB = () => {
  const DB_URL = process.env.MONGO_URI;
  mongoose
    .connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      logger.success(`✔ MongoDB connected successfully`);
    })
    .catch((err) => {
      logger.error(
        `❌ Error occured while connecting to the database : ${err}`
      );
      process.exit(1);
    });
};
