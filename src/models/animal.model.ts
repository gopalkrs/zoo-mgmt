import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    dob: { type: Date, required: true },
    origin: { type: String },
    category: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"], required: true },
    gallery: [{ type: String }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const AnimalModel =
  mongoose?.models?.Animal || mongoose.model("Animal", animalSchema);
