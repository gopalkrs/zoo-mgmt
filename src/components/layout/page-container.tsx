import React from "react"

export default function PageContainer({
  children,
}: // scrollable = true,
{
  children: React.ReactNode
  // scrollable?: boolean
}) {
  return (
    <>
      {true ? (
        // <ScrollArea className="h-[calc(100dvh-52px)]" type="auto">
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
      ) : (
        // </ScrollArea>
        <div className="flex flex-1 p-4 md:px-6">{children}</div>
      )}
    </>
  )
}
