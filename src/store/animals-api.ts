import { useQuery } from "@tanstack/react-query"

export function getAnimals() {
  return useQuery({
    queryKey: ["animals"],
    queryFn: async () => {
      const res = await fetch("/api/animals")
      if (!res.ok) throw new Error("Failed to fetch animals")
      return res.json()
    },
  })
}
