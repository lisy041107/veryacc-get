"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Plus, Pencil, Trash2, X, FileText } from "lucide-react"
import { toast, Toaster } from "sonner"

interface Article {
  id: string
  title: string
  slug: string
  category: string
  summary: string
  content: string
  status: "published" | "draft"
  createdAt: string
}

const initialArticles: Article[] = [
  { id: "1", title: "Facebook 账号登录完整教程", slug: "facebook-login-guide", category: "登录教程", summary: "详细介绍如何安全登录购买的 Facebook 账号", content: "# Facebook 账号登录教程\n\n## 准备工作\n1. 准备代理IP\n2. 使用反检测浏览器\n\n## 登录步骤\n...", status: "published", createdAt: "2026-02-08" },
  { id: "2", title: "Instagram 账号登录与养号教程", slug: "instagram-login-guide", category: "登录教程", summary: "从零开始教您如何正确登录 Instagram 账号", content: "# Instagram 登录教程\n\n...", status: "published", createdAt: "2026-02-06" },
  { id: "3", title: "TikTok 账号登录指南", slug: "tiktok-login-guide", category: "登录教程", summary: "使用手机或模拟器登录 TikTok 账号的详细步骤", content: "# TikTok 登录指南\n\n...", status: "published", createdAt: "2026-02-04" },
  { id: "4", title: "如何正确配置代理 IP 登录账号", slug: "proxy-setup-guide", category: "基础教程", summary: "全面的代理 IP 配置教程", content: "# 代理IP配置教程\n\n...", status: "published", createdAt: "2026-01-28" },
]

function titleToSlug(t: string) { return t.toLowerCase().replace(/[\s]+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") }

export default function AdminArticlesClient() {
  const [articles, setArticles] = useState<Article[]>(initialArticles)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ title: "", slug: "", category: "登录教程", summary: "", content: "", status: "draft" as "published" | "draft" })

  const resetForm = () => { setForm({ title: "", slug: "", category: "登录教程", summary: "", content: "", status: "draft" }); setEditingId(null); setShowForm(false) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title) { toast.error("请填写标题"); return }
    if (editingId) {
      setArticles(prev => prev.map(a => a.id === editingId ? { ...a, ...form } : a))
      toast.success("文章已更新")
    } else {
      setArticles(prev => [...prev, { ...form, id: Date.now().toString(), slug: form.slug || titleToSlug(form.title), createdAt: new Date().toISOString().split("T")[0] }])
      toast.success("文章已发布")
    }
    resetForm()
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{"文章管理"}</h1>
            <p className="text-sm text-neutral-400 mt-1">{"编辑和发布文章，同步到前端文章页面"}</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            <Plus className="h-4 w-4" />{"新增文章"}
          </button>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"标题"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"分类"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"状态"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"创建时间"}</th>
                  <th className="text-right text-neutral-400 font-medium px-4 py-3">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {articles.map(article => (
                  <tr key={article.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{article.title}</p>
                      <p className="text-xs text-neutral-500 mt-0.5 truncate max-w-[300px]">{article.summary}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{article.category}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${article.status === "published" ? "bg-green-500/10 text-green-400" : "bg-neutral-700 text-neutral-400"}`}>
                        {article.status === "published" ? "已发布" : "草稿"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-neutral-400">{article.createdAt}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => { setForm({ title: article.title, slug: article.slug, category: article.category, summary: article.summary, content: article.content, status: article.status }); setEditingId(article.id); setShowForm(true) }} className="rounded-lg p-1.5 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => { setArticles(prev => prev.filter(a => a.id !== article.id)); toast.success("文章已删除") }} className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {articles.length === 0 && (
                  <tr><td colSpan={5} className="px-4 py-12 text-center"><FileText className="h-10 w-10 text-neutral-600 mx-auto mb-3" /><p className="text-sm text-neutral-500">{"暂无文章"}</p></td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetForm} />
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-800 bg-[#111118] shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between border-b border-neutral-800 bg-[#111118] px-6 py-4 z-10">
                <h3 className="text-lg font-bold text-white">{editingId ? "编辑文章" : "新增文章"}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"文章标题"}</label>
                  <input type="text" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value, slug: editingId ? p.slug : titleToSlug(e.target.value) }))} placeholder="文章标题" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"分类"}</label>
                    <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="登录教程">{"登录教程"}</option>
                      <option value="基础教程">{"基础教程"}</option>
                      <option value="安全指南">{"安全指南"}</option>
                      <option value="使用技巧">{"使用技巧"}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Slug"}</label>
                    <input type="text" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"状态"}</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as "published" | "draft" }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="published">{"发布"}</option>
                      <option value="draft">{"草稿"}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"摘要"}</label>
                  <textarea value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} rows={2} placeholder="文章摘要..." className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"正文内容（Markdown）"}</label>
                  <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} rows={12} placeholder="# 文章标题\n\n正文内容..." className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono" />
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button type="button" onClick={resetForm} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">{"取消"}</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">{editingId ? "保存修改" : "发布文章"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
