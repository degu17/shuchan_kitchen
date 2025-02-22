import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "しゅうちゃん食堂",
  description: "家庭のご飯作りをスムーズに",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="ja">
        <body>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}

