export const runtime = 'edge';

import dynamic from 'next/dynamic';
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import HeroSection from "@/components/hero-section"
import WhyChooseUs from "@/components/why-choose-us"
import ProductSelection from "@/components/product-selection"
import OrderSteps from "@/components/order-steps"
import DisclaimerSection from "@/components/disclaimer-section"
import SiteFooter from "@/components/site-footer"

// 使用 dynamic import 引入背景组件，并禁用 SSR
// 这样可以防止背景动画在 Cloudflare 边缘端运行时因为找不到浏览器 API 而报 500 错误
const DynamicStarryBackground = dynamic(
  () => import("@/components/dynamic-starry-background"),
  { ssr: false }
);

export default function Page() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main>
        <HeroSection />
        <ProductSelection />
        <WhyChooseUs />
        <OrderSteps />
        <DisclaimerSection />
      </main>
      <SiteFooter />
    </div>
  )
}