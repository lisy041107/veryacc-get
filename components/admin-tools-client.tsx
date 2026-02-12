"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Plus, Pencil, Trash2, X } from "lucide-react"
import { toast, Toaster } from "sonner"

interface ToolItem {
  id: string
  title: string
  description: string
  href: string
  sort: number
  status: "available" | "coming"
}

const initialTools: ToolItem[] = [
  { id: "1", title: "IP 代理检测", description: "检测您当前的 IP 地址、位置、ISP 信息，确认代理是否正常工作。", href: "#", sort: 100, status: "available" },
  { id: "2", title: "账号存活检测", description: "检测您的账号是否仍然存活可用，快速验证账号状态。", href: "#", sort: 90, status: "available" },
  { id: "3", title: "2FA(双重)验证器", description: "生成和管理双重身份验证码，保护您的账号安全。支持TOTP标准。", href: "#", sort: 80, status: "available" },
  { id: "4", title: "Cookie/Json格式转化", description: "在Cookie和JSON格式之间进行转换，方便导入导出账号数据。", href: "#", sort: 70, status: "available" },
  { id: "5", title: "HTTP/SOCKS5 代理", description: "高质量的 HTTP/SOCKS5 代理服务，覆盖全球多个国家和地区。", href: "#", sort: 60, status: "coming" },
  { id: "6", title: "账号批量验证", description: "批量验证账号的有效性，快速筛选可用账号。", href: "#", sort: 50, status: "coming" },
]

export default function AdminToolsClient() {
  const [tools, setTools] = useState<ToolItem[]>(initialTools)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", description: "", href: "#", sort: 50, status: "available" as "available" | "coming" })

  const resetForm = () => { setForm({ title: "", description: "", href: "#", sort: 50, status: "available" }); setEditingId(null); setShowForm(false) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) { toast.error("请填写工具名称"); return }
    if (editingId) {
      setTools(prev => prev.map(t => t.id === editingId ? { ...t, ...form } : t))
      toast.success("工具已更新")
    } else {
      setTools(prev => [...prev, { ...form, id: Date.now().toString() }])
      toast.success("工具已添加")
    }
    resetForm()
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{"工具管理"}</h1>
            <p className="text-sm text-neutral-400 mt-1">{"自定义工具的标题、描述、排序和跳转链接"}</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            <Plus className="h-4 w-4" />{"新增工具"}
          </button>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-center text-neutral-400 font-medium px-3 py-3 w-16">{"排序"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"工具名称"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"描述"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"链接"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"状态"}</th>
                  <th className="text-right text-neutral-400 font-medium px-4 py-3">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {tools.sort((a, b) => b.sort - a.sort).map(tool => (
                  <tr key={tool.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                    <td className="px-3 py-3 text-center text-neutral-400">{tool.sort}</td>
                    <td className="px-4 py-3 text-white font-medium">{tool.title}</td>
                    <td className="px-4 py-3 text-neutral-400 max-w-[300px] truncate">{tool.description}</td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">{tool.href}</code>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${tool.status === "available" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                        {tool.status === "available" ? "可用" : "即将上线"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setForm({ title: tool.title, description: tool.description, href: tool.href, sort: tool.sort, status: tool.status }); setEditingId(tool.id); setShowForm(true) }} className="rounded-lg p-1.5 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => { setTools(prev => prev.filter(t => t.id !== tool.id)); toast.success("工具已删除") }} className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetForm} />
            <div className="relative w-full max-w-lg rounded-xl border border-neutral-800 bg-[#111118] shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">
                <h3 className="text-lg font-bold text-white">{editingId ? "编辑工具" : "新增工具"}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"工具名称"}</label>
                  <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="例如：IP 代理检测" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"描述"}</label>
                  <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} placeholder="工具功能描述" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"跳转链接"}</label>
                  <input type="text" value={form.href} onChange={e => setForm(p => ({ ...p, href: e.target.value }))} placeholder="https://..." className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"排序 (越大越靠前)"}</label>
                    <input type="number" value={form.sort} onChange={e => setForm(p => ({ ...p, sort: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"状态"}</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as "available" | "coming" }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="available">{"可用"}</option>
                      <option value="coming">{"即将上线"}</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button type="button" onClick={resetForm} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">{"取消"}</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">{editingId ? "保存修改" : "添加工具"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
