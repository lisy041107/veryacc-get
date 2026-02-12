export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import DashboardClient from "@/components/dashboard-client"

export const metadata = {
  title: "用户中心 - VeryAcc",
  description: "管理您的账户、查看订单和余额。",
}

export default function DashboardPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-8 px-4">
        <div className="mx-auto max-w-6xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <span className="text-foreground">{"您的帐户"}</span>
          </nav>
          <h1 className="text-2xl font-bold text-foreground mb-6">{"您的帐户"}</h1>
          <DashboardClient />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
