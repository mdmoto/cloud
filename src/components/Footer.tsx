import React from "react";
import { ArrowUpRight, ShieldCheck, Mail, MapPin, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1 flex flex-col gap-3">
            <span className="font-semibold text-neutral-950 dark:text-white text-base">
              Chiang Mai AI Center
            </span>
            <span className="text-xs text-neutral-500 font-mono">
              cloud.lazzor.com · Enterprise AI Cloud Desk
            </span>
            <p className="text-xs text-neutral-500 leading-relaxed mt-1">
              以清迈 AI 独栋大楼自建算力中心与中泰专线为底座，为全球 AI 开发者、出海跨国团队与科研机构提供极速、安全、绿色的分布式云工位。
            </p>
          </div>

          {/* Portal Matrix */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-xs uppercase tracking-wider mb-1">
              生态矩阵
            </h4>
            <a
              href="https://lazzor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>清迈 AI 中心官网</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
            <a
              href="https://lazzor.com/workspace"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>探索办公空间 (1-5楼)</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
            <a
              href="https://ai.lazzor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>AI 商业决策沙盘</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
            <a
              href="https://colasola.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>ColaSola 光伏系统集成</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
            <a
              href="https://lazzor.com/contract"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              <span>在线签约系统 (8折特惠)</span>
              <ArrowUpRight className="w-3 h-3 opacity-40" />
            </a>
          </div>

          {/* Compute & Connectivity */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-xs uppercase tracking-wider mb-1">
              算力与技术规范
            </h4>
            <span className="text-xs">NVIDIA RTX 4090 / A100 / H100</span>
            <span className="text-xs">中泰 IPLC SD-WAN 专线（&lt;18ms）</span>
            <span className="text-xs">海外原生专属静态商业 IP (Clean ASN)</span>
            <span className="text-xs">ColaSola 100% 屋顶分布式光伏绿电</span>
            <span className="text-xs">企业级 99.99% SLA 高可用保活</span>
          </div>

          {/* Location & Contact */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-neutral-900 dark:text-white text-xs uppercase tracking-wider mb-1">
              实体大楼与联系方式
            </h4>
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-neutral-400" />
              <span>236/105 Nong Hoi, Mueang Chiang Mai, 50000 Thailand</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Mail className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
              <a href="mailto:mdmoto@gmail.com" className="hover:text-neutral-950 dark:hover:text-white transition-colors">
                mdmoto@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-neutral-400 font-semibold text-[11px]">WeChat:</span>
              <span className="font-mono text-neutral-800 dark:text-neutral-200">cmai_support</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-neutral-400 font-semibold text-[11px]">LINE:</span>
              <span className="font-mono text-neutral-800 dark:text-neutral-200">@cmai_center</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Globe className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
              <span>lazzor.com · colasola.com</span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-neutral-100 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Chiang Mai AI Center / ColaSola Co., Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Clean Solar &amp; Ultra-Low Latency Fiber</span>
            <a
              href="https://lazzor.com"
              className="hover:text-neutral-950 dark:hover:text-white transition-colors"
            >
              lazzor.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
