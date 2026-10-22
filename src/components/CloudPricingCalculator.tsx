"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function CloudPricingCalculator() {
  const [currency, setCurrency] = useState<"THB" | "CNY">("THB");
  const [duration, setDuration] = useState<number>(1); // 1, 3, 6, 12 months
  const [copied, setCopied] = useState<boolean>(false);

  // Exchange rate: 1 CNY = 5 THB
  const rate = currency === "THB" ? 1 : 0.2;
  const symbol = currency === "THB" ? "฿" : "¥";

  // 1. 微主机 / 共享轻量远程电脑
  const [sharedPc, setSharedPc] = useState({ enabled: true, count: 1, unitPrice: 499 });
  // 2. Mac远程电脑 1V1
  const [macMini, setMacMini] = useState({ enabled: false, count: 1, unitPrice: 2999 });
  // 3. 远程电脑托管
  const [colocation, setColocation] = useState({ enabled: false, count: 1, unitPrice: 1500 });
  // 4. 泰国验证码校验 (按月专属保号)
  const [thaiSms, setThaiSms] = useState({ enabled: false, count: 1, unitPrice: 399 });
  // 5. 独立静态IP
  const [dedicatedIp, setDedicatedIp] = useState({ enabled: true, count: 1, unitPrice: 500 });
  // 6. 泰国小额代充 (按次加价)
  const [microTopup, setMicroTopup] = useState({ enabled: false, count: 5, unitPrice: 50 });
  // 7. API中转 (按量计费包)
  const [apiRelay, setApiRelay] = useState({ enabled: false, tier: 1, unitPrice: 500 });
  // 8. H200使用 (按小时计费)
  const [h200Gpu, setH200Gpu] = useState({ enabled: false, hours: 10, unitPrice: 200 });
  // 9. 企业及团队服务 (详细咨询)
  const [enterprise, setEnterprise] = useState({ enabled: false });

  // Monthly items subtotal
  const monthlySubtotal =
    (sharedPc.enabled ? sharedPc.count * sharedPc.unitPrice : 0) +
    (macMini.enabled ? macMini.count * macMini.unitPrice : 0) +
    (colocation.enabled ? colocation.count * colocation.unitPrice : 0) +
    (thaiSms.enabled ? thaiSms.count * thaiSms.unitPrice : 0) +
    (dedicatedIp.enabled ? dedicatedIp.count * dedicatedIp.unitPrice : 0);

  // Discount for annual (20% off monthly portion)
  const discountRate = duration === 12 ? 0.2 : duration === 6 ? 0.1 : 0;
  const discountedMonthlyTotal = monthlySubtotal * (1 - discountRate);
  const totalMonthlyPlan = discountedMonthlyTotal * duration;

  // Usage & On-demand / One-time subtotal
  const usageSubtotal =
    (microTopup.enabled ? microTopup.count * microTopup.unitPrice : 0) +
    (apiRelay.enabled ? apiRelay.tier * apiRelay.unitPrice : 0) +
    (h200Gpu.enabled ? h200Gpu.hours * h200Gpu.unitPrice : 0);

  // Grand Total Estimate
  const grandTotal = totalMonthlyPlan + usageSubtotal;

  const formatPrice = (amountInTHB: number) => {
    const converted = Math.round(amountInTHB * rate);
    return converted.toLocaleString();
  };

  // Generate Quote Text for Copying / Contact Form
  const generateQuoteDetails = () => {
    let lines = [`【Chiang Mai AI Center - 云工位与算力服务配置预算单】`];
    lines.push(`结算币种: ${currency === "THB" ? "泰铢 (THB ฿)" : "人民币 (CNY ¥)"} | 签约周期: ${duration} 个月`);
    lines.push(`----------------------------------------`);
    
    if (sharedPc.enabled) {
      lines.push(`• 轻量共享型云电脑: ${sharedPc.count} 台 × ${symbol}${formatPrice(sharedPc.unitPrice)}/月`);
    }
    if (macMini.enabled) {
      lines.push(`• Mac 专属云工作站 (1V1独享): ${macMini.count} 台 × ${symbol}${formatPrice(macMini.unitPrice)}/月`);
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
      lines.push(`• 泰国本地小额代充与代缴: ${microTopup.count} 笔 (加收服务费: ${symbol}${formatPrice(microTopup.unitPrice)}/笔)`);
    }
    if (apiRelay.enabled) {
      lines.push(`• 全球大模型 API 聚合中转: ${apiRelay.tier} 档用量包 (${symbol}${formatPrice(apiRelay.tier * apiRelay.unitPrice)})`);
    }
    if (h200Gpu.enabled) {
      lines.push(`• NVIDIA H200 顶级算力租用: ${h200Gpu.hours} 小时 × ${symbol}${formatPrice(h200Gpu.unitPrice)}/小时`);
    }
    if (enterprise.enabled) {
      lines.push(`• 企业及团队出海综合合规落地服务: 已勾选意向 (需商务顾问 1 对 1 定制对接)`);
    }

    lines.push(`----------------------------------------`);
    if (discountRate > 0) {
      lines.push(`周期折扣: ${(discountRate * 100).toFixed(0)}% OFF 特惠减免`);
    }
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
    const text = generateQuoteDetails();
    // Pre-fill trial contact form textarea if present
    const textarea = document.querySelector('input[placeholder*="预计使用场景"]') as HTMLInputElement;
    if (textarea) {
      textarea.value = `已测算配置: ${symbol}${formatPrice(grandTotal)} (含月租+弹性用量)`;
      const event = new Event("input", { bubbles: true });
      textarea.dispatchEvent(event);
    }
    // Scroll to form
    const formElement = document.getElementById("trial");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="calculator" className="py-24 bg-white dark:bg-[#070709] border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-mono text-neutral-600 dark:text-neutral-300 mb-3">
            <Sliders className="w-3.5 h-3.5 text-blue-500" />
            <span>Interactive Service Configurator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-neutral-950 dark:text-white tracking-tight">
            云工位与算力服务测算器
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light mt-2">
            根据您的团队规模、出海业务矩阵与算力需求，自由组合月度订阅与按量弹性服务，即时获取清晰透明的预算明细。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 9 Services Configuration */}
          <div className="lg:col-span-7 space-y-8">
            {/* Category 1: 按月订阅服务 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  01 / 月度订阅基础服务 (Monthly Subscription)
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
                        onChange={(e) => setSharedPc({ ...sharedPc, enabled: e.target.checked })}
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
                          onClick={() => setSharedPc({ ...sharedPc, count: Math.max(1, sharedPc.count - 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{sharedPc.count}</span>
                        <button
                          type="button"
                          onClick={() => setSharedPc({ ...sharedPc, count: Math.min(20, sharedPc.count + 1) })}
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
                        onChange={(e) => setMacMini({ ...macMini, enabled: e.target.checked })}
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
                          100% 独立专属物理 Mac mini，独占 macOS 完整系统权限与统一内存。适配 iOS/macOS 编译打包、Xcode 自动化测试及专业设计。
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
                      <span className="text-neutral-500">独享 Mac 台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setMacMini({ ...macMini, count: Math.max(1, macMini.count - 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{macMini.count}</span>
                        <button
                          type="button"
                          onClick={() => setMacMini({ ...macMini, count: Math.min(10, macMini.count + 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. 远程电脑托管 */}
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
                        onChange={(e) => setColocation({ ...colocation, enabled: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="colocation" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>物理设备/主机机房托管 (Hardware Colocation)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                            光伏绿电 + UPS
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          自带或采购主机入驻清迈独栋机房。提供专属机架位、双路千兆光纤、ColaSola 屋顶光伏与在线式 UPS 不间断供电，7×24H 现场硬件保活。
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
                      <span className="text-neutral-500">托管主机台数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setColocation({ ...colocation, count: Math.max(1, colocation.count - 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{colocation.count}</span>
                        <button
                          type="button"
                          onClick={() => setColocation({ ...colocation, count: Math.min(10, colocation.count + 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. 泰国验证码校验 */}
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
                        onChange={(e) => setThaiSms({ ...thaiSms, enabled: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="thaiSms" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>泰国原生实体卡短信验证码服务 (Thai SMS / OTP)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            专属保号 · 本地银行/电商核验
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          泰国真实实体 SIM 卡池，独享长期号码。深度适配泰国商业银行 App、Shopee、Lazada、TikTok Thailand、Line 等本土严风控账号注册与二次核验。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(thaiSms.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /月/号</span>
                      </div>
                    </div>
                  </div>

                  {thaiSms.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-xs">
                      <span className="text-neutral-500">专属长期号码数：</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setThaiSms({ ...thaiSms, count: Math.max(1, thaiSms.count - 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{thaiSms.count}</span>
                        <button
                          type="button"
                          onClick={() => setThaiSms({ ...thaiSms, count: Math.min(10, thaiSms.count + 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. 独立静态 IP */}
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
                        onChange={(e) => setDedicatedIp({ ...dedicatedIp, enabled: e.target.checked })}
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
                          onClick={() => setDedicatedIp({ ...dedicatedIp, count: Math.max(1, dedicatedIp.count - 1) })}
                          className="w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 flex items-center justify-center font-mono hover:bg-neutral-200 dark:hover:bg-neutral-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-mono font-medium">{dedicatedIp.count}</span>
                        <button
                          type="button"
                          onClick={() => setDedicatedIp({ ...dedicatedIp, count: Math.min(20, dedicatedIp.count + 1) })}
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

            {/* Category 2: 弹性按次与按量服务 */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
                  02 / 弹性按次与按量计费服务 (Usage-Based &amp; On-Demand)
                </span>
                <span className="text-xs text-neutral-400 font-mono">用多少充多少 · 灵活透明</span>
              </div>

              <div className="space-y-4">
                {/* 6. 泰国小额代充 (按次直接加价) */}
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
                        onChange={(e) => setMicroTopup({ ...microTopup, enabled: e.target.checked })}
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
                        onChange={(e) => setMicroTopup({ ...microTopup, count: parseInt(e.target.value) })}
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

                {/* 7. API中转，按量计费 */}
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
                        onChange={(e) => setApiRelay({ ...apiRelay, enabled: e.target.checked })}
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
                          高可用聚合中转通道，兼容 OpenAI 原生接口格式。免魔法低延迟直连，按 Token 实际消耗扣费，保障企业高并发吞吐。
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
                            onClick={() => setApiRelay({ ...apiRelay, tier: t })}
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

                {/* 8. H200使用，按小时计费 */}
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
                        onChange={(e) => setH200Gpu({ ...h200Gpu, enabled: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                      />
                      <div>
                        <label htmlFor="h200Gpu" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                          <span>NVIDIA H200 顶级 GPU 算力按需租用 (按小时计费)</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300">
                            141GB HBM3e · 4.8TB/s
                          </span>
                        </label>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                          全球顶级大模型训练与推理加速卡，专为千亿参数私有大模型微调、复杂智能体集群与高强度研发打造。秒级开机，按小时精确扣费。
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm font-medium text-neutral-950 dark:text-white font-mono">
                        {symbol}{formatPrice(h200Gpu.unitPrice)}
                        <span className="text-xs text-neutral-500 font-normal"> /小时</span>
                      </div>
                    </div>
                  </div>

                  {h200Gpu.enabled && (
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-800/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-500">预估月度使用时长：</span>
                        <span className="font-mono font-medium">{h200Gpu.hours} 小时 / 月</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="100"
                        step="2"
                        value={h200Gpu.hours}
                        onChange={(e) => setH200Gpu({ ...h200Gpu, hours: parseInt(e.target.value) })}
                        className="w-full accent-neutral-900 dark:accent-white cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                        <span>2 小时</span>
                        <span>50 小时</span>
                        <span>100 小时</span>
                      </div>
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

              {/* 9. 企业及团队服务 */}
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
                      onChange={(e) => setEnterprise({ enabled: e.target.checked })}
                      className="mt-1 w-4 h-4 rounded text-neutral-900 focus:ring-neutral-800 cursor-pointer"
                    />
                    <div>
                      <label htmlFor="enterprise" className="font-medium text-sm text-neutral-950 dark:text-white cursor-pointer flex items-center gap-2">
                        <span>企业及团队出海综合合规商业主体落地</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                          BOI · LTR签证 · 牌照代办
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
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                  Estimated Investment
                </span>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-light text-neutral-950 dark:text-white tracking-tight">
                    {symbol}{formatPrice(grandTotal)}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    / {duration} 个月周期预计总支出
                  </span>
                </div>

                {discountRate > 0 && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>已享长期签约 {(discountRate * 100).toFixed(0)}% 折扣优惠</span>
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
                  <span>合规海外 AI 中心原生网络 · ChatGPT / Claude 极低封号风险</span>
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
