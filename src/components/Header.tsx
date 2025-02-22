"use client"

import Link from "next/link"
import AuthButton from "./AuthButton"

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              しゅうちゃん食堂
            </Link>
          </div>
          <nav className="flex items-center space-x-4">
            <Link href="/menu" className="text-gray-600 hover:text-gray-900">
              メニュー
            </Link>
            <Link href="/order" className="text-gray-600 hover:text-gray-900">
              注文
            </Link>
            <AuthButton />
          </nav>
        </div>
      </div>
    </header>
  )
} 