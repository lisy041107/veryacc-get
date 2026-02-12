export const runtime = 'edge'

import React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

export const viewport: Viewport = {
  themeColor: "#0f1729",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "VeryAcc - 全球优质账号自动发卡平台 | 稳定、极速、安全",
  description:
    "VeryAcc 是专业的海外账号交易平台，提供Instagram、推特(Twitter)、Facebook等高品质业务账号。24小时自动发货，库存充盈，售后无忧，助您轻松获取全球数字资产。",
  keywords:
    "账号购买, 自动发卡, 谷歌账号购买, 推特账号批发, VeryAcc, Instagram账号购买, ig账号购买, ins账号购买, fb账号购买, facebook账号购买, fb主页购买, 广告户购买, 三不限广告户购买, bm购买",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "VeryAcc - 全球优质账号自动发卡平台",
    description:
      "VeryAcc 是专业的海外账号交易平台，提供Instagram、推特(Twitter)、Facebook等高品质业务账号。24小时自动发货，库存充盈，售后无忧。",
    type: "website",
    locale: "zh_CN",
    siteName: "VeryAcc",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="font-sans antialiased min-h-screen">{children}</body>
    </html>
  )
}
