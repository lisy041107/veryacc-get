import { Globe, Shield, Zap, Headphones, Lock, Clock } from "lucide-react"

const features = [
  {
    icon: Globe,
    title: "多平台覆盖",
    description: "覆盖 Instagram、Facebook、TikTok、Twitter(X)、Telegram 等全球主流社交平台与通讯工具，满足您在不同平台上的运营需求，一站式采购省时省力。",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: Shield,
    title: "品质保障",
    description: "所有账号均经过严格筛选与质量检测，确保账号信息完整、状态稳定。我们拥有专业团队持续维护货源质量，拒绝劣质商品。",
    color: "bg-green-500/20 text-green-400",
  },
  {
    icon: Zap,
    title: "自动发卡 极速到账",
    description: "采用全自动发卡系统，付款成功后秒级发货，无需等待人工处理。7x24 小时全天候运作，随时下单随时到账。",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: Headphones,
    title: "专属客服支持",
    description: "通过 Telegram 提供全天候客服响应，无论是售前咨询还是售后问题，我们的客服团队都将在第一时间为您处理，确保购物体验无忧。",
    color: "bg-cyan-500/20 text-cyan-400",
  },
  {
    icon: Lock,
    title: "安全交易",
    description: "支持 USDT、BTC 等加密货币及支付宝、微信等主流支付方式，所有交易数据加密传输，保障您的支付安全与隐私。",
    color: "bg-violet-500/20 text-violet-400",
  },
  {
    icon: Clock,
    title: "售后有保障",
    description: "所有商品提供购买后 24 小时内的售后服务。如遇任何质量问题，提供订单号联系客服即可快速处理，让您买得放心、用得安心。",
    color: "bg-rose-500/20 text-rose-400",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 py-10 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-4xl font-bold text-accent mb-3">
          {"为什么选择VeryAcc？"}
        </h2>
        <p className="text-center text-base text-muted-foreground mb-10 max-w-2xl mx-auto">
          {"专注海外社交账号领域多年，凭借稳定的货源、高效的系统和贴心的服务，赢得全球用户信赖。"}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:bg-card/60 transition-colors"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${feature.color} mb-4`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://t.me/veryacc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {"立即咨询"}
          </a>
        </div>
      </div>
    </section>
  )
}
