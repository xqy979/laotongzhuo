"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Loader2 } from "lucide-react";

type Case = {
  id: string;
  client: string;
  title: string;
  tags: string | null;
  description: string | null;
  results: string | null;
  image: string | null;
  order: number;
};

const brands = [
  "国大药房",
  "老百姓大药房",
  "益丰大药房",
  "一心堂",
  "海王星辰",
  "同仁堂",
  "修正药业",
  "仁和药业",
];

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  // 获取案例
  const fetchCases = useCallback(async () => {
    try {
      const res = await fetch("/api/cases");
      if (res.ok) {
        const data = await res.json();
        setCases(data);
      }
    } catch (error) {
      console.error("获取案例失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCases();
  }, [fetchCases]);

  // 解析 JSON 字段
  const parseJSON = (str: string | null): string[] => {
    if (!str) return [];
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 py-20 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">合作案例</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            500+ 品牌的共同选择，从连锁药房到电商巨头，我们用实力说话。
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Wall */}
        <div className="py-12 border-b border-slate-100">
          <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by industry leaders
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {brands.map((brand, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all"
              >
                <span className="text-xs font-bold text-slate-600">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cases.length === 0 ? (
          <div className="py-20 text-center text-slate-500">
            <p className="text-lg">暂无合作案例</p>
          </div>
        ) : (
          /* Case Studies */
          <div className="py-20 space-y-24">
            {cases.map((item, index) => {
              const tags = parseJSON(item.tags);
              const results = parseJSON(item.results);

              return (
                <div
                  key={item.id}
                  className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                >
                  {/* Image Side */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          暂无图片
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                        <span className="font-bold text-slate-900 text-sm">
                          {item.client}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2">
                    {tags.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    {results.length > 0 && (
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        {results.map((res, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1 bg-green-100 p-1 rounded-full">
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            </div>
                            <span className="font-semibold text-slate-800">
                              {res}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button className="flex items-center font-bold text-primary hover:text-red-700 transition-colors group">
                      了解合作细节{" "}
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden mb-20">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6">
              下一个爆款，就是您的产品
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              不管您是刚起步的创业团队，还是成熟的品牌方，老同桌都能为您提供最适合的代工方案。
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-primary/30"
            >
              立即免费获取方案
            </a>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
      </div>
    </div>
  );
}
