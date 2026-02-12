export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import LoginForm from "@/components/login-form"

export const metadata = {
  title: "登录 - VeryAcc",
  description: "登录您的 VeryAcc 账户。",
}

export default function LoginPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-16 px-4">
        <div className="mx-auto max-w-md">
          <LoginForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
