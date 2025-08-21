import { connectDB } from "@/lib/db";
import Ticket from "@/models/Tickets";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try{
    const {numberOfAdults, numberOfChildren, createdAt, dateOfVisit, totalPrice} = await req.json();

    if(new Date(dateOfVisit).getTime() < new Date().getTime()){
        return Response.json({ error: "Date of visiting cannot be in past" }, { status: 400 });
    }

    if(new Date(dateOfVisit).getTime() > new Date().getTime()){
        const ticketsForDate = await Ticket.find({dateOfVisit: dateOfVisit});
        if(ticketsForDate.length >= 1){
            return Response.json({error: "Pre Booking limit has been reached for this date"}, { status: 400 });
        }
        await Ticket.create({numberOfAdults, numberOfChildren, createdAt, dateOfVisit, totalPrice});
        return Response.json({message: "Pre Booking Successfull"}, { status: 201 });
    }
    await Ticket.create({numberOfAdults, numberOfChildren, createdAt, dateOfVisit, totalPrice});

    return Response.json({message: "Ticket Booked Successfully"}, { status: 201 });
  }catch(error){
    console.error("Error creating ticket:", error);
    return Response.json({ error: "Failed to create ticket" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try{
    const tickets = await Ticket.find();
    return Response.json(tickets, { status: 201 });
  }catch(error){
    console.error("Error finding tickets:", error);
    return Response.json({ error: "Failed to fetch tickets" }, { status: 500 });
  }
}