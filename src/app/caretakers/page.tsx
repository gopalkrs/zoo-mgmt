import CareTakerListingPage from "@/components/features/caretakers/caretaker-listings"
import PageContainer from "@/components/layout/page-container"
import { buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTableSkeleton } from "@/components/ui/table/data-table-sekeleton"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

export default async function Page() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="CareTakers" description="Manage Zoo CareTakers" />
          <Link
            href="/dashboard/caretaker/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <CareTakerListingPage />
        </Suspense>
      </div>
    </PageContainer>
  )
}
