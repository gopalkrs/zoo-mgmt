import Tickets from "@/models/Tickets";
import { TicketDocument, TicketInput } from "@/types/ticket";

export class TicketService {
  async bookTicket(ticketData: TicketInput) {
    try{
    const ticketData = await req.json();
    
  
    if (new Date(ticketData.dateOfVisit).getTime() < new Date().getTime()) {
      return Response.json(
        { error: "Date of visiting cannot be in past" },
        { status: 400 }
      );
    }

    if (new Date(ticketData.dateOfVisit).getTime() > new Date().getTime()) {
      const ticketListForDate = await Tickets.find({
        dateOfVisit: ticketData.dateOfVisit,
      });
      if (ticketListForDate.length >= 1) {
        return Response.json(
          { error: "Pre Booking limit has been reached for this date" },
          { status: 400 }
        );
      }
      await Tickets.create(ticketData);
      return Response.json(
        { message: "Pre Booking Successfull" },
        { status: 201 }
      );
    }
    await Tickets.create(ticketData);

    return Response.json(
      { message: "Ticket Booked Successfully" },
      { status: 201 }
    );
    }catch(error){
    console.error("Error creating ticket:", error);
    return Response.json({ error: "Failed to create ticket" }, { status: 500 });
  }
  }

  async getTickets() {
    try {
      const tickets = await Tickets.find();
      return Response.json(tickets, { status: 201 });
    } catch (error) {
      console.error("Error finding tickets:", error);
      return Response.json(
        { error: "Failed to fetch tickets" },
        { status: 500 }
      );
    }
  }
}
