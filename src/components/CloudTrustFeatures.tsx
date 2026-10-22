"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  WalletCards,
  Globe2,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  Coins,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function CloudTrustFeatures() {
  const features = [
    {
      id: "ai_compliance",
      badge: "01 / 合规与防风控",
      title: "合规海外 AI 实体中心",
      subtitle: "跨境使用 GPT-6 & Claude 5.5/5.6 终结封号隐患",
      desc: "出海团队绝大多数账号被封均源于公共代理、脏池跳板与异常网络指纹。清迈 AI 中心作为受泰国政府与 BOI 认可的正规海外 AI 研发实体，所有云工位网络流量均由自建机房原生商业专线直发，完全满足 OpenAI (GPT-6 / ChatGPT Enterprise) 与 Anthropic (Claude 5.5 / 5.6) 的严苛风控合规审查，彻底摆脱封号、拒绝付款与平台‘降智’限制。",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      tags: ["GPT-6 / Claude 5.6 合规直连", "绝无跳板连带封号", "原生海外商业网络", "官方生态友好免风控"],
      gradient: "from-emerald-500/10 via-transparent to-transparent",
    },
    {
      id: "flexible_payments",
      badge: "02 / 财务与结算",
      title: "多币种极简灵活结算",
      subtitle: "支持对公对私 · 美金 / USDT / 人民币 / 泰铢",
      desc: "彻底打破传统跨国支付汇兑繁琐与财务做账壁垒。全面支持人民币（微信 / 支付宝 / 国内对公转账）、泰铢（PromptPay 极速扫码 / 泰国本地对公）、美金电汇（USD Wire / ACH）以及主流加密货币（USDT / USDC）。个人开发者与跨国企业均可开具正规商业发票 (Tax Invoice) 与中英双语租赁协议，报销做账合规无忧。",
      icon: <WalletCards className="w-6 h-6 text-blue-500" />,
      tags: ["支持 USDT / USDC 结算", "美金企业对公电汇", "微信 / 支付宝 / 扫码", "提供正规合规税务发票"],
      gradient: "from-blue-500/10 via-transparent to-transparent",
    },
    {
      id: "pure_ip_pool",
      badge: "03 / 稀缺网络资产",
      title: "自主储备数百级静态 IP 池",
      subtitle: "Clean ASN 纯净原生公网 IP · 专人专机专绑",
      desc: "区别于市面上转售或多人复用的廉价 IDC 代理池，清迈 AI 中心直采并自主管理着数百个独享静态公网商业与住宅 IP 资源池。每个分配给客户的 IP 均经深度清洗核验，Fraud Score（欺诈分值）恒为 0，专机专绑。深度护航 TikTok 跨境电商店铺、亚马逊运营、PayPal / Stripe 收款与企业大模型 API 高并发调用。",
      icon: <Globe2 className="w-6 h-6 text-purple-500" />,
      tags: ["自主管理数百静态 IP", "Fraud Score 0 极净信誉", "专人专绑杜绝关联", "原生商业/住宅 ASN"],
      gradient: "from-purple-500/10 via-transparent to-transparent",
    },
    {
      id: "google_verified",
      badge: "04 / 实体与信誉",
      title: "真实独栋线下科技大厦",
      subtitle: "已正式通过 Google 官方商家实名认证",
      desc: "拒绝虚拟空壳与‘跑路小作坊’。我们在泰国清迈核心区域拥有 1600㎡ 独立五层科技大楼，集自建高密算力机房、挑高实体工位、ColaSola 屋顶光伏微电网与中泰驻场工程团队于一体。大楼实体已通过 Google 官方商家（Google Business）实名认证并在 Google 地图收录，真实大楼、真实团队，随时欢迎实地参访考察。",
      icon: <Building2 className="w-6 h-6 text-amber-500" />,
      tags: ["Google 官方商家认证", "1600㎡ 独栋实体大楼", "自建机房真实可验", "支持随时预约实地考察"],
      gradient: "from-amber-500/10 via-transparent to-transparent",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#070709] border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-700 dark:text-neutral-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Core Advantages &amp; Official Trust</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-950 dark:text-white tracking-tight">
            四大核心特色与实体信誉保障
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light mt-2 leading-relaxed">
            从合法合规的 AI 大模型直连环境、数百级原生纯净 IP 储备，到 Google 认证的 1600㎡ 真实独栋大厦，为您的出海业务提供最顶级的确定性与安全底座。
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative p-8 sm:p-10 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between overflow-hidden group shadow-xs hover:shadow-md"
            >
              {/* Subtle Ambient Glow */}
              <div
                className={`absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl ${item.gradient} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-neutral-800 flex items-center justify-center border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-neutral-500">
                    {item.badge}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-medium text-neutral-950 dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-normal text-blue-600 dark:text-blue-400 mt-1 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-8">
                  {item.desc}
                </p>
              </div>

              {/* Tags & Badges */}
              <div className="relative z-10 pt-6 border-t border-neutral-200/60 dark:border-neutral-800/60">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200/70 dark:border-neutral-700/70 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 shadow-2xs"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
