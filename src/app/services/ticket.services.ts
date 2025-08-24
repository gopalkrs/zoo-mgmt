import { TicketModel } from "@/models";
import { TicketDocument, TicketInput } from "@/types/ticket";

export class TicketService {
  /**
   * Create a new ticket entry in the database.
   * @param {TicketInput} data - Ticket object containing the required fields
   * @returns {Promise<TicketDocument>} The created ticket document
   */
  async bookTicket(ticketData: TicketInput): Promise<TicketDocument> {
    const result = await TicketModel.create(ticketData);
    console.log("[bookTicket] result:", result);
    return result;
  }

  /**
   * Fetch all tickets from the database.
   * @returns {Promise<TicketDocument []>} Array of all ticket booked
   */
  async getTickets(): Promise<TicketDocument[]> {
    const tickets = await TicketModel.find();
    return tickets;
  }

  /**
   * Fetch all tickets from the database for the given date.
   ** @param {Date} data - date of visit
   * @returns {Promise<TicketDocument []>} Array of all ticket booked on the given date
   */
  async getTicketsByVisitDate(dateOfVisit: Date): Promise<TicketDocument[]> {
    const ticketListForDate = await TicketModel.find({
      dateOfVisit: dateOfVisit,
    });
    return ticketListForDate;
  }
}
