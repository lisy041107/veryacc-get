export const runtime = 'edge'

import DynamicStarryBackground from "@/components/dynamic-starry-background"
import SiteHeader from "@/components/site-header"
import SiteNav from "@/components/site-nav"
import SiteFooter from "@/components/site-footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "隐私政策 - VeryAcc",
  description: "VeryAcc 隐私政策，了解我们如何收集、使用和保护您的个人信息。",
}

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen">
      <DynamicStarryBackground />
      <SiteHeader />
      <SiteNav />
      <main className="relative z-10 py-12 px-4">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">{"Privacy Policy"}</h1>
          <p className="text-sm text-muted-foreground mb-8">{"最后更新日期：2026年2月10日"}</p>

          <div className="space-y-8">
            <Section title="1. 信息收集">
              <p>{"VeryAcc（以下简称"我们"）在您使用我们的服务时，可能会收集以下类型的信息："}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{"您的电子邮箱地址（用于订单通知和售后联系）"}</li>
                <li>{"您的支付信息（由第三方支付处理器安全处理，我们不存储完整的支付信息）"}</li>
                <li>{"您的IP地址和浏览器信息（用于安全防护和反欺诈）"}</li>
                <li>{"订单记录和交易历史"}</li>
              </ul>
            </Section>

            <Section title="2. 信息使用">
              <p>{"我们收集的信息将用于以下目的："}</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>{"处理和完成您的订单"}</li>
                <li>{"提供售后支持和客户服务"}</li>
                <li>{"发送订单状态通知和重要服务更新"}</li>
                <li>{"维护平台安全，防止欺诈行为"}</li>
                <li>{"改善我们的产品和服务质量"}</li>
              </ul>
            </Section>

            <Section title="3. 信息保护">
              <p>{"我们采取行业标准的安全措施来保护您的个人信息，包括但不限于 SSL 加密传输、数据加密存储、访问控制和定期安全审计。我们不会将您的个人信息出售、交换或以其他方式转让给第三方，除非是为了完成您请求的服务（如支付处理）。"}</p>
            </Section>

            <Section title="4. Cookie 使用">
              <p>{"我们的网站使用 Cookie 和类似技术来改善您的浏览体验、分析网站流量和了解用户偏好。您可以通过浏览器设置来管理 Cookie 偏好，但禁用某些 Cookie 可能会影响网站功能的使用。"}</p>
            </Section>

            <Section title="5. 第三方服务">
              <p>{"我们可能会使用第三方服务提供商来协助我们运营平台，包括支付处理、数据分析和客户支持。这些第三方仅在为我们执行这些服务所需的范围内访问您的个人信息，并有义务对其保密。"}</p>
            </Section>

            <Section title="6. 数据保留">
              <p>{"我们将在完成收集目的所需的时间内保留您的个人信息，或根据法律要求的时间保留。订单记录通常保留一年。当不再需要保留您的信息时，我们将安全地删除或匿名化处理。"}</p>
            </Section>

            <Section title="7. 您的权利">
              <p>{"您有权要求访问、更正或删除我们持有的您的个人信息。如需行使这些权利，请通过 Telegram @veryacc 或电子邮件 support@veryacc.com 联系我们。"}</p>
            </Section>

            <Section title="8. 政策更新">
              <p>{"我们可能会不时更新本隐私政策。更新后的政策将在本页面发布，并注明最后更新日期。我们建议您定期查看本页面以了解最新的隐私保护措施。"}</p>
            </Section>

            <div className="rounded-lg border border-border/50 bg-card/30 p-4 mt-8">
              <p className="text-sm text-muted-foreground">
                {"如您对本隐私政策有任何疑问，请联系我们："}
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
