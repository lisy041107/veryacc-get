export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import { AlertTriangle } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "售后政策 - VeryAcc",
  description: "VeryAcc 售后政策，请在购买24小时内检测商品并联系客服售后。",
}

export default function RefundPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">{"售后政策"}</h1>
          <p className="text-sm text-muted-foreground mb-8">{"最后更新日期：2026年2月10日"}</p>

          {/* Important Notice */}
          <div className="rounded-xl border-2 border-destructive/50 bg-destructive/5 p-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 shrink-0">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-destructive mb-2">{"重要提示"}</h2>
                <p className="text-base font-semibold text-foreground leading-relaxed">
                  {"所有商品请在购买的 24 小时内进行检测并联系客服售后。超过 24 小时未提出售后申请的订单，将不再受理任何售后请求。请务必在收到商品后第一时间进行验证。"}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <Section title="1. 售后申请条件">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">{"时间要求："}</span>
                  {"商品购买后 24 小时内提出售后申请。超过此时限将视为商品已验收合格，不再受理售后。"}
                </li>
                <li>
                  <span className="font-semibold text-foreground">{"有效凭证："}</span>
                  {"需提供订单编号、购买邮箱以及问题截图等必要凭证。"}
                </li>
                <li>
                  <span className="font-semibold text-foreground">{"问题范围："}</span>
                  {"仅限商品本身质量问题，如：账号无法登录、密码错误、信息与描述严重不符等。"}
                </li>
              </ul>
            </Section>

            <Section title="2. 不予售后的情况">
              <ul className="list-disc pl-5 space-y-2">
                <li>{"购买超过 24 小时后提出的售后申请"}</li>
                <li>{"用户自行操作不当导致账号被封禁、限制或锁定"}</li>
                <li>{"因用户使用不安全的网络环境（如未使用代理IP）导致的问题"}</li>
                <li>{"因第三方平台（如 Facebook、Instagram 等）政策变更导致的问题"}</li>
                <li>{"用户修改账号密码、绑定信息后出现的问题"}</li>
                <li>{"批量购买的商品中个别账号存在问题（在合理损耗范围内）"}</li>
                <li>{"因用户违反相关平台使用条款导致的封号"}</li>
              </ul>
            </Section>

            <Section title="3. 售后处理方式">
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold text-foreground">{"补发商品："}</span>
                  {"对于确认存在质量问题的商品，我们将优先以补发同类商品的方式处理。"}
                </li>
                <li>
                  <span className="font-semibold text-foreground">{"退款："}</span>
                  {"当无法补发时，可协商退款。退款将原路返回至您的支付账户，处理时间为 1-3 个工作日。"}
                </li>
                <li>
                  <span className="font-semibold text-foreground">{"部分退款："}</span>
                  {"批量订单中如有部分商品存在问题，将按照实际有问题的数量进行退款或补发。"}
                </li>
              </ul>
            </Section>

            <Section title="4. 售后流程">
              <div className="space-y-3">
                <Step num="1" title="发现问题" desc="在购买后 24 小时内对商品进行检测，发现问题立即记录截图等凭证。" />
                <Step num="2" title="联系客服" desc="通过 Telegram @veryacc 联系我们的客服团队，提供订单编号和问题描述。" />
                <Step num="3" title="提交凭证" desc="按客服要求提交必要的凭证材料，如错误截图、订单信息等。" />
                <Step num="4" title="等待处理" desc="客服团队将在收到完整信息后 24 小时内给予处理结果。" />
                <Step num="5" title="完成售后" desc="根据处理结果进行补发或退款，确保您的权益得到保障。" />
              </div>
            </Section>

            <Section title="5. 批量采购售后">
              <p>{"对于批量采购的用户，我们提供更加灵活的售后服务："}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{"批量订单允许合理的损耗率（通常为 3%-5%，具体视商品类型而定）"}</li>
                <li>{"超出合理损耗率的部分将予以补发或退款"}</li>
                <li>{"批量客户可联系专属客户经理获取优先售后服务"}</li>
              </ul>
            </Section>

            <Section title="6. 特别说明">
              <p>{"本平台所售商品均为数字虚拟产品，由于其特殊性质，我们无法对商品进行传统意义上的\"退货\"。所有售后处理均以补发或退款方式进行。我们强烈建议您在购买后立即检测商品，以确保在 24 小时售后窗口期内发现并报告任何问题。"}</p>
            </Section>

            {/* Second emphasis box */}
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-sm font-medium text-foreground leading-relaxed">
                {"再次提醒：所有商品请在购买的 24 小时内进行检测。如有任何问题，请立即通过 Telegram @veryacc 联系我们的客服团队。我们将竭诚为您服务，确保您的购物体验满意。"}
              </p>
            </div>

            <div className="rounded-lg border border-border/50 bg-card/30 p-4 mt-8">
              <p className="text-sm text-muted-foreground">
                {"售后联系方式："}
              </p>
              <p className="text-sm text-foreground mt-1">
                {"Telegram: @veryacc | Email: support@veryacc.com"}
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-foreground mb-3">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  )
}

function Step({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-card/20 p-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
        {num}
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
      </div>
    </div>
  )
}
