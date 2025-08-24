"use client"
import { Button } from "@/components/ui/button"
import React from "react"
import { getAnimals } from "@/store/animals-api"

const page = () => {
  const { data: animals, isLoading, error } = getAnimals()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading animals</div>

  return (
    <div>
      <Button>animals</Button>
    </div>
  )
}

export default page
