import { connectDB } from "@/lib/db";
import { TicketService } from "@/services/ticketService";
import { NextRequest } from "next/server";

const ticketService = new TicketService();

export async function POST(req: NextRequest) {
  await connectDB();
  const ticketData = await req.json();
  ticketService.bookTicket(ticketData);
}

export async function GET() {
  await connectDB();
  ticketService.getTickets();
}