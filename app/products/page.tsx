export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import ProductCard from "@/components/product-card"
import { products } from "@/lib/products"
import Link from "next/link"

export const metadata = {
  title: "商品列表 - VeryAcc",
  description: "浏览所有社交媒体账号商品，支持批发与零售购买。",
}

const categoryConfig: Record<string, { label: string; subcategories: { label: string; type: string }[] }> = {
  instagram: {
    label: "Instagram 账号",
    subcategories: [
      { label: "全部", type: "" },
      { label: "老号", type: "aged" },
      { label: "新号", type: "fresh" },
      { label: "带粉丝", type: "followers" },
    ],
  },
  facebook: {
    label: "Facebook 账号",
    subcategories: [
      { label: "全部", type: "" },
      { label: "老号", type: "aged" },
      { label: "新号", type: "fresh" },
      { label: "BM", type: "bm" },
    ],
  },
  tiktok: {
    label: "TikTok 账号",
    subcategories: [
      { label: "全部", type: "" },
      { label: "新号", type: "fresh" },
      { label: "老号", type: "aged" },
    ],
  },
  twitter: {
    label: "Twitter(X) 账号",
    subcategories: [
      { label: "全部", type: "" },
      { label: "老号", type: "aged" },
      { label: "新号", type: "fresh" },
    ],
  },
  telegram: {
    label: "Telegram 账号",
    subcategories: [
      { label: "全部", type: "" },
      { label: "老号", type: "aged" },
      { label: "新号", type: "fresh" },
    ],
  },
}

const mainCategories = [
  { label: "全部", cat: "" },
  { label: "Instagram", cat: "instagram" },
  { label: "Facebook", cat: "facebook" },
  { label: "TikTok", cat: "tiktok" },
  { label: "Twitter(X)", cat: "twitter" },
  { label: "Telegram", cat: "telegram" },
  { label: "Threads", cat: "threads" },
  { label: "Discord", cat: "discord" },
  { label: "Gmail", cat: "gmail" },
  { label: "Apple ID", cat: "appleid" },
  { label: "LinkedIn", cat: "linkedin" },
  { label: "Reddit", cat: "reddit" },
]

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { cat?: string; type?: string; q?: string }
}) {
  const { cat, type, q } = searchParams

  let filtered = products
  if (cat) {
    filtered = products.filter((p) => p.subcategory === cat)
  }
  if (q) {
    const lower = q.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(lower) ||
        p.titleEn.toLowerCase().includes(lower) ||
        p.platform.toLowerCase().includes(lower)
    )
  }

  const catConfig = cat ? categoryConfig[cat] : null
  const categoryLabel = catConfig?.label || (cat ? products.find((p) => p.subcategory === cat)?.category || "商品" : "全部商品")

  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-8 px-4">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <a href="/products" className="hover:text-foreground transition-colors">{"商品"}</a>
            {cat && (
              <>
                <span>{"/"}</span>
                <span className="text-foreground">{categoryLabel}</span>
              </>
            )}
            {type && (
              <>
                <span>{"/"}</span>
                <span className="text-foreground">{catConfig?.subcategories.find(s => s.type === type)?.label || type}</span>
              </>
            )}
          </nav>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">{categoryLabel}</h1>
            <p className="text-muted-foreground">
              {"共 "}{filtered.length}{" 件商品"}
            </p>
          </div>

          {/* Main Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-5">
            {mainCategories.map((mc) => (
              <Link
                key={mc.cat}
                href={mc.cat ? `/products?cat=${mc.cat}` : "/products"}
                className={`inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium transition-colors ${
                  (cat || "") === mc.cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {mc.label}
              </Link>
            ))}
          </div>

          {/* Subcategory Tabs (when a main category with subcategories is selected) */}
          {catConfig && (
            <div className="flex flex-wrap gap-2 mb-6">
              {catConfig.subcategories.map((sub) => (
                <Link
                  key={sub.type}
                  href={sub.type ? `/products?cat=${cat}&type=${sub.type}` : `/products?cat=${cat}`}
                  className={`inline-flex items-center rounded-lg px-4 py-1.5 text-sm transition-colors border ${
                    (type || "") === sub.type
                      ? "border-accent/50 bg-accent/10 text-accent"
                      : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          )}

          {/* Product Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">{"暂无相关商品"}</p>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
