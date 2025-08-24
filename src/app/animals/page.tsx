import AnimalListingPage from "@/components/features/animals/animal-listings"
import PageContainer from "@/components/layout/page-container"
import { buttonVariants } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTableSkeleton } from "@/components/ui/table/data-table-sekeleton"
import { searchParamsCache, serialize } from "@/lib/search-params"
import { cn } from "@/lib/utils"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { SearchParams } from "nuqs/server"
import { Suspense } from "react"

type pageProps = {
  searchParams: Promise<SearchParams>
}

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams
  // Allow nested RSCs to access the search params (in a type-safe way)
  // searchParamsCache.parse(searchParams)

  // This key is used for invoke suspense if any of the search params changed (used for filters).
  // const key = serialize({ ...searchParams });

  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-4">
        <div className="flex items-start justify-between">
          <Heading title="Animals" description="Manage Zoo Animals" />
          <Link
            href="/animals/new"
            className={cn(buttonVariants(), "text-xs md:text-sm")}
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <Suspense
          // key={key}
          fallback={
            <DataTableSkeleton columnCount={5} rowCount={8} filterCount={2} />
          }
        >
          <AnimalListingPage />
        </Suspense>
      </div>
    </PageContainer>
  )
}
