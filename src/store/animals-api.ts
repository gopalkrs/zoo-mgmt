import { useQuery } from "@tanstack/react-query"

export function useAnimals() {
  return useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const res = await fetch("/api/animals")
      if (!res.ok) throw new Error("Failed to fetch animals")
      return res.json()
    },
  })
}

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: async () => {
      const res = await fetch("/api/tickets")
      if (!res.ok) throw new Error("Failed to fetch tickets")
      return res.json()
    },
  })
}
