"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle, ShoppingCart, CreditCard } from "lucide-react"
import type { Product } from "@/lib/products"

interface PurchaseModalProps {
  product: Product
  open: boolean
  onClose: () => void
}

const paymentMethods = [
  { id: "usdt_trc20", name: "USDT (TRC20)", description: "加密货币支付", icon: "U" },
  { id: "usdt_erc20", name: "USDT (ERC20)", description: "加密货币支付", icon: "U" },
  { id: "btc", name: "Bitcoin (BTC)", description: "加密货币支付", icon: "B" },
  { id: "alipay", name: "支付宝", description: "国内支付", icon: "A" },
  { id: "wechat", name: "微信支付", description: "国内支付", icon: "W" },
]

export default function PurchaseModal({ product, open, onClose }: PurchaseModalProps) {
  const [step, setStep] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const [email, setEmail] = useState("")
  const [queryPassword, setQueryPassword] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [coupon, setCoupon] = useState("")

  const totalPrice = (product.price * quantity).toFixed(2)

  useEffect(() => {
    if (open) {
      setStep(1)
      setQuantity(1)
      setEmail("")
      setQueryPassword("")
      setSelectedPayment("")
      setCoupon("")
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold text-foreground">{"购买商品"}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          {/* Product Title */}
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            {product.title}
          </p>

          {/* Step Indicator */}
          <div className="flex items-center mb-6">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-l-lg text-sm font-medium ${
              step >= 1 ? "bg-green-600/20 text-green-400 border border-green-600/30" : "bg-secondary text-muted-foreground border border-border"
            }`}>
              {step > 1 ? <CheckCircle className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full bg-green-400/30 flex items-center justify-center text-xs">{"1"}</span>}
              {"下单信息"}
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-r-lg text-sm font-medium ${
              step >= 2 ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary text-muted-foreground border border-border"
            }`}>
              {step >= 2 ? <CreditCard className="h-4 w-4" /> : <span className="h-4 w-4 rounded-full bg-muted-foreground/30 flex items-center justify-center text-xs">{"2"}</span>}
              {"支付方式"}
            </div>
          </div>

          {/* Step 1: Order Info */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{"下单邮箱"}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-1">{"订单信息和商品将发送至此邮箱"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">{"查询密码"}</label>
                <input
                  type="password"
                  value={queryPassword}
                  onChange={(e) => setQueryPassword(e.target.value)}
                  placeholder="设置查询密码"
                  className="w-full rounded-lg border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                />
                <p className="text-xs text-muted-foreground mt-1">{"用于查询订单状态，请牢记此密码"}</p>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{"数量"}</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min={1}
                  max={product.stock}
                  className="w-24 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              {/* Price Preview */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <span className="text-sm text-muted-foreground">{"合计金额"}</span>
                <span className="text-xl font-bold text-green-400">
                  {"$"}{totalPrice}
                </span>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!email || !queryPassword}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"下一步"}
              </button>
            </div>
          )}

          {/* Step 2: Payment Method */}
          {step === 2 && (
            <div className="space-y-5">
              {/* Order Summary */}
              <div className="rounded-lg border border-border/50 bg-secondary/30 p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"下单邮箱"}</span>
                  <span className="text-foreground">{email}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"商品数量"}</span>
                  <span className="text-foreground">{quantity}{" 件"}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{"单价"}</span>
                  <span className="text-foreground">{"$"}{product.price.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm pt-2 border-t border-border/50">
                  <span className="font-medium text-foreground">{"合计"}</span>
                  <span className="text-lg font-bold text-green-400">{"$"}{totalPrice}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">{"选择支付方式"}</label>
                <div className="space-y-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`flex items-center gap-3 w-full rounded-lg border p-3 text-left transition-colors ${
                        selectedPayment === method.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/30 hover:bg-secondary/30"
                      }`}
                    >
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold ${
                        selectedPayment === method.id
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}>
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{method.name}</p>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                      {selectedPayment === method.id && (
                        <CheckCircle className="h-5 w-5 text-primary ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupon */}
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">{"优惠券（如有）"}</label>
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="输入优惠码"
                  className="w-48 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Terms */}
              <div className="space-y-2 pt-2 border-t border-border">
                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="rounded border-border"
                  />
                  {"我同意服务条款和使用协议"}
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-lg border border-border px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary/50 transition-colors"
                >
                  {"上一步"}
                </button>
                <button
                  disabled={!selectedPayment || !agreeTerms}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {"立即支付"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
