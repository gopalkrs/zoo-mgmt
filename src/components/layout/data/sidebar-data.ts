import {
  LayoutDashboard,
  Command,
  RabbitIcon,
  Ticket,
  UserCheck,
} from "lucide-react"
import { SidebarData } from "../types"
// import { ClerkLogo } from "@/assets/clerk-logo"

export const sidebarData: SidebarData = {
  user: {
    name: "satnaing",
    email: "satnaingdev@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shadcn Admin",
      logo: Command,
      plan: "Vite + ShadcnUI",
    },
  ],

  navGroups: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Animals",
          url: "/animals",
          icon: RabbitIcon,
        },
        {
          title: "CareTakers",
          url: "/caretakers",
          icon: UserCheck,
        },
        {
          title: "Tickets",
          url: "/tickets",
          icon: Ticket,
        },
      ],
    },
  ],
}
