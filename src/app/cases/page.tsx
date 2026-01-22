'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

const cases = [
  {
    id: 1,
    client: '某知名连锁大药房',
    logo: 'Pharmacy Chain',
    title: '连锁药房自有品牌定制',
    tags: ['OEM贴牌', '黑膏药', '线下渠道'],
    desc: '客户拥有3000+家线下门店，需要开发一款高性价比的远红外贴以提升自有品牌利润率。我们提供了全套文号授权和包装设计，产品上架后单月销售额突破500万。',
    result: ['单月销额500万+', '覆盖3000+门店'],
    image: '/images/product-sample.png',
  },
  {
    id: 2,
    client: 'XX健康微商团队',
    logo: 'WeChat Brand',
    title: '微商爆款颈椎贴全案开发',
    tags: ['ODM定制', '水凝胶', '私域流量'],
    desc: '针对微商渠道对“视觉冲击力”和“即时体验”的高要求，我们特别研发了“凉感+热感”双效叠加的水凝胶配方，并设计了国潮风礼盒包装，首发当日售罄5万盒。',
    result: ['首发售罄5万盒', '复购率提升40%'],
    image: '/images/product-sample.png',
  },
  {
    id: 3,
    client: 'XX电商直播间',
    logo: 'Live Stream',
    title: '直播带货专供热敷贴',
    tags: ['来样加工', '暖宝宝', '电商直播'],
    desc: '头部主播选品，要求极致性价比和产能保障。我们开通3条自动化生产线，日产30万贴，确保双11期间不亦乐乎断货，成为当晚直播间销量Top3单品。',
    result: ['日产30万贴保障', '直播间销量Top3'],
    image: '/images/product-sample.png',
  },
];

const brands = [
  '国大药房', '老百姓大药房', '益丰大药房', '一心堂', 
  '海王星辰', '同仁堂', '修正药业', '仁和药业'
];

export default function CasesPage() {
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
           <p className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {brands.map((brand, idx) => (
                 <div key={idx} className="flex items-center justify-center p-4 bg-slate-50 rounded-lg hover:bg-white hover:shadow-md transition-all">
                    {/* Placeholder for Logos */}
                    <span className="text-xs font-bold text-slate-600">{brand}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Case Studies */}
        <div className="py-20 space-y-24">
           {cases.map((item, index) => (
              <div key={item.id} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                 {/* Image Side */}
                 <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2"
                 >
                    <div className="relative aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm">
                          <span className="font-bold text-slate-900 text-sm">{item.client}</span>
                       </div>
                    </div>
                 </motion.div>

                 {/* Content Side */}
                 <div className="w-full lg:w-1/2">
                    <div className="flex gap-2 mb-4">
                       {item.tags.map(tag => (
                          <span key={tag} className="bg-primary/5 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">
                             {tag}
                          </span>
                       ))}
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{item.title}</h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                       {item.desc}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6 mb-8">
                       {item.result.map((res, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                             <div className="mt-1 bg-green-100 p-1 rounded-full">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                             </div>
                             <span className="font-semibold text-slate-800">{res}</span>
                          </div>
                       ))}
                    </div>

                    <button className="flex items-center font-bold text-primary hover:text-red-700 transition-colors group">
                       了解合作细节 <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              </div>
           ))}
        </div>

        {/* CTA */}
        <div className="bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden mb-20">
           <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">下一个爆款，就是您的产品</h2>
              <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                 不管您是刚起步的创业团队，还是成熟的品牌方，老同桌都能为您提供最适合的代工方案。
              </p>
              <a href="/contact" className="inline-flex items-center justify-center bg-primary hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg shadow-primary/30">
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
