"use client"
import { Badge } from "@/components/ui/badge"

import { Column, ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, XCircle } from "lucide-react"

import { Animal } from "@/types"

export const columns: ColumnDef<Animal>[] = [
  {
    id: "name",
    accessorKey: "name",
    // header: ({ column }: { column: Column<Animal, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Name" />
    // ),
    header: "Name",
    cell: ({ cell }) => {
      const value = cell.getValue<Animal["name"]>()
      console.log("Name Cell -> input:", cell, "output:", value)
      return <div>{value}</div>
    },
  },
  {
    id: "category",
    accessorKey: "category",
    // header: ({ column }: { column: Column<Animal, unknown> }) => (
    //   <DataTableColumnHeader column={column} title="Category" />
    // ),
    header: "Category",
    cell: ({ cell }) => {
      const status = cell.getValue<Animal["category"]>()
      const Icon = status === "land" ? CheckCircle2 : XCircle

      return (
        <Badge variant="outline" className="capitalize">
          <Icon />
          {status}
        </Badge>
      )
    },
    // enableColumnFilter: true,
  },
]
