"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Monitor,
  HardDrive,
  Smartphone,
  Globe2,
  Coins,
  Bot,
  Cpu,
  Building2,
  Check,
  Copy,
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Sliders,
  HelpCircle,
  CheckCircle2,
  PackageCheck,
  RotateCcw,
  Palette,
  Compass,
} from "lucide-react";

interface CloudPricingCalculatorProps {
  initialPreset?: string;
}

export default function CloudPricingCalculator({ initialPreset }: CloudPricingCalculatorProps) {
  const [currency, setCurrency] = useState<"THB" | "CNY">("THB");
  const [duration, setDuration] = useState<number>(1); // 1, 3, 6, 12 months
  const [copied, setCopied] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>("custom");

  // Exchange rate: 1 CNY = 5 THB
  const rate = currency === "THB" ? 1 : 0.2;
  const symbol = currency === "THB" ? "฿" : "¥";

  // 1. 微主机 / 共享轻量远程电脑
  const [sharedPc, setSharedPc] = useState({ enabled: true, count: 1, unitPrice: 499 });
  // 2. Mac远程电脑 1V1 (Apple Silicon)
  const [macMini, setMacMini] = useState({ enabled: false, count: 1, unitPrice: 2999 });
  // 3. RTX 4090 独享 GPU 算力主机 (ComfyUI / FLUX.1)
  const [rtx4090, setRtx4090] = useState({ enabled: false, count: 1, unitPrice: 3800 });
  // 4. 清迈 AI 中心线下实体大楼办公工位通票 (1-5楼挑高空间)
  const [offlineDesk, setOfflineDesk] = useState({ enabled: false, count: 1, unitPrice: 5000 });
  // 5. 远程电脑托管
  const [colocation, setColocation] = useState({ enabled: false, count: 1, unitPrice: 1500 });
  // 6. 泰国验证码校验 (按月专属保号)
  const [thaiSms, setThaiSms] = useState({ enabled: false, count: 1, unitPrice: 399 });
  // 7. 独立静态IP
  const [dedicatedIp, setDedicatedIp] = useState({ enabled: true, count: 1, unitPrice: 500 });
  // 8. 泰国小额代充 (按次加价)
  const [microTopup, setMicroTopup] = useState({ enabled: false, count: 5, unitPrice: 50 });
  // 9. API中转 (按量计费包)
  const [apiRelay, setApiRelay] = useState({ enabled: false, tier: 1, unitPrice: 500 });
  // 10. H200 8卡整机节点使用 (时租 1600฿ / 包月 880,000฿)
  const [h200Gpu, setH200Gpu] = useState({
    enabled: false,
    mode: "hourly" as "hourly" | "monthly",
    hours: 10,
    hourlyRate: 1600,
    monthlyRate: 880000,
  });
  // 11. 企业及团队出海综合合规落地 (详细咨询)
  const [enterprise, setEnterprise] = useState({ enabled: false });

  // Handle Preset Selection
  const applyPreset = (presetId: string) => {
    setActivePreset(presetId);

    if (presetId === "ecommerce_pack") {
      // 泰国电商开店包: 微主机(1) + 独立IP(1) + 实体卡(1) + 代充通道(3笔)
      setSharedPc({ enabled: true, count: 1, unitPrice: 499 });
      setMacMini({ enabled: false, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: false, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: false, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: true, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
      setMicroTopup({ enabled: true, count: 3, unitPrice: 50 });
      setApiRelay({ enabled: false, tier: 1, unitPrice: 500 });
      setH200Gpu((prev) => ({ ...prev, enabled: false }));
      setEnterprise({ enabled: false });
    } else if (presetId === "indie_dev_pack") {
      // 跨国独立开发包: Mac 1V1(1) + 独立IP(1) + API额度(1档)
      setSharedPc({ enabled: false, count: 1, unitPrice: 499 });
      setMacMini({ enabled: true, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: false, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: false, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: false, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
      setMicroTopup({ enabled: false, count: 5, unitPrice: 50 });
      setApiRelay({ enabled: true, tier: 1, unitPrice: 500 });
      setH200Gpu((prev) => ({ ...prev, enabled: false }));
      setEnterprise({ enabled: false });
    } else if (presetId === "claude_team_pack") {
      // Claude & GPT 团队包: 微主机协同(1) + 独立IP(1) + API额度(2档/1000฿)
      setSharedPc({ enabled: true, count: 1, unitPrice: 499 });
      setMacMini({ enabled: false, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: false, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: false, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: false, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
      setMicroTopup({ enabled: false, count: 5, unitPrice: 50 });
      setApiRelay({ enabled: true, tier: 2, unitPrice: 500 });
      setH200Gpu((prev) => ({ ...prev, enabled: false }));
      setEnterprise({ enabled: false });
    } else if (presetId === "vision_creator_pack") {
      // AI 视觉创作者包: RTX 4090(1) + 独立IP(1) + API额度(1档/500฿)
      setSharedPc({ enabled: false, count: 1, unitPrice: 499 });
      setMacMini({ enabled: false, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: true, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: false, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: false, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
      setMicroTopup({ enabled: false, count: 5, unitPrice: 50 });
      setApiRelay({ enabled: true, tier: 1, unitPrice: 500 });
      setH200Gpu((prev) => ({ ...prev, enabled: false }));
      setEnterprise({ enabled: false });
    } else if (presetId === "nomad_dual_pack") {
      // 「云地一体」清迈数字游民双栖包: 微主机(1) + 独立IP(1) + 实体卡(1) + 线下实体工位(1)
      setSharedPc({ enabled: true, count: 1, unitPrice: 499 });
      setMacMini({ enabled: false, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: false, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: true, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: true, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
      setMicroTopup({ enabled: false, count: 5, unitPrice: 50 });
      setApiRelay({ enabled: false, tier: 1, unitPrice: 500 });
      setH200Gpu((prev) => ({ ...prev, enabled: false }));
      setEnterprise({ enabled: false });
    } else if (presetId === "h200_cluster") {
      // H200 8卡整机节点包月 + 2个独立IP
      setSharedPc({ enabled: false, count: 1, unitPrice: 499 });
      setMacMini({ enabled: false, count: 1, unitPrice: 2999 });
      setRtx4090({ enabled: false, count: 1, unitPrice: 3800 });
      setOfflineDesk({ enabled: false, count: 1, unitPrice: 5000 });
      setColocation({ enabled: false, count: 1, unitPrice: 1500 });
      setThaiSms({ enabled: false, count: 1, unitPrice: 399 });
      setDedicatedIp({ enabled: true, count: 2, unitPrice: 500 });
      setMicroTopup({ enabled: false, count: 5, unitPrice: 50 });
      setApiRelay({ enabled: false, tier: 1, unitPrice: 500 });
      setH200Gpu({
        enabled: true,
        mode: "monthly",
        hours: 0,
        hourlyRate: 1600,
        monthlyRate: 880000,
      });
      setEnterprise({ enabled: false });
    } else if (presetId === "custom") {
      // 自定义自由搭配
      setSharedPc({ enabled: true, count: 1, unitPrice: 499 });
      setDedicatedIp({ enabled: true, count: 1, unitPrice: 500 });
    }
  };

  useEffect(() => {
    if (initialPreset) {
      applyPreset(initialPreset);
    }
  }, [initialPreset]);

  // Monthly items subtotal
  const rawMonthlySubtotal =
    (sharedPc.enabled ? sharedPc.count * sharedPc.unitPrice : 0) +
    (macMini.enabled ? macMini.count * macMini.unitPrice : 0) +
    (rtx4090.enabled ? rtx4090.count * rtx4090.unitPrice : 0) +
    (offlineDesk.enabled ? offlineDesk.count * offlineDesk.unitPrice : 0) +
    (colocation.enabled ? colocation.count * colocation.unitPrice : 0) +
    (thaiSms.enabled ? thaiSms.count * thaiSms.unitPrice : 0) +
    (dedicatedIp.enabled ? dedicatedIp.count * dedicatedIp.unitPrice : 0) +
    (h200Gpu.enabled && h200Gpu.mode === "monthly" ? h200Gpu.monthlyRate : 0);

  // Bundle package discount: if active preset matches, apply bundle discount
  let bundleSavingsPerMonth = 0;
  if (activePreset === "ecommerce_pack") {
    bundleSavingsPerMonth = 199; // 1398 -> 1199
  } else if (activePreset === "indie_dev_pack") {
    bundleSavingsPerMonth = 600; // 3999 -> 3399
  } else if (activePreset === "claude_team_pack") {
    bundleSavingsPerMonth = 500; // 2999 -> 2499
  } else if (activePreset === "vision_creator_pack") {
    bundleSavingsPerMonth = 1201; // 5800 -> 4599
  } else if (activePreset === "nomad_dual_pack") {
    bundleSavingsPerMonth = 1399; // 6398 -> 4999
  }

  const effectiveMonthlySubtotal = Math.max(0, rawMonthlySubtotal - bundleSavingsPerMonth);

  // Discount for annual (20% off monthly portion)
  const discountRate = duration === 12 ? 0.2 : duration === 6 ? 0.1 : 0;
  const discountedMonthlyTotal = effectiveMonthlySubtotal * (1 - discountRate);
  const totalMonthlyPlan = discountedMonthlyTotal * duration;

  // Usage & On-demand / One-time subtotal
  const usageSubtotal =
    (microTopup.enabled ? microTopup.count * microTopup.unitPrice : 0) +
    (apiRelay.enabled ? apiRelay.tier * apiRelay.unitPrice : 0) +
    (h200Gpu.enabled && h200Gpu.mode === "hourly" ? h200Gpu.hours * h200Gpu.hourlyRate : 0);

  // Grand Total Estimate
  const grandTotal = totalMonthlyPlan + usageSubtotal;

  const formatPrice = (amountInTHB: number) => {
    const converted = Math.round(amountInTHB * rate);
    return converted.toLocaleString();
  };

  // Generate Quote Text for Copying / Contact Form
  const generateQuoteDetails = () => {
    let lines = [`【Chiang Mai AI Center - 云工位与算力服务配置预算单】`];
    if (activePreset !== "custom") {
      lines.push(
        `应用场景套餐: ${
          activePreset === "ecommerce_pack"
            ? "泰国电商本土店抗风控开店包 (特惠 ฿1,199/月)"
            : activePreset === "indie_dev_pack"
            ? "跨国独立开发敏捷包 (特惠 ฿3,399/月)"
            : activePreset === "claude_team_pack"
            ? "Claude & GPT 团队 AI 综合协同包 (特惠 ฿2,499/月)"
            : activePreset === "vision_creator_pack"
            ? "AI 视觉与数字人创作者包 (特惠 ฿4,599/月)"
            : activePreset === "nomad_dual_pack"
            ? "「云地一体」清迈数字游民双栖包 (特惠 ฿4,999/月)"
            : "NVIDIA H200 8卡整机节点包月 (฿880,000/月)"
        }`
      );
    }
    lines.push(`结算币种: ${currency === "THB" ? "泰铢 (THB ฿)" : "人民币 (CNY ¥)"} | 签约周期: ${duration} 个月`);
    lines.push(`----------------------------------------`);

    if (sharedPc.enabled) {
      lines.push(`• 轻量共享型云电脑: ${sharedPc.count} 台 × ${symbol}${formatPrice(sharedPc.unitPrice)}/月`);
    }
    if (macMini.enabled) {
      lines.push(`• Mac 专属云工作站 (1V1独享): ${macMini.count} 台 × ${symbol}${formatPrice(macMini.unitPrice)}/月`);
    }
    if (rtx4090.enabled) {
      lines.push(`• NVIDIA RTX 4090 独享 GPU 算力主机: ${rtx4090.count} 台 × ${symbol}${formatPrice(rtx4090.unitPrice)}/月`);
    }
    if (offlineDesk.enabled) {
      lines.push(`• 清迈 AI 中心线下大厦实体工位通票: ${offlineDesk.count} 席 × ${symbol}${formatPrice(offlineDesk.unitPrice)}/月`);
    }
    if (colocation.enabled) {
      lines.push(`• 物理主机机房托管: ${colocation.count} 台 × ${symbol}${formatPrice(colocation.unitPrice)}/月`);
    }
    if (thaiSms.enabled) {
      lines.push(`• 泰国原生验证码/实体卡校验: ${thaiSms.count} 个专属号码 × ${symbol}${formatPrice(thaiSms.unitPrice)}/月`);
    }
    if (dedicatedIp.enabled) {
      lines.push(`• 独立海外原生静态商业 IP: ${dedicatedIp.count} 个 × ${symbol}${formatPrice(dedicatedIp.unitPrice)}/月`);
    }
    if (microTopup.enabled) {
      lines.push(`• 泰国本地小额代充与代缴: ${microTopup.count} 笔 (服务费: ${symbol}${formatPrice(microTopup.unitPrice)}/笔)`);
    }
    if (apiRelay.enabled) {
      lines.push(`• 全球大模型 API 聚合网关 (Claude 5.6 & GPT-6): ${apiRelay.tier} 档用量包 (${symbol}${formatPrice(apiRelay.tier * apiRelay.unitPrice)})`);
    }
    if (h200Gpu.enabled) {
      if (h200Gpu.mode === "hourly") {
        lines.push(`• NVIDIA H200 8-GPU 旗舰整机节点: ${h200Gpu.hours} 小时 × ${symbol}${formatPrice(h200Gpu.hourlyRate)}/小时`);
      } else {
        lines.push(`• NVIDIA H200 8-GPU 旗舰整机节点: 独享整机包月 × ${symbol}${formatPrice(h200Gpu.monthlyRate)}/月`);
      }
    }
    if (enterprise.enabled) {
      lines.push(`• 企业及团队出海综合合规商业落地服务: 已勾选意向 (需商务顾问 1 对 1 定制对接)`);
    }

    if (activePreset !== "custom" && bundleSavingsPerMonth > 0) {
      lines.push(`• 场景组合包月减免: -${symbol}${formatPrice(bundleSavingsPerMonth)}/月`);
    }
    if (discountRate > 0) {
      lines.push(`• 长期签约折扣: ${(discountRate * 100).toFixed(0)}% 折扣优惠`);
    }
    lines.push(`----------------------------------------`);
    lines.push(`预计总预算: ${symbol}${formatPrice(grandTotal)}`);
    return lines.join("\n");
  };

  const handleCopyQuote = () => {
    const text = generateQuoteDetails();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleApplyWithQuote = () => {
    const textarea = document.querySelector('input[placeholder*="预计使用场景"]') as HTMLInputElement;
    if (textarea) {
      textarea.value = `已选方案: ${symbol}${formatPrice(grandTotal)} (${activePreset !== "custom" ? activePreset : "自定义测算"})`;
      const event = new Event("input", { bubbles: true });
      textarea.dispatchEvent(event);
    }
    const formElement = document.getElementById("trial");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-[#070709] border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-300 mb-3">
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Service Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-950 dark:text-white tracking-tight">
            云工位与算力服务测算器
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light mt-2">
            支持一键套用场景套餐，亦可自由增减微主机、Mac 独享工作站、RTX 4090、线下实体大楼工位、独立 IP、实体 SIM 卡与 H200 8卡整机节点，即时获取透明预算。
          </p>
        </div>

        {/* Quick Preset Selector Pills */}
        <div className="mb-12 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-mono text-neutral-500 font-semibold uppercase tracking-wider mr-2 flex items-center gap-1.5">
            <PackageCheck className="w-3.5 h-3.5 text-blue-500" />
            <span>套用场景套餐:</span>
          </span>

          <button
            type="button"
            onClick={() => applyPreset("ecommerce_pack")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "ecommerce_pack"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            🔥 泰国电商开店包 (฿1,199/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("indie_dev_pack")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "indie_dev_pack"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            💻 跨国独立开发包 (฿3,399/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("claude_team_pack")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "claude_team_pack"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            🤖 Claude &amp; GPT 团队包 (฿2,499/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("vision_creator_pack")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "vision_creator_pack"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            🎨 AI 视觉创作者包 (฿4,599/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("nomad_dual_pack")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "nomad_dual_pack"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            🏝️ 「云地一体」双栖包 (฿4,999/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("h200_cluster")}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              activePreset === "h200_cluster"
                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-xs font-semibold"
                : "bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-200 dark:border-neutral-700"
            }`}
          >
            ⚡ H200 8卡整机包月 (฿880,000/月)
          </button>

          <button
            type="button"
            onClick={() => applyPreset("custom")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1 ${
              activePreset === "custom"
                ? "bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white font-semibold"
                : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            }`}
          >
            <RotateCcw className="w-3 h-3" />
            <span>自由自定义</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 11 Services Configuration */}
          <div className="lg:col-span-7 space-y-8">
            {/* Category 1: 按月订阅基础服务 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  01 / 月度固定订阅基础服务 (Monthly Subscriptions)
                </span>
                <span className="text-xs text-neutral-400 font-mono">按月结算 · 稳定独享</span>
              </div>

              <div className="space-y-4">
                {/* 1. 微主机，远程电脑 (共享型) */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    sharedPc.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="sharedPc"
                        checked={sharedPc.enabled}
                        onChange={(e) => {
                          setSharedPc({ ...sharedPc, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="sharedPc" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>轻量共享型云电脑 (微主机)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                            多任务弹性共享
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          弹性共享算力资源池，预装出海防关联环境。专为跨境电商多店铺值守、自动化监控与日常轻量办公打造，超高性价比。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(sharedPc.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/台</span>
                      </div>
                    </div>
                  </div>

                  {sharedPc.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">配置主机台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSharedPc({ ...sharedPc, count: Math.max(1, sharedPc.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{sharedPc.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSharedPc({ ...sharedPc, count: Math.min(20, sharedPc.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Mac远程电脑 1V1 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    macMini.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="macMini"
                        checked={macMini.enabled}
                        onChange={(e) => {
                          setMacMini({ ...macMini, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="macMini" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>Mac 专属云工作站 (1V1 独享 Apple Silicon)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
                            物理独享 M 系列
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          整机 1V1 专属物理硬件直通，非虚拟机切分。支持 Xcode 跨国构建、iOS App Store 提审与原生 macOS 极速开发测试。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(macMini.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/台</span>
                      </div>
                    </div>
                  </div>

                  {macMini.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">配置 Mac 独享台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setMacMini({ ...macMini, count: Math.max(1, macMini.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{macMini.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setMacMini({ ...macMini, count: Math.min(10, macMini.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. RTX 4090 独享 GPU 算力主机 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    rtx4090.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="rtx4090"
                        checked={rtx4090.enabled}
                        onChange={(e) => {
                          setRtx4090({ ...rtx4090, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="rtx4090" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>NVIDIA RTX 4090 独享 GPU 算力主机 (24GB VRAM)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            ComfyUI · FLUX.1 预装
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          为电商批量出图、数字人视频生成预装开箱即用的 ComfyUI 与 SDXL/FLUX.1 常用大模型与 LoRA 权重，千兆专线低延迟直连。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(rtx4090.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/台</span>
                      </div>
                    </div>
                  </div>

                  {rtx4090.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">配置 RTX 4090 台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setRtx4090({ ...rtx4090, count: Math.max(1, rtx4090.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{rtx4090.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setRtx4090({ ...rtx4090, count: Math.min(10, rtx4090.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. 清迈 AI 中心线下大厦实体工位通票 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    offlineDesk.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="offlineDesk"
                        checked={offlineDesk.enabled}
                        onChange={(e) => {
                          setOfflineDesk({ ...offlineDesk, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="offlineDesk" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>清迈 AI 中心线下实体大楼办公工位通票</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            1-5楼实体挑高大厦
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          清迈 1600㎡ 独栋 5 层科技大楼实体工位。享万兆物理内网直通云机房、ColaSola 光伏绿电冷气、免费现磨咖啡、音视频会议室与社区活动特权。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(offlineDesk.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/席</span>
                      </div>
                    </div>
                  </div>

                  {offlineDesk.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">实体工位席位数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setOfflineDesk({ ...offlineDesk, count: Math.max(1, offlineDesk.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{offlineDesk.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setOfflineDesk({ ...offlineDesk, count: Math.min(20, offlineDesk.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. 远程电脑托管 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    colocation.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="colocation"
                        checked={colocation.enabled}
                        onChange={(e) => {
                          setColocation({ ...colocation, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="colocation" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>物理设备 / 自购主机机房托管 (Colocation)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                            1U/2U 机架托管
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          清迈自建 IDC 专业机架，配备冗余发电机、APC 在线式 UPS、精密恒温恒湿空调与 ColaSola 光伏微电网底座，物理防盗与 24/7 现场值守。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(colocation.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/台</span>
                      </div>
                    </div>
                  </div>

                  {colocation.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">托管设备台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setColocation({ ...colocation, count: Math.max(1, colocation.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{colocation.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setColocation({ ...colocation, count: Math.min(20, colocation.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6. 泰国验证码校验 (按月专属保号) */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    thaiSms.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="thaiSms"
                        checked={thaiSms.enabled}
                        onChange={(e) => {
                          setThaiSms({ ...thaiSms, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="thaiSms" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>泰国原生实体 SIM 卡短信验证码校验 (专属保号)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            实体卡保号 · 长期独占
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          泰国真实物理实体 SIM 卡（AIS / True），非易封虚拟号码。专人常年值守维护插卡保号，专属用于 TikTok Shop、Shopee 本土店铺与海外银行网银高危风控场景。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(thaiSms.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/号码</span>
                      </div>
                    </div>
                  </div>

                  {thaiSms.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">专属实体号码数量：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setThaiSms({ ...thaiSms, count: Math.max(1, thaiSms.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{thaiSms.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setThaiSms({ ...thaiSms, count: Math.min(20, thaiSms.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 7. 独立静态IP */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    dedicatedIp.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="dedicatedIp"
                        checked={dedicatedIp.enabled}
                        onChange={(e) => {
                          setDedicatedIp({ ...dedicatedIp, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="dedicatedIp" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>独立海外原生静态商业 IP (Clean ASN)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                            Fraud Score 0 · 专人专享
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          100% 独享纯净海外原生商业 IP，ASN 干净零不良风控历史。一人一 IP 专线专绑，杜绝公用代理连带封禁与风控风暴。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(dedicatedIp.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/个</span>
                      </div>
                    </div>
                  </div>

                  {dedicatedIp.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">独享 IP 数量：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setDedicatedIp({ ...dedicatedIp, count: Math.max(1, dedicatedIp.count - 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{dedicatedIp.count}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setDedicatedIp({ ...dedicatedIp, count: Math.min(20, dedicatedIp.count + 1) });
                            setActivePreset("custom");
                          }}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category 2: 弹性按次与按量计费服务 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  02 / 弹性按次与按量计费服务 (Usage-Based &amp; On-Demand)
                </span>
                <span className="text-xs text-neutral-400 font-mono">用多少充多少 · 灵活透明</span>
              </div>

              <div className="space-y-4">
                {/* 8. 泰国小额代充 (按次直接加价) */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    microTopup.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="microTopup"
                        checked={microTopup.enabled}
                        onChange={(e) => {
                          setMicroTopup({ ...microTopup, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="microTopup" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>泰国本地小额代充与代缴 (按次加价)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300">
                            PromptPay / 话费 / 账单即时代充
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          支持 PromptPay 实时扫码代付、TrueMoney 钱包充值、泰国各运营商话费充值与本地商用水电账单代缴。按笔透明加收固定服务费。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        +{symbol}{formatPrice(microTopup.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /笔服务费</span>
                      </div>
                    </div>
                  </div>

                  {microTopup.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">预估月度代充笔数：</span>
                        <span className="font-mono font-medium">{microTopup.count} 笔 / 月</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="50"
                        value={microTopup.count}
                        onChange={(e) => {
                          setMicroTopup({ ...microTopup, count: parseInt(e.target.value) });
                          setActivePreset("custom");
                        }}
                        className="w-full accent-neutral-900 dark:accent-white cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                        <span>1 笔</span>
                        <span>25 笔</span>
                        <span>50 笔</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 9. API中转，按量计费 */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    apiRelay.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="apiRelay"
                        checked={apiRelay.enabled}
                        onChange={(e) => {
                          setApiRelay({ ...apiRelay, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="apiRelay" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>全球大模型 API 聚合中转网关 (按量计费)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                            Claude 5.5/5.6 · GPT-6 · DeepSeek 极速直连
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          高可用聚合中转通道，兼容 OpenAI / Anthropic 原生接口格式。免翻墙低延迟直连，按 Token 实际消耗扣费，保障企业高并发吞吐。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(apiRelay.unitPrice * apiRelay.tier)}
                        <span className="text-xs text-neutral-500 font-normal"> 预估包</span>
                      </div>
                    </div>
                  </div>

                  {apiRelay.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">预充值额度档位：</span>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 5, 10].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => {
                              setApiRelay({ ...apiRelay, tier: t });
                              setActivePreset("custom");
                            }}
                            className={`px-2.5 py-1 rounded-md text-xs font-mono transition-colors ${
                              apiRelay.tier === t
                                ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold"
                                : "bg-neutral-200/60 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300"
                            }`}
                          >
                            {symbol}{formatPrice(t * 500)}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 10. H200 8-GPU 整机节点 (时租 / 包月) */}
                <div
                  className={`p-5 rounded-2xl border transition-all ${
                    h200Gpu.enabled
                      ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                      : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <input
                        type="checkbox"
                        id="h200Gpu"
                        checked={h200Gpu.enabled}
                        onChange={(e) => {
                          setH200Gpu({ ...h200Gpu, enabled: e.target.checked });
                          setActivePreset("custom");
                        }}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="h200Gpu" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>NVIDIA H200 8-GPU 旗舰整机算力节点</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            8卡整机 · 1,128GB HBM3e
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          全球顶级 AI 训练与超长上下文推理 8 卡整机（HGX/SXM5），搭载 1,128GB HBM3e 显存与 3.2Tbps InfiniBand。专为千亿参数私有大模型微调与复杂智能体推演打造。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {h200Gpu.mode === "hourly" ? (
                          <>
                            {symbol}{formatPrice(h200Gpu.hourlyRate)}
                            <span className="text-xs text-neutral-500 font-normal"> /小时 (整机8卡)</span>
                          </>
                        ) : (
                          <>
                            {symbol}{formatPrice(h200Gpu.monthlyRate)}
                            <span className="text-xs text-neutral-500 font-normal"> /月 (整机包月)</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {h200Gpu.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-4">
                      {/* Mode Switcher */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">8卡整机租赁计费模式：</span>
                        <div className="flex items-center p-1 rounded-lg bg-neutral-200/60 dark:bg-neutral-800">
                          <button
                            type="button"
                            onClick={() => {
                              setH200Gpu({ ...h200Gpu, mode: "hourly" });
                              setActivePreset("custom");
                            }}
                            className={`px-2.5 py-1 rounded-md transition-all font-mono text-xs ${
                              h200Gpu.mode === "hourly"
                                ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-semibold"
                                : "text-neutral-600 dark:text-neutral-400"
                            }`}
                          >
                            按小时时租 (1,600฿/h)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setH200Gpu({ ...h200Gpu, mode: "monthly" });
                              setActivePreset("h200_cluster");
                            }}
                            className={`px-2.5 py-1 rounded-md transition-all font-mono text-xs ${
                              h200Gpu.mode === "monthly"
                                ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-semibold"
                                : "text-neutral-600 dark:text-neutral-400"
                            }`}
                          >
                            整机包月 (88万฿/月)
                          </button>
                        </div>
                      </div>

                      {/* Slider for hourly */}
                      {h200Gpu.mode === "hourly" ? (
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-neutral-500">预估月度使用时长：</span>
                            <span className="font-mono font-medium">{h200Gpu.hours} 小时 / 月</span>
                          </div>
                          <input
                            type="range"
                            min="5"
                            max="200"
                            step="5"
                            value={h200Gpu.hours}
                            onChange={(e) => {
                              setH200Gpu({ ...h200Gpu, hours: parseInt(e.target.value) });
                              setActivePreset("custom");
                            }}
                            className="w-full accent-neutral-900 dark:accent-white cursor-pointer"
                          />
                          <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                            <span>5 小时</span>
                            <span>100 小时</span>
                            <span>200 小时</span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 leading-relaxed flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>
                            整机包月方案立享专属独立机架位、双路千兆专线直连、ColaSola 屋顶光伏绿电不间断供电，相比按小时租用立省 25% 以上。
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category 3: 企业及团队服务 (详细咨询) */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  03 / 企业与合规商业主体综合落地 (Enterprise &amp; Compliance)
                </span>
                <span className="text-xs text-neutral-400 font-mono">1对1 商务定制</span>
              </div>

              {/* 11. 企业及团队服务 */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  enterprise.enabled
                    ? "bg-neutral-50 dark:bg-neutral-900/60 border-neutral-300 dark:border-neutral-700 shadow-xs"
                    : "bg-white dark:bg-neutral-950/40 border-neutral-200 dark:border-neutral-800/80 opacity-70"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <input
                      type="checkbox"
                      id="enterprise"
                      checked={enterprise.enabled}
                      onChange={(e) => {
                        setEnterprise({ enabled: e.target.checked });
                        setActivePreset("custom");
                      }}
                      className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                    />
                    <div>
                      <label htmlFor="enterprise" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                        <span>企业及团队出海综合合规商业主体落地</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          DBD设立 · 银行开户 · 财税托管
                        </span>
                      </label>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                        包含泰国合规公司设立、BOI 投资委高新企业资质申请、长期居留技术签证（LTR / Smart Visa）、商业银行开户认证、本地财税代理与合规商业架构全托管。
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="px-2.5 py-1 rounded-full bg-neutral-200/70 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200">
                      需详细咨询
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Quote Summary Card */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 shadow-sm backdrop-blur-md">
              {/* Header Controls: Currency & Duration */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-neutral-200 dark:border-neutral-800 gap-4">
                {/* Currency Switcher */}
                <div className="flex items-center p-1 rounded-xl bg-neutral-200/60 dark:bg-neutral-800 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setCurrency("THB")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      currency === "THB"
                        ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-semibold"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    泰铢 (฿ THB)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency("CNY")}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      currency === "CNY"
                        ? "bg-white dark:bg-neutral-900 text-neutral-950 dark:text-white shadow-xs font-semibold"
                        : "text-neutral-600 dark:text-neutral-400"
                    }`}
                  >
                    人民币 (¥ CNY)
                  </button>
                </div>

                {/* Duration Picker */}
                <div className="flex items-center gap-1 text-xs">
                  {[1, 3, 6, 12].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDuration(m)}
                      className={`px-2.5 py-1.5 rounded-lg font-mono transition-all ${
                        duration === m
                          ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold shadow-xs"
                          : "bg-neutral-200/50 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200"
                      }`}
                    >
                      {m}M
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimate Title */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                    Estimated Investment
                  </span>
                  {activePreset !== "custom" && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium">
                      已套用场景套餐
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-light text-neutral-950 dark:text-white tracking-tight">
                    {symbol}{formatPrice(grandTotal)}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    / {duration} 个月周期预计总支出
                  </span>
                </div>

                {bundleSavingsPerMonth > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>场景组合包特惠：每月减免 {symbol}{formatPrice(bundleSavingsPerMonth)}</span>
                  </div>
                )}

                {discountRate > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium ml-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>长期签约 {(discountRate * 100).toFixed(0)}% 折扣已减免</span>
                  </div>
                )}
              </div>

              {/* Subtotal Breakdowns */}
              <div className="space-y-3 py-5 border-t border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-600 dark:text-neutral-400">
                <div className="flex justify-between items-center">
                  <span>月度固定订阅支出 ({duration} 个月)</span>
                  <span className="font-mono font-medium text-neutral-900 dark:text-white">
                    {symbol}{formatPrice(totalMonthlyPlan)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span>弹性用量与按次服务 (H200/代充/API)</span>
                  <span className="font-mono font-medium text-neutral-900 dark:text-white">
                    {symbol}{formatPrice(usageSubtotal)}
                  </span>
                </div>

                {enterprise.enabled && (
                  <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400">
                    <span>企业及团队出海综合合规</span>
                    <span className="font-medium">1对1 商务定制服务</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleApplyWithQuote}
                  className="w-full py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-medium transition-all shadow-sm hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>带入当前测算并提交咨询</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full py-3 rounded-full border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600 bg-white/60 dark:bg-neutral-900/60 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>配置清单已复制到剪贴板！</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-neutral-500" />
                      <span>复制完整配置预算清单文本</span>
                    </>
                  )}
                </button>
              </div>

              {/* Confidence Guarantee */}
              <div className="mt-6 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 text-[11px] text-neutral-500 space-y-1.5">
                <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>合规海外 AI 中心原生网络 · GPT-6 / Claude 5.5/5.6 极低封号风险</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                  <Coins className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span>对公对私全渠道结算 · 美金 / USDT / 人民币 / 泰铢并开具正规发票</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                  <Globe2 className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  <span>自主储备数百个原生静态商业 IP 池 · Fraud Score 0 专机专绑</span>
                </div>
                <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400">
                  <Building2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>经过 Google 官方实名认证的真实清迈 1600㎡ 独栋科技实体</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
