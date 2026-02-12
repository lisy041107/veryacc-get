"use client"

import Link from "next/link"
import { ShoppingCart, Package } from "lucide-react"
import type { Product } from "@/lib/products"

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

export default function ProductCard({ product }: { product: Product }) {
  const gradient = platformColors[product.platform] || "from-primary to-primary"

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm overflow-hidden hover:border-primary/50 transition-all duration-200"
    >
      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Header: logo + title */}
        <div className="flex items-start gap-3 mb-3">
          <div className={`h-11 w-11 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md shrink-0`}>
            <span className="text-sm font-bold text-white">
              {product.platform.charAt(0)}
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
              {product.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Bottom: price + stock + cart */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/30">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold text-accent">
              {"$"}{product.price.toFixed(2)}
            </span>
            <span className="text-xs text-muted-foreground">{"/个"}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Package className="h-3.5 w-3.5" />
              {product.stock > 1000 ? `${(product.stock / 1000).toFixed(1)}k` : product.stock}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
              <ShoppingCart className="h-3.5 w-3.5" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
