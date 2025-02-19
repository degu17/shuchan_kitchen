"use client"

import type React from "react"

import { useState } from "react"

interface MenuSelectorProps {
  selectedDate: Date | null
}

export default function MenuSelector({ selectedDate }: MenuSelectorProps) {
  const [selectedTime, setSelectedTime] = useState("")
  const [selectedMenu, setSelectedMenu] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend and trigger a LINE notification
    console.log("Selected:", { date: selectedDate, time: selectedTime, menu: selectedMenu })
    alert("選択が完了しました！LINEで通知されます。")
  }

  if (!selectedDate) {
    return <p>日付を選択してください。</p>
  }

  // This is mock data. In a real application, this would come from your backend.
  const mockAvailableTimes = ["18:00", "19:00", "20:00"]
  const mockMenus = ["カレーライス", "ハンバーグ", "焼き魚"]

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日のメニュー選択
      </h2>
      <div className="mb-4">
        <label htmlFor="time" className="block mb-2">
          時間:
        </label>
        <select
          id="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">選択してください</option>
          {mockAvailableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="menu" className="block mb-2">
          メニュー:
        </label>
        <select
          id="menu"
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">選択してください</option>
          {mockMenus.map((menu) => (
            <option key={menu} value={menu}>
              {menu}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        選択して通知する
      </button>
    </form>
  )
}

