import { TicketInput } from "@/types";
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export function useCreateTicket() {
  return useMutation({
    mutationFn: async (ticketData: TicketInput) => {
      const res = await axios.post("/api/tickets", ticketData)
      if (!res) throw new Error("Failed to create ticket");
      console.log(res.data);
      return res.data;
    },
  })
}