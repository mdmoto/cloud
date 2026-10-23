"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  WalletCards,
  Globe2,
  Building2,
  Check,
} from "lucide-react";

export default function CloudTrustFeatures() {
  const features = [
    {
      id: "ai_compliance",
      badge: "01 / 合规与防风控",
      title: "合规海外 AI 实体中心",
      subtitle: "跨境使用 GPT-6 & Claude 5.5/5.6 终结封号隐患",
      desc: "出海团队绝大多数账号被封均源于公共代理、脏池跳板与异常网络指纹。清迈 AI 中心作为纯正的泰资企业与正规的海外AI研发实体，所有云工位网络流量均由自建机房原生商业专线直发，完全满足 OpenAI (GPT-6 / ChatGPT Enterprise) 与 Anthropic (Claude 5.5 / 5.6) 的严苛风控合规审查，彻底摆脱封号、拒绝付款与平台‘降智’限制。",
      icon: <ShieldCheck className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      tags: ["GPT-6 / Claude 5.6 合规直连", "绝无跳板连带封号", "原生海外商业网络", "官方生态友好免风控"],
    },
    {
      id: "flexible_payments",
      badge: "02 / 财务与结算",
      title: "多币种极简灵活结算",
      subtitle: "支持对公对私 · 美金 / USDT / 人民币 / 泰铢",
      desc: "彻底打破传统跨国支付汇兑繁琐与财务做账壁垒。全面支持人民币（微信 / 支付宝 / 国内对公转账）、泰铢（PromptPay 极速扫码 / 泰国本地对公）、美金电汇（USD Wire / ACH）以及主流加密货币（USDT / USDC）。个人开发者与跨国企业均可开具正规商业发票 (Tax Invoice) 与中英双语租赁协议，报销做账合规无忧。",
      icon: <WalletCards className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      tags: ["支持 USDT / USDC 结算", "美金企业对公电汇", "微信 / 支付宝 / 扫码", "提供正规合规税务发票"],
    },
    {
      id: "pure_ip_pool",
      badge: "03 / 稀缺网络资产",
      title: "自主储备数百级静态 IP 池",
      subtitle: "Clean ASN 纯净原生公网 IP · 专人专机专绑",
      desc: "区别于市面上转售或多人复用的廉价 IDC 代理池，清迈 AI 中心直采并自主管理着数百个独享静态公网商业与住宅 IP 资源池。每个分配给客户的 IP 均经深度清洗核验，Fraud Score（欺诈分值）恒为 0，专机专绑。深度护航 TikTok 跨境电商店铺、亚马逊运营、PayPal / Stripe 收款与企业大模型 API 高并发调用。",
      icon: <Globe2 className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      tags: ["自主管理数百静态 IP", "Fraud Score 0 极净信誉", "专人专绑杜绝关联", "原生商业/住宅 ASN"],
    },
    {
      id: "google_verified",
      badge: "04 / 实体与信誉",
      title: "真实独栋线下科技大厦",
      subtitle: "已正式通过 Google 官方商家实名认证",
      desc: "拒绝虚拟空壳与‘跑路小作坊’。清迈 AI 中心作为纯正泰资合规企业，在泰国清迈主城区3公里核心商圈内拥有 1600㎡ 独立五层科技大楼，集自建高密算力机房、挑高实体工位、ColaSola 屋顶光伏微电网与中泰驻场工程团队于一体。大楼实体已通过 Google 官方商家（Google Business）实名认证并在 Google 地图收录，真实大楼、真实团队，随时欢迎实地参访考察。",
      icon: <Building2 className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
      tags: ["Google 官方商家认证", "1600㎡ 独栋实体大楼", "自建机房真实可验", "支持随时预约实地考察"],
    },
  ];

  return (
    <section className="py-24 bg-[#fafafa] dark:bg-[#070707] border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header (Consistent with Main Site & Workspace) */}
        <div className="max-w-3xl mb-16">
          <span className="text-[11px] font-sans tracking-[0.2em] text-[#86868b] uppercase font-semibold block mb-3">
            Core Advantages &amp; Official Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-[#1d1d1f] dark:text-white tracking-tight">
            四大核心特色与实体信誉保障
          </h2>
          <p className="text-sm sm:text-base text-[#515154] dark:text-[#86868b] font-light mt-2 leading-relaxed">
            从合法合规的 AI 大模型直连环境、数百级原生纯净 IP 储备，到 Google 认证的 1600㎡ 真实独栋大厦，为您的出海业务提供顶级确定性与安全底座。
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-8 sm:p-9 rounded-2xl bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono text-[#86868b] tracking-wider uppercase">
                    {item.badge}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-medium text-[#1d1d1f] dark:text-white tracking-tight">
                    {item.title}
                  </h3>
                  <div className="text-xs sm:text-sm font-normal text-[#515154] dark:text-[#86868b] mt-1 font-mono">
                    {item.subtitle}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#515154] dark:text-[#86868b] font-light leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              {/* Tags & Badges */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800/80">
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60 text-[11px] font-light text-neutral-700 dark:text-neutral-300"
                    >
                      <Check className="w-3 h-3 text-neutral-400 dark:text-neutral-500 shrink-0" />
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
