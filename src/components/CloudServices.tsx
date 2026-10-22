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
  ArrowRight,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

interface ServiceDetail {
  id: string;
  badge: string;
  billingType: string;
  title: string;
  summary: string;
  icon: React.ReactNode;
  specs: string[];
  scenarios: string[];
  highlights: string[];
}

export default function CloudServices() {
  const [activeModal, setActiveModal] = useState<ServiceDetail | null>(null);

  const services: ServiceDetail[] = [
    {
      id: "shared_pc",
      badge: "基础计算",
      billingType: "按月订阅",
      title: "轻量共享型云电脑 (微主机)",
      summary: "基于高密度计算池虚拟化的海外轻量云桌面，预装出海防关联与自动化办公环境，超高性价比。",
      icon: <Server className="w-5 h-5 text-blue-500" />,
      specs: ["多核弹性调度 vCPU", "4GB - 8GB 动态内存", "50GB NVMe 高速缓存", "中泰 IPLC 直连优化"],
      scenarios: ["跨境电商多店铺安全挂机值守", "社交媒体日常运营与内容发布", "轻量自动化脚本与数据抓取", "团队分布式远程办公终端"],
      highlights: [
        "免去高额物理硬件采购，即开即用秒级交付",
        "环境彼此隔离独立，防止浏览器指纹互串",
        "可无缝叠加独享原生商业 IP 与泰国短信验证码",
      ],
    },
    {
      id: "mac_mini",
      badge: "苹果生态",
      billingType: "按月独享",
      title: "Mac 专属云工作站 (1V1 独享 Apple Silicon)",
      summary: "100% 独立专属物理 Mac mini (M系列芯片)，独占 macOS 完整系统权限、统一内存与千兆网络。",
      icon: <Monitor className="w-5 h-5 text-purple-500" />,
      specs: ["Apple M 系列芯片独占", "8GB - 16GB 统一极速内存", "256GB - 512GB 高速闪存", "macOS 最新原厂系统支持"],
      scenarios: ["iOS / iPadOS / macOS 软件编译与 Xcode 自动化", "Flutter / React Native 跨平台构建打包", "高安全企业设计与财务保密环境", "海外 Apple 开发者账号认证与应用上架"],
      highlights: [
        "非虚拟机，1V1 独占真实物理 Mac 硬件，性能毫无衰减",
        "支持 Moonlight / Parsec 60FPS 超清流畅串流操作",
        "支持客户自装专用描述文件与正版生产力软件",
      ],
    },
    {
      id: "colocation",
      badge: "物理托管",
      billingType: "按月托管",
      title: "物理设备/主机机房托管 (Hardware Colocation)",
      summary: "自带或采购主机入驻清迈独栋机房。提供专属机架位、双路千兆光纤、ColaSola 光伏绿电与 APC UPS 保障。",
      icon: <HardDrive className="w-5 h-5 text-emerald-500" />,
      specs: ["标准 1U/2U/塔式机架位", "双路市电 + ColaSola 绿电微电网", "APC 在线式 UPS 零秒倒闸", "双路独立千兆光纤直连"],
      scenarios: ["跨境企业自备高密工控机与边缘节点", "深度学习私有服务器与 NAS 阵列异地备份", "出海长期专属节点硬件资产自主把控", "本地局域网与跨国专线混合云组网"],
      highlights: [
        "清迈 AI 中心独栋五层实体保障，24 小时恒温恒湿监控",
        "现场专人提供硬重启、重装系统与网线插拔运维",
        "PUE 仅 1.15，享有光伏绿电低能耗长期成本优势",
      ],
    },
    {
      id: "thai_sms",
      badge: "本地实名",
      billingType: "按月保号",
      title: "泰国原生实体卡短信验证码服务 (Thai SMS / OTP)",
      summary: "配备泰国本地实体 SIM 卡池，提供专属长期号码或即时动态验证码，深度适配本土银行与电商核验。",
      icon: <Smartphone className="w-5 h-5 text-amber-500" />,
      specs: ["泰国 AIS / TrueMove / Dtac 实体卡", "专属独享号码长期持有保号", "即时 Web 接收面板 / 消息推送", "支持语音短信与关键二次风控"],
      scenarios: ["开通泰国商业银行 App (Kasikorn / SCB / Bangkok Bank)", "Shopee Thailand / Lazada Thailand 本地店入驻", "TikTok Shop 泰国本土店与 Line 官方号注册", "本地水电网络账单绑定与二次身份确认"],
      highlights: [
        "非虚拟接码平台，100% 真实泰国物理 SIM 卡",
        "支持长期专属保号，随时应对平台抽检二次验证",
        "全流程合规安全，配合本地公司主体设立无缝串联",
      ],
    },
    {
      id: "dedicated_ip",
      badge: "网络风控",
      billingType: "按月独享",
      title: "独立海外原生静态商业 IP (Clean ASN)",
      summary: "100% 独享纯净海外原生商业 IP，Fraud Score 欺诈检测为 0。一人一 IP 专线专绑，防封店防关联。",
      icon: <Globe2 className="w-5 h-5 text-indigo-500" />,
      specs: ["纯净原生海外商业/住宅 ASN", "Fraud Score 欺诈分值恒为 0", "一人一 IP 专线物理绑定", "支持绑定指定云工位与路由器"],
      scenarios: ["TikTok 跨境直播与精细化运营，避免限流降权", "亚马逊、Shopify、Etsy 严风控店铺防关联", "PayPal、Stripe 跨国收款机构风控过审", "海外搜索引擎与商业广告投放安全账户隔离"],
      highlights: [
        "绝非多人共用的公共代理池，杜绝连带封号悲剧",
        "中泰 IPLC SD-WAN 专线直达，低延迟不跳国家节点",
        "可随云电脑一同采购，亦支持单独分配绑定自有设备",
      ],
    },
    {
      id: "micro_topup",
      badge: "本地支付",
      billingType: "按次加价",
      title: "泰国本地小额代充与代缴 (Thai Micro-payment)",
      summary: "支持 PromptPay 实时扫码代付、TrueMoney 充值、话费流量充值与本地水电账单代缴，按笔透明加收服务费。",
      icon: <Coins className="w-5 h-5 text-teal-500" />,
      specs: ["支持 PromptPay 动态扫码即时到账", "TrueMoney 电子钱包充值", "AIS / True 话费与流量充值", "商用水电/物业/政府规费合规代缴"],
      scenarios: ["无泰国本地银行卡的开发者支付小额测试账单", "跨境团队本地生活与办公日常充值与代付", "本土电商小额采购款与快递到付即时代缴", "各类本地服务商按月账单托管垫付"],
      highlights: [
        "合规对公与对私通道，即充即结，账目明晰",
        "无需繁琐换汇手续，直接人民币/USDT 结算",
        "按笔透明加收少量服务费，无隐藏费率",
      ],
    },
    {
      id: "api_relay",
      badge: "AI 算力通道",
      billingType: "按量计费",
      title: "全球大模型 API 聚合中转网关 (AI API Relay)",
      summary: "高可用聚合中转通道，全面支持 Claude 5.5 / 5.6、OpenAI GPT-6、DeepSeek 等顶尖大模型。免翻墙按量计费。",
      icon: <Bot className="w-5 h-5 text-blue-600" />,
      specs: ["兼容 OpenAI / Anthropic 官方接口标准", "聚合 Claude 5.5/5.6 · GPT-6 · DeepSeek", "毫秒级专线直连欧美服务器", "企业级高并发 QPS 弹性保障"],
      scenarios: ["国内应用免翻墙极速调用海外最新模型", "企业 AI 智能体 (Agent) 与知识库 RAG 构建", "多模型负载均衡与自动容灾故障切换", "团队集中用量监控、配额切分与成本控制"],
      highlights: [
        "官方正版 API 接口通道，不封号不掉线",
        "按 Token 实际用量实时扣减，支持额度包预充",
        "提供可视化后台管理仪表盘，Token 消耗清晰透明",
      ],
    },
    {
      id: "h200_gpu",
      badge: "顶级算力",
      billingType: "按小时计费",
      title: "NVIDIA H200 顶级 GPU 算力按需租用",
      summary: "全球顶级 AI 加速卡，搭载 141GB 超大 HBM3e 极速显存与 4.8TB/s 带宽。秒级开机，按小时精确计费。",
      icon: <Cpu className="w-5 h-5 text-amber-600" />,
      specs: ["141GB HBM3e 超高带宽显存", "4.8 TB/s 显存吞吐速率", "预装 PyTorch 2.4 / vLLM / CUDA 12.4", "支持千亿参数大模型全参数微调"],
      scenarios: ["百亿至千亿级大模型私有化持续预训练与 SFT", "超长上下文 RAG 与复杂多智能体竞技推演", "自动驾驶与具身智能高通量仿真训练", "短周期算力突发型研发项目的弹性租用"],
      highlights: [
        "免去百万级硬件采购风险，随租随用，关机停扣",
        "独栋机房绿电稳定供电，配备高速本地 NVMe 存储池",
        "专业 AI 基础设施运维团队提供环境镜像预置支持",
      ],
    },
    {
      id: "enterprise_entity",
      badge: "商业合规",
      billingType: "定制咨询",
      title: "企业及团队出海综合合规落地 (Enterprise Entity)",
      summary: "包含泰国公司设立注册、BOI 投资委高新资质申请、LTR 长期签证、银行开户与本地财税代理全托管。",
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      specs: ["泰国商业发展局 (DBD) 注册合规设立", "BOI 科技投资委 100% 外资控股与税收减免", "长期居留签证 (LTR / Smart Visa) 办理", "商业银行公司对公账户开设及网银认证"],
      scenarios: ["中国科技与 AI 公司正式设立东南亚出海桥头堡", "跨境电商与跨国研发团队本地化实体落地", "高净值数字游民与科技高管长期合规旅居居留", "享受泰国 8 年免企业所得税与外籍人才优惠个税政策"],
      highlights: [
        "中泰资深法务与财税专家团队一站式全程代办",
        "与清迈 AI 中心独栋办公空间租约深度绑定，审批通过率极高",
        "专属商务顾问 1 对 1 定制对接，保姆式合规落地",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#f8f8fa] dark:bg-[#0c0c0e] border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-3xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono">
              Nine Core Services Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-neutral-950 dark:text-white tracking-tight mt-1">
              全景式出海云工位与算力服务矩阵
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-light mt-2">
              从基础云电脑、物理机房托管，到泰国本地合规配套与顶级 H200 算力，为出海企业提供一站式基础设施支持。
            </p>
          </div>

          <a
            href="#calculator"
            className="px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-medium transition-all shadow-xs flex items-center gap-2 self-start md:self-auto shrink-0"
          >
            <span>直接前往价格测算器</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv) => (
            <div
              key={srv.id}
              onClick={() => setActiveModal(srv)}
              className="group p-7 rounded-3xl bg-white dark:bg-neutral-950/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all cursor-pointer shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200/60 dark:border-neutral-800/60 group-hover:scale-105 transition-transform">
                    {srv.icon}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
                      {srv.badge}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium">
                      {srv.billingType}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-neutral-950 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
                  {srv.summary}
                </p>

                <div className="space-y-2 mb-6">
                  {srv.specs.slice(0, 3).map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors">
                <span>查看规格与场景详情</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-900 text-neutral-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                  {activeModal.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-neutral-500">{activeModal.badge}</span>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                      {activeModal.billingType}
                    </span>
                  </div>
                  <h3 className="text-xl font-medium text-neutral-950 dark:text-white mt-0.5">
                    {activeModal.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-300 font-light leading-relaxed mb-6 pb-6 border-b border-neutral-200 dark:border-neutral-800">
                {activeModal.summary}
              </p>

              {/* Specs & Scenarios */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-3">
                    技术配置与特性
                  </h4>
                  <div className="space-y-2">
                    {activeModal.specs.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-3">
                    核心适用业务场景
                  </h4>
                  <div className="space-y-2">
                    {activeModal.scenarios.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 mb-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 font-mono mb-2">
                  清迈 AI 中心独特保障
                </h4>
                <div className="space-y-1.5">
                  {activeModal.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-neutral-600 dark:text-neutral-300 flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
                <span className="text-xs text-neutral-500 font-mono">
                  可在下方测算器中自由组合配置
                </span>
                <a
                  href="#calculator"
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-xs sm:text-sm font-medium transition-all"
                >
                  去测算该项费用
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
