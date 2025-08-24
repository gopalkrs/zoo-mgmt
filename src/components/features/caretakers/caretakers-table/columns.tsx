"use client"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { CareTaker } from "@/types/CareTaker"
import { Column, ColumnDef } from "@tanstack/react-table"
import { User } from "lucide-react"

// Helper function to handle undefined/null values
const formatValue = (value: unknown): string => {
  if (value === undefined || value === null || value === "") return "--"
  return String(value)
}

export const columns: ColumnDef<CareTaker>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }: { column: Column<CareTaker, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<CareTaker["name"]>()
      return (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-muted-foreground" />
          <span className="font-medium">{formatValue(value)}</span>
        </div>
      )
    },
  },
  {
    id: "assignedAnimals",
    accessorKey: "assignedAnimals",
    header: ({ column }: { column: Column<CareTaker, unknown> }) => (
      <DataTableColumnHeader column={column} title="Assigned Animals" />
    ),
    cell: ({ cell }) => {
      const assignedAnimals = cell.getValue<CareTaker["assignedAnimals"]>()
      if (!assignedAnimals || assignedAnimals.length === 0) return <div>--</div>
      return (
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            {assignedAnimals.map((animal) => (
              <div key={animal.id}>{animal.name}</div>
            ))}
          </span>
        </div>
      )
    },
  },
]
