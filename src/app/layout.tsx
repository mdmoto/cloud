import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 云工位 | 清迈 AI 中心 (Chiang Mai AI Center)",
  description: "企业级跨境 AI 云工位与高性能 GPU 算力工作站。独享中泰超低延迟专线、纯净海外原生商业 IP，预装主流大模型与生成式视觉开发环境。",
  keywords: "AI云工位, GPU算力, 清迈AI中心, 中泰专线, ComfyUI, Ollama, vLLM, 跨境AI工作站, 静态商业IP",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#09090b] text-neutral-900 dark:text-neutral-100 selection:bg-neutral-800 selection:text-white dark:selection:bg-neutral-200 dark:selection:text-black">
        {children}
      </body>
    </html>
  );
}
