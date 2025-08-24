import mongoose from "mongoose"

const scheduleSchema = new mongoose.Schema({
  caretakerId: { type: mongoose.Schema.Types.ObjectId, ref: "Caretaker" },
  date: { type: Date, required: true },
  tasks: [
    {
      animalId: { type: mongoose.Schema.Types.ObjectId, ref: "Animal" },
      taskType: { type: String, enum: ["feed", "clean", "health_check"] },
      time: { type: String },
      status: { type: String, enum: ["pending", "done"], default: "pending" },
      notes: { type: String },
    },
  ],
})

export const ScheduleModel =
  mongoose?.models?.Schedule || mongoose.model("Schedule", scheduleSchema)
