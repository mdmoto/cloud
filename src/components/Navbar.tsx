"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowUpRight, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { label: string; href: string; external: boolean; active?: boolean }[] = [
    { label: "官网主页", href: "https://lazzor.com", external: true },
    { label: "探索办公空间", href: "https://lazzor.com/workspace", external: true },
    { label: "服务矩阵", href: "#services", external: false },
    { label: "费用测算", href: "#calculator", external: false },
    { label: "光伏系统集成", href: "https://colasola.com", external: true },
    { label: "商业决策沙盘", href: "https://ai.lazzor.com", external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-neutral-200/60 dark:border-neutral-800/60 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a
          href="https://lazzor.com"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 flex items-center justify-center">
            <Cpu className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px] tracking-tight text-neutral-950 dark:text-white flex items-center gap-1.5">
              Chiang Mai AI Center
              <span className="px-1.5 py-0.5 text-[10px] font-mono uppercase rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                Cloud
              </span>
            </span>
            <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium">
              企业级 AI 云工位 · 算力中心
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-neutral-100/70 dark:bg-neutral-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-200/60 dark:border-neutral-800/60 shadow-xs">
          {navLinks.map((item) => {
            const classes = `relative px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all flex items-center gap-1 ${
              item.active
                ? "text-neutral-950 dark:text-white bg-white dark:bg-neutral-800 shadow-xs font-semibold"
                : "text-neutral-600 hover:text-neutral-950 dark:text-neutral-400 dark:hover:text-white"
            }`;

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={classes}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50" />
                </a>
              );
            }

            return (
              <a key={item.label} href={item.href} className={classes}>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://lazzor.com/contract"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-white/50 dark:bg-neutral-900/50 text-neutral-800 dark:text-neutral-200 text-[13px] font-medium rounded-full transition-all"
          >
            在线签约
          </a>

          <a
            href="#trial"
            className="px-4 py-1.5 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-[13px] font-medium rounded-full transition-colors shadow-xs"
          >
            申请开通试用
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="#trial"
            className="px-3 py-1 bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 text-[12px] font-medium rounded-full sm:hidden"
          >
            申请试用
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 text-neutral-900 dark:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-white dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              <a
                href="#trial"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 text-center font-medium text-[14px] rounded-xl shadow-xs"
              >
                立即申请开通试用
              </a>

              <a
                href="https://lazzor.com/contract"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full py-2.5 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 text-center font-medium text-[14px] rounded-xl"
              >
                在线签署租赁合同 (8折特惠)
              </a>

              <div className="py-2 flex flex-col gap-1 border-t border-neutral-100 dark:border-neutral-900">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => setIsOpen(false)}
                    className={`text-[15px] font-medium py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${
                      item.active
                        ? "bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white font-semibold"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.external && (
                      <ArrowUpRight className="w-4 h-4 opacity-40" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
