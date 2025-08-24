import { connectDB } from "@/lib/db";
import { TicketService } from "@/app/services/ticket.services";
import { NextRequest } from "next/server";

const ticketService = new TicketService();

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const ticketData = await req.json();
    if (new Date(ticketData.dateOfVisit).getTime() < new Date().getTime()) {
      return Response.json(
        { error: "Date of visiting cannot be in past" },
        { status: 400 }
      );
    }
    if (new Date(ticketData.dateOfVisit).getTime() > new Date().getTime()) {
      const ticketListForDate = await ticketService.getTicketsByVisitDate(
        new Date(ticketData.dateOfVisit)
      );
      if (ticketListForDate.length >= 100) {
        return Response.json(
          { error: "Pre Booking limit has been reached for this date" },
          { status: 400 }
        );
      } else {
        const ticketResult = await ticketService.bookTicket(ticketData);
        //console.log(ticketResult);
        return Response.json(
          { message: "Pre Booking Successfull", ticket: ticketResult },
          { status: 201 }
        );
      }
    }
    const ticketResult = await ticketService.bookTicket(ticketData);

    return Response.json(
      { message: "Ticket Booked Successfully", ticket: ticketResult },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating ticket:", error);
    return Response.json({ error: "Failed to book ticket" }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const ticketsList = await ticketService.getTickets();
    return Response.json(
      { message: "Tickets fetched successfully", result: ticketsList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error finding tickets:", error);
  }
}
