export interface TicketInput {
  numberOfAdults: number;
  numberOfChildren: number;
  dateOfVisit: Date;
  totalPrice: number;
}

export interface TicketDocument extends TicketInput {
    createdAt: Date;
    _id: string;
}