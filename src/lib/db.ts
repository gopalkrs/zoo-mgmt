import { configDotenv } from "dotenv"
import mongoose from "mongoose"

let isConnected = false
// configDotenv()
export async function connectDB() {
  if (isConnected) return

  try {
    const db = await mongoose.connect(process.env.MONGO_URI || "");
    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
