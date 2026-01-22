'use client';

import { Factory, PenTool, Truck, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Factory,
    title: 'OEM贴牌定制',
    description: '客户有品牌，我们提供配方、生产、包装一站式服务，助您轻松拥有自有品牌产品。',
  },
  {
    icon: PenTool,
    title: 'ODM研发设计',
    description: '专业的研发团队为您量身定制配方，独特卖点，从概念到成品的全案开发。',
  },
  {
    icon: Truck,
    title: '来料/来样加工',
    description: '支持客户提供原材料、基布或样品，我们按照要求进行标准化生产加工。',
  },
  {
    icon: ShoppingBag,
    title: '现货批发/选品',
    description: '自有“老同桌”品牌成品现货，资质齐全，适合药房、微商、电商直播带货选品。',
  },
];

export function FeatureSection() {
  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            全方位代加工解决方案
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            满足不同客户的个性化需求，打造最具竞争力的产品
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-t-2xl"></div>
              
              <div className="h-14 w-14 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-slate-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                了解详情 <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
