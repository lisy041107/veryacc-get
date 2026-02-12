"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Search, LogIn, Globe, ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { searchProducts, type Product } from "@/lib/products"

export default function SiteHeader() {
  const [lang, setLang] = useState<"zh" | "en">("zh")
  const [langOpen, setLangOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<Product[]>([])
  const [showResults, setShowResults] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 0) {
      const results = searchProducts(query.trim())
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [])

  const handleSelectProduct = useCallback((slug: string) => {
    setShowResults(false)
    setSearchQuery("")
    setSearchResults([])
    router.push(`/products/${slug}`)
  }, [router])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current && !searchRef.current.contains(event.target as Node) &&
        mobileSearchRef.current && !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node) && !mobileSearchRef.current) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="relative z-50">
      {/* Login Coming Soon Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setLoginModalOpen(false)} />
          <div className="relative w-full max-w-sm rounded-xl border border-border bg-card shadow-2xl p-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-4">
              <LogIn className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">{"用户中心"}</h2>
            <p className="text-sm text-muted-foreground mb-6">{"用户中心正在陆续开发中，敬请期待"}</p>
            <button
              onClick={() => setLoginModalOpen(false)}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {"我知道了"}
            </button>
          </div>
        </div>
      )}

      {/* Top Bar */}
      <div className="border-b border-border/50 bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/va-logo.png" alt="VeryAcc" className="h-10 w-10 rounded-lg object-cover" />
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">VeryAcc</h1>
              <p className="text-xs text-muted-foreground">
                {lang === "zh" ? "专业的账号售卖商城" : "Professional Account Shop"}
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8" ref={searchRef}>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => { if (searchQuery.trim().length > 0) setShowResults(true) }}
                placeholder={lang === "zh" ? "搜索商品..." : "Search products..."}
                className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              {/* Search Results Dropdown */}
              {showResults && (
                <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-border bg-card shadow-2xl max-h-80 overflow-y-auto z-[60]">
                  {searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary/60 transition-colors border-b border-border/30 last:border-b-0"
                      >
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                          <Search className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {product.platform} &middot; ${product.price} &middot; {"库存"} {product.stock}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                      {"未找到相关商品"}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{lang === "zh" ? "中文" : "EN"}</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-1 w-32 rounded-lg border border-border bg-card shadow-xl z-50">
                  <button
                    onClick={() => { setLang("zh"); setLangOpen(false) }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-t-lg"
                  >
                    {"简体中文"}
                  </button>
                  <button
                    onClick={() => { setLang("en"); setLangOpen(false) }}
                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-secondary/50 rounded-b-lg"
                  >
                    {"English"}
                  </button>
                </div>
              )}
            </div>

            {/* Login */}
            <button
              onClick={() => setLoginModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <LogIn className="h-4 w-4" />
              <span className="hidden sm:inline">{lang === "zh" ? "登录" : "Login"}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-3" ref={mobileSearchRef}>
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => { if (searchQuery.trim().length > 0) setShowResults(true) }}
              placeholder={lang === "zh" ? "搜索商品..." : "Search products..."}
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            {/* Mobile Search Results */}
            {showResults && (
              <div className="absolute left-0 right-0 top-full mt-2 rounded-lg border border-border bg-card shadow-2xl max-h-64 overflow-y-auto z-[60]">
                {searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSelectProduct(product.slug)}
                      className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-secondary/60 transition-colors border-b border-border/30 last:border-b-0"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {product.platform} &middot; ${product.price}
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                    {"未找到相关商品"}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl">
          <nav className="flex flex-col px-4 py-2">
            <NavMobileLink href="/" label={lang === "zh" ? "首页" : "Home"} />
            <NavMobileLink href="/about" label={lang === "zh" ? "关于" : "About"} />
            <NavMobileLink href="/products" label={lang === "zh" ? "商品" : "Products"} />
            <NavMobileLink href="/tutorial" label={lang === "zh" ? "教程" : "Tutorial"} />
            <NavMobileLink href="/articles" label={lang === "zh" ? "文章" : "Articles"} />
            <NavMobileLink href="/tools" label={lang === "zh" ? "工具" : "Tools"} />
            <NavMobileLink href="/lookup" label={lang === "zh" ? "订单查询" : "Order Query"} />
            <a
              href="https://t.me/veryacc"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <TelegramIcon className="h-4 w-4" />
              {lang === "zh" ? "联系我们" : "Contact Us"}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

function NavMobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  )
}

export function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}
