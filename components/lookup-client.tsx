"use client"

import { useState } from "react"
import { Search, Package, Mail, Clock, CheckCircle, XCircle, Copy, ShoppingCart, ChevronDown, ChevronUp, MessageCircle } from "lucide-react"

interface OrderItem {
  productName: string
  productLogo?: string
  quantity: number
  unitPrice: number
  cardKeys: string[]
}

interface OrderResult {
  orderId: string
  email: string
  items: OrderItem[]
  totalAmount: number
  fee: number
  paymentMethod: string
  status: "paid" | "pending"
  createdAt: string
}

// Simulated data for demonstration
const mockOrders: OrderResult[] = [
  {
    orderId: "tflqzzswml8vdsdu",
    email: "demo@gmail.com",
    items: [{
      productName: "Apple ID账号 | 香港地区 - 未/已开通iCloud - App下载专用 - 独享可转区",
      quantity: 1,
      unitPrice: 4.80,
      cardKeys: ["appleid_user1@icloud.com:Password123:security_q1:security_q2"],
    }],
    totalAmount: 4.80,
    fee: 0,
    paymentMethod: "余额支付",
    status: "paid",
    createdAt: "2026年2月5日 11:01",
  },
  {
    orderId: "edqpietmll7t06ob",
    email: "demo@gmail.com",
    items: [{
      productName: "Telegram账号 | +57哥伦比亚电话注册 - 7-60天成品号 - API接码登录",
      quantity: 1,
      unitPrice: 3.20,
      cardKeys: ["tg_session_file_content_abc123def456"],
    }],
    totalAmount: 3.20,
    fee: 0,
    paymentMethod: "余额支付",
    status: "paid",
    createdAt: "2026年2月4日 17:06",
  },
]

export default function LookupClient() {
  const [queryType, setQueryType] = useState<"orderId" | "email">("orderId")
  const [queryValue, setQueryValue] = useState("")
  const [queryPassword, setQueryPassword] = useState("")
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<OrderResult[]>([])
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const handleSearch = () => {
    if (!queryValue.trim()) return
    if (queryType === "email" && !queryPassword.trim()) return
    setSearching(true)
    // TODO: Future - call API endpoint
    // const res = await fetch(`/api/orders/lookup?type=${queryType}&q=${queryValue}&pwd=${queryPassword}`)
    setTimeout(() => {
      setSearching(false)
      setSearched(true)
      // Simulated results for demo
      if (queryValue === "demo@gmail.com" || queryValue === "tflqzzswml8vdsdu") {
        setResults(queryType === "email" ? mockOrders : mockOrders.filter(o => o.orderId === queryValue))
      } else {
        setResults([])
      }
    }, 800)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">{"订单查询"}</h1>
      <p className="text-muted-foreground mb-8">{"通过订单号或下单邮箱查询您的订单和卡密信息。"}</p>

      {/* Query Form */}
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 mb-8">
        <div className="flex gap-2 mb-5">
          <button onClick={() => setQueryType("orderId")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${queryType === "orderId" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>
            <Package className="h-4 w-4" />{"按订单号查询"}
          </button>
          <button onClick={() => setQueryType("email")} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${queryType === "email" ? "bg-primary text-primary-foreground" : "bg-secondary/50 text-muted-foreground hover:text-foreground"}`}>
            <Mail className="h-4 w-4" />{"按邮箱查询"}
          </button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <input
              type={queryType === "email" ? "email" : "text"}
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={queryType === "orderId" ? "输入订单号" : "输入下单邮箱地址"}
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {queryType === "email" && (
            <input
              type="password"
              value={queryPassword}
              onChange={(e) => setQueryPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="输入查询密码"
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          )}
          <button
            onClick={handleSearch}
            disabled={searching || !queryValue.trim() || (queryType === "email" && !queryPassword.trim())}
            className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {searching ? "查询中..." : "查询订单"}
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && results.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {"所有订单"}
          </h2>
          <p className="text-sm text-muted-foreground mb-6">{"查看和管理您的所有订单"}</p>

          <div className="space-y-4">
            {results.map((order) => (
              <div key={order.orderId} className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
                {/* Order Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{"订单编号: "}</span>
                        <span className="text-sm font-bold text-foreground font-mono">{order.orderId}</span>
                        <button onClick={() => copyToClipboard(order.orderId, `oid-${order.orderId}`)} className="text-muted-foreground hover:text-foreground">
                          <Copy className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{order.createdAt}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${order.status === "paid" ? "text-green-400" : "text-amber-400"}`}>
                    {order.status === "paid" ? "已完成" : "等待付款"}
                  </span>
                </div>

                {/* Order Items */}
                <div className="px-5 py-4">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.productName}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {"x"}{item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-foreground shrink-0">${item.unitPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Card Keys Section */}
                {order.status === "paid" && (
                  <div className="border-t border-border/50 px-5 py-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                        {"卡密列表"}
                      </h4>
                      <button
                        onClick={() => {
                          const allKeys = order.items.flatMap(i => i.cardKeys).join("\n")
                          copyToClipboard(allKeys, `allkeys-${order.orderId}`)
                        }}
                        className="flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-orange-400 transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                        {copied === `allkeys-${order.orderId}` ? "已复制" : "一键复制"}
                      </button>
                    </div>
                    <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
                      {order.items.flatMap((item, ii) =>
                        item.cardKeys.map((key, ki) => (
                          <div key={`${ii}-${ki}`} className="flex items-start gap-2">
                            <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{ki + 1}.</span>
                            <code className="text-xs text-foreground font-mono break-all flex-1">{key}</code>
                          </div>
                        ))
                      )}
                    </div>
                    {/* Contact info */}
                    <div className="mt-3 rounded-lg bg-secondary/20 border border-border/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        {"复制订单号并联系我们 "}
                        <a href="https://t.me/huoad" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{"Telegram:https://t.me/huoad"}</a>
                        {" "}
                        <a href="https://wa.me/37060084934" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{"WhatsApp:https://wa.me/37060084934"}</a>
                        {" | Copy order number and contact us "}
                        <a href="https://t.me/huoad" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{"Telegram:https://t.me/huoad"}</a>
                        {" "}
                        <a href="https://wa.me/37060084934" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{"WhatsApp:https://wa.me/37060084934"}</a>
                      </p>
                    </div>
                  </div>
                )}

                {/* Pending payment */}
                {order.status === "pending" && (
                  <div className="border-t border-border/50 px-5 py-4">
                    <div className="rounded-lg bg-amber-500/5 border border-amber-500/20 p-4 text-center">
                      <Clock className="h-8 w-8 text-amber-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-amber-400">{"等待付款"}</p>
                      <p className="text-xs text-muted-foreground mt-1">{"请完成支付后刷新页面查看卡密信息"}</p>
                    </div>
                  </div>
                )}

                {/* Order Footer */}
                <div className="flex items-center justify-between border-t border-border/50 px-5 py-3 bg-secondary/10">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-xs text-muted-foreground">{order.paymentMethod}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{"订单总额"}</p>
                      <p className="text-lg font-bold text-red-400">${order.totalAmount.toFixed(2)}</p>
                    </div>
                    <a href={`/products`} className="rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary/50 transition-colors flex items-center gap-1.5">
                      <ShoppingCart className="h-3.5 w-3.5" />{"再次购买"}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searched && results.length === 0 && (
        <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-12 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{"未找到订单"}</h3>
          <p className="text-sm text-muted-foreground">{"未找到相关订单记录。请确认您的订单号或邮箱及密码是否正确。"}</p>
          <p className="text-sm text-muted-foreground mt-2">
            {"如有疑问，请联系 "}
            <a href="https://t.me/veryacc" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{"Telegram 客服"}</a>
            {"。"}
          </p>
        </div>
      )}

      {/* Instructions */}
      {!searched && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{"订单号查询"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"输入您购买时获得的订单编号，快速查看订单状态和卡密信息。"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{"邮箱查询"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"使用下单邮箱和查询密码，可查看该邮箱下所有的历史订单记录。"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{"售后支持"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"商品问题请在24小时内联系客服，超时不予售后处理。"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
