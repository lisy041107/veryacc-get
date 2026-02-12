export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { Search, ShoppingCart, CreditCard, PackageCheck, MessageCircle, HelpCircle, ArrowRight } from "lucide-react"

export const metadata = {
  title: "使用教程 - VeryAcc",
  description: "了解如何在 VeryAcc 购买和使用账号。",
}

const steps = [
  {
    icon: Search,
    step: "01",
    title: "浏览商品",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    numColor: "bg-blue-500 text-white",
    description: "在首页或商品页面浏览所有可用的账号类型，使用左侧分类导航或顶部搜索功能快速找到您需要的商品。每个商品页面都有详细的描述和数据格式说明。",
  },
  {
    icon: ShoppingCart,
    step: "02",
    title: "选择商品",
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    numColor: "bg-indigo-500 text-white",
    description: "点击您需要的商品进入详情页，仔细阅读商品描述、数据格式和注意事项，确认无误后点击「立即购买」按钮，填写购买数量、下单邮箱和查询密码。",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "立即支付",
    color: "bg-violet-500/10 text-violet-400 border-violet-500/20",
    numColor: "bg-violet-500 text-white",
    description: "选择您方便的支付方式完成付款。我们支持 USDT (TRC20/ERC20)、Bitcoin、支付宝、微信支付等多种支付方式，根据提示完成支付操作即可。",
  },
  {
    icon: PackageCheck,
    step: "04",
    title: "收到商品",
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    numColor: "bg-emerald-500 text-white",
    description: "支付成功后，系统会自动发卡。您可以在订单查询页面通过订单号或下单邮箱查询订单，查看并一键复制您购买的卡密信息。",
  },
  {
    icon: MessageCircle,
    step: "05",
    title: "检查商品",
    color: "bg-green-500/10 text-green-400 border-green-500/20",
    numColor: "bg-green-500 text-white",
    description: "请务必在购买后 24 小时内检查商品是否可用。如遇到任何问题（如无法登录、信息不符等），请立即通过 Telegram 或 WhatsApp 联系客服处理售后。",
  },
]

const faqs = [
  {
    q: "购买后多久能收到账号？",
    a: "支付成功后系统立即自动发卡，通常在几秒钟内即可在订单查询页面查看和复制卡密信息。",
  },
  {
    q: "账号有售后保障吗？",
    a: "我们提供购买后 24 小时内的售后保障。如果账号在 24 小时内无法正常登录，请立即联系客服处理。超过 24 小时将不予售后。",
  },
  {
    q: "支持哪些支付方式？",
    a: "目前支持 USDT (TRC20/ERC20)、Bitcoin (BTC)、支付宝和微信支付。更多支付方式即将上线。",
  },
  {
    q: "可以批发购买吗？",
    a: "当然可以！我们支持批发购买，大量购买可享受更优惠的价格。请通过 Telegram 联系我们获取批发报价。",
  },
  {
    q: "如何联系客服？",
    a: "您可以通过 Telegram (https://t.me/veryacc) 或 WhatsApp 联系我们的客服团队，客服将第一时间为您处理。",
  },
  {
    q: "如何查询我的订单？",
    a: "进入网站顶部的「订单查询」页面，输入您的订单号或下单邮箱和查询密码即可查看订单详情和卡密信息。",
  },
]

export default function TutorialPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <span className="text-foreground">{"教程"}</span>
          </nav>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">{"购买教程"}</h1>
            <p className="text-lg text-muted-foreground">{"跟随以下步骤，轻松完成账号购买。无需注册，下单即可。"}</p>
          </div>

          {/* Flow Steps - Visual Timeline */}
          <div className="relative mb-16">

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-4">
              {steps.map((s, i) => {
                const Icon = s.icon
                return (
                  <div key={s.step} className="relative flex flex-col items-center text-center">
                    {/* Step number badge */}
                    <div className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${s.numColor} text-xs font-bold mb-3 shadow-lg`}>
                      {s.step}
                    </div>
                    {/* Icon */}
                    <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border ${s.color} mb-4`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    {/* Arrow between steps on mobile */}
                    {i < steps.length - 1 && (
                      <div className="lg:hidden flex items-center justify-center py-1">
                        <ArrowRight className="h-4 w-4 text-muted-foreground rotate-90" />
                      </div>
                    )}
                    <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed px-1">{s.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Important Notice */}
          <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 mb-12">
            <h3 className="text-sm font-bold text-red-400 mb-2">{"重要提示"}</h3>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li>{"1. 所有商品请在购买后 24 小时内进行检测，超时不予售后。"}</li>
              <li>{"2. 商品有任何问题请立即联系客服，不要自行操作可能导致问题的行为。"}</li>
              <li>{"3. 建议使用代理IP登录购买的账号，首次登录后修改密码和安全设置。"}</li>
              <li>{"4. 避免短时间内在同一账号上进行大量操作，以免触发平台安全机制。"}</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <HelpCircle className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">{"常见问题"}</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5"
                >
                  <h3 className="text-sm font-bold text-foreground mb-2">{"Q: "}{faq.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{"A: "}{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
            <h3 className="text-lg font-bold text-foreground mb-2">{"需要帮助？"}</h3>
            <p className="text-sm text-muted-foreground mb-4">{"如有任何问题或需要批发报价，请随时联系我们的客服团队。"}</p>
            <div className="flex items-center justify-center">
              <a href="https://t.me/veryacc" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#26A5E4] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#26A5E4]/90 transition-colors">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                {"Telegram 客服"}
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
