import { Search, MousePointerClick, CreditCard, Package, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "1",
    icon: Search,
    title: "浏览商品",
    description: "在商品页面浏览所有可用的产品",
    color: "bg-primary/10 text-primary",
    numberBg: "bg-primary text-primary-foreground",
  },
  {
    number: "2",
    icon: MousePointerClick,
    title: "选择商品",
    description: "找到您需要的产品并选择数量",
    color: "bg-primary/10 text-primary",
    numberBg: "bg-primary text-primary-foreground",
  },
  {
    number: "3",
    icon: CreditCard,
    title: "立即支付",
    description: "选择支付方式完成付款",
    color: "bg-primary/10 text-primary",
    numberBg: "bg-primary text-primary-foreground",
  },
  {
    number: "4",
    icon: Package,
    title: "收到商品",
    description: "系统自动发货到您的邮箱",
    color: "bg-primary/10 text-primary",
    numberBg: "bg-primary text-primary-foreground",
  },
  {
    number: "5",
    icon: CheckCircle,
    title: "检查商品",
    description: "验证商品信息确认无误",
    color: "bg-green-500/10 text-green-400",
    numberBg: "bg-green-500 text-white",
  },
]

export default function OrderSteps() {
  return (
    <section className="relative z-10 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {"下单步骤"}
          </span>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {"简单的购买流程"}
          </h2>
          <p className="text-muted-foreground">
            {"只需几个简单步骤即可获得您的产品"}
          </p>
        </div>

        {/* Steps - Desktop */}
        <div className="hidden md:flex items-start justify-between gap-2">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="flex items-start gap-2 flex-1">
                <div className="flex flex-col items-center text-center flex-1">
                  {/* Number Badge */}
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step.numberBg} text-sm font-bold mb-4`}>
                    {index < steps.length - 1 ? step.number : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                  </div>
                  {/* Icon Box */}
                  <div className={`${step.color} rounded-xl h-16 w-16 flex items-center justify-center mb-4`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  {/* Text */}
                  <h3 className="text-base font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex items-center pt-16 text-muted-foreground/30">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Steps - Mobile */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-4"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.numberBg} text-sm font-bold shrink-0`}>
                  {index < steps.length - 1 ? step.number : (
                    <CheckCircle className="h-4 w-4" />
                  )}
                </div>
                <div className={`${step.color} rounded-lg h-12 w-12 flex items-center justify-center shrink-0`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
