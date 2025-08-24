import mongoose, { Schema } from "mongoose";

const enclosureSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ["aquatic", "forrest", "land", "desert", "aviary", "savannah", "reptile house", "insectarium"], required: true },
    status: { type: String, enum: ["active", "under maintenance", "closed"], required: true, default: "active" },
    maxCapacity: { type: Number, required: true },
    lastCleaned: { type: Date },
    animals: [{ type: Schema.Types.ObjectId, ref: "Animal" }]
});

export const EnclosureModel = mongoose.models.Enclosure || mongoose.model("Enclosure", enclosureSchema);