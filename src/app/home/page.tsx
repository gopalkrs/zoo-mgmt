"use client"
import axios from "axios"
import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"
import { getAnimals } from "@/store/animals-api"

const page = () => {
  const { data: animals, isLoading, error } = getAnimals()

  console.log("animals ==>", animals?.result)

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading animals</div>

  return (
    <div>
      <Button>animals</Button>
    </div>
  )
}

export default page
