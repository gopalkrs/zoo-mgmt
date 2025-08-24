"use client"
import axios from "axios"
import { useEffect } from "react"
export default function Home() {
  const fetchAnimals = async () => {
    const res = await axios.get("/api/animals")
    console.log(res)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])

  return <div>hello world</div>
}
