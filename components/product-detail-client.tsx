"use client"

import { useState } from "react"
import { Star, Package, ShoppingCart, ThumbsUp, Clock, AlertTriangle } from "lucide-react"
import type { Product } from "@/lib/products"
import PurchaseModal from "@/components/purchase-modal"

const platformColors: Record<string, string> = {
  Instagram: "from-[#833AB4] via-[#FD1D1D] to-[#F77737]",
  Facebook: "from-[#1877F2] to-[#1877F2]",
  TikTok: "from-[#010101] to-[#69C9D0]",
  Twitter: "from-[#1DA1F2] to-[#0d8ecf]",
  Threads: "from-[#000000] to-[#333333]",
  Apple: "from-[#333333] to-[#555555]",
  Google: "from-[#EA4335] via-[#FBBC05] to-[#34A853]",
  Telegram: "from-[#26A5E4] to-[#0088cc]",
  Discord: "from-[#5865F2] to-[#4752c4]",
  LinkedIn: "from-[#0A66C2] to-[#004182]",
  Snapchat: "from-[#FFFC00] to-[#F7F400]",
  Reddit: "from-[#FF4500] to-[#cc3700]",
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [purchaseOpen, setPurchaseOpen] = useState(false)
  const gradient = platformColors[product.platform] || "from-primary to-primary"

  return (
    <>
      {/* Product Title */}
      <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-relaxed">
        {product.title}
      </h1>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 mb-8 text-sm">
        <span className="flex items-center gap-1 text-green-400">
          <Clock className="h-4 w-4" />
          {"48小时"}
        </span>
        <span className="flex items-center gap-1 text-accent">
          <Star className="h-4 w-4 fill-accent" />
          {product.rating}
        </span>
        <span className="flex items-center gap-1 text-green-400">
          <ThumbsUp className="h-4 w-4" />
          {product.ratingPercent}
        </span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <ShoppingCart className="h-4 w-4" />
          {product.sold}
          {"+"}
        </span>
      </div>

      {/* Main content layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left - Product Image / Icon */}
        <div className="flex flex-col items-center lg:items-start gap-4 lg:w-56 shrink-0">
          <div className={`h-40 w-40 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-2xl`}>
            <span className="text-5xl font-bold text-foreground">{product.platform.charAt(0)}</span>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-sm text-green-400 font-medium">{"有存货"}</p>
            <p className="text-lg font-bold text-foreground">{product.stock.toLocaleString()}{"件"}</p>
          </div>
          <div className="text-center lg:text-left">
            <p className="text-sm text-muted-foreground">{"每件价格"}</p>
            <p className="text-sm text-muted-foreground">
              {"从"}
              <span className="text-2xl font-bold text-accent ml-1">
                {"$"}{product.price.toFixed(2)}
              </span>
              {" 美元起"}
            </p>
          </div>
          <button
            onClick={() => setPurchaseOpen(true)}
            className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            {"购买"}
          </button>
        </div>

        {/* Right - Description */}
        <div className="flex-1 min-w-0">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-foreground mb-3">{"描述。"}</h3>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary mt-0.5 shrink-0">{"*"}</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Notice */}
          <div className="mb-6 rounded-lg border border-accent/30 bg-accent/5 p-4">
            <p className="text-sm text-accent font-semibold mb-1 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              {"重要提示："}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"任何账户在登录或使用时都可能需要短信验证。这属于正常情况。您可以使用手机号码或任何短信激活服务来验证帐户。"}
            </p>
          </div>

          {/* Data Format */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-foreground mb-2">{"账户数据格式。"}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"此数据格式旨在方便读取收到的详细信息，可能略有不同。它不会影响账户的健康状况。"}
            </p>
            <div className="mt-2 rounded-lg bg-secondary/50 border border-border/50 p-3">
              <code className="text-xs text-foreground/80 break-all">{product.dataFormat}</code>
            </div>
          </div>

          {/* Tips */}
          <div className="mb-6">
            <h3 className="text-base font-bold text-foreground mb-2">
              {"如果您是首次购买账号，我们建议您注意以下事项："}
            </h3>
            <ul className="space-y-1.5">
              {product.tips.map((tip, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {"- "}{tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        product={product}
        open={purchaseOpen}
        onClose={() => setPurchaseOpen(false)}
      />
    </>
  )
}
