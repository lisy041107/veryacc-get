export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { Globe, Shield, Zap, Headphones, Users, TrendingUp } from "lucide-react"

export const metadata = {
  title: "关于我们 - VeryAcc",
  description: "了解 VeryAcc，专业的账号售卖商城。",
}

const features = [
  {
    icon: Globe,
    title: "多平台支持",
    description: "为您的业务提供广泛的网络平台及社交媒体解决方案。支持 Instagram、Facebook、TikTok、Twitter 等主流平台。",
  },
  {
    icon: Shield,
    title: "专业性强",
    description: "我们拥有经验丰富的团队，帮助您合理规划账户的安全与合规使用，确保每个账号的高质量。",
  },
  {
    icon: Zap,
    title: "操作简易",
    description: "提供简化流程，便于您快速上手、稳定运营。购买即发卡，全程自动化处理。",
  },
  {
    icon: Headphones,
    title: "售后保障",
    description: "7x24 小时在线支持，为您的后续使用提供坚实后盾。任何问题都可以通过工单系统反馈。",
  },
  {
    icon: Users,
    title: "全球用户",
    description: "已服务超过 50,000+ 全球用户，覆盖超过 100 个国家和地区的客户群体。",
  },
  {
    icon: TrendingUp,
    title: "稳定供应",
    description: "强大的供应链确保商品库存充足，价格具有竞争力，满足零售和批发的各种需求。",
  },
]

export default function AboutPage() {
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
            <span className="text-foreground">{"关于"}</span>
          </nav>

          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{"关于 VeryAcc"}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {"我们专注于为企业与个人提供高质量、多平台的账户运营支持，帮助您高效拓展业务。"}
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-accent text-center mb-10">{"为什么选择VeryAcc？"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 transition-colors"
                  >
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://t.me/veryacc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {"立即咨询"}
            </a>
          </div>

          {/* Disclaimer */}
          <div className="mt-16 rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6">
            <h3 className="text-base font-bold text-foreground mb-2">{"免责声明："}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {"本平台仅提供合法合规的账户支持与相关服务，用户需遵守适用的法律法规及平台条款。若因用户个人使用不当或违规行为引起后果，需自行承担相关责任。"}
            </p>
            <h3 className="text-base font-bold text-foreground mb-2">{"服务承诺："}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"如在服务过程中出现任何问题，请及时与我们的客服团队联系，我们将第一时间为您提供帮助。"}
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
