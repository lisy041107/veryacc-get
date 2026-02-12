import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { TelegramIcon } from "./site-header"

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-border/50 bg-card/60 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/images/va-logo.png" alt="VeryAcc" className="h-8 w-8 rounded-lg object-cover" />
              <span className="text-lg font-bold text-foreground">VeryAcc</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {"全球优质账号自动发卡平台 - 提供 Instagram、Facebook、TikTok、Twitter(X)、Telegram 等主流社交媒体账号购买，24小时自动发货，库存充盈，售后无忧。"}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col gap-2.5">
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">商品</Link>
              <Link href="/tutorial" className="text-sm text-muted-foreground hover:text-foreground transition-colors">使用教程</Link>
              <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground transition-colors">工具</Link>
              <Link href="/lookup" className="text-sm text-muted-foreground hover:text-foreground transition-colors">订单查询</Link>
            </nav>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              支持
            </h4>
            <nav className="flex flex-col gap-2.5">
              <a href="https://t.me/veryacc" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">联系我们</a>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">关于我们</Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">服务条款</Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              联系
            </h4>
            <div className="flex flex-col gap-3">
              <a href="mailto:support@veryacc.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                support@veryacc.com
              </a>
              <a href="https://t.me/veryacc" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <TelegramIcon className="h-4 w-4" />
                @veryacc
              </a>
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                请通过 Telegram 联系
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {"© 2026 VeryAcc 版权所有 | 专业数字商品交易平台"}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">服务条款</Link>
            <Link href="/refund" className="text-xs text-muted-foreground hover:text-foreground transition-colors">售后政策</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
