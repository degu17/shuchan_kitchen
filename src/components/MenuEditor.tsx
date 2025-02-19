"use client"

import type React from "react"

import { useState } from "react"

interface MenuEditorProps {
  selectedDate: Date | null
}

export default function MenuEditor({ selectedDate }: MenuEditorProps) {
  const [availableTime, setAvailableTime] = useState("")
  const [menu, setMenu] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend
    console.log("Submitted:", { date: selectedDate, availableTime, menu })
    alert("メニューを更新しました！")
  }

  if (!selectedDate) {
    return <p>日付を選択してください。</p>
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">
        {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日のメニュー編集
      </h2>
      <div className="mb-4">
        <label htmlFor="availableTime" className="block mb-2">
          提供可能時間:
        </label>
        <input
          type="time"
          id="availableTime"
          value={availableTime}
          onChange={(e) => setAvailableTime(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="menu" className="block mb-2">
          メニュー:
        </label>
        <textarea
          id="menu"
          value={menu}
          onChange={(e) => setMenu(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        保存
      </button>
    </form>
  )
}

