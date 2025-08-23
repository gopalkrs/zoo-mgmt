"use client"
// import { searchParamsCache } from "@/lib/search-params"
import { AnimalTable } from "./animals-table"
import { columns } from "./animals-table/columns"
import { Animal } from "@/types"
import { useEffect, useState } from "react"
import axios from "axios"
type ProductListingPage = {}

export default async function AnimalListingPage({}: ProductListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  // const page = searchParamsCache.get("page")
  // const search = searchParamsCache.get("name")
  // const pageLimit = searchParamsCache.get("perPage")
  // const categories = searchParamsCache.get("category")

  // const filters = {
  //   page,
  //   limit: pageLimit,
  //   ...(search && { search }),
  //   ...(categories && { categories: categories }),
  // }

  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(true)
  const fetchAnimals = async () => {
    const res = await axios.get("/api/animals")
    console.log(res)
  }

  useEffect(() => {
    fetchAnimals()
  }, [])
  // fetch("/api/animals", { method: "GET" })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setAnimals(data as Animal[])
  //     console.log("data ==>", data)
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching animals:", error)
  //     setAnimals([])
  //   })
  //   .finally(() => setLoading(false))

  const totalAnimals = animals.length
  // const products: Animal[] = data.products

  if (loading) return <div>Loading...</div>
  console.log("animals ==>", animals)
  return (
    <AnimalTable data={animals} totalItems={totalAnimals} columns={columns} />
  )
}
