"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  FileText,
  Wrench,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"

const sidebarItems = [
  { name: "控制台", href: "/veryacc", icon: LayoutDashboard },
  { name: "分类管理", href: "/veryacc/categories", icon: FolderTree },
  { name: "商品管理", href: "/veryacc/products", icon: Package },
  { name: "订单管理", href: "/veryacc/orders", icon: ClipboardList },
  { name: "文章管理", href: "/veryacc/articles", icon: FileText },
  { name: "工具管理", href: "/veryacc/tools", icon: Wrench },
  { name: "系统设置", href: "/veryacc/settings", icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [checking, setChecking] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const cookies = document.cookie.split(";").map((c) => c.trim())
    const isAuth = cookies.some((c) => c.startsWith("veryacc_admin=authenticated"))
    if (!isAuth) {
      router.replace("/veryacc/login")
    } else {
      setAuthenticated(true)
    }
    setChecking(false)
  }, [router])

  const handleLogout = () => {
    document.cookie = "veryacc_admin=; path=/; max-age=0"
    router.replace("/veryacc/login")
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="h-8 w-8 border-2 border-neutral-600 border-t-blue-500 rounded-full animate-spin" />
      </div>
    )
  }

  if (!authenticated) return null

  const currentPageName = sidebarItems.find(
    (i) => i.href === pathname || (i.href !== "/veryacc" && pathname.startsWith(i.href))
  )?.name || "管理后台"

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#111118] border-r border-neutral-800 flex flex-col transition-transform duration-200 lg:translate-x-0 lg:static ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 px-5 py-5 border-b border-neutral-800">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1a2e] text-white font-bold text-xs">VA</div>
          <div>
            <p className="text-sm font-bold text-white">{"VeryAcc"}</p>
            <p className="text-[11px] text-neutral-500">{"Admin Panel"}</p>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto lg:hidden text-neutral-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== "/veryacc" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-blue-600/10 text-blue-400" : "text-neutral-400 hover:text-white hover:bg-neutral-800/50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
                {isActive && <ChevronRight className="h-3 w-3 ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-neutral-800">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/5 transition-colors">
            <LogOut className="h-4 w-4" />
            <span>{"退出登录"}</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-4 border-b border-neutral-800 bg-[#0a0a0f]/80 backdrop-blur-md px-4 py-3 lg:px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-neutral-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
          <h2 className="text-sm font-semibold text-white">{currentPageName}</h2>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
