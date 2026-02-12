"use client"

import AdminLayout from "@/components/admin-layout"
import { Package, ShoppingCart, DollarSign, FolderTree } from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "商品总数", value: "12", icon: Package, color: "text-blue-400 bg-blue-500/10" },
  { label: "今日订单", value: "4", icon: ShoppingCart, color: "text-green-400 bg-green-500/10" },
  { label: "今日收入", value: "$11.14", icon: DollarSign, color: "text-amber-400 bg-amber-500/10" },
  { label: "分类数", value: "5", icon: FolderTree, color: "text-purple-400 bg-purple-500/10" },
]

export default function AdminDashboardClient() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-bold text-white">{"控制台"}</h1>
          <p className="text-sm text-neutral-400 mt-1">{"欢迎回来，管理员"}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-xl border border-neutral-800 bg-[#111118] p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-neutral-400">{stat.label}</span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"快捷操作"}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/veryacc/categories" className="rounded-lg bg-purple-600/10 border border-purple-600/20 text-purple-400 px-4 py-2 text-sm font-medium hover:bg-purple-600/20 transition-colors">
              {"管理分类"}
            </Link>
            <Link href="/veryacc/products" className="rounded-lg bg-blue-600/10 border border-blue-600/20 text-blue-400 px-4 py-2 text-sm font-medium hover:bg-blue-600/20 transition-colors">
              {"管理商品"}
            </Link>
            <Link href="/veryacc/orders" className="rounded-lg bg-green-600/10 border border-green-600/20 text-green-400 px-4 py-2 text-sm font-medium hover:bg-green-600/20 transition-colors">
              {"查看订单"}
            </Link>
            <Link href="/veryacc/articles" className="rounded-lg bg-amber-600/10 border border-amber-600/20 text-amber-400 px-4 py-2 text-sm font-medium hover:bg-amber-600/20 transition-colors">
              {"管理文章"}
            </Link>
            <Link href="/veryacc/tools" className="rounded-lg bg-cyan-600/10 border border-cyan-600/20 text-cyan-400 px-4 py-2 text-sm font-medium hover:bg-cyan-600/20 transition-colors">
              {"管理工具"}
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"最近活动"}</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-neutral-300">{"订单 ppxnuzasmldenhrm 已支付 $2.50"}</span>
              <span className="text-neutral-500 ml-auto text-xs">{"2分钟前"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-400" />
              <span className="text-neutral-300">{"订单 yxxikhrxmldekybg 已支付 $2.34"}</span>
              <span className="text-neutral-500 ml-auto text-xs">{"5分钟前"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="text-neutral-300">{"订单 ctboqtaymlde9sqj 等待支付"}</span>
              <span className="text-neutral-500 ml-auto text-xs">{"15分钟前"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-blue-400" />
              <span className="text-neutral-300">{"新增商品「Instagram 账号 | 注册于2019年 | 老号」"}</span>
              <span className="text-neutral-500 ml-auto text-xs">{"1小时前"}</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
