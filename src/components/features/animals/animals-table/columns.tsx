"use client"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"

import { Column, ColumnDef } from "@tanstack/react-table"
import { CheckCircle2, Text, XCircle } from "lucide-react"
import Image from "next/image"
// import { CellAction } from "./cell-action"
import { Animal } from "@/types"

export const columns: ColumnDef<Animal>[] = [
  {
    accessorKey: "photo_url",
    header: "IMAGE",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square">
          <Image
            src={row.getValue("photo_url")}
            alt={row.getValue("name")}
            fill
            className="rounded-lg"
          />
        </div>
      )
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Animal["name"]>()}</div>,
    meta: {
      label: "Name",
      placeholder: "Search products...",
      variant: "text",
      icon: Text,
    },
    enableColumnFilter: true,
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
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
    enableColumnFilter: true,
  },
  {
    accessorKey: "price",
    header: "PRICE",
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
]
