"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { toast, Toaster } from "sonner"

export default function AdminSettingsClient() {
  const [siteName, setSiteName] = useState("VeryAcc")
  const [siteDescription, setSiteDescription] = useState("全球优质账号自动发卡平台")
  const [contactTelegram, setContactTelegram] = useState("@veryacc")
  const [contactEmail, setContactEmail] = useState("support@veryacc.com")
  const [autoDelivery, setAutoDelivery] = useState(true)

  const handleSave = () => {
    toast.success("设置已保存")
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6 max-w-2xl">
        <div>
          <h1 className="text-xl font-bold text-white">{"系统设置"}</h1>
          <p className="text-sm text-neutral-400 mt-1">{"管理站点基本配置"}</p>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"基本设置"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"站点名称"}</label>
              <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"站点描述"}</label>
              <input type="text" value={siteDescription} onChange={(e) => setSiteDescription(e.target.value)} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"联系方式"}</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Telegram"}</label>
              <input type="text" value={contactTelegram} onChange={(e) => setContactTelegram(e.target.value)} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Email"}</label>
              <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"发货设置"}</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white">{"自动发货"}</p>
              <p className="text-xs text-neutral-500 mt-0.5">{"支付成功后自动发送卡密到客户邮箱"}</p>
            </div>
            <button onClick={() => setAutoDelivery(!autoDelivery)} className={`relative h-6 w-11 rounded-full transition-colors ${autoDelivery ? "bg-blue-600" : "bg-neutral-700"}`}>
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${autoDelivery ? "left-[22px]" : "left-0.5"}`} />
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] p-6">
          <h3 className="text-sm font-semibold text-white mb-4">{"数据库连接"}</h3>
          <div className="rounded-lg bg-neutral-800/50 p-4">
            <p className="text-xs text-neutral-400 font-mono">{"// 未来将连接 Cloudflare D1 数据库"}</p>
            <p className="text-xs text-neutral-400 font-mono mt-1">{"// Status: 待配置"}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSave} className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors">{"保存设置"}</button>
        </div>
      </div>
    </AdminLayout>
  )
}
