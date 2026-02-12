"use client"

import { useState } from "react"
import {
  Home,
  Tag,
  ShoppingCart,
  User,
  Users,
  Wallet,
  Shield,
  Bell,
  Settings,
  Download,
  Mail,
} from "lucide-react"

const sidebarItems = [
  { id: "home", label: "主页", icon: Home },
  { id: "tickets", label: "工单", icon: Tag },
  { id: "orders", label: "我的订单", icon: ShoppingCart },
  { id: "profile", label: "个人资料", icon: User },
  { id: "affiliate", label: "联盟计划", icon: Users },
  { id: "balance", label: "余额充值", icon: Wallet },
  { id: "security", label: "安全", icon: Shield },
  { id: "notifications", label: "通知", icon: Bell },
  { id: "settings", label: "通知设置", icon: Settings },
]

// Demo order data
const demoOrders = [
  {
    id: "7809603",
    name: "Instagram账号 | 注册于2019年。账号资料可能为空或仅有少量信息。已启用双重验证。",
    payment: "ACCS",
    cost: "$99.90",
    date: "2026-01-15",
  },
  {
    id: "7804953",
    name: "Instagram账号 | 注册于2019年。账号资料可能为空或仅有少量信息。已启用双重验证。",
    payment: "ACCS",
    cost: "$99.90",
    date: "2026-01-12",
  },
  {
    id: "7801952",
    name: "Instagram账号 | 注册于2019年。账号资料可能为空或仅有少量信息。已启用双重验证。",
    payment: "ACCS",
    cost: "$49.95",
    date: "2026-01-10",
  },
  {
    id: "7800892",
    name: "Gmail 账号 | 包含一个额外的邮箱（无密码）。男女不限。已启用双重验证。",
    payment: "ACCS",
    cost: "$5.83",
    date: "2026-01-08",
  },
]

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("home")

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <aside className="lg:w-64 shrink-0">
        {/* Balance Card */}
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{"当前余额："}</span>
            <span className="text-xl font-bold text-foreground">{"$0.00"}</span>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="rounded-xl border border-border bg-card/40 backdrop-blur-sm overflow-hidden">
          {sidebarItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex w-full items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-border/50 last:border-0 ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {activeTab === "home" && <DashboardHome />}
        {activeTab === "orders" && <DashboardOrders />}
        {activeTab === "tickets" && <DashboardTickets />}
        {activeTab === "profile" && <DashboardProfile />}
        {activeTab === "balance" && <DashboardBalance />}
        {activeTab === "security" && <DashboardSecurity />}
        {activeTab === "affiliate" && <DashboardAffiliate />}
        {activeTab === "notifications" && <DashboardNotifications />}
        {activeTab === "settings" && <DashboardSettings />}
      </div>
    </div>
  )
}

function DashboardHome() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"您的订单"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"您最近的 10 个订单"}</p>

      <div className="overflow-x-auto rounded-xl border border-border bg-card/40 backdrop-blur-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"订单 #"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"商品名"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"支付"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"金额"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"下载"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"票"}</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/20">
                <td className="px-4 py-3 font-mono text-xs text-foreground">{order.id}</td>
                <td className="px-4 py-3 text-primary text-xs hover:underline cursor-pointer max-w-xs truncate">
                  {order.name}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center justify-center rounded bg-primary/20 px-2 py-0.5 text-xs font-bold text-primary">
                    {order.payment}
                  </span>
                </td>
                <td className="px-4 py-3 text-foreground font-medium text-xs">{order.cost}</td>
                <td className="px-4 py-3">
                  <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Download className="h-4 w-4" />
                  </button>
                </td>
                <td className="px-4 py-3">
                  <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Mail className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DashboardOrders() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"我的订单"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"查看所有历史订单记录。"}</p>
      <div className="overflow-x-auto rounded-xl border border-border bg-card/40 backdrop-blur-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"订单 #"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"商品名"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"日期"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"金额"}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{"操作"}</th>
            </tr>
          </thead>
          <tbody>
            {demoOrders.map((order) => (
              <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/20">
                <td className="px-4 py-3 font-mono text-xs text-foreground">{order.id}</td>
                <td className="px-4 py-3 text-primary text-xs hover:underline cursor-pointer max-w-xs truncate">
                  {order.name}
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{order.date}</td>
                <td className="px-4 py-3 text-foreground font-medium text-xs">{order.cost}</td>
                <td className="px-4 py-3 flex gap-1">
                  <button className="rounded p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50">
                    <Download className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DashboardTickets() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"工单"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"管理您的支持工单。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-8 text-center">
        <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">{"暂无工单记录。"}</p>
        <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground hover:bg-primary/90 transition-colors">
          {"创建新工单"}
        </button>
      </div>
    </div>
  )
}

function DashboardProfile() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"个人资料"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"管理您的个人信息。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"用户名"}</label>
          <input
            type="text"
            defaultValue="user_demo"
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"邮箱"}</label>
          <input
            type="email"
            defaultValue="demo@example.com"
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          {"保存更改"}
        </button>
      </div>
    </div>
  )
}

function DashboardBalance() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"余额充值"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"为您的账户余额充值。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 space-y-4">
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-4">
          <p className="text-sm text-muted-foreground">{"当前余额"}</p>
          <p className="text-3xl font-bold text-foreground">{"$0.00"}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"充值金额 (USD)"}</label>
          <input
            type="number"
            defaultValue="10"
            min={1}
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"支付方式"}</label>
          <select className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
            <option>{"USDT (TRC20)"}</option>
            <option>{"支付宝"}</option>
            <option>{"微信支付"}</option>
          </select>
        </div>
        <button className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          {"立即充值"}
        </button>
      </div>
    </div>
  )
}

function DashboardSecurity() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"安全设置"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"管理您的密码和安全选项。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"当前密码"}</label>
          <input
            type="password"
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"新密码"}</label>
          <input
            type="password"
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"确认新密码"}</label>
          <input
            type="password"
            className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          {"更新密码"}
        </button>
      </div>
    </div>
  )
}

function DashboardAffiliate() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"联盟计划"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"通过推荐好友赚取佣金。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{"0"}</p>
            <p className="text-xs text-muted-foreground">{"已推荐人数"}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="text-2xl font-bold text-foreground">{"$0.00"}</p>
            <p className="text-xs text-muted-foreground">{"已赚佣金"}</p>
          </div>
          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50 text-center">
            <p className="text-2xl font-bold text-accent">{"5%"}</p>
            <p className="text-xs text-muted-foreground">{"佣金比例"}</p>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">{"您的推荐链接"}</label>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value="https://veryacc.com/?ref=YOUR_CODE"
              className="flex-1 rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-muted-foreground focus:outline-none"
            />
            <button className="rounded-lg bg-primary px-4 py-2.5 text-sm text-primary-foreground hover:bg-primary/90 transition-colors whitespace-nowrap">
              {"复制"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardNotifications() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"通知"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"查看系统通知和消息。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-8 text-center">
        <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">{"暂无新通知。"}</p>
      </div>
    </div>
  )
}

function DashboardSettings() {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-2">{"通知设置"}</h2>
      <p className="text-sm text-muted-foreground mb-6">{"管理您的通知偏好。"}</p>
      <div className="rounded-xl border border-border bg-card/40 backdrop-blur-sm p-6 space-y-4">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-foreground">{"订单完成通知"}</span>
          <input type="checkbox" defaultChecked className="rounded border-border" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-foreground">{"促销活动通知"}</span>
          <input type="checkbox" className="rounded border-border" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-foreground">{"安全提醒"}</span>
          <input type="checkbox" defaultChecked className="rounded border-border" />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm text-foreground">{"邮件通知"}</span>
          <input type="checkbox" defaultChecked className="rounded border-border" />
        </label>
        <button className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          {"保存设置"}
        </button>
      </div>
    </div>
  )
}
