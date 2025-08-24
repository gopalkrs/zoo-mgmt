import mongoose from "mongoose"

const careTakerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  assignedAnimals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
    },
  ],
})

export const careTakerModel =
  mongoose?.models?.CareTaker || mongoose.model("CareTaker", careTakerSchema)
