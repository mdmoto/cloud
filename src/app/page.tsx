"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CloudServices from "@/components/CloudServices";
import CloudPricingCalculator from "@/components/CloudPricingCalculator";
import {
  Cpu,
  Zap,
  Globe2,
  ShieldCheck,
  Server,
  Terminal,
  Activity,
  Layers,
  CheckCircle2,
  Lock,
  ArrowRight,
  HardDrive,
  Sparkles,
  ChevronRight,
  Send,
  Building,
  MonitorCheck,
  ArrowUpRight,
  Check
} from "lucide-react";

export default function CloudHomePage() {
  const [currentBg, setCurrentBg] = useState(0);
  const [selectedWorkload, setSelectedWorkload] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [trialForm, setTrialForm] = useState({
    name: "",
    contact: "",
    plan: "轻量共享型云电脑 (微主机)",
    usage: "",
  });

  const heroBackgrounds = [
    "/images/image_1.jpg",
    "/images/image_2.jpg",
    "/images/image_5.jpg",
    "/images/image_10.jpg",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  const workloads = [
    {
      id: "llm",
      title: "大语言模型微调与推理",
      badge: "LLM & RAG",
      gpu: "NVIDIA RTX 4090 / A100 (24GB - 80GB)",
      stack: "vLLM · Ollama · PyTorch 2.4 · CUDA 12.4 · TensorRT-LLM · DeepSpeed",
      speed: "180+ tokens/sec",
      description:
        "一键部署高吞吐量本地推理引擎与轻量微调环境，支持 Llama 3、DeepSeek、Qwen 2.5 等开源基座模型私有化部署与企业级 RAG 知识检索流水线。",
      features: [
        "预装 vLLM / Ollama / FastChat 开箱即用",
        "挂载 HuggingFace / ModelScope 极速镜像加速源",
        "支持 LangChain / Dify / FastGPT 快速对接",
        "物理内网隔离，保护企业专有数据资产不外泄",
      ],
    },
    {
      id: "vision",
      title: "生成式 AI 视觉与视频流水线",
      badge: "ComfyUI / Diffusion",
      gpu: "NVIDIA RTX 4090 (24GB VRAM)",
      stack: "ComfyUI · Stable Diffusion XL · FLUX.1 · Animatediff · ControlNet",
      speed: "0.8s / 1024x1024 帧",
      description:
        "预装官方与社区最全 ComfyUI 节点与常用模型权重，支持 4K 超清出图、动态数字人与电商批量高保真素材自动化生成。",
      features: [
        "整合 FLUX.1 / SD-XL / Kolors 商业主流基模",
        "预挂载数百款热门商用 LoRA 与 ControlNet 预处理器",
        "支持 Moonlight / Parsec 60FPS 超低延迟远程桌面操作",
        "直连高速 NVMe 缓存盘，出图与批量渲染无卡顿",
      ],
    },
    {
      id: "crossborder",
      title: "跨境电商多矩阵与海外运营",
      badge: "Clean ASN / Static IP",
      gpu: "高频 8-16 vCPU + 独立专线",
      stack: "Dedicated Clean IP · Anti-Detect Sandbox · IPLC SD-WAN · Dual-Auth",
      speed: "原生住宅/商业 IP · 零风控识别",
      description:
        "独占纯净海外原生商业 IP 与独立环境沙箱，彻底避免 TikTok 跨境电商、亚马逊、独立站等多账号关联封禁与地域风控。",
      features: [
        "100% 纯净原生商业 IP，ASN 干净无不良历史记录",
        "多虚拟环境硬件指纹隔离，防关联防风控",
        "中泰 IPLC 直连低延迟专线，操作不掉线不卡顿",
        "支持团队多权限分级管理，安全高效协同",
      ],
    },
    {
      id: "sandbox",
      title: "远程高安全研发工作站",
      badge: "Secure Dev Sandbox",
      gpu: "8-32 vCPU + 32-128GB RAM",
      stack: "VS Code Server · JetBrains Gateway · Docker · WireGuard · Audit Logs",
      speed: "端到端硬件级加密传输",
      description:
        "源码全流程运行在清迈 AI 中心自建机房，代码不落地、访问可审计、环境统一标准化，赋能跨国分布式开发团队无缝敏捷协作。",
      features: [
        "VS Code / JetBrains Gateway 远程一键直连",
        "支持 Docker 容器秒级编排与即时快照备份",
        "全程 TLS 加密隧道与细粒度访问权限控制",
        "可无感挂载大容量 NAS 集中存储与版本管理",
      ],
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setTrialForm({
        name: "",
        contact: "",
        plan: "轻量共享型云电脑 (微主机)",
        usage: "",
      });
    }, 4000);
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 transition-colors">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section with Photographic Carousel */}
        <section className="relative w-full overflow-hidden border-b border-neutral-200/80 dark:border-neutral-800/80 pt-16 pb-24 lg:pt-24 lg:pb-32 bg-white dark:bg-[#070709]">
          {/* Background Rotating Images with Gentle Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 0.18, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={heroBackgrounds[currentBg]}
                  alt="Chiang Mai AI Center Facility"
                  fill
                  priority
                  className="object-cover object-center filter grayscale contrast-125 brightness-95"
                />
              </motion.div>
            </AnimatePresence>
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-white/95 dark:from-[#070709]/95 dark:via-[#070709]/80 dark:to-[#070709]/95" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="max-w-3xl">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100/90 dark:bg-neutral-800/90 border border-neutral-200/80 dark:border-neutral-700/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-md mb-6 shadow-xs"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Chiang Mai AI Center · 自建算力集群与专线枢纽</span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-950 dark:text-white leading-[1.12] mb-6"
              >
                秒级开箱即用的
                <br />
                <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                  企业级跨境 AI 云工位
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-10 max-w-2xl"
              >
                专为全球分布式研发团队、AI 研究员与出海企业打造的高性能云端工作站。预装全套主流 AI 开发环境，独享中泰低延迟专线与纯净海外静态原生商业 IP。
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <a
                  href="#calculator"
                  className="px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-medium transition-all shadow-sm hover:scale-[1.02] flex items-center gap-2"
                >
                  <span>在线选定与测算费用</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#services"
                  className="px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 dark:hover:border-neutral-600 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md text-neutral-800 dark:text-neutral-200 text-sm font-medium transition-all"
                >
                  查看九大服务矩阵
                </a>

                <a
                  href="https://lazzor.com/workspace"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-full text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white text-sm font-medium transition-colors flex items-center gap-1.5"
                >
                  <span>了解清迈独栋物理办公空间</span>
                  <ArrowUpRight className="w-4 h-4 opacity-60" />
                </a>
              </motion.div>
            </div>

            {/* 4 Core Performance Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-16 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/80"
            >
              <div className="p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-1">
                  <span className="text-xs font-mono">中泰专线延迟</span>
                  <Activity className="w-4 h-4 text-blue-500" />
                </div>
                <div className="text-2xl font-medium text-neutral-900 dark:text-white tracking-tight">
                  &lt; 18 ms
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                  IPLC SD-WAN 直连
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-1">
                  <span className="text-xs font-mono">SLA 业务可用性</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-medium text-neutral-900 dark:text-white tracking-tight">
                  99.99%
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                  企业级高可用保活
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-1">
                  <span className="text-xs font-mono">海外原生商业 IP</span>
                  <Globe2 className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-medium text-neutral-900 dark:text-white tracking-tight">
                  100% 独享
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                  Clean ASN 零风控识别
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50/80 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-sm">
                <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 mb-1">
                  <span className="text-xs font-mono">算力开通速度</span>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-medium text-neutral-900 dark:text-white tracking-tight">
                  即开即用
                </div>
                <div className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-0.5">
                  预装环境极速交付
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Workload Engines & Stack */}
        <section className="py-24 bg-[#f8f8fa] dark:bg-[#0c0c0e] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-2xl mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
                Workload Environments
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 dark:text-white tracking-tight mt-1">
                针对四大主流核心生产场景深度调优
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light mt-2">
                无需浪费数天反复配置驱动、CUDA 版本与网络环境，每个实例均预调优最佳显存利用率与推理调度引擎。
              </p>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4">
              {workloads.map((wl, index) => (
                <button
                  key={wl.id}
                  onClick={() => setSelectedWorkload(index)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    selectedWorkload === index
                      ? "bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 shadow-sm"
                      : "bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-800"
                  }`}
                >
                  {wl.title}
                </button>
              ))}
            </div>

            {/* Active Tab Panel */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-xs">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[11px] font-mono text-neutral-600 dark:text-neutral-300 mb-3">
                      <span>{workloads[selectedWorkload].badge}</span>
                    </div>
                    <h3 className="text-2xl font-normal text-neutral-950 dark:text-white mb-3">
                      {workloads[selectedWorkload].title}
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
                      {workloads[selectedWorkload].description}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      {workloads[selectedWorkload].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
                          <Check className="w-4 h-4 text-neutral-900 dark:text-white shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-4">
                    <a
                      href="#trial"
                      className="px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-medium transition-all"
                    >
                      即刻体验该环境
                    </a>
                    <span className="text-xs text-neutral-500 font-mono">
                      实机配置随时可弹性扩展
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80 flex flex-col justify-between">
                  <div className="space-y-5">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-500">
                        推荐核心算力硬件
                      </span>
                      <div className="text-sm font-medium text-neutral-900 dark:text-white mt-1">
                        {workloads[selectedWorkload].gpu}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-500">
                        基准吞吐能力
                      </span>
                      <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1 font-mono">
                        {workloads[selectedWorkload].speed}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] uppercase tracking-wider font-mono text-neutral-500">
                        预装技术生态与驱动
                      </span>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 font-mono leading-relaxed">
                        {workloads[selectedWorkload].stack}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
                    <span className="text-[11px] text-neutral-500 font-mono">
                      机房直连物理千兆内网 · 低至 1ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9 Core Services Matrix (Mirroring workspace Services format) */}
        <CloudServices />

        {/* Interactive Pricing & Solution Configurator (Mirroring workspace PricingCalculator format) */}
        <CloudPricingCalculator />

        {/* Physical Building & Green Energy Advantage */}
        <section className="py-24 bg-[#f8f8fa] dark:bg-[#0c0c0e] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
                  Physical Infrastructure &amp; Green Power
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-neutral-950 dark:text-white tracking-tight mt-2 mb-6">
                  独栋五层实体大楼
                  <br />
                  自建机房与光伏微电网底座
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6">
                  区别于普通转售型公有云，清迈 AI 云工位基于我们自主运营的 1600㎡ 独栋五层大楼。
                  本地部署专属机架、双路千兆光纤直连，配备冗余发电机与 APC 在线式 UPS，并深度集成 ColaSola 屋顶光伏分布式微电网，实现 100% 绿色清洁电力直驱。
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="font-medium text-sm text-neutral-950 dark:text-white mb-1">
                      物理与云端无感融合
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      入驻清迈 AI 中心的团队可直接内网千兆直连本地算力，外出或跨国协作无缝切换远程专线。
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                    <div className="font-medium text-sm text-neutral-950 dark:text-white mb-1">
                      ColaSola 100% 绿电直供
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      屋顶大功率光伏系统源源不断输出清洁电力，PUE 达 1.15，助您达成 ESG 碳减排指标。
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://lazzor.com/workspace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
                  >
                    <span>参观清迈 AI 中心独栋大楼 (1-5楼)</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>

                  <a
                    href="https://colasola.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5"
                  >
                    <span>了解 ColaSola 光伏系统集成</span>
                    <ArrowUpRight className="w-4 h-4 opacity-70" />
                  </a>
                </div>
              </div>

              {/* Building Facility Preview Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <Image
                    src="/images/image_1.jpg"
                    alt="Building Exterior"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-white font-mono">
                    独栋五层科技大楼
                  </div>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <Image
                    src="/images/image_2.jpg"
                    alt="Workstation Facilities"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-white font-mono">
                    全挑高实体工位
                  </div>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <Image
                    src="/images/image_5.jpg"
                    alt="Server Room Ready"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-white font-mono">
                    自建高密算力机房
                  </div>
                </div>

                <div className="relative aspect-4/3 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm">
                  <Image
                    src="/images/image_10.jpg"
                    alt="Conference & Collaboration"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[11px] text-white font-mono">
                    音视频研讨会议室
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Application & Trial Form */}
        <section id="trial" className="py-24 bg-white dark:bg-[#070709] border-b border-neutral-200 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
                Get Started Today
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 dark:text-white tracking-tight mt-1">
                申请免费试用或定制算力工位
              </h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 font-light mt-2">
                填写您的需求，专业技术架构师将在 30 分钟内与您联系并为您分配测试实例。
              </p>
            </div>

            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      姓名 / 称呼 *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例如：Alex Wang"
                      value={trialForm.name}
                      onChange={(e) => setTrialForm({ ...trialForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      联系方式 (微信 / 手机 / Telegram / 邮箱) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="WeChat ID / @handle / 邮箱"
                      value={trialForm.contact}
                      onChange={(e) => setTrialForm({ ...trialForm, contact: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      意向方案 / 算力需求
                    </label>
                    <select
                      value={trialForm.plan}
                      onChange={(e) => setTrialForm({ ...trialForm, plan: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    >
                      <option value="轻量共享型云电脑 (微主机)">轻量共享型云电脑 (微主机)</option>
                      <option value="Mac 专属云工作站 (1V1 Apple Silicon)">Mac 专属云工作站 (1V1 Apple Silicon)</option>
                      <option value="物理设备/主机机房托管">物理设备/主机机房托管</option>
                      <option value="泰国原生实体卡短信验证码校验">泰国原生实体卡短信验证码校验</option>
                      <option value="独立海外原生静态商业 IP">独立海外原生静态商业 IP</option>
                      <option value="泰国本地小额代充与代缴">泰国本地小额代充与代缴</option>
                      <option value="全球大模型 API 聚合中转网关">全球大模型 API 聚合中转网关</option>
                      <option value="NVIDIA H200 顶级 GPU 算力按需租用">NVIDIA H200 顶级 GPU 算力按需租用</option>
                      <option value="企业及团队出海综合合规商业落地">企业及团队出海综合合规商业落地</option>
                      <option value="组合配置定制与整体方案">组合配置定制与整体方案 (详见测算清单)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                      预计使用场景
                    </label>
                    <input
                      type="text"
                      placeholder="例如：ComfyUI 动态视频批量生成、跨境电商多矩阵、LLM 微调"
                      value={trialForm.usage}
                      onChange={(e) => setTrialForm({ ...trialForm, usage: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white"
                    />
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-neutral-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>我们承诺严格保护您的个人与企业数据隐私安全</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-sm font-medium transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>提交申请 (30分钟内快速响应)</span>
                  </button>
                </div>
              </form>

              {formSubmitted && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>已收到您的试用申请！架构师将在 30 分钟内通过微信或邮箱与您联系。</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-[#f8f8fa] dark:bg-[#0c0c0e]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center max-w-xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
                FAQ
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-950 dark:text-white tracking-tight mt-1">
                常见问题解答
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="text-base font-medium text-neutral-950 dark:text-white mb-2">
                  Q: 国内连接清迈云工位的延迟如何？操作会卡顿吗？
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  A: 我们依托自建的中泰 IPLC SD-WAN 专线通道，经昆明直达清迈，物理往返延迟仅 &lt;18ms。结合 Parsec 或 Moonlight 60FPS 超低延迟流式传输，画面跟手度与本地主机无异。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="text-base font-medium text-neutral-950 dark:text-white mb-2">
                  Q: 提供的海外原生静态商业 IP 是否安全？会被平台封禁吗？
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  A: 每个分配的静态商业 IP 均为我们直采的一手海外商业或住宅 ASN，绝非公共代理池或脏 IP。Fraud Score 欺诈检测为 0，专线专享，完美适配 TikTok、亚马逊、Shopify 等严风控出海平台。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="text-base font-medium text-neutral-950 dark:text-white mb-2">
                  Q: 如果我们团队入驻清迈实体大楼，如何与云工位算力协同？
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  A: 这是我们的核心独特优势！清迈 AI 中心 1-5 楼办公空间的工位直接与自建机房通过物理万兆局域网互通，桌面前端即可千兆直连算力集群，无公网传输损耗；外出时自动切入专线安全接入。
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                <h4 className="text-base font-medium text-neutral-950 dark:text-white mb-2">
                  Q: 算力实例如何计费？支持哪些支付方式？
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                  A: 支持按月弹性订阅或年度合约（年付享 8 折特惠）。结算支持微信支付、支付宝、泰铢 PromptPay / 银行对公转账、USDT 以及国际商业电汇，并可开具正规税务发票或商业合同。
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
