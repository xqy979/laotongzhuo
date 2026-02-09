"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 pb-32 lg:pt-32 lg:pb-48">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              源头工厂 · 品质保障
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              安徽老同桌 <br />
              <span className="text-primary">专注膏药贴剂</span> 研发生产
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              一站式OEM/ODM代加工服务，包括激光微孔透气橡皮膏、水凝胶、热敷贴等多种剂型。
              日产百万贴，急单可接，免费打样，为您打造爆款产品。
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/oem"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-primary rounded-lg hover:bg-red-700 shadow-lg shadow-primary/25 hover:shadow-primary/40"
              >
                立即咨询代工
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-700 transition-all bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300"
              >
                查看产品目录
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>GMP认证车间</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>资质齐全</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span>免费设计</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white aspect-[4/3] border-[8px] border-white/50 backdrop-blur-sm">
              {/* Placeholder for Factory Image */}
              <div className="absolute inset-0">
                <Image
                  src="/images/laotongzhuo-banner-v3.png"
                  alt="安徽老同桌膏药产品展示"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              {/* Premium Glass Card Effect */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-6 rounded-xl border border-white/20 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500">日产能</p>
                    <p className="text-2xl font-bold text-slate-900">
                      100万+{" "}
                      <span className="text-sm font-normal text-slate-400">
                        贴
                      </span>
                    </p>
                  </div>
                  <div className="h-10 w-px bg-slate-200"></div>
                  <div>
                    <p className="text-sm text-slate-500">合作品牌</p>
                    <p className="text-2xl font-bold text-slate-900">
                      500+{" "}
                      <span className="text-sm font-normal text-slate-400">
                        家
                      </span>
                    </p>
                  </div>
                  <div className="h-10 w-px bg-slate-200"></div>
                  <div>
                    <p className="text-sm text-slate-500">成品出货</p>
                    <p className="text-2xl font-bold text-slate-900">
                      3-7{" "}
                      <span className="text-sm font-normal text-slate-400">
                        天
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 h-64 w-64 bg-secondary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-10 -left-10 h-64 w-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
