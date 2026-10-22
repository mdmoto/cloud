"use client";

import React, { useState } from "react";
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
  Palette,
  Compass,
} from "lucide-react";

export interface BundlePlan {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  originalPrice: number;
  currency: string;
  popular?: boolean;
  features: string[];
  includes: string[];
  actionLabel: string;
}

interface CloudBundlesProps {
  onSelectBundle?: (bundleId: string) => void;
}

export default function CloudBundles({ onSelectBundle }: CloudBundlesProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const bundles: BundlePlan[] = [
    {
      id: "ecommerce_pack",
      name: "泰国电商本土店抗风控开店包",
      badge: "MOST POPULAR · 跨境爆款",
      tagline: "专为 TikTok Shop 泰国本土店、Shopee、Lazada 打造的软硬件全流程抗风控基座。",
      monthlyPrice: 1199,
      annualPrice: 959,
      originalPrice: 1398,
      currency: "฿",
      popular: true,
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
      badge: "DEV CHOICE · 极客首选",
      tagline: "1V1 物理独享 Apple Silicon 算力与全球大模型 API 聚合通道的极简开发工作站。",
      monthlyPrice: 3399,
      annualPrice: 2719,
      originalPrice: 3999,
      currency: "฿",
      popular: false,
      features: [
        "1× Mac 专属云工作站 (1V1 物理独享 Apple Silicon M 系列芯片，原生 macOS)",
        "1× 全球大模型 API 聚合网关 (每月含 ฿500 高速额度，支持 GPT-6 & Claude 5.6)",
        "1× 独立海外原生静态商业 IP (专属绑定 Mac，支持海外开发者后台与 App Store 提审)",
        "远程安全开发沙箱 (VS Code Server / Parsec 60FPS 极速低延迟串流)",
        "独占千兆对等带宽，代码与编译全流程在云端高安全机房受控运行",
      ],
      includes: ["Mac 1V1 独享", "大模型 API 额度", "独立静态IP", "安全沙箱"],
      actionLabel: "选定此独立开发包",
    },
    {
      id: "claude_team_pack",
      name: "Claude & GPT 团队 AI 综合协同包",
      badge: "AI WORKFLOW · 大模型深度团队",
      tagline: "解决跨国 AI 团队访问 Claude 5.6 / Team 与 GPT-6 频繁被封号与限流的核心痛点。",
      monthlyPrice: 2499,
      annualPrice: 1999,
      originalPrice: 3000,
      currency: "฿",
      popular: false,
      features: [
        "1× 高配安全 AI 云工作站 (8 核心 vCPU / 32GB 内存 / 256GB NVMe / 中泰专线)",
        "1× 独立海外原生静态商业 IP (泰国 AI Center 原生出口，完美契合 Claude Team & ChatGPT 风控)",
        "1× 全球大模型 API 聚合加速网关 (每月内置 ฿1,000 高速 API Token 额度)",
        "团队多席位权限分级管理与防数据外泄安全沙盒",
        "ColaSola 100% 绿色光伏电力驱动，SLA 99.99% 企业级高可用保障",
      ],
      includes: ["高配 AI 工作站", "原生防封 IP", "1000฿ API 额度", "团队防泄密"],
      actionLabel: "选定此 AI 协同包",
    },
    {
      id: "vision_creator_pack",
      name: "AI 视觉与数字人创作者包",
      badge: "CREATOR · 视觉渲染神器",
      tagline: "为电商模特换装、短视频数字人生成、FLUX.1 与 ComfyUI 打造的专属高性能算力工位。",
      monthlyPrice: 4599,
      annualPrice: 3679,
      originalPrice: 5800,
      currency: "฿",
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
      tagline: "清迈独栋 5 层 AI 中心线下挑高工位 + 24h 永续在线云工位的专属跨国旅居特权方案。",
      monthlyPrice: 4999,
      annualPrice: 3999,
      originalPrice: 6398,
      currency: "฿",
      popular: true,
      features: [
        "1× 清迈 AI 中心线下实体大楼办公工位通票 (1-5楼挑高空间、冷气、现磨咖啡与会议室权益)",
        "1× 轻量共享型云电脑 (微主机，24h 云端全自动挂机、自动化脚本与防关联沙箱)",
        "1× 独立海外原生静态商业 IP (专属绑定，Fraud Score 0，跨国漫游无感直连)",
        "1× 泰国原生真实实体 SIM 卡长期保号 (接收本地银行网银、PromptPay 与本地服务 OTP)",
        "线下大楼万兆内网直通云端机房，出门在外随时通过中泰 IPLC 专线安全接入",
      ],
      includes: ["实体大楼工位", "24h 云工位", "独立静态IP", "实体卡保号"],
      actionLabel: "选定此云地双栖包",
    },
    {
      id: "enterprise_suite",
      name: "出海企业合规商业落地旗舰包",
      badge: "ENTERPRISE · 实体一站式落地",
      tagline: "泰国合规公司设立、商业银行开户、对公账户、长期地址授权与本地财税一站式托管。",
      monthlyPrice: 28800,
      annualPrice: 24000,
      originalPrice: 36000,
      currency: "฿",
      popular: false,
      features: [
        "泰国商业发展局 (DBD) 全套公司设立合规注册 + 商业银行对公账户开设",
        "泰国商业地址注册资质 (清迈 AI 中心独栋五层大厦实体地址官方授权)",
        "2× 专属独立云电脑工位 + 2× 独立静态原生商业 IP (保障跨国团队敏捷协同)",
        "2× 泰国实体 SIM 卡长期保号 (网银转账与税务系统申报专用)",
        "本地财税代理与合规报税首季托管服务 + 1对1 专属中英泰三语商务顾问",
      ],
      includes: ["DBD公司注册", "银行开户", "2×云工位", "2×静态IP", "财税托管"],
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

  return (
    <section id="bundles" className="py-24 bg-[#fafafa] dark:bg-[#09090b] border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-300 mb-3 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-500" />
              <span>Curated Scenario Bundles</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-950 dark:text-white tracking-tight">
              场景化精选组合订阅包
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light mt-2">
              告别繁琐单点比价与拼凑，针对本土电商开店、独立开发、大模型团队、视觉创作、数字游民与出海企业合规落地量身定制交钥匙方案。
            </p>
          </div>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center gap-2 p-1 rounded-full bg-neutral-200/60 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 self-start md:self-auto">
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
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400">
                立省 20%
              </span>
            </button>
          </div>
        </div>

        {/* 6 Bundles Grid (2 rows of 3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bundles.map((bundle) => {
            const currentPrice = billingCycle === "monthly" ? bundle.monthlyPrice : bundle.annualPrice;
            const savings = bundle.originalPrice - currentPrice;

            return (
              <div
                key={bundle.id}
                className={`relative p-7 rounded-3xl flex flex-col justify-between transition-all ${
                  bundle.popular
                    ? "bg-white dark:bg-neutral-900 border-2 border-neutral-950 dark:border-white shadow-lg shadow-neutral-200/50 dark:shadow-black/60 scale-[1.01]"
                    : "bg-white dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 shadow-xs hover:shadow-md"
                }`}
              >
                {bundle.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[10px] font-mono font-semibold tracking-wider">
                    RECOMMENDED
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block mb-1">
                      {bundle.badge}
                    </span>
                    <h3 className="text-lg font-medium text-neutral-950 dark:text-white leading-snug">
                      {bundle.name}
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-light mt-2 leading-relaxed min-h-[36px]">
                      {bundle.tagline}
                    </p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-4 border-t border-b border-neutral-100 dark:border-neutral-800/80">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xs text-neutral-400 line-through font-mono">
                        {bundle.currency}{bundle.originalPrice.toLocaleString()}
                      </span>
                      <span className="text-3xl font-light text-neutral-950 dark:text-white tracking-tight">
                        {bundle.currency}{currentPrice.toLocaleString()}
                      </span>
                      <span className="text-xs text-neutral-500 font-mono">/ 月</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                        比单购立省 {bundle.currency}{savings.toLocaleString()}/月
                      </span>
                      {billingCycle === "annual" && (
                        <span className="text-[10px] font-mono px-1 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          年付折上折
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Included tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {bundle.includes.map((inc, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-mono text-neutral-700 dark:text-neutral-300"
                      >
                        +{inc}
                      </span>
                    ))}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-8">
                    {bundle.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300 leading-tight">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleSelect(bundle.id)}
                  className={`w-full py-3 rounded-full text-center text-xs font-medium transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    bundle.popular
                      ? "bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 shadow-sm"
                      : "bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white"
                  }`}
                >
                  <span>{bundle.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
