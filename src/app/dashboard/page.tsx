"use client"
import React, { useMemo } from "react"
import PageContainer from "@/components/layout/page-container"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card"

import { useAnimals, useTickets } from "@/store/animals-api"
import { useCareTakers } from "@/store/caretakers-api"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { format } from "date-fns"

const Page = () => {
  const { data: animalsData, isLoading: animalsLoading } = useAnimals()
  const animals = animalsData?.result || []

  const { data: ticketsData, isLoading: ticketsLoading } = useTickets()
  const tickets = ticketsData?.result || []

  const { data: staffData, isLoading: staffLoading } = useCareTakers()
  const staff = staffData?.result || []

  // ✅ Calculate revenue
  const totalRevenue = tickets.reduce(
    (sum: number, ticket: any) => sum + (ticket.totalPrice || 0),
    0
  )

  // ✅ Group tickets by day for chart
  const dailySales = useMemo(() => {
    const salesMap: Record<string, number> = {}

    tickets.forEach((ticket: any) => {
      const day = format(new Date(ticket.dateOfVisit), "yyyy-MM-dd")
      salesMap[day] = (salesMap[day] || 0) + (ticket.totalPrice || 0)
    })

    return Object.entries(salesMap).map(([date, total]) => ({
      date,
      total,
    }))
  }, [tickets])

  const cards = [
    {
      description: "Total Animals",
      title: animalsLoading ? "..." : animals.length,
      highlight: "Current zoo residents",
      subtext: "Includes all species",
    },
    {
      description: "Tickets Sold",
      title: ticketsLoading ? "..." : tickets.length,
      highlight: "Revenue driver",
      subtext: "Cumulative sales so far",
    },
    {
      description: "Active Staff",
      title: staffLoading ? "..." : staff.length,
      highlight: "Operational workforce",
      subtext: "Across all departments",
    },
    {
      description: "Revenue",
      title: ticketsLoading ? "..." : `$${totalRevenue.toFixed(2)}`,
      highlight: "Ticket sales",
      subtext: "Based on all transactions",
    },
  ]

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, idx) => (
            <Card key={idx} className="@container/card">
              <CardHeader>
                <CardDescription>{card.description}</CardDescription>
                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-1.5 text-sm">
                <div className="line-clamp-1 flex gap-2 font-medium">
                  {card.highlight}
                </div>
                <div className="text-muted-foreground">{card.subtext}</div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Daily sales chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Ticket Sales</CardTitle>
            <CardDescription>
              Total revenue per day from ticket sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#2563eb"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  )
}

export default Page
