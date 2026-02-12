"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogIn, Eye, EyeOff } from "lucide-react"

const ADMIN_EMAIL = "lisy041107@gmail.com"
const ADMIN_PASSWORD = "chenzibin0750"

export default function AdminLoginClient() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        document.cookie = `veryacc_admin=authenticated; path=/; max-age=86400`
        router.push("/veryacc")
      } else {
        setError("邮箱或密码错误")
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#111111] text-[#ffffff] font-bold text-lg mx-auto mb-4">
            VA
          </div>
          <h1 className="text-2xl font-bold text-white">{"VeryAcc Admin"}</h1>
          <p className="text-sm text-neutral-400 mt-1">{"管理后台登录"}</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"邮箱地址"}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@veryacc.com"
              required
              className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"密码"}</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
                className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <LogIn className="h-4 w-4" />
            )}
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  )
}
