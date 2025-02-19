"use client"

import { useState } from "react"
import Calendar from "../components/Calendar"
import MenuEditor from "../components/MenuEditor"
import MenuSelector from "../components/MenuSelector"
import AuthButton from "../components/AuthButton"
import LineNotificationSettings from "../components/LineNotificationSettings"
import SendLineMessage from "../components/SendLineMessage"

export default function Home() {
  const [userType, setUserType] = useState<"cook" | "eater" | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const handleLineTokenSave = async (token: string) => {
    // ここでトークンを保存します（実際の実装では安全な方法で保存する必要があります）
    localStorage.setItem('lineNotifyToken', token);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">しゅうちゃん食堂</h1>
        <AuthButton userType={userType} setUserType={setUserType} />
      </header>
      <main className="container mx-auto p-4">
        <Calendar onSelectDate={setSelectedDate} />
        {userType === "cook" && (
          <div className="space-y-6">
            <MenuEditor selectedDate={selectedDate} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LineNotificationSettings onSave={handleLineTokenSave} />
              <SendLineMessage />
            </div>
          </div>
        )}
        {userType === "eater" && <MenuSelector selectedDate={selectedDate} />}
      </main>
    </div>
  )
}

