"use client"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "@/components/ui/table/data-table-column-header"
import { Animal } from "@/types"
import { Column, ColumnDef } from "@tanstack/react-table"
import {
  CheckCircle2,
  XCircle,
  Calendar,
  MapPin,
  User,
  Users,
  Clock,
  HomeIcon,
} from "lucide-react"

// Helper function to format date
const formatDate = (date: Date | string | undefined | null): string => {
  if (!date) return "--"
  try {
    const dateObj = typeof date === "string" ? new Date(date) : date
    return dateObj.toLocaleDateString()
  } catch {
    return "--"
  }
}

// Helper function to handle undefined/null values
const formatValue = (value: any): string => {
  if (value === undefined || value === null || value === "") return "--"
  return String(value)
}

export const columns: ColumnDef<Animal>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ cell }) => {
      const value = cell.getValue<Animal["name"]>()
      return <div className="font-medium">{formatValue(value)}</div>
    },
  },
  {
    id: "category",
    accessorKey: "category",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ cell }) => {
      const category = cell.getValue<Animal["category"]>()
      if (!category) return <div>--</div>

      const Icon = category === "land" ? CheckCircle2 : XCircle
      return (
        <Badge variant="outline" className="capitalize">
          <Icon className="w-3 h-3 mr-1" />
          {category}
        </Badge>
      )
    },
  },
  {
    id: "gender",
    accessorKey: "gender",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ cell }) => {
      const gender = cell.getValue<Animal["gender"]>()
      return (
        <Badge variant="secondary" className="capitalize">
          {formatValue(gender)}
        </Badge>
      )
    },
  },
  {
    id: "dob",
    accessorKey: "dob",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Date of Birth" />
    ),
    cell: ({ cell }) => {
      const dob = cell.getValue<Animal["dob"]>()
      return (
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          {formatDate(dob)}
        </div>
      )
    },
  },
  {
    id: "origin",
    accessorKey: "origin",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Origin" />
    ),
    cell: ({ cell }) => {
      const origin = cell.getValue<Animal["origin"]>()
      return (
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          {formatValue(origin)}
        </div>
      )
    },
  },
  {
    id: "gallery",
    accessorKey: "gallery",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Gallery" />
    ),
    cell: ({ cell }) => {
      const gallery = cell.getValue<Animal["gallery"]>()
      if (!gallery || gallery.length === 0) return <div>--</div>
      return (
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            {gallery.length} image{gallery.length !== 1 ? "s" : ""}
          </span>
        </div>
      )
    },
  },
  {
    id: "enclosure_id",
    accessorKey: "enclosure_id",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Enclosure" />
    ),
    cell: ({ cell }) => {
      const enclosureId = cell.getValue<Animal["enclosure_id"]>()
      return (
        <div className="flex items-center gap-1">
          <HomeIcon className="w-3 h-3 text-muted-foreground" />
          {formatValue(enclosureId)}
        </div>
      )
    },
  },
  {
    id: "caretaker_id",
    accessorKey: "caretaker_id",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Caretaker" />
    ),
    cell: ({ cell }) => {
      const caretakerId = cell.getValue<Animal["caretaker_id"]>()
      return (
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 text-muted-foreground" />
          {formatValue(caretakerId)}
        </div>
      )
    },
  },
  {
    id: "isDeleted",
    accessorKey: "isDeleted",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ cell }) => {
      const isDeleted = cell.getValue<Animal["isDeleted"]>()
      return (
        <Badge variant={isDeleted ? "destructive" : "default"}>
          {isDeleted ? "Deleted" : "Active"}
        </Badge>
      )
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ cell }) => {
      const createdAt = cell.getValue<Animal["createdAt"]>()
      return (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          {formatDate(createdAt)}
        </div>
      )
    },
  },
  {
    id: "updatedAt",
    accessorKey: "updatedAt",
    header: ({ column }: { column: Column<Animal, unknown> }) => (
      <DataTableColumnHeader column={column} title="Updated" />
    ),
    cell: ({ cell }) => {
      const updatedAt = cell.getValue<Animal["updatedAt"]>()
      return (
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-muted-foreground" />
          {formatDate(updatedAt)}
        </div>
      )
    },
  },
]
