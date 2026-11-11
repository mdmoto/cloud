"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShoppingBag,
  Laptop,
  Users,
  Building2,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
  FileCheck2,
  Palette,
  Compass,
} from "lucide-react";

export interface BundlePlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  monthlyPriceCNY: number;
  annualPriceCNY: number;
  originalPriceCNY: number;
  monthlyPriceTHB: number;
  annualPriceTHB: number;
  originalPriceTHB: number;
  setupFeeCNY?: number;
  setupFeeTHB?: number;
  priceNote?: string;
  popular?: boolean;
  devChoice?: boolean;
  features: string[];
  includes: string[];
  actionLabel: string;
}

interface CloudBundlesProps {
  onSelectBundle?: (bundleId: string) => void;
}

export default function CloudBundles({ onSelectBundle }: CloudBundlesProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [currency, setCurrency] = useState<"CNY" | "THB">("CNY");

  const bundles: BundlePlan[] = [
    {
      id: "ai_lazy_bundle",
      name: "海外AI无忧懒人包",
      badge: "MOST POPULAR · 全包爆款",
      tagline: "专为个人与团队出海打造的海外 AI 与研发软硬件全套免运维基座。",
      monthlyPriceCNY: 488,
      annualPriceCNY: 390,
      originalPriceCNY: 688,
      monthlyPriceTHB: 2440,
      annualPriceTHB: 1950,
      originalPriceTHB: 3440,
      setupFeeCNY: 98,
      setupFeeTHB: 490,
      priceNote: "开户费 ¥98 (首月一次性) · 每月立省 ¥200",
      popular: true,
      features: [
        "1× 轻量共享型云电脑 (微主机，预装防关联指纹浏览器与日常值守环境) + VPN",
        "ChatGPT PLUS 或 Claude 会员 2 选 1 (已含每月官方会员订阅权益，专享纯净环境无惧封号降智，开箱即用)",
        "1× 独立海外原生静态商业 IP (100% 独享 Clean ASN, Fraud Score 0)",
        "海外账号专属 KYC 代充服务 (专享合规海外卡与手机号充值，免风控拒付)",
        "中泰 IPLC / 国际专线直达 (<18ms), 全天候稳定挂机防关联与防封禁",
        "开户费 ¥98 含 1 对 1 专属技术支持协助调优、环境部署与客户端配置",
      ],
      includes: ["微主机", "独立商业IP", "VPN", "ChatGPT/Claude账号", "KYC代充"],
      actionLabel: "选定此AI无忧懒人包",
    },
    {
      id: "cloud_workstation_full_pack",
      name: "云工位全服务包",
      badge: "DEV CHOICE · 极客旗舰首选",
      tagline: "1V1 物理独享 Apple Silicon 算力、独立静态 IP、企业 VPN 与官方 AI 顶配会员全功能云工位。",
      monthlyPriceCNY: 888,
      annualPriceCNY: 710,
      originalPriceCNY: 1188,
      monthlyPriceTHB: 4440,
      annualPriceTHB: 3550,
      originalPriceTHB: 5940,
      setupFeeCNY: 198,
      setupFeeTHB: 990,
      priceNote: "开机费 ¥198 (首月一次性) · 每月立省 ¥300",
      devChoice: true,
      features: [
        "1× Mac 专属云工作站 (1V1 物理独享 Apple Silicon M 系列芯片，原生 macOS) + VPN",
        "ChatGPT PLUS 或 Claude 会员 2 选 1 (已含每月官方会员订阅权益，专享纯净环境无惧封号降智，开箱即用)",
        "1× 独立海外原生静态商业 IP (专属绑定 Mac，支持海外开发者后台与 App Store 提审)",
        "海外大模型/开发者账号专属 KYC 代充服务 (专享合规海外卡与手机号充值，免风控拒付)",
        "独占千兆对等带宽与国际专线直连，原生 macOS 物理机直通，开发编译零卡顿",
        "开机费 ¥198 含 1 对 1 专属技术支持环境调优、专属节点初始化与客户端一键直连",
      ],
      includes: ["Mac 1V1 独享", "独立静态IP", "VPN", "ChatGPT/Claude账号", "KYC代充"],
      actionLabel: "选定此云工位全服务包",
    },
    {
      id: "ecommerce_pack",
      name: "泰国电商本土店抗风控开店包",
      badge: "CROSS-BORDER · 跨境电商",
      tagline: "专为 TikTok Shop 泰国本土店、Shopee、Lazada 打造的软硬件全流程抗风控基座。",
      monthlyPriceCNY: 240,
      annualPriceCNY: 190,
      originalPriceCNY: 280,
      monthlyPriceTHB: 1199,
      annualPriceTHB: 959,
      originalPriceTHB: 1398,
      popular: false,
      features: [
        "1× 轻量共享型云电脑 (微主机，预装防关联指纹浏览器与日常值守环境)",
        "1× 独立海外原生静态商业 IP (100% 独享 Clean ASN，Fraud Score 0)",
        "1× 泰国原生真实实体 SIM 卡长期保号 (接收银行、本土电商关键 OTP 验证码)",
        "赠送：泰国本地 PromptPay / 话费小额代充优先秒级处理通道",
        "中泰 IPLC 专线直达 (<18ms)，全天候稳定挂机防关联",
      ],
      includes: ["微主机", "独立商业IP", "实体卡保号", "代充通道"],
      actionLabel: "选定此电商开店包",
    },
    {
      id: "indie_dev_pack",
      name: "跨国独立开发敏捷包 (Indie Dev Pro)",
      badge: "PRO DEV · 极客进阶",
      tagline: "1V1 物理独享 Apple Silicon 算力与全球大模型 API 聚合通道的极简开发工作站。",
      monthlyPriceCNY: 680,
      annualPriceCNY: 540,
      originalPriceCNY: 800,
      monthlyPriceTHB: 3399,
      annualPriceTHB: 2719,
      originalPriceTHB: 3999,
      popular: false,
      features: [
        "1× Mac 专属云工作站 (1V1 物理独享 Apple Silicon M 系列芯片，原生 macOS)",
        "1× 全球大模型 API 聚合网关 (每月含 ฿500 高速额度，支持 GPT-6 & Claude 5.6)",
        "1× 独立海外原生静态商业 IP (专属绑定 Mac，支持海外开发者后台与 App Store 提审)",
        "海外大模型/开发者账号专属代充与KYC服务 (提供合规海外信用卡与手机号绑定)",
        "独占千兆对等带宽，原生 macOS 物理机直通，开发编译零卡顿",
      ],
      includes: ["Mac 1V1 独享", "大模型 API 额度", "独立静态IP", "账号代充/KYC"],
      actionLabel: "选定此独立开发包",
    },
    {
      id: "vision_creator_pack",
      name: "AI 视觉与数字人创作者包",
      badge: "CREATOR · 视觉渲染神器",
      tagline: "为电商模特换装、短视频数字人生成、FLUX.1 与 ComfyUI 打造的专属高性能算力工位。",
      monthlyPriceCNY: 920,
      annualPriceCNY: 735,
      originalPriceCNY: 1160,
      monthlyPriceTHB: 4599,
      annualPriceTHB: 3679,
      originalPriceTHB: 5800,
      popular: false,
      features: [
        "1× NVIDIA RTX 4090 独享 GPU 算力云主机 (24GB 顶级显存，秒级渲染出图)",
        "开箱预装完整 ComfyUI + FLUX.1 + SDXL 常用热门商用 LoRA & ControlNet",
        "1× 独立海外原生静态商业 IP (直连 Civitai、HuggingFace、Midjourney 极速无阻)",
        "1TB NVMe 超高速独立素材盘 + 自动每日镜像快照备份",
        "赠送：每月 ฿500 多模态视觉 API 额度 (支持 Prompt 图像反推与自动化脚本)",
      ],
      includes: ["RTX 4090 独享", "ComfyUI/FLUX.1 预装", "1TB 独立盘", "独立商业IP"],
      actionLabel: "选定此视觉创作包",
    },
    {
      id: "nomad_dual_pack",
      name: "「云地一体」清迈数字游民双栖包",
      badge: "HYBRID · 线上云端 + 线下大楼",
      tagline: "清迈独栋 5 层 AI 中心线下共享工位 (฿1,000/月) + 24h 永续在线云工位特惠打包方案。",
      monthlyPriceCNY: 380,
      annualPriceCNY: 300,
      originalPriceCNY: 480,
      monthlyPriceTHB: 1899,
      annualPriceTHB: 1519,
      originalPriceTHB: 2398,
      popular: false,
      features: [
        "1× 清迈 AI 中心线下 5 层实体大厦共享工位月度通票 (挑高空间、万兆光纤、免费现磨咖啡与会议室权益)",
        "1× 轻量共享型云电脑 (微主机，24h 云端全自动挂机、自动化脚本与防关联沙箱)",
        "1× 独立海外原生静态商业 IP (专属绑定，Fraud Score 0，跨国漫游无感直连)",
        "1× 泰国原生真实实体 SIM 卡长期保号 (接收本地银行网银、PromptPay 与外卖应用 OTP)",
        "线下大厦内网千兆直通云端机房，出门在外随时通过中泰 IPLC 专线安全接入",
      ],
      includes: ["线下大楼共享工位", "24h 云工位", "独立静态IP", "实体卡保号"],
      actionLabel: "选定此云地双栖包",
    },
    {
      id: "enterprise_suite",
      name: "出海企业合规商业落地旗舰包",
      badge: "ENTERPRISE · 实体一站式落地",
      tagline: "泰国 DBD 合规公司设立 + 商业银行对公账户 (享7折特惠) + 大厦商业地址与云工位运维全包。",
      monthlyPriceCNY: 7000,
      annualPriceCNY: 9760,
      originalPriceCNY: 10000,
      monthlyPriceTHB: 35000,
      annualPriceTHB: 48800,
      originalPriceTHB: 50000,
      priceNote: "含 DBD设立与开户7折特惠",
      popular: false,
      features: [
        "泰国商业发展局 (DBD) 全套公司设立合规注册 (原价 ฿30,000，享7折特惠 ฿21,000)",
        "泰国商业银行公司对公账户开设及网银认证 (原价 ฿20,000，享7折特惠 ฿14,000)",
        "泰国商业地址注册资质授权 (清迈 AI 中心独栋五层大厦实体核心商区官方授权，฿1,000/月)",
        "2× 专属独立云电脑工位 + 2× 独立静态原生商业 IP + 2× 泰国实体 SIM 卡长期保号",
        "本地财税代理与合规报税首季托管服务 + 1对1 专属中英泰三语商务顾问",
      ],
      includes: ["DBD公司注册(7折)", "银行开户(7折)", "大厦商业地址", "2×云工位", "财税托管"],
      actionLabel: "咨询定制合规包",
    },
  ];

  const handleSelect = (bundleId: string) => {
    if (onSelectBundle) {
      onSelectBundle(bundleId);
    }
    const calcElement = document.getElementById("calculator");
    if (calcElement) {
      calcElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const currSym = currency === "CNY" ? "¥" : "฿";

  return (
    <section id="bundles" className="py-24 bg-[#fafafa] dark:bg-[#070707] border-b border-neutral-200/80 dark:border-neutral-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-sans tracking-[0.2em] text-[#86868b] uppercase font-semibold">
                Curated Scenario Bundles
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
                新增 ¥488 与 ¥888 明星套餐
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-[#1d1d1f] dark:text-white tracking-tight">
              场景化精选组合订阅包
            </h2>
            <p className="text-sm sm:text-base text-[#515154] dark:text-[#86868b] font-light mt-2 leading-relaxed">
              针对海外 AI 研发、1V1 Mac 专属物理工作站、本土电商开店、视觉创作与出海企业落地量身打造。所有套餐均支持在线签订正规法务采购协议。
            </p>
          </div>

          {/* Toggles: Currency and Billing Cycle */}
          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            {/* Currency */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs">
              <button
                type="button"
                onClick={() => setCurrency("CNY")}
                className={`px-3 py-1 rounded-full transition-all ${
                  currency === "CNY" ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white font-bold shadow-xs" : "text-neutral-500"
                }`}
              >
                ¥ 人民币
              </button>
              <button
                type="button"
                onClick={() => setCurrency("THB")}
                className={`px-3 py-1 rounded-full transition-all ${
                  currency === "THB" ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white font-bold shadow-xs" : "text-neutral-500"
                }`}
              >
                ฿ 泰铢
              </button>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex items-center gap-1 p-1 rounded-full bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                }`}
              >
                按月订阅
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual"
                    ? "bg-white dark:bg-neutral-800 text-neutral-950 dark:text-white shadow-xs font-semibold"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-950"
                }`}
              >
                <span>年付合约</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-medium bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  立省 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bundles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => {
            const isEnterprise = bundle.id === "enterprise_suite";
            const originalPrice = currency === "CNY" ? bundle.originalPriceCNY : bundle.originalPriceTHB;
            const currentPrice = isEnterprise
              ? billingCycle === "monthly"
                ? currency === "CNY" ? bundle.monthlyPriceCNY : bundle.monthlyPriceTHB
                : currency === "CNY" ? bundle.annualPriceCNY : bundle.annualPriceTHB
              : billingCycle === "monthly"
              ? currency === "CNY" ? bundle.monthlyPriceCNY : bundle.monthlyPriceTHB
              : currency === "CNY" ? bundle.annualPriceCNY : bundle.annualPriceTHB;
            const savings = originalPrice - currentPrice;

            const isTopRecommended = bundle.popular;
            const isDevChoice = bundle.devChoice;

            return (
              <div
                key={bundle.id}
                className={`relative p-7 rounded-2xl flex flex-col justify-between transition-all ${
                  isTopRecommended
                    ? "bg-white dark:bg-neutral-900/70 border-2 border-emerald-500 shadow-lg scale-[1.01]"
                    : isDevChoice
                    ? "bg-white dark:bg-neutral-900/70 border-2 border-blue-600 shadow-lg scale-[1.01]"
                    : "bg-white dark:bg-neutral-900/40 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 shadow-xs hover:shadow-md"
                }`}
              >
                {isTopRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    RECOMMENDED · 全包爆款
                  </div>
                )}
                {isDevChoice && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-mono font-bold tracking-wider uppercase shadow-xs">
                    DEV CHOICE · 极客旗舰首选
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                      {bundle.badge}
                    </span>
                    <h3 className="text-xl font-bold text-[#1d1d1f] dark:text-white leading-snug">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-[#515154] dark:text-[#86868b] font-normal mt-2 leading-relaxed min-h-[36px]">
                      {bundle.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-4 border-t border-b border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        {currSym}{originalPrice.toLocaleString()}
                      </span>
                      <span className="text-3xl font-black text-neutral-950 dark:text-white tracking-tight">
                        {currSym}{currentPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">
                        {isEnterprise ? (billingCycle === "annual" ? " / 年全包" : " 起 (7折设立)") : " / 月"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1.5">
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        比原价立省 {currSym}{savings.toLocaleString()}/月
                      </span>
                      {bundle.priceNote && (
                        <span className="text-[10px] font-mono px-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                          {bundle.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Included tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {bundle.includes.map((inc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 text-[10px] font-mono text-neutral-700 dark:text-neutral-300"
                      >
                        +{inc}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    {bundle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#515154] dark:text-[#86868b] leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dual Action Buttons: Contract & Calculator */}
                <div className="flex flex-col gap-2 pt-2">
                  <Link
                    href={`/contract?plan=${bundle.id}`}
                    className={`w-full py-3 rounded-full text-center text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isTopRecommended
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
                        : isDevChoice
                        ? "bg-blue-600 hover:bg-blue-500 text-white shadow-sm"
                        : "bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 shadow-sm"
                    }`}
                  >
                    <span>{bundle.actionLabel} (在线签约)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleSelect(bundle.id)}
                    className="w-full py-1.5 text-center text-[11px] text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
                  >
                    自定义参数测算
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
