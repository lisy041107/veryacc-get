"use client"

import dynamic from "next/dynamic"

const StarryBackground = dynamic(() => import("@/components/starry-background"), {
  ssr: false,
})

export default function DynamicStarryBackground() {
  return <StarryBackground />
}
