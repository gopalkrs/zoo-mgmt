import mongoose, { Schema } from "mongoose";

const ticketSchema = new Schema({
    numberOfAdults: { type: Number, required: true },
    numberOfChildren: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    dateOfVisit: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Tickets || mongoose.model("Tickets", ticketSchema);