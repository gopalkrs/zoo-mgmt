"use client"
import axios from "axios"
import { Button } from "@/components/ui/button"
import React, { useEffect } from "react"

const page = () => {
  const fetchAnimals = async () => {
    const res = await axios.get("/api/animals")
    console.log(res)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  return (
    <div>
      <Button>Hello</Button>
    </div>
  )
}

export default page
