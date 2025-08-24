import { TicketDocument } from "@/types";
import { create } from "zustand";

type TicketStore = {
  ticket: TicketDocument | null;
  setTicket: (ticket: TicketDocument) => void;
  clearTicket: () => void;
};

export const useTicketStore = create<TicketStore>((set) => ({
  ticket: null,
  setTicket: (ticket: TicketDocument) => set({ ticket }),
  clearTicket: () => set({ ticket: null }),
}));