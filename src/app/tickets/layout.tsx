import Header from "@/components/ticket/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wild Adventure Zoo",
    description: "Experience the Wild Adventure Zoo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <>
        <Header />
        {children}
      </>
  );
}