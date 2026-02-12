"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Search, ClipboardList, Eye, X, Copy, ChevronDown } from "lucide-react"
import { toast, Toaster } from "sonner"

interface OrderItem {
  productName: string
  quantity: number
  unitPrice: number
  cardKeys: string[]
}

interface Order {
  id: string
  orderId: string
  email: string
  items: OrderItem[]
  totalAmount: number
  paymentMethod: string
  status: "paid" | "unpaid"
  createdAt: string
  paidAt?: string
}

const sampleOrders: Order[] = [
  {
    id: "1", orderId: "ppxnuzasmldenhrm", email: "customer1@gmail.com",
    items: [{ productName: "Facebook 账号 | 老号 | 2018年注册", quantity: 1, unitPrice: 2.50, cardKeys: ["fbuser1:pass123:email@gmail.com:2fa_backup_codes"] }],
    totalAmount: 2.50, paymentMethod: "USDT-TRC20", status: "paid", createdAt: "2026-02-08 15:11:50", paidAt: "2026-02-08 15:11:50"
  },
  {
    id: "2", orderId: "yxxikhrxmldekybg", email: "customer2@gmail.com",
    items: [{ productName: "Instagram 账号 | 注册于2019年 | 老号", quantity: 2, unitPrice: 1.17, cardKeys: ["iguser1:pass1:email1:2fa1", "iguser2:pass2:email2:2fa2"] }],
    totalAmount: 2.34, paymentMethod: "余额支付", status: "paid", createdAt: "2026-02-08 15:09:51", paidAt: "2026-02-08 15:09:59"
  },
  {
    id: "3", orderId: "ctboqtaymlde9sqj", email: "customer3@gmail.com",
    items: [{ productName: "TikTok 账号 | 全新注册 | 带邮箱", quantity: 3, unitPrice: 0.85, cardKeys: [] }],
    totalAmount: 2.55, paymentMethod: "支付宝", status: "unpaid", createdAt: "2026-02-08 14:30:00"
  },
  {
    id: "4", orderId: "ankuknhmmldaf79h", email: "customer4@gmail.com",
    items: [{ productName: "Twitter(X) 账号 | 2020年注册", quantity: 1, unitPrice: 1.50, cardKeys: ["twuser1:pass1:email1:token1"] }],
    totalAmount: 1.50, paymentMethod: "USDT-TRC20", status: "paid", createdAt: "2026-02-08 13:13:24", paidAt: "2026-02-08 13:13:31"
  },
]

export default function AdminOrdersClient() {
  const [orders] = useState<Order[]>(sampleOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("")
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null)

  const filtered = orders.filter(o => {
    const matchSearch = !searchQuery || o.orderId.includes(searchQuery) || o.email.includes(searchQuery)
    const matchStatus = !statusFilter || o.status === statusFilter
    return matchSearch && matchStatus
  })

  const totalPaid = orders.filter(o => o.status === "paid").length
  const totalUnpaid = orders.filter(o => o.status === "unpaid").length
  const totalRevenue = orders.filter(o => o.status === "paid").reduce((s, o) => s + o.totalAmount, 0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("已复制到剪贴板")
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white">{"订单管理"}</h1>
          <p className="text-sm text-neutral-400 mt-1">{"查看和管理所有客户订单"}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-[#111118] p-5">
            <p className="text-sm text-neutral-400">{"总订单"}</p>
            <p className="text-2xl font-bold text-white mt-1">{orders.length}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-[#111118] p-5">
            <p className="text-sm text-neutral-400">{"已支付"}</p>
            <p className="text-2xl font-bold text-green-400 mt-1">{totalPaid}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-[#111118] p-5">
            <p className="text-sm text-neutral-400">{"未完成"}</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{totalUnpaid}</p>
          </div>
          <div className="rounded-xl border border-neutral-800 bg-[#111118] p-5">
            <p className="text-sm text-neutral-400">{"总收入"}</p>
            <p className="text-2xl font-bold text-blue-400 mt-1">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="搜索订单号或下单邮箱..." className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
          </div>
          <div className="relative">
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="appearance-none rounded-lg border border-neutral-700 bg-neutral-800/50 pl-3 pr-8 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50">
              <option value="">{"全部状态"}</option>
              <option value="paid">{"已支付"}</option>
              <option value="unpaid">{"未完成"}</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"订单号"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"下单邮箱"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"付款金额"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"购买列表"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"订单状态"}</th>
                  <th className="text-right text-neutral-400 font-medium px-4 py-3">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(order => (
                  <tr key={order.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="text-xs text-white font-mono">{order.orderId}</code>
                        <button onClick={() => copyToClipboard(order.orderId)} className="text-neutral-500 hover:text-white"><Copy className="h-3 w-3" /></button>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5">{order.createdAt}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-300">{order.email}</td>
                    <td className="px-4 py-3">
                      <span className="text-white font-medium">${order.totalAmount.toFixed(2)}</span>
                      <p className="text-xs text-neutral-500">{order.paymentMethod}</p>
                    </td>
                    <td className="px-4 py-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-xs text-neutral-300 truncate max-w-[200px]">
                          {item.productName} <span className="text-neutral-500">x{item.quantity}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${order.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {order.status === "paid" ? "已支付" : "未完成"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end">
                        <button onClick={() => setViewingOrder(order)} className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs text-blue-400 hover:bg-blue-500/10 transition-colors">
                          <Eye className="h-3.5 w-3.5" />{"查看"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center"><ClipboardList className="h-10 w-10 text-neutral-600 mx-auto mb-3" /><p className="text-sm text-neutral-500">{"暂无匹配的订单记录"}</p></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {viewingOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setViewingOrder(null)} />
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-800 bg-[#111118] shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between border-b border-neutral-800 bg-[#111118] px-6 py-4 z-10">
                <div>
                  <h3 className="text-lg font-bold text-white">{"订单详情"}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{"订单号: "}{viewingOrder.orderId}</p>
                </div>
                <button onClick={() => setViewingOrder(null)} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg border border-neutral-800 bg-neutral-800/30 p-4">
                    <p className="text-xs text-neutral-500 mb-1">{"下单邮箱"}</p>
                    <p className="text-sm text-white">{viewingOrder.email}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-800/30 p-4">
                    <p className="text-xs text-neutral-500 mb-1">{"支付方式"}</p>
                    <p className="text-sm text-white">{viewingOrder.paymentMethod}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-800/30 p-4">
                    <p className="text-xs text-neutral-500 mb-1">{"订单金额"}</p>
                    <p className="text-sm text-white font-bold">${viewingOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="rounded-lg border border-neutral-800 bg-neutral-800/30 p-4">
                    <p className="text-xs text-neutral-500 mb-1">{"订单状态"}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${viewingOrder.status === "paid" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                      {viewingOrder.status === "paid" ? "已支付" : "未完成"}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">{"购买列表"}</h4>
                  {viewingOrder.items.map((item, i) => (
                    <div key={i} className="rounded-lg border border-neutral-800 bg-neutral-800/30 p-4 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-white font-medium">{item.productName}</p>
                        <p className="text-sm text-neutral-300">${item.unitPrice.toFixed(2)} x {item.quantity}</p>
                      </div>
                      {item.cardKeys.length > 0 ? (
                        <div className="mt-3 border-t border-neutral-700 pt-3">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-xs text-neutral-400 font-medium">{"发出的卡密"}</p>
                            <button onClick={() => copyToClipboard(item.cardKeys.join("\n"))} className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 px-2 py-1 rounded bg-amber-500/10">
                              <Copy className="h-3 w-3" />{"一键复制"}
                            </button>
                          </div>
                          <div className="space-y-1">
                            {item.cardKeys.map((key, ki) => (
                              <div key={ki} className="flex items-center justify-between rounded bg-neutral-900 px-3 py-2">
                                <code className="text-xs text-green-300 font-mono truncate max-w-[85%]">{key}</code>
                                <button onClick={() => copyToClipboard(key)} className="text-neutral-500 hover:text-white shrink-0"><Copy className="h-3 w-3" /></button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="mt-3 text-xs text-amber-400 border-t border-neutral-700 pt-3">
                          {viewingOrder.status === "unpaid" ? "等待付款，暂未发出卡密" : "卡密发放中..."}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-800 pt-4">
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>{"下单时间: "}{viewingOrder.createdAt}</span>
                    {viewingOrder.paidAt && <span>{"支付时间: "}{viewingOrder.paidAt}</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
