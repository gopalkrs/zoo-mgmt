import { useQuery } from "@tanstack/react-query"

export function getCareTakers() {
  return useQuery({
    queryKey: ["caretakers"],
    queryFn: async () => {
      const res = await fetch("/api/caretakers")
      if (!res.ok) throw new Error("Failed to fetch caretakers")
      return res.json()
    },
  })
}
