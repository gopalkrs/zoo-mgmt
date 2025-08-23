import mongoose from "mongoose";

export interface CareTaker {
  _id?: mongoose.Types.ObjectId;
  name: string;
  assignedAnimals: mongoose.Types.ObjectId[]; 
}
