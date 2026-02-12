export default function DisclaimerSection() {
  return (
    <section className="relative z-10 py-6 px-4">
      <div className="mx-auto max-w-6xl rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm px-8 py-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-foreground mb-2">{"免责声明"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"本平台所售商品均为合法渠道获取，用户需遵守适用法律法规及平台条款。因个人使用不当或违规行为引起的后果需自行承担，VeryAcc 不对因违反相关平台规则导致的账号封禁或限制承担责任。购买即表示您已阅读并同意以上条款。"}
            </p>
          </div>
          <div className="border-t border-border/30 pt-4">
            <h3 className="text-sm font-bold text-foreground mb-2">{"服务承诺"}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {"所有商品请在购买后 24 小时内检测，如有问题请立即联系客服处理。我们提供 Telegram 全天候客服支持，承诺收到反馈后尽快响应并解决问题。批量采购用户可享受专属一对一服务。"}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
