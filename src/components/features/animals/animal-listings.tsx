"use client"
import { AnimalTable } from "./animals-table"
import { columns } from "./animals-table/columns"
import { Animal } from "@/types"
import { getAnimals } from "@/store/animals-api"
type AnimalListingPage = {}

export default function AnimalListingPage({}: AnimalListingPage) {
  const { data: animalsData, isLoading, error } = getAnimals()

  console.log("animals ==>", animalsData?.result)
  const animals: Animal[] = animalsData?.result || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading animals</div>

  const totalAnimals = animals.length

  if (isLoading) return <div>Loading...</div>
  console.log("animals ==>", animals)
  console.log("columns ==>", columns)
  return (
    <AnimalTable data={animals} totalItems={totalAnimals} columns={columns} />
  )
}
