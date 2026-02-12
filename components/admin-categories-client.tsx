"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Plus, Pencil, Trash2, X, ChevronRight, Upload, Image as ImageIcon } from "lucide-react"
import { toast, Toaster } from "sonner"
import Link from "next/link"

interface SubCategory {
  id: string
  name: string
  slug: string
  sort: number
}

interface Category {
  id: string
  name: string
  slug: string
  logo: string
  sort: number
  status: "show" | "hide"
  productCount: number
  createdAt: string
  subCategories: SubCategory[]
}

const initialCategories: Category[] = [
  { id: "1", name: "Instagram 账号", slug: "instagram-account", logo: "", sort: 60, status: "show", productCount: 3, createdAt: "2026-02-01", subCategories: [
    { id: "1-1", name: "老号", slug: "aged", sort: 1 },
    { id: "1-2", name: "新号", slug: "fresh", sort: 2 },
    { id: "1-3", name: "带粉丝", slug: "followers", sort: 3 },
  ]},
  { id: "2", name: "Facebook 账号", slug: "facebook-account", logo: "", sort: 59, status: "show", productCount: 2, createdAt: "2026-02-01", subCategories: [
    { id: "2-1", name: "老号", slug: "aged", sort: 1 },
    { id: "2-2", name: "新号", slug: "fresh", sort: 2 },
    { id: "2-3", name: "BM 广告户", slug: "bm", sort: 3 },
  ]},
  { id: "3", name: "TikTok 账号", slug: "tiktok-account", logo: "", sort: 58, status: "show", productCount: 1, createdAt: "2026-02-01", subCategories: [
    { id: "3-1", name: "新号", slug: "fresh", sort: 1 },
    { id: "3-2", name: "老号", slug: "aged", sort: 2 },
  ]},
  { id: "4", name: "Twitter(X) 账号", slug: "x-twitter-account", logo: "", sort: 57, status: "show", productCount: 1, createdAt: "2026-02-01", subCategories: [
    { id: "4-1", name: "老号", slug: "aged", sort: 1 },
    { id: "4-2", name: "新号", slug: "fresh", sort: 2 },
  ]},
  { id: "5", name: "Telegram 账号", slug: "telegram-account", logo: "", sort: 56, status: "show", productCount: 1, createdAt: "2026-02-01", subCategories: [
    { id: "5-1", name: "老号", slug: "aged", sort: 1 },
    { id: "5-2", name: "新号", slug: "fresh", sort: 2 },
  ]},
]

function nameToSlug(name: string): string {
  return name.toLowerCase().replace(/[()（）\s]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "")
}

export default function AdminCategoriesClient() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showSubForm, setShowSubForm] = useState(false)
  const [editingSubId, setEditingSubId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", slug: "", logo: "", sort: 60, status: "show" as "show" | "hide" })
  const [subForm, setSubForm] = useState({ name: "", slug: "", sort: 1 })

  const resetForm = () => { setForm({ name: "", slug: "", logo: "", sort: 60, status: "show" }); setEditingId(null); setShowForm(false) }
  const resetSubForm = () => { setSubForm({ name: "", slug: "", sort: 1 }); setEditingSubId(null); setShowSubForm(false) }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.slug) { toast.error("请填写必要字段"); return }
    if (editingId) {
      setCategories(prev => prev.map(c => c.id === editingId ? { ...c, name: form.name, slug: form.slug, logo: form.logo, sort: form.sort, status: form.status } : c))
      toast.success("分类已更新")
    } else {
      setCategories(prev => [...prev, { id: Date.now().toString(), name: form.name, slug: form.slug, logo: form.logo, sort: form.sort, status: form.status, productCount: 0, createdAt: new Date().toISOString().split("T")[0], subCategories: [] }])
      toast.success("分类已添加")
    }
    resetForm()
  }

  const handleSubSubmit = (catId: string) => {
    if (!subForm.name || !subForm.slug) { toast.error("请填写子分类名称"); return }
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c
      if (editingSubId) {
        return { ...c, subCategories: c.subCategories.map(s => s.id === editingSubId ? { ...s, name: subForm.name, slug: subForm.slug, sort: subForm.sort } : s) }
      }
      return { ...c, subCategories: [...c.subCategories, { id: `${catId}-${Date.now()}`, name: subForm.name, slug: subForm.slug, sort: subForm.sort }] }
    }))
    toast.success(editingSubId ? "子分类已更新" : "子分类已添加")
    resetSubForm()
  }

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id))
    toast.success("分类已删除")
  }

  const handleDeleteSub = (catId: string, subId: string) => {
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, subCategories: c.subCategories.filter(s => s.id !== subId) } : c))
    toast.success("子分类已删除")
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{"分类管理"}</h1>
            <p className="text-sm text-neutral-400 mt-1">{"管理商品大分类和子分类，点击分类可展开子分类"}</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
            <Plus className="h-4 w-4" />{"新增分类"}
          </button>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"分类"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"Logo"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"排序"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"关联商品"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"状态"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"SEO路径"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"创建时间"}</th>
                  <th className="text-right text-neutral-400 font-medium px-4 py-3">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {categories.sort((a, b) => b.sort - a.sort).map((cat) => (
                  <>
                    <tr key={cat.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <button onClick={() => setExpandedId(expandedId === cat.id ? null : cat.id)} className="flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors">
                          <ChevronRight className={`h-4 w-4 transition-transform ${expandedId === cat.id ? "rotate-90" : ""}`} />
                          {cat.name}
                          <span className="text-xs text-neutral-500">{"("}{cat.subCategories.length}{"个子分类)"}</span>
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        {cat.logo ? (
                          <img src={cat.logo} alt="" className="h-8 w-8 rounded object-cover" />
                        ) : (
                          <div className="h-8 w-8 rounded bg-neutral-700 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-neutral-500" />
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-center text-white">{cat.sort}</td>
                      <td className="px-4 py-3 text-center">
                        <Link href={`/veryacc/products?category=${cat.slug}`} className="text-blue-400 hover:underline">{cat.productCount}{"条商品"}</Link>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${cat.status === "show" ? "bg-green-500/10 text-green-400" : "bg-neutral-700 text-neutral-400"}`}>
                          {cat.status === "show" ? "展示" : "隐藏"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-neutral-400 bg-neutral-800 px-1.5 py-0.5 rounded">/category/{cat.slug}</code>
                      </td>
                      <td className="px-4 py-3 text-neutral-400">{cat.createdAt}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => { setForm({ name: cat.name, slug: cat.slug, logo: cat.logo, sort: cat.sort, status: cat.status }); setEditingId(cat.id); setShowForm(true) }} className="rounded-lg p-1.5 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => handleDelete(cat.id)} className="rounded-lg p-1.5 text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === cat.id && (
                      <tr key={`${cat.id}-sub`}>
                        <td colSpan={8} className="bg-neutral-900/50 px-4 py-4">
                          <div className="ml-8">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-sm font-medium text-neutral-300">{"子分类列表"}</h4>
                              <button onClick={() => { resetSubForm(); setShowSubForm(true) }} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300">
                                <Plus className="h-3 w-3" />{"添加子分类"}
                              </button>
                            </div>
                            {cat.subCategories.length > 0 ? (
                              <div className="space-y-2">
                                {cat.subCategories.sort((a, b) => a.sort - b.sort).map(sub => (
                                  <div key={sub.id} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-[#111118] px-4 py-2.5">
                                    <div className="flex items-center gap-3">
                                      <span className="text-sm text-white">{sub.name}</span>
                                      <code className="text-xs text-neutral-500 bg-neutral-800 px-1.5 py-0.5 rounded">/category/{cat.slug}/{sub.slug}</code>
                                      <span className="text-xs text-neutral-500">{"排序: "}{sub.sort}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <button onClick={() => { setSubForm({ name: sub.name, slug: sub.slug, sort: sub.sort }); setEditingSubId(sub.id); setShowSubForm(true) }} className="text-neutral-400 hover:text-blue-400 p-1">
                                        <Pencil className="h-3.5 w-3.5" />
                                      </button>
                                      <button onClick={() => handleDeleteSub(cat.id, sub.id)} className="text-neutral-400 hover:text-red-400 p-1">
                                        <Trash2 className="h-3.5 w-3.5" />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-sm text-neutral-500">{"暂无子分类"}</p>
                            )}
                            {showSubForm && (
                              <div className="mt-3 flex items-center gap-3 rounded-lg border border-neutral-700 bg-neutral-800/50 p-3">
                                <input type="text" value={subForm.name} onChange={e => { const v = e.target.value; setSubForm(p => ({ ...p, name: v, slug: editingSubId ? p.slug : nameToSlug(v) })) }} placeholder="子分类名称" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                                <input type="text" value={subForm.slug} onChange={e => setSubForm(p => ({ ...p, slug: e.target.value }))} placeholder="slug" className="w-32 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                                <input type="number" value={subForm.sort} onChange={e => setSubForm(p => ({ ...p, sort: parseInt(e.target.value) || 0 }))} className="w-20 rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-white text-center focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                                <button onClick={() => handleSubSubmit(cat.id)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500">{"保存"}</button>
                                <button onClick={resetSubForm} className="text-neutral-400 hover:text-white"><X className="h-4 w-4" /></button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
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
                <h3 className="text-lg font-bold text-white">{editingId ? "编辑分类" : "新增分类"}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"分类名称"}</label>
                  <input type="text" value={form.name} onChange={e => { const v = e.target.value; setForm(p => ({ ...p, name: v, slug: editingId ? p.slug : nameToSlug(v) })) }} placeholder="例如：Instagram 账号" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"SEO Slug"}</label>
                  <input type="text" value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="instagram-account" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Logo (上传图片URL)"}</label>
                  <div className="flex items-center gap-3">
                    <input type="text" value={form.logo} onChange={e => setForm(p => ({ ...p, logo: e.target.value }))} placeholder="粘贴图片URL或上传" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    <label className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">
                      <Upload className="h-4 w-4" />{"上传"}
                      <input type="file" accept="image/*" className="hidden" onChange={e => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => setForm(p => ({ ...p, logo: reader.result as string }))
                          reader.readAsDataURL(file)
                        }
                      }} />
                    </label>
                  </div>
                  {form.logo && <img src={form.logo} alt="preview" className="mt-2 h-12 w-12 rounded object-cover" />}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"排序 (数值越大越靠前)"}</label>
                    <input type="number" value={form.sort} onChange={e => setForm(p => ({ ...p, sort: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"状态"}</label>
                    <select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as "show" | "hide" }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="show">{"展示"}</option>
                      <option value="hide">{"隐藏"}</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button type="button" onClick={resetForm} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">{"取消"}</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">{editingId ? "保存修改" : "添加分类"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
