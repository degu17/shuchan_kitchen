"use client"

import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"

export default function AuthButton() {
  const { isSignedIn } = useUser()

  return (
    <div className="flex items-center gap-4">
      {isSignedIn ? (
        <SignOutButton>
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors">
            ログアウト
          </button>
        </SignOutButton>
      ) : (
        <SignInButton>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
            ログイン
          </button>
        </SignInButton>
      )}
    </div>
  )
}

