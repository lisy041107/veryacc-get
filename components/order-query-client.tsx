"use client"

import { useState } from "react"
import { Search, Package, Download, Mail, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface OrderResult {
  orderId: string
  productName: string
  quantity: number
  price: string
  status: "paid" | "pending" | "cancelled"
  paymentMethod: string
  createdAt: string
}

const statusMap = {
  paid: { label: "已支付", icon: CheckCircle, color: "text-green-400" },
  pending: { label: "待支付", icon: Clock, color: "text-accent" },
  cancelled: { label: "已取消", icon: XCircle, color: "text-destructive" },
}

export default function OrderQueryClient() {
  const [queryType, setQueryType] = useState<"orderId" | "email">("orderId")
  const [queryValue, setQueryValue] = useState("")
  const [searching, setSearching] = useState(false)
  const [searched, setSearched] = useState(false)
  const [results, setResults] = useState<OrderResult[]>([])

  const handleSearch = () => {
    if (!queryValue.trim()) return
    setSearching(true)
    // Simulated search - in production, this would call the API
    setTimeout(() => {
      setSearching(false)
      setSearched(true)
      // Return empty results for now (placeholder for backend integration)
      setResults([])
    }, 1000)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-2">{"订单查询"}</h1>
      <p className="text-muted-foreground mb-8">{"输入订单号或注册邮箱查询您的订单。"}</p>

      {/* Query Form */}
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 mb-8">
        {/* Query Type Tabs */}
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setQueryType("orderId")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              queryType === "orderId"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Package className="h-4 w-4" />
            {"按订单号查询"}
          </button>
          <button
            onClick={() => setQueryType("email")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              queryType === "email"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:text-foreground"
            }`}
          >
            <Mail className="h-4 w-4" />
            {"按邮箱查询"}
          </button>
        </div>

        {/* Search Input */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input
              type={queryType === "email" ? "email" : "text"}
              value={queryValue}
              onChange={(e) => setQueryValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder={queryType === "orderId" ? "输入订单号，例如：ORD-78096034" : "输入注册邮箱地址"}
              className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-3 pl-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <button
            onClick={handleSearch}
            disabled={searching || !queryValue.trim()}
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {searching ? "查询中..." : "查询"}
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div>
          {results.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {"查询结果（共 "}{results.length}{" 条）"}
              </h2>
              {/* Order Table */}
              <div className="overflow-x-auto rounded-xl border border-border bg-card/40 backdrop-blur-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-secondary/30">
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"订单号"}</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"商品名"}</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"支付"}</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"金额"}</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"下载"}</th>
                      <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"状态"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((order) => {
                      const statusInfo = statusMap[order.status]
                      const StatusIcon = statusInfo.icon
                      return (
                        <tr key={order.orderId} className="border-b border-border/50 hover:bg-secondary/20">
                          <td className="px-4 py-3 font-mono text-xs text-foreground">{order.orderId}</td>
                          <td className="px-4 py-3 text-primary hover:underline cursor-pointer">{order.productName}</td>
                          <td className="px-4 py-3 text-muted-foreground">{order.paymentMethod}</td>
                          <td className="px-4 py-3 text-foreground font-medium">{order.price}</td>
                          <td className="px-4 py-3">
                            <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                              <Download className="h-4 w-4" />
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`flex items-center gap-1 text-xs ${statusInfo.color}`}>
                              <StatusIcon className="h-3.5 w-3.5" />
                              {statusInfo.label}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-12 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">{"未找到订单"}</h3>
              <p className="text-sm text-muted-foreground">
                {"未找到相关订单记录。请确认您的订单号或邮箱是否正确。"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {"如有疑问，请 "}
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
          )}
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
              {"输入您购买时获得的订单编号，快速查看订单状态和获取下载链接。"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{"邮箱查询"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"使用注册邮箱查询，可查看该邮箱下的所有历史订单记录。"}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-5">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Download className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-sm font-semibold text-foreground mb-1">{"自动发卡"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"支付成功后，系统会自动发放账号信息，您可随时通过订单查询下载。"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
