import { Animal } from "@/types";
import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export function useAddAnimal() {
  return useMutation({
    mutationFn: async (animalData: Animal) => {
      const res = await axios.post("/api/animals", animalData);
      if (!res) throw new Error("Failed to add animal");
      console.log(res.data);
      return res.data;
    },
  })
}