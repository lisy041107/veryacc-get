"use client"

import { useState, useRef, useCallback } from "react"
import { LayoutGrid, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { TelegramIcon } from "./site-header"

const categories = [
  {
    name: "Instagram 账号",
    nameEn: "Instagram",
    href: "/products?cat=instagram",
    children: [
      { name: "全部 Instagram", href: "/products?cat=instagram" },
      { name: "Instagram 老号", href: "/products?cat=instagram&type=aged" },
      { name: "Instagram 新号", href: "/products?cat=instagram&type=fresh" },
      { name: "Instagram 带粉丝", href: "/products?cat=instagram&type=followers" },
    ],
  },
  {
    name: "Facebook 账号",
    nameEn: "Facebook",
    href: "/products?cat=facebook",
    children: [
      { name: "全部 Facebook", href: "/products?cat=facebook" },
      { name: "Facebook 老号", href: "/products?cat=facebook&type=aged" },
      { name: "Facebook 新号", href: "/products?cat=facebook&type=fresh" },
      { name: "Facebook BM", href: "/products?cat=facebook&type=bm" },
    ],
  },
  {
    name: "TikTok 账号",
    nameEn: "TikTok",
    href: "/products?cat=tiktok",
    children: [
      { name: "全部 TikTok", href: "/products?cat=tiktok" },
      { name: "TikTok 新号", href: "/products?cat=tiktok&type=fresh" },
      { name: "TikTok 老号", href: "/products?cat=tiktok&type=aged" },
    ],
  },
  {
    name: "Twitter(X) 账号",
    nameEn: "Twitter(X)",
    href: "/products?cat=twitter",
    children: [
      { name: "全部 Twitter", href: "/products?cat=twitter" },
      { name: "Twitter 老号", href: "/products?cat=twitter&type=aged" },
      { name: "Twitter 新号", href: "/products?cat=twitter&type=fresh" },
    ],
  },
  {
    name: "Telegram 账号",
    nameEn: "Telegram",
    href: "/products?cat=telegram",
    children: [
      { name: "全部 Telegram", href: "/products?cat=telegram" },
      { name: "Telegram 老号", href: "/products?cat=telegram&type=aged" },
      { name: "Telegram 新号", href: "/products?cat=telegram&type=fresh" },
    ],
  },
  {
    name: "其他平台",
    nameEn: "Other Platforms",
    href: "/products",
    children: [
      { name: "Discord 账号", href: "/products?cat=discord" },
      { name: "LinkedIn 账号", href: "/products?cat=linkedin" },
      { name: "WhatsApp 账号", href: "/products?cat=whatsapp" },
      { name: "Reddit 账号", href: "/products?cat=reddit" },
      { name: "Apple ID", href: "/products?cat=appleid" },
      { name: "Google 账号", href: "/products?cat=google" },
      { name: "Gmail 邮箱", href: "/products?cat=gmail" },
      { name: "Outlook 邮箱", href: "/products?cat=outlook" },
      { name: "IP 代理", href: "/products?cat=proxy" },
    ],
  },
]

const navLinks = [
  { name: "首页", nameEn: "Home", href: "/" },
  { name: "关于", nameEn: "About", href: "/about" },
  { name: "商品", nameEn: "Products", href: "/products" },
  { name: "教程", nameEn: "Tutorial", href: "/tutorial" },
  { name: "文章", nameEn: "Articles", href: "/articles" },
  { name: "工具", nameEn: "Tools", href: "/tools" },
  { name: "订单查询", nameEn: "Orders", href: "/lookup" },
]

export default function SiteNav() {
  const [catOpen, setCatOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<number | null>(null)
  const closeTimer = useRef<NodeJS.Timeout | null>(null)
  const subCloseTimer = useRef<NodeJS.Timeout | null>(null)

  const handleCatEnter = useCallback(() => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null }
    setCatOpen(true)
  }, [])

  const handleCatLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => {
      setCatOpen(false)
      setActiveCategory(null)
    }, 500)
  }, [])

  const handleSubEnter = useCallback((index: number) => {
    if (subCloseTimer.current) { clearTimeout(subCloseTimer.current); subCloseTimer.current = null }
    setActiveCategory(index)
  }, [])

  const handleSubLeave = useCallback(() => {
    subCloseTimer.current = setTimeout(() => {
      setActiveCategory(null)
    }, 300)
  }, [])

  return (
    <nav className="relative z-40 border-b border-border/50 bg-card/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-2">
        {/* Category Button */}
        <div
          className="relative"
          onMouseEnter={handleCatEnter}
          onMouseLeave={handleCatLeave}
        >
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <LayoutGrid className="h-4 w-4" />
            <span>商品分类</span>
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          {/* Categories Dropdown */}
          {catOpen && (
            <div className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-border bg-card shadow-2xl">
              {categories.map((cat, index) => (
                <div
                  key={cat.name}
                  className="relative"
                  onMouseEnter={() => handleSubEnter(index)}
                  onMouseLeave={handleSubLeave}
                >
                  <Link
                    href={cat.href}
                    className="flex w-full items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-secondary/80 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </Link>

                  {/* Subcategories */}
                  {activeCategory === index && (
                    <div
                      className="absolute left-full top-0 ml-1 w-52 rounded-lg border border-border bg-card shadow-2xl"
                      onMouseEnter={() => handleSubEnter(index)}
                      onMouseLeave={handleSubLeave}
                    >
                      {cat.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary/80 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://t.me/veryacc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <TelegramIcon className="h-4 w-4" />
            <span>联系我们</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
