import mongoose from "mongoose";

export interface CareTaker {
  id?: mongoose.Types.ObjectId;
  name: string;
  assignedAnimals: mongoose.Types.ObjectId[]; 
}
