export const runtime = 'edge'

import { notFound } from "next/navigation"
import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import ProductDetailClient from "@/components/product-detail-client"
import { products, getProductBySlug } from "@/lib/products"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const { slug } = params
  const product = getProductBySlug(slug)
  if (!product) return { title: "商品未找到 - VeryAcc" }

  // TODO: Future - read meta_title and meta_description from database
  // const customSeo = await fetchProductSeo(slug)
  // if (customSeo?.meta_title) use customSeo values instead

  const seoTitle = /* customSeo?.meta_title || */ `购买 ${product.title} - VeryAcc 官方供应`
  const seoDescription = /* customSeo?.meta_description || */ product.description

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: product.seoKeywords,
    robots: { index: true, follow: true },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "website",
      siteName: "VeryAcc",
      url: `https://veryacc.com/products/${product.slug}`,
    },
  }
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-8 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <a href="/products" className="hover:text-foreground transition-colors">{"商品"}</a>
            <span>{"/"}</span>
            <a href={`/products?cat=${product.subcategory}`} className="hover:text-foreground transition-colors capitalize">
              {product.platform}
            </a>
            <span>{"/"}</span>
            <span className="text-foreground text-xs">{product.title}</span>
          </nav>

          <ProductDetailClient product={product} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
