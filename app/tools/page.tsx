export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { Wrench, Globe, Shield, KeyRound, Smartphone, Server, FileCheck } from "lucide-react"

export const metadata = {
  title: "工具 - VeryAcc",
  description: "实用工具集合，帮助您更好地使用和管理账号。",
}

const tools = [
  {
    icon: Globe,
    title: "IP 代理检测",
    description: "检测您当前的 IP 地址、位置、ISP 信息，确认代理是否正常工作。",
    status: "可用",
    href: "#",
  },
  {
    icon: Shield,
    title: "账号存活检测",
    description: "检测您的账号是否仍然存活可用，快速验证账号状态。",
    status: "可用",
    href: "#",
  },
  {
    icon: KeyRound,
    title: "2FA(双重)验证器",
    description: "生成和管理双重身份验证码，保护您的账号安全。支持TOTP标准。",
    status: "可用",
    href: "#",
  },
  {
    icon: Smartphone,
    title: "Cookie/Json格式转化",
    description: "在Cookie和JSON格式之间进行转换，方便导入导出账号数据。",
    status: "可用",
    href: "#",
  },
  {
    icon: Server,
    title: "HTTP/SOCKS5 代理",
    description: "高质量的 HTTP/SOCKS5 代理服务，覆盖全球多个国家和地区。",
    status: "即将上线",
    href: "#",
  },
  {
    icon: FileCheck,
    title: "账号批量验证",
    description: "批量验证账号的有效性，快速筛选可用账号。",
    status: "即将上线",
    href: "#",
  },
]

export default function ToolsPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <a href="/" className="hover:text-foreground transition-colors">{"首页"}</a>
            <span>{"/"}</span>
            <span className="text-foreground">{"工具"}</span>
          </nav>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Wrench className="h-6 w-6 text-accent" />
              <h1 className="text-4xl font-bold text-foreground">{"实用工具"}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{"帮助您更好地管理和使用账号的实用工具集合。"}</p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool) => {
              const Icon = tool.icon
              const isAvailable = tool.status === "可用"
              return (
                <div
                  key={tool.title}
                  className={`rounded-xl border bg-card/40 backdrop-blur-sm p-6 transition-all ${
                    isAvailable
                      ? "border-border hover:border-primary/30 cursor-pointer"
                      : "border-border/50 opacity-60"
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <span
                      className={`text-xs rounded-full px-2.5 py-0.5 font-medium ${
                        isAvailable
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-accent/10 text-accent border border-accent/20"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                </div>
              )
            })}
          </div>

          {/* Notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {"更多工具正在开发中，敬请期待。如有工具需求建议，请 "}
              <a
                href="https://t.me/veryacc"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {"联系我们"}
              </a>
              {"。"}
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
