import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();
  return Response.json({ message: "MongoDB connection working!" });
}