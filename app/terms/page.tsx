export const runtime = 'edge'

import React from "react"
import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "服务条款 - VeryAcc",
  description: "VeryAcc 服务条款，使用我们的服务前请仔细阅读。",
}

export default function TermsPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">服务条款</h1>
          <p className="text-sm text-muted-foreground mb-8">最后更新日期：2026年2月10日</p>

          <div className="space-y-8">
            <Section title="1. 服务概述">
              <p>欢迎使用 VeryAcc（以下简称&quot;本平台&quot;）。本平台是一个数字商品交易平台，提供各类社交媒体账号及相关服务的购买。在使用本平台的任何服务之前，请您仔细阅读并充分理解以下条款。继续使用本平台即表示您同意遵守这些条款。</p>
            </Section>

            <Section title="2. 用户资格">
              <p>使用本平台服务的用户应当具有完全民事行为能力。如果您未满 18 周岁，请在法定监护人的陪同和指导下使用本平台。注册和使用本平台时，您应提供真实、准确的信息。</p>
            </Section>

            <Section title="3. 商品与服务">
              <ul className="list-disc pl-5 space-y-1">
                <li>本平台所售商品均为数字产品，一经售出，非质量问题不予退换</li>
                <li>商品描述中会详细说明产品的参数和注意事项，请在购买前仔细阅读</li>
                <li>商品价格可能根据市场情况进行调整，最终价格以下单时为准</li>
                <li>库存数量为实时显示，可能因多人同时下单而出现短暂偏差</li>
                <li>本平台保留在不通知的情况下调整商品上架或下架的权利</li>
              </ul>
            </Section>

            <Section title="4. 支付与交易">
              <ul className="list-disc pl-5 space-y-1">
                <li>本平台支持多种支付方式，具体以结算页面显示为准</li>
                <li>支付完成后，系统将自动发货至您指定的邮箱</li>
                <li>请确保提供正确的接收邮箱地址，因地址错误导致的损失由用户自行承担</li>
                <li>所有交易均以美元（USD）计价，汇率换算以支付平台实时汇率为准</li>
              </ul>
            </Section>

            <Section title="5. 使用规范">
              <p>用户在使用本平台购买的商品时，应遵守以下规范：</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>不得将购买的账号用于任何违法犯罪活动</li>
                <li>不得利用账号进行垃圾信息发送、网络欺诈或骚扰行为</li>
                <li>不得将账号转售给第三方用于非法目的</li>
                <li>用户应遵守各平台（如 Facebook、Instagram 等）的使用条款和服务协议</li>
                <li>因违规使用导致的任何后果由用户自行承担</li>
              </ul>
            </Section>

            <Section title="6. 知识产权">
              <p>本平台的网站设计、文字内容、图形标志、商标以及其他相关内容均受知识产权法律保护。未经本平台书面许可，任何人不得复制、修改、传播或以其他方式使用本平台的任何内容。</p>
            </Section>

            <Section title="7. 免责声明">
              <p>本平台仅作为数字商品的交易中介，不对用户使用商品后产生的任何后果承担责任。本平台不保证所售账号在所有情况下均能正常使用，因第三方平台政策变更导致的问题不在本平台责任范围内。</p>
            </Section>

            <Section title="8. 条款修改">
              <p>本平台保留随时修改本服务条款的权利。修改后的条款将在本页面发布，继续使用本平台即表示您同意修改后的条款。我们建议您定期查看本页面。</p>
            </Section>

            <div className="rounded-lg border border-border/50 bg-card/30 p-4 mt-8">
              <p className="text-sm text-muted-foreground">
                如对服务条款有疑问，请联系我们：
              </p>
              <p className="text-sm text-foreground mt-1">
                Telegram: @veryacc | Email: support@veryacc.com
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