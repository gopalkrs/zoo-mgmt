"use client"
import { AnimalTable } from "./animals-table"
import { columns } from "./animals-table/columns"
import { useAnimals } from "@/store/animals-api"
import { Animal } from "@/types"

export default function AnimalListingPage() {
  const { data: animalsData, isLoading, error } = useAnimals()

  const animals: Animal[] = animalsData?.result || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading animals</div>

  const totalAnimals = animals.length

  return (
    <div className="container mx-auto py-10">
      <AnimalTable data={animals} totalItems={totalAnimals} columns={columns} />
    </div>
  )
}
