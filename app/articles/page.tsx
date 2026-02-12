export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { FileText, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "文章 - VeryAcc",
  description: "浏览关于账号登录教程、使用技巧和常见问题的文章。",
}

const articles = [
  {
    id: "facebook-login-guide",
    title: "Facebook 账号登录完整教程",
    summary: "详细介绍如何安全登录购买的 Facebook 账号，包括代理设置、浏览器指纹配置、环境准备等关键步骤。",
    category: "登录教程",
    date: "2026-02-08",
    readTime: "5 分钟",
  },
  {
    id: "instagram-login-guide",
    title: "Instagram 账号登录与养号教程",
    summary: "从零开始教您如何正确登录 Instagram 账号，避免触发安全验证，以及如何进行初期养号操作。",
    category: "登录教程",
    date: "2026-02-06",
    readTime: "8 分钟",
  },
  {
    id: "tiktok-login-guide",
    title: "TikTok 账号登录指南",
    summary: "使用手机或模拟器登录 TikTok 账号的详细步骤，包括常见问题解决方案和注意事项。",
    category: "登录教程",
    date: "2026-02-04",
    readTime: "6 分钟",
  },
  {
    id: "twitter-x-login-guide",
    title: "Twitter(X) 账号安全登录教程",
    summary: "Twitter 账号登录流程详解，包括如何使用 Token 登录、邮箱验证处理、以及防封策略。",
    category: "登录教程",
    date: "2026-02-02",
    readTime: "7 分钟",
  },
  {
    id: "proxy-setup-guide",
    title: "如何正确配置代理 IP 登录账号",
    summary: "全面的代理 IP 配置教程，涵盖 HTTP/SOCKS5 代理的设置方法、推荐的代理服务商、以及如何选择合适的IP地区。",
    category: "基础教程",
    date: "2026-01-28",
    readTime: "10 分钟",
  },
  {
    id: "browser-fingerprint-guide",
    title: "浏览器指纹与反检测浏览器使用指南",
    summary: "了解浏览器指纹的概念，以及如何使用反检测浏览器（如 AdsPower、Multilogin）来安全管理多个账号。",
    category: "基础教程",
    date: "2026-01-25",
    readTime: "12 分钟",
  },
  {
    id: "telegram-login-guide",
    title: "Telegram 账号登录与 Session 文件使用教程",
    summary: "教您如何通过 Session 文件登录 Telegram 账号，以及如何在桌面端和移动端正确使用。",
    category: "登录教程",
    date: "2026-01-20",
    readTime: "6 分钟",
  },
  {
    id: "2fa-guide",
    title: "双重验证 (2FA) 完整使用指南",
    summary: "详细介绍什么是双重验证、如何使用 2FA 验证码、备用码的保存和使用方法。",
    category: "安全指南",
    date: "2026-01-15",
    readTime: "5 分钟",
  },
]

const categoryColors: Record<string, string> = {
  "登录教程": "bg-primary/10 text-primary border-primary/20",
  "基础教程": "bg-green-500/10 text-green-400 border-green-500/20",
  "安全指南": "bg-accent/10 text-accent border-accent/20",
}

export default function ArticlesPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground transition-colors">{"首页"}</Link>
            <span>{"/"}</span>
            <span className="text-foreground">{"文章"}</span>
          </nav>

          {/* Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <img src="/images/va-logo.png" alt="VeryAcc" className="h-10 w-10 rounded-lg object-cover" />
              <h1 className="text-4xl font-bold text-foreground">{"文章中心"}</h1>
            </div>
            <p className="text-lg text-muted-foreground">{"账号登录教程、使用技巧和常见问题解答"}</p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <span className="inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              {"全部"}
            </span>
            <span className="inline-flex items-center rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors">
              {"登录教程"}
            </span>
            <span className="inline-flex items-center rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors">
              {"基础教程"}
            </span>
            <span className="inline-flex items-center rounded-lg bg-secondary/50 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors">
              {"安全指南"}
            </span>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-6 hover:border-primary/30 hover:bg-card/60 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-xs rounded-full px-2.5 py-0.5 font-medium border ${categoryColors[article.category] || "bg-secondary text-muted-foreground border-border"}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>
                <h2 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {article.summary}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                  <span className="flex items-center gap-1 text-xs text-primary font-medium group-hover:gap-2 transition-all">
                    {"阅读全文"}
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>

          {/* Notice */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {"更多文章持续更新中。如有特定教程需求，请 "}
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
