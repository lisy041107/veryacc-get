"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin-layout"
import { Plus, Pencil, X, Upload, Image as ImageIcon, Database, ChevronDown, Trash2 } from "lucide-react"
import { toast, Toaster } from "sonner"

interface CardKey {
  id: string
  content: string
  status: "pending" | "sold"
  createdAt: string
  orderId?: string
}

interface AdminProduct {
  id: string
  title: string
  slug: string
  price: number
  categoryId: string
  categoryName: string
  subCategoryName: string
  logo: string
  sort: number
  meta_title: string
  meta_description: string
  descriptionLines: string[]
  importantNotes: string[]
  dataFormat: string[]
  notices: string[]
  cardKeys: CardKey[]
}

const categoryOptions = [
  { id: "1", name: "Instagram 账号", subCategories: ["老号", "新号", "带粉丝"] },
  { id: "2", name: "Facebook 账号", subCategories: ["老号", "新号", "BM"] },
  { id: "3", name: "TikTok 账号", subCategories: ["新号", "老号"] },
  { id: "4", name: "Twitter(X) 账号", subCategories: ["老号", "新号"] },
  { id: "5", name: "Telegram 账号", subCategories: ["老号", "新号"] },
  { id: "6", name: "其他平台", subCategories: ["Discord", "LinkedIn", "WhatsApp", "Reddit", "Apple ID", "Google", "Gmail", "Outlook"] },
]

const initialProducts: AdminProduct[] = [
  { id: "1", title: "Instagram 账号 | 注册于2019年 | 老号", slug: "instagram-2019-accounts", price: 1.17, categoryId: "1", categoryName: "Instagram 账号", subCategoryName: "老号", logo: "", sort: 100, meta_title: "", meta_description: "",
    descriptionLines: ["账号资料可能为空或仅有少量信息", "已启用双重验证", "包含邮箱和密码"],
    importantNotes: ["购买后24小时内检测", "请勿频繁切换IP登录"],
    dataFormat: ["邮箱----密码----2FA密钥"],
    notices: ["请使用代理IP登录", "首次登录请勿修改资料"],
    cardKeys: [
      { id: "ck1", content: "user1:pass1:email1@gmail.com:2fa_code1", status: "pending", createdAt: "2026-02-01 10:00" },
      { id: "ck2", content: "user2:pass2:email2@gmail.com:2fa_code2", status: "pending", createdAt: "2026-02-01 10:01" },
      { id: "ck3", content: "user3:pass3:email3@gmail.com:2fa_code3", status: "sold", createdAt: "2026-02-01 10:02", orderId: "ORD001" },
    ]},
  { id: "2", title: "Facebook 账号 | 老号 | 2018年注册", slug: "facebook-aged-accounts", price: 2.50, categoryId: "2", categoryName: "Facebook 账号", subCategoryName: "老号", logo: "", sort: 90, meta_title: "", meta_description: "", descriptionLines: ["高质量老号，资料完善"], importantNotes: ["适合广告投放"], dataFormat: ["邮箱----密码"], notices: ["请使用干净IP登录"], cardKeys: [] },
  { id: "3", title: "TikTok 账号 | 全新注册 | 带邮箱", slug: "tiktok-accounts-new", price: 0.85, categoryId: "3", categoryName: "TikTok 账号", subCategoryName: "新号", logo: "", sort: 80, meta_title: "", meta_description: "", descriptionLines: ["全新注册的TikTok账号", "带邮箱验证"], importantNotes: ["请在手机上登录"], dataFormat: ["邮箱----密码"], notices: ["建议使用4G网络"], cardKeys: [] },
  { id: "4", title: "Twitter(X) 账号 | 2020年注册", slug: "twitter-x-accounts-2020", price: 1.50, categoryId: "4", categoryName: "Twitter(X) 账号", subCategoryName: "老号", logo: "", sort: 70, meta_title: "", meta_description: "", descriptionLines: ["2020年注册的Twitter账号", "邮箱已验证"], importantNotes: ["请勿立即发推"], dataFormat: ["邮箱----密码----Token"], notices: ["使用代理IP登录"], cardKeys: [] },
]

function titleToSlug(t: string) { return t.toLowerCase().replace(/[()（）|]/g, "").replace(/[\s]+/g, "-").replace(/[^a-z0-9\u4e00-\u9fa5-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "") }

export default function AdminProductsClient() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState("")
  const [showCardKeys, setShowCardKeys] = useState<string | null>(null)
  const [newCardKeysText, setNewCardKeysText] = useState("")
  const [slugManual, setSlugManual] = useState(false)
  const [form, setForm] = useState({ title: "", slug: "", price: 0, categoryId: "", categoryName: "", subCategoryName: "", logo: "", sort: 50, meta_title: "", meta_description: "", descriptionLines: [""] as string[], importantNotes: [""] as string[], dataFormat: [""] as string[], notices: [""] as string[] })

  const resetForm = () => { setForm({ title: "", slug: "", price: 0, categoryId: "", categoryName: "", subCategoryName: "", logo: "", sort: 50, meta_title: "", meta_description: "", descriptionLines: [""], importantNotes: [""], dataFormat: [""], notices: [""] }); setEditingId(null); setSlugManual(false); setShowForm(false) }

  const filtered = filterCat ? products.filter(p => p.categoryId === filterCat) : products

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.slug) { toast.error("请填写必要字段"); return }
    const cleanForm = { ...form, descriptionLines: form.descriptionLines.filter(Boolean), importantNotes: form.importantNotes.filter(Boolean), dataFormat: form.dataFormat.filter(Boolean), notices: form.notices.filter(Boolean) }
    if (editingId) {
      setProducts(prev => prev.map(p => p.id === editingId ? { ...p, ...cleanForm, cardKeys: p.cardKeys } : p))
      toast.success("商品已更新")
    } else {
      setProducts(prev => [...prev, { ...cleanForm, id: Date.now().toString(), cardKeys: [] }])
      toast.success("商品已添加")
    }
    resetForm()
  }

  const handleEdit = (p: AdminProduct) => {
    setForm({ title: p.title, slug: p.slug, price: p.price, categoryId: p.categoryId, categoryName: p.categoryName, subCategoryName: p.subCategoryName, logo: p.logo, sort: p.sort, meta_title: p.meta_title, meta_description: p.meta_description, descriptionLines: p.descriptionLines.length > 0 ? [...p.descriptionLines] : [""], importantNotes: p.importantNotes.length > 0 ? [...p.importantNotes] : [""], dataFormat: p.dataFormat.length > 0 ? [...p.dataFormat] : [""], notices: p.notices.length > 0 ? [...p.notices] : [""] })
    setEditingId(p.id); setSlugManual(true); setShowForm(true)
  }

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id))
    toast.success("商品已删除")
  }

  const handleImportCardKeys = (productId: string) => {
    if (!newCardKeysText.trim()) return
    const lines = newCardKeysText.trim().split("\n").filter(Boolean)
    const newKeys: CardKey[] = lines.map((line, i) => ({
      id: `${productId}-${Date.now()}-${i}`,
      content: line.trim(),
      status: "pending" as const,
      createdAt: new Date().toLocaleString("zh-CN"),
    }))
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, cardKeys: [...p.cardKeys, ...newKeys] } : p))
    setNewCardKeysText("")
    toast.success(`已导入 ${lines.length} 条卡密`)
  }

  const handleDeleteCardKey = (productId: string, keyId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, cardKeys: p.cardKeys.filter(k => k.id !== keyId) } : p))
    toast.success("卡密已删除")
  }

  return (
    <AdminLayout>
      <Toaster position="top-center" theme="dark" />
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-white">{"商品管理"}</h1>
            <p className="text-sm text-neutral-400 mt-1">{"管理所有商品，点击「卡密」管理该商品的卡密库"}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="appearance-none rounded-lg border border-neutral-700 bg-neutral-800/50 pl-3 pr-8 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                <option value="">{"全部分类"}</option>
                {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500 pointer-events-none" />
            </div>
            <button onClick={() => { resetForm(); setShowForm(true) }} className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">
              <Plus className="h-4 w-4" />{"新增商品"}
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-[#111118] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"商品"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"分类"}</th>
                  <th className="text-left text-neutral-400 font-medium px-4 py-3">{"价格"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"库存(待售)"}</th>
                  <th className="text-center text-neutral-400 font-medium px-4 py-3">{"排序"}</th>
                  <th className="text-right text-neutral-400 font-medium px-4 py-3">{"操作"}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.sort((a, b) => b.sort - a.sort).map(product => {
                  const pendingKeys = product.cardKeys.filter(k => k.status === "pending").length
                  return (
                    <tr key={product.id} className="border-b border-neutral-800/50 hover:bg-neutral-800/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {product.logo ? (
                            <img src={product.logo} alt="" className="h-9 w-9 rounded object-cover shrink-0" />
                          ) : (
                            <div className="h-9 w-9 rounded bg-neutral-700 flex items-center justify-center shrink-0">
                              <ImageIcon className="h-4 w-4 text-neutral-500" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-white font-medium truncate max-w-[300px]">{product.title}</p>
                            <code className="text-xs text-neutral-500">{product.slug}</code>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-neutral-300">{product.categoryName}</span>
                        {product.subCategoryName && <span className="text-neutral-500 text-xs ml-1">{" / "}{product.subCategoryName}</span>}
                      </td>
                      <td className="px-4 py-3 text-white">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-sm ${pendingKeys > 0 ? "text-green-400" : "text-red-400"}`}>{pendingKeys}</span>
                      </td>
                      <td className="px-4 py-3 text-center text-neutral-400">{product.sort}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => handleEdit(product)} className="rounded-lg p-1.5 text-neutral-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors" title="编辑">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button onClick={() => setShowCardKeys(showCardKeys === product.id ? null : product.id)} className="rounded-lg p-1.5 text-neutral-400 hover:text-amber-400 hover:bg-amber-500/10 transition-colors" title="卡密管理">
                            <Database className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-4 py-12 text-center text-neutral-500">{"暂无商品数据"}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showCardKeys && (() => {
          const product = products.find(p => p.id === showCardKeys)
          if (!product) return null
          const pendingKeys = product.cardKeys.filter(k => k.status === "pending")
          const soldKeys = product.cardKeys.filter(k => k.status === "sold")
          return (
            <div className="rounded-xl border border-amber-500/20 bg-[#111118] overflow-hidden">
              <div className="border-b border-neutral-800 px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">{"卡密管理: "}{product.title}</h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{"待售 "}{pendingKeys.length}{" 条 | 已售 "}{soldKeys.length}{" 条"}</p>
                </div>
                <button onClick={() => setShowCardKeys(null)} className="text-neutral-400 hover:text-white"><X className="h-4 w-4" /></button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"批量导入卡密（每行一条）"}</label>
                  <textarea value={newCardKeysText} onChange={e => setNewCardKeysText(e.target.value)} rows={4} placeholder={"user1:pass1:email1@gmail.com:2fa_code\nuser2:pass2:email2@gmail.com:2fa_code"} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none font-mono" />
                  <button onClick={() => handleImportCardKeys(product.id)} className="mt-2 flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-500 transition-colors">
                    <Upload className="h-4 w-4" />{"导入卡密"}
                  </button>
                </div>
                {pendingKeys.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 mb-2">{"待售卡密 ("}{pendingKeys.length}{")"}</h4>
                    <div className="max-h-48 overflow-y-auto space-y-1">
                      {pendingKeys.map(k => (
                        <div key={k.id} className="flex items-center justify-between rounded-lg bg-neutral-800/50 px-3 py-2">
                          <code className="text-xs text-green-300 font-mono truncate max-w-[80%]">{k.content}</code>
                          <button onClick={() => handleDeleteCardKey(product.id, k.id)} className="text-neutral-500 hover:text-red-400 shrink-0"><Trash2 className="h-3 w-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {soldKeys.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-neutral-400 mb-2">{"已售卡密 ("}{soldKeys.length}{")"}</h4>
                    <div className="max-h-32 overflow-y-auto space-y-1">
                      {soldKeys.map(k => (
                        <div key={k.id} className="flex items-center justify-between rounded-lg bg-neutral-800/30 px-3 py-2 opacity-60">
                          <code className="text-xs text-neutral-400 font-mono truncate max-w-[70%]">{k.content}</code>
                          <span className="text-xs text-neutral-500">{"订单: "}{k.orderId}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )
        })()}

        {showForm && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={resetForm} />
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-800 bg-[#111118] shadow-2xl">
              <div className="sticky top-0 flex items-center justify-between border-b border-neutral-800 bg-[#111118] px-6 py-4 z-10">
                <h3 className="text-lg font-bold text-white">{editingId ? "编辑商品" : "新增商品"}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-white"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"标题"}</label>
                  <input type="text" value={form.title} onChange={e => { const v = e.target.value; setForm(p => ({ ...p, title: v, slug: slugManual ? p.slug : titleToSlug(v) })) }} placeholder="例如：Instagram 账号 | 注册于2019年 | 老号" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"URL Slug"}<span className="text-neutral-500 font-normal ml-2">{"(自动生成，可手动编辑)"}</span></label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-500 shrink-0">{"veryacc.com/products/"}</span>
                    <input type="text" value={form.slug} onChange={e => { setSlugManual(true); setForm(p => ({ ...p, slug: e.target.value })) }} className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"价格 (USD)"}</label>
                    <input type="number" step="0.01" value={form.price || ""} onChange={e => setForm(p => ({ ...p, price: parseFloat(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"排序 (越大越靠前)"}</label>
                    <input type="number" value={form.sort} onChange={e => setForm(p => ({ ...p, sort: parseInt(e.target.value) || 0 }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"所属分类"}</label>
                    <select value={form.categoryId} onChange={e => { const opt = categoryOptions.find(c => c.id === e.target.value); setForm(p => ({ ...p, categoryId: e.target.value, categoryName: opt?.name || "", subCategoryName: "" })) }} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                      <option value="">{"选择分类"}</option>
                      {categoryOptions.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"子分类"}</label>
                  <select value={form.subCategoryName} onChange={e => setForm(p => ({ ...p, subCategoryName: e.target.value }))} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                    <option value="">{"选择子分类"}</option>
                    {(categoryOptions.find(c => c.id === form.categoryId)?.subCategories || []).map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"商品 Logo"}</label>
                  <div className="flex items-center gap-3">
                    <input type="text" value={form.logo} onChange={e => setForm(p => ({ ...p, logo: e.target.value }))} placeholder="留空则使用分类Logo" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    <label className="cursor-pointer flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2.5 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">
                      <Upload className="h-4 w-4" />{"上传"}
                      <input type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) { const r = new FileReader(); r.onloadend = () => setForm(p => ({ ...p, logo: r.result as string })); r.readAsDataURL(f) } }} />
                    </label>
                  </div>
                  {form.logo && <img src={form.logo} alt="preview" className="mt-2 h-10 w-10 rounded object-cover" />}
                  <p className="text-xs text-neutral-500 mt-1">{"留空则默认使用所属分类的Logo"}</p>
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <h4 className="text-sm font-semibold text-white mb-4">{"SEO 设置"}</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Meta Title"}</label>
                      <input type="text" value={form.meta_title} onChange={e => setForm(p => ({ ...p, meta_title: e.target.value }))} placeholder="留空则自动生成" className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-300 mb-1.5">{"Meta Description"}</label>
                      <textarea value={form.meta_description} onChange={e => setForm(p => ({ ...p, meta_description: e.target.value }))} placeholder="留空则自动生成" rows={2} className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none" />
                    </div>
                  </div>
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <h4 className="text-sm font-semibold text-white mb-3">{"商品描述"}</h4>
                  <p className="text-xs text-neutral-500 mb-3">{"每行一条描述，点击「添加行」增加新内容"}</p>
                  <div className="space-y-2">
                    {form.descriptionLines.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-500 w-5 text-right shrink-0">{i+1}.</span>
                        <input type="text" value={line} onChange={e => { const arr = [...form.descriptionLines]; arr[i] = e.target.value; setForm(p => ({ ...p, descriptionLines: arr })) }} placeholder={`描述第 ${i+1} 行`} className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                        {form.descriptionLines.length > 1 && <button type="button" onClick={() => { const arr = form.descriptionLines.filter((_,j) => j !== i); setForm(p => ({ ...p, descriptionLines: arr })) }} className="text-neutral-500 hover:text-red-400 shrink-0"><X className="h-3.5 w-3.5" /></button>}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setForm(p => ({ ...p, descriptionLines: [...p.descriptionLines, ""] }))} className="mt-2 text-xs text-blue-400 hover:text-blue-300">{"+  添加行"}</button>
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <h4 className="text-sm font-semibold text-white mb-3">{"重要提醒"}</h4>
                  <div className="space-y-2">
                    {form.importantNotes.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-amber-500 w-5 text-right shrink-0">{"!"}</span>
                        <input type="text" value={line} onChange={e => { const arr = [...form.importantNotes]; arr[i] = e.target.value; setForm(p => ({ ...p, importantNotes: arr })) }} placeholder="重要提醒内容" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                        {form.importantNotes.length > 1 && <button type="button" onClick={() => { const arr = form.importantNotes.filter((_,j) => j !== i); setForm(p => ({ ...p, importantNotes: arr })) }} className="text-neutral-500 hover:text-red-400 shrink-0"><X className="h-3.5 w-3.5" /></button>}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setForm(p => ({ ...p, importantNotes: [...p.importantNotes, ""] }))} className="mt-2 text-xs text-blue-400 hover:text-blue-300">{"+  添加行"}</button>
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <h4 className="text-sm font-semibold text-white mb-3">{"账号数据格式"}</h4>
                  <div className="space-y-2">
                    {form.dataFormat.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-green-500 w-5 text-right shrink-0">{"#"}</span>
                        <input type="text" value={line} onChange={e => { const arr = [...form.dataFormat]; arr[i] = e.target.value; setForm(p => ({ ...p, dataFormat: arr })) }} placeholder="例如: 邮箱----密码----2FA密钥" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 font-mono" />
                        {form.dataFormat.length > 1 && <button type="button" onClick={() => { const arr = form.dataFormat.filter((_,j) => j !== i); setForm(p => ({ ...p, dataFormat: arr })) }} className="text-neutral-500 hover:text-red-400 shrink-0"><X className="h-3.5 w-3.5" /></button>}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setForm(p => ({ ...p, dataFormat: [...p.dataFormat, ""] }))} className="mt-2 text-xs text-blue-400 hover:text-blue-300">{"+  添加行"}</button>
                </div>
                <div className="border-t border-neutral-800 pt-5">
                  <h4 className="text-sm font-semibold text-white mb-3">{"注意事项"}</h4>
                  <div className="space-y-2">
                    {form.notices.map((line, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="text-xs text-neutral-400 w-5 text-right shrink-0">{i+1}.</span>
                        <input type="text" value={line} onChange={e => { const arr = [...form.notices]; arr[i] = e.target.value; setForm(p => ({ ...p, notices: arr })) }} placeholder="注意事项内容" className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800/50 px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50" />
                        {form.notices.length > 1 && <button type="button" onClick={() => { const arr = form.notices.filter((_,j) => j !== i); setForm(p => ({ ...p, notices: arr })) }} className="text-neutral-500 hover:text-red-400 shrink-0"><X className="h-3.5 w-3.5" /></button>}
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => setForm(p => ({ ...p, notices: [...p.notices, ""] }))} className="mt-2 text-xs text-blue-400 hover:text-blue-300">{"+  添加行"}</button>
                </div>
                {editingId && (
                  <div className="border-t border-neutral-800 pt-5">
                    <button type="button" onClick={() => { handleDeleteProduct(editingId); resetForm() }} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />{"删除此商品"}
                    </button>
                  </div>
                )}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
                  <button type="button" onClick={resetForm} className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors">{"取消"}</button>
                  <button type="submit" className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors">{editingId ? "保存修改" : "添加商品"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
