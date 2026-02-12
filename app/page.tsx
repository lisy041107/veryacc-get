export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import HeroSection from "@/components/hero-section"
import WhyChooseUs from "@/components/why-choose-us"
import ProductSelection from "@/components/product-selection"
import OrderSteps from "@/components/order-steps"
import DisclaimerSection from "@/components/disclaimer-section"
import SiteFooter from "@/components/site-footer"

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
