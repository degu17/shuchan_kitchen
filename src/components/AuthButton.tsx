interface AuthButtonProps {
  userType: "cook" | "eater" | null
  setUserType: (type: "cook" | "eater" | null) => void
}

export default function AuthButton({ userType, setUserType }: AuthButtonProps) {
  const handleAuth = (type: "cook" | "eater") => {
    setUserType(type)
  }

  const handleLogout = () => {
    setUserType(null)
  }

  if (userType) {
    return (
      <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
        ログアウト
      </button>
    )
  }

  return (
    <div>
      <button onClick={() => handleAuth("cook")} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
        作る側としてログイン
      </button>
      <button onClick={() => handleAuth("eater")} className="bg-green-500 text-white px-4 py-2 rounded">
        食べる側としてログイン
      </button>
    </div>
  )
}

