import mongoose, { Document } from "mongoose";

export interface EnclosureDocument extends Document {
  name: string;
  type: string;
  location: string;
  capacity: number;
  status: string;
  animals: mongoose.Types.ObjectId[]; // relation
}