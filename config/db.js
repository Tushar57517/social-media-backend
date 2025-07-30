import mongoose from "mongoose";

const isProduction = process.env.PRODUCTION === "true";
const MONGO_URI = isProduction? process.env.PROD_MONGO_URI : process.env.MONGO_URI

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`DB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error connecting to DB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
