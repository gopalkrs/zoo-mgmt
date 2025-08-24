"use client"
import { CareTakerTable } from "./caretakers-table"
import { columns } from "./caretakers-table/columns"
import { useCareTakers } from "@/store/caretakers-api"
import { CareTaker } from "@/types/CareTaker"

export default function CareTakerListingPage() {
  const { data: caretakersData, isLoading, error } = useCareTakers()

  const caretakers: CareTaker[] = caretakersData?.result || []

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading caretakers</div>

  const totalCareTakers = caretakers.length

  return (
    <div className="container mx-auto py-10">
      <CareTakerTable
        data={caretakers}
        totalItems={totalCareTakers}
        columns={columns}
      />
    </div>
  )
}
