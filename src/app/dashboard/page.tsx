import React from "react"
import PageContainer from "@/components/layout/page-container"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"

const cards = [
  {
    description: "Total Revenue",
    title: "$1,250.00",
    highlight: "Trending up this month",
    subtext: "Visitors for the last 6 months",
  },
  {
    description: "New Customers",
    title: "1,234",
    highlight: "Down 20% this period",
    subtext: "Acquisition needs attention",
  },
  {
    description: "Active Accounts",
    title: "45,678",
    highlight: "Strong user retention",
    subtext: "Engagement exceed targets",
  },
  {
    description: "Growth Rate",
    title: "4.5%",
    highlight: "Steady performance increase",
    subtext: "Meets growth projections",
  },
]

const page = () => {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">
            Hi, Welcome back 👋
          </h2>
        </div>

        {/* ✅ map over the array */}
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </PageContainer>
  )
}

export default page
