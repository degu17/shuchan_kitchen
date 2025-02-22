"use client"

import { useState } from "react"
import Calendar from "../components/Calendar"
import MenuEditor from "../components/MenuEditor"
import MenuSelector from "../components/MenuSelector"
import { useUser } from "@clerk/nextjs"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const { user, isSignedIn } = useUser()

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        {isSignedIn ? (
          <>
            <Calendar onSelectDate={setSelectedDate} />
            {user?.publicMetadata?.role === "cook" && (
              <div className="space-y-6">
                <MenuEditor selectedDate={selectedDate} />
              </div>
            )}
            {user?.publicMetadata?.role === "eater" && (
              <MenuSelector selectedDate={selectedDate} />
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">
            ログインしてください
          </div>
        )}
      </main>
    </div>
  )
}

