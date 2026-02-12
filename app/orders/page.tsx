export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import OrderQueryClient from "@/components/order-query-client"

export const metadata = {
  title: "订单查询 - VeryAcc",
  description: "查询您的订单状态和下载您的商品。",
}

export default function OrdersPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-8 px-4">
        <div className="mx-auto max-w-4xl">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <span className="text-foreground">{"订单查询"}</span>
          </nav>
          <OrderQueryClient />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
