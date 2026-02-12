export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import ForgotPasswordForm from "@/components/forgot-password-form"

export const metadata = {
  title: "忘记密码 - VeryAcc",
  description: "重置您的 VeryAcc 账户密码。",
}

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-16 px-4">
        <div className="mx-auto max-w-md">
          <ForgotPasswordForm />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
