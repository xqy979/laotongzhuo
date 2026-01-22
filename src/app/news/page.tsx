'use client';

import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for news list
const newsList = [
  {
    id: 1,
    title: '膏药贴牌代加工需要注意哪些坑？老司机带你避雷',
    summary: '很多刚入行想要做膏药品牌的客户，往往会被低价吸引。本文将从基布选择、药量配比、资质授权三个方面，为您详细解析OEM代工中的常见陷阱...',
    date: '2025-10-24',
    author: '老同桌研发部',
    category: '行业干货',
    views: 1205,
  },
  {
    id: 2,
    title: '热烈祝贺安徽老同桌荣获“年度诚信示范企业”称号',
    summary: '在近日举办的2025药械行业年度盛典上，安徽老同桌生物科技有限公司凭借过硬的产品质量和良好的市场口碑，荣获...',
    date: '2025-10-15',
    author: '品牌中心',
    category: '企业动态',
    views: 856,
  },
  {
    id: 3,
    title: '远红外筋骨消痛贴的市场前景分析',
    summary: '随着老龄化社会的到来，颈肩腰腿痛人群日益庞大。远红外贴剂作为二类医疗器械，凭借其物理治疗、安全无副作用的特点...',
    date: '2025-09-28',
    author: '市场部',
    category: '市场分析',
    views: 2341,
  },
  {
    id: 4,
    title: '膏药代工流程详解：从打样到出货只要7天',
    summary: '时间就是金钱。为了帮助客户抢占市场先机，老同桌优化了生产流程。只要配方确定，我们的全自动化生产线可以实现...',
    date: '2025-09-10',
    author: '生产管理部',
    category: '常见问题',
    views: 1567,
  },
];

const hotNews = [
  { id: 1, title: '2026年膏药市场趋势预测报告' },
  { id: 3, title: '远红外筋骨消痛贴的市场前景分析' },
  { id: 1, title: '膏药贴牌代加工避坑指南' },
  { id: 5, title: '如何辨别黑膏药的优劣？' },
];

export default function NewsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-slate-900 py-16 text-center text-white">
        <h1 className="text-3xl font-bold md:text-5xl mb-4">资讯中心</h1>
        <p className="text-slate-400">洞察行业趋势，分享专业知识</p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content: News List */}
        <div className="lg:col-span-2 space-y-8">
          {newsList.map((news, index) => (
            <motion.article 
              key={news.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-shadow border border-slate-100 group"
            >
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  {news.category}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {news.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {news.author}
                </div>
              </div>

              <Link href={`/news/${news.id}`}>
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                  {news.title}
                </h2>
              </Link>

              <p className="text-slate-600 mb-6 leading-relaxed line-clamp-2">
                {news.summary}
              </p>

              <Link 
                href={`/news/${news.id}`}
                className="inline-flex items-center text-primary font-semibold hover:underline"
              >
                阅读全文 <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </motion.article>
          ))}
          
          {/* Pagination Placeholder */}
          <div className="flex justify-center gap-2 mt-12">
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">上一页</button>
            <button className="px-4 py-2 bg-primary text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">2</button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">3</button>
            <button className="px-4 py-2 border border-slate-300 rounded-lg hover:border-primary hover:text-primary transition-colors">下一页</button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Search Box */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">
              站内搜索
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="搜索文章关键词..." 
                className="w-full pl-4 pr-10 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <ArrowRight className="absolute right-3 top-3.5 h-5 w-5 text-slate-400 cursor-pointer hover:text-primary" />
            </div>
          </div>

          {/* Hot News */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              热门推荐
            </h3>
            <ul className="space-y-4">
              {hotNews.map((item, index) => (
                <li key={index} className="flex gap-3 items-start group">
                  <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded text-xs font-bold ${index < 3 ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-500'}`}>
                    {index + 1}
                  </span>
                  <Link href={`/news/${item.id}`} className="text-slate-600 hover:text-primary transition-colors text-sm line-clamp-2">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Banner */}
          <div className="bg-gradient-to-br from-primary to-red-800 rounded-xl p-6 text-white text-center shadow-lg">
            <h3 className="text-xl font-bold mb-2">有代工需求？</h3>
            <p className="text-white/80 text-sm mb-6">30分钟内免费出报价方案</p>
            <Link href="/contact" className="block w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors">
              立即联系我们
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
