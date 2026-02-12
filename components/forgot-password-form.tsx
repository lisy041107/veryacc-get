"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, ArrowLeft, CheckCircle } from "lucide-react"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8 text-center">
        <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">{"邮件已发送"}</h2>
        <p className="text-sm text-muted-foreground mb-6">
          {"如果该邮箱存在账户，我们将发送一封包含重置链接的邮件。请检查您的收件箱。"}
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {"返回登录"}
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm p-8">
      <h2 className="text-xl font-bold text-foreground mb-2 text-center">{"忘记密码"}</h2>
      <p className="text-sm text-muted-foreground mb-6 text-center">
        {"输入您的注册邮箱，我们将发送密码重置链接。"}
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
        }}
        className="space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"邮箱地址"}</label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <button
          type="submit"
          disabled={!email}
          className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {"发送重置链接"}
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          {"返回登录"}
        </Link>
      </div>
    </div>
  )
}
