export interface Product {
  id: string
  slug: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: string
  subcategory: string
  price: number
  currency: string
  stock: number
  rating: number
  ratingPercent: string
  sold: number
  platform: string
  details: string[]
  dataFormat: string
  tips: string[]
  seoKeywords: string
  // Future: custom SEO fields editable from admin dashboard
  // These will be populated from Cloudflare D1 database
  meta_title?: string
  meta_description?: string
}

export const products: Product[] = [
  {
    id: "1",
    slug: "instagram-2019-accounts",
    title: "Instagram 账号 | 注册于2019年 | 老号",
    titleEn: "Instagram Account | Registered 2019 | Aged",
    description: "账号资料可能为空或仅有少量信息。已启用双重验证。",
    descriptionEn: "Profile may be empty or have minimal info. 2FA enabled.",
    category: "Instagram 账号",
    subcategory: "instagram",
    price: 1.17,
    currency: "USD",
    stock: 22703,
    rating: 4.9,
    ratingPercent: "3.2%",
    sold: 1000,
    platform: "Instagram",
    details: [
      "Instagram账号会自动注册。",
      "这些账户注册于 2019 年。",
      "账户资料可能为空或只有少量条目，例如照片和其他信息。",
      "已启用双因素身份验证。",
      "这些账户是从不同国家的IP地址注册的。",
    ],
    dataFormat: "登录名:密码:邮箱 登录名:邮箱 密码:双因素认证码:备用码（代码1、代码2、代码3、代码4、代码5）",
    tips: [
      "购买不超过 10 个账号并进行检查",
      "任何 Instagram 帐户在登录或使用时都可能需要短信验证",
    ],
    seoKeywords: "Instagram账号购买,ins账号,Instagram老号,2019年Instagram",
  },
  {
    id: "2",
    slug: "facebook-aged-accounts",
    title: "Facebook 账号 | 老号 | 2018年注册",
    titleEn: "Facebook Account | Aged | 2018 Registered",
    description: "高质量老号，资料完善，适合广告投放。",
    descriptionEn: "High quality aged accounts, complete profile, suitable for advertising.",
    category: "Facebook 账号",
    subcategory: "facebook",
    price: 2.50,
    currency: "USD",
    stock: 15420,
    rating: 4.8,
    ratingPercent: "2.8%",
    sold: 800,
    platform: "Facebook",
    details: [
      "Facebook 账号注册于 2018 年。",
      "账户资料已完善，包含头像和基本信息。",
      "已启用双因素身份验证。",
      "适合广告投放和社交营销。",
    ],
    dataFormat: "登录名:密码:邮箱:双因素认证码:备用码",
    tips: [
      "建议使用代理IP登录",
      "首次登录建议不要立即进行大量操作",
    ],
    seoKeywords: "Facebook账号购买,FB账号,Facebook老号,2018年Facebook",
  },
  {
    id: "3",
    slug: "tiktok-accounts-new",
    title: "TikTok 账号 | 全新注册 | 带邮箱",
    titleEn: "TikTok Account | Fresh | With Email",
    description: "全新注册的TikTok账号，带邮箱验证。",
    descriptionEn: "Freshly registered TikTok accounts with email verification.",
    category: "TikTok 账号",
    subcategory: "tiktok",
    price: 0.85,
    currency: "USD",
    stock: 30150,
    rating: 4.7,
    ratingPercent: "4.1%",
    sold: 1500,
    platform: "TikTok",
    details: [
      "全新注册的 TikTok 账号。",
      "已绑定邮箱验证。",
      "账户资料为空，需自行完善。",
      "从不同国家IP注册。",
    ],
    dataFormat: "登录名:密码:邮箱:邮箱密码",
    tips: [
      "建议使用干净IP登录",
      "建议逐步完善资料",
    ],
    seoKeywords: "TikTok账号购买,抖音国际版账号,TikTok新号",
  },
  {
    id: "4",
    slug: "twitter-x-accounts-2020",
    title: "Twitter(X) 账号 | 2020年注册 | 已验证邮箱",
    titleEn: "Twitter(X) Account | 2020 | Email Verified",
    description: "2020年注册的Twitter账号，邮箱已验证，适合社交运营。",
    descriptionEn: "2020 registered Twitter accounts, email verified.",
    category: "Twitter(X) 账号",
    subcategory: "twitter",
    price: 1.50,
    currency: "USD",
    stock: 18900,
    rating: 4.6,
    ratingPercent: "3.5%",
    sold: 600,
    platform: "Twitter",
    details: [
      "Twitter(X) 账号注册于 2020 年。",
      "邮箱已验证。",
      "部分账号可能有少量推文历史。",
      "适合社交媒体运营和推广。",
    ],
    dataFormat: "登录名:密码:邮箱:邮箱密码:认证Token",
    tips: [
      "登录时可能需要邮箱验证",
      "建议使用稳定IP",
    ],
    seoKeywords: "Twitter账号购买,X账号,推特账号,2020年Twitter",
  },
  {
    id: "5",
    slug: "threads-accounts",
    title: "Threads 账号 | 带 Instagram 关联",
    titleEn: "Threads Account | Instagram Linked",
    description: "已关联Instagram的Threads账号，可直接使用。",
    descriptionEn: "Threads accounts linked with Instagram, ready to use.",
    category: "其他平台",
    subcategory: "threads",
    price: 1.80,
    currency: "USD",
    stock: 8500,
    rating: 4.5,
    ratingPercent: "2.5%",
    sold: 300,
    platform: "Threads",
    details: [
      "Threads 账号已关联 Instagram。",
      "可直接登录使用。",
      "资料可能为空。",
    ],
    dataFormat: "Instagram登录名:密码:邮箱",
    tips: [
      "通过Instagram账号登录Threads",
      "建议逐步完善Threads资料",
    ],
    seoKeywords: "Threads账号购买,Meta Threads,Threads新号",
  },
  {
    id: "6",
    slug: "apple-id-us",
    title: "Apple ID | 美区 | 已验证",
    titleEn: "Apple ID | US Region | Verified",
    description: "美国区Apple ID，已完成验证，可直接使用。",
    descriptionEn: "US region Apple ID, verified, ready to use.",
    category: "Apple & Google",
    subcategory: "appleid",
    price: 3.20,
    currency: "USD",
    stock: 5200,
    rating: 4.8,
    ratingPercent: "1.8%",
    sold: 450,
    platform: "Apple",
    details: [
      "美国区 Apple ID。",
      "已完成邮箱验证。",
      "可正常登录 App Store。",
      "建议登录后修改密码和安全问题。",
    ],
    dataFormat: "Apple ID:密码:安全问题答案",
    tips: [
      "登录时可能需要双因素验证",
      "建议不要在主力设备上直接登录iCloud",
    ],
    seoKeywords: "Apple ID购买,美区Apple ID,苹果账号",
  },
  {
    id: "7",
    slug: "gmail-accounts-youtube",
    title: "Gmail 账号 | 已创建 YouTube 频道",
    titleEn: "Gmail Account | YouTube Channel Created",
    description: "Gmail账号已创建YouTube频道，适合视频营销。",
    descriptionEn: "Gmail with YouTube channel created.",
    category: "其他平台",
    subcategory: "gmail",
    price: 5.83,
    currency: "USD",
    stock: 12300,
    rating: 4.9,
    ratingPercent: "1.5%",
    sold: 700,
    platform: "Google",
    details: [
      "Gmail 账号包含一个额外的邮箱（无密码）。",
      "男女不限。",
      "已启用双重验证。",
      "已创建 YouTube 频道。",
      "注册 IP 地址为美国。",
    ],
    dataFormat: "邮箱:密码:辅助邮箱:双因素密钥",
    tips: [
      "建议使用美国IP登录",
      "登录后建议修改辅助邮箱",
    ],
    seoKeywords: "Gmail账号购买,Google账号,YouTube频道账号,谷歌邮箱",
  },
  {
    id: "8",
    slug: "telegram-accounts",
    title: "Telegram 账号 | 带手机号 | 已注册",
    titleEn: "Telegram Account | With Phone | Registered",
    description: "已注册的Telegram账号，绑定手机号码。",
    descriptionEn: "Registered Telegram accounts with phone numbers.",
    category: "Telegram 账号",
    subcategory: "telegram",
    price: 2.00,
    currency: "USD",
    stock: 9800,
    rating: 4.6,
    ratingPercent: "3.0%",
    sold: 520,
    platform: "Telegram",
    details: [
      "已注册的 Telegram 账号。",
      "绑定虚拟手机号码。",
      "可正常登录使用。",
    ],
    dataFormat: "手机号:Session文件",
    tips: [
      "建议使用Telegram桌面版登录",
      "登录后可修改用户名和头像",
    ],
    seoKeywords: "Telegram账号购买,电报账号,TG账号",
  },
  {
    id: "9",
    slug: "discord-aged-accounts",
    title: "Discord 账号 | 2021年注册 | 已验证",
    titleEn: "Discord Account | 2021 | Verified",
    description: "2021年注册的Discord账号，邮箱和手机均已验证。",
    descriptionEn: "2021 Discord accounts, email and phone verified.",
    category: "其他平台",
    subcategory: "discord",
    price: 1.30,
    currency: "USD",
    stock: 14600,
    rating: 4.7,
    ratingPercent: "2.9%",
    sold: 850,
    platform: "Discord",
    details: [
      "Discord 账号注册于 2021 年。",
      "邮箱和手机号已验证。",
      "可正常加入服务器和发送消息。",
    ],
    dataFormat: "登录名:密码:邮箱:Token",
    tips: [
      "建议使用Token登录",
      "登录后可自行修改密码",
    ],
    seoKeywords: "Discord账号购买,DC账号,Discord老号",
  },
  {
    id: "10",
    slug: "linkedin-accounts",
    title: "LinkedIn 账号 | 资料完善 | 500+连接",
    titleEn: "LinkedIn Account | Complete Profile | 500+ Connections",
    description: "资料完善的LinkedIn账号，拥有500+连接。",
    descriptionEn: "Complete LinkedIn profiles with 500+ connections.",
    category: "其他平台",
    subcategory: "linkedin",
    price: 8.50,
    currency: "USD",
    stock: 3200,
    rating: 4.8,
    ratingPercent: "1.2%",
    sold: 200,
    platform: "LinkedIn",
    details: [
      "LinkedIn 账号资料已完善。",
      "拥有 500+ 职业连接。",
      "适合B2B营销和职业推广。",
    ],
    dataFormat: "邮箱:密码:辅助邮箱",
    tips: [
      "建议使用稳定IP登录",
      "不建议短时间内大量添加连接",
    ],
    seoKeywords: "LinkedIn账号购买,领英账号,LinkedIn老号",
  },
  {
    id: "11",
    slug: "snapchat-accounts",
    title: "Snapchat 账号 | 全新注册",
    titleEn: "Snapchat Account | Fresh",
    description: "全新注册的Snapchat账号，可直接使用。",
    descriptionEn: "Freshly registered Snapchat accounts.",
    category: "其他平台",
    subcategory: "snapchat",
    price: 0.95,
    currency: "USD",
    stock: 11000,
    rating: 4.5,
    ratingPercent: "3.8%",
    sold: 430,
    platform: "Snapchat",
    details: [
      "全新注册的 Snapchat 账号。",
      "账户资料为空。",
      "需自行完善。",
    ],
    dataFormat: "用户名:密码:邮箱:邮箱密码",
    tips: [
      "建议使用代理IP",
      "逐步添加好友",
    ],
    seoKeywords: "Snapchat账号购买,Snap账号",
  },
  {
    id: "12",
    slug: "reddit-aged-accounts",
    title: "Reddit 账号 | 高Karma | 2020年注册",
    titleEn: "Reddit Account | High Karma | 2020",
    description: "2020年注册的Reddit账号，具有较高的Karma值。",
    descriptionEn: "2020 Reddit accounts with high Karma.",
    category: "其他产品",
    subcategory: "reddit",
    price: 4.00,
    currency: "USD",
    stock: 6700,
    rating: 4.6,
    ratingPercent: "2.3%",
    sold: 320,
    platform: "Reddit",
    details: [
      "Reddit 账号注册于 2020 年。",
      "Karma 值较高。",
      "适合发帖和参与社区讨论。",
    ],
    dataFormat: "用户名:密码:邮箱",
    tips: [
      "建议逐步参与社区互动",
      "避免短时间内大量发帖",
    ],
    seoKeywords: "Reddit账号购买,Reddit老号,高Karma账号",
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.subcategory === category)
}

export function searchProducts(query: string): Product[] {
  const lower = query.toLowerCase()
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.titleEn.toLowerCase().includes(lower) ||
      p.platform.toLowerCase().includes(lower) ||
      p.seoKeywords.toLowerCase().includes(lower)
  )
}
