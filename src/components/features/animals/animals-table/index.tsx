"use client"

import { DataTable } from "@/components/ui/table/data-table"
import { DataTableToolbar } from "@/components/ui/table/data-toolbar"

import { useDataTable } from "@/hooks/use-data-table"

import { ColumnDef } from "@tanstack/react-table"
import { parseAsInteger, useQueryState } from "nuqs"
interface ProductTableParams<TData, TValue> {
  data: TData[]
  totalItems: number
  columns: ColumnDef<TData, TValue>[]
}
export function AnimalTable<TData, TValue>({
  data,
  totalItems,
  columns,
}: ProductTableParams<TData, TValue>) {
  console.log("columns index =============>")
  console.log("data ==>", data)
  console.log("totalItems ==>", totalItems)
  console.log("columns ==>", columns)
  const [pageSize] = useQueryState("perPage", parseAsInteger.withDefault(10))

  const pageCount = Math.ceil(totalItems / pageSize)
  console.log("data ==>", data)
  console.log("totalItems ==>", totalItems)
  console.log("pageSize ==>", pageSize)
  const { table } = useDataTable({
    data, // product data
    columns, // product columns
    pageCount: pageCount,
    shallow: false, //Setting to false triggers a network request with the updated querystring.
    debounceMs: 500,
  })

  console.log("table ==>", table)

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}
