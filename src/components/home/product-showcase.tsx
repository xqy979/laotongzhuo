'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

const categories = [
  { id: 'hot', name: '热销推荐' },
  { id: 'black', name: '黑膏药系列' },
  { id: 'gel', name: '水凝胶系列' },
  { id: 'patch', name: '热敷贴系列' },
];

const products = [
  {
    id: 1,
    name: '远红外筋骨消痛贴',
    category: 'hot',
    image: '/images/product-sample.png',
    tag: '药房爆款',
  },
  {
    id: 2,
    name: '特效黑膏药',
    category: 'black',
    image: '/images/product-sample.png', // Placeholder
    tag: '传统工艺',
  },
  {
    id: 3,
    name: '儿童退热贴',
    category: 'gel',
    image: '/images/product-sample.png', // Placeholder
    tag: '温和不刺激',
  },
  {
    id: 4,
    name: '艾草颈椎贴',
    category: 'patch',
    image: '/images/product-sample.png', // Placeholder
    tag: '四季可用',
  },
];

export function ProductShowcase() {
  const [activeCategory, setActiveCategory] = useState('hot');

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              精选产品展示
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              自主研发品牌，多种剂型，满足不同渠道销售需求
            </p>
          </div>
          <a href="/products" className="hidden md:flex items-center text-primary font-semibold hover:text-red-700 transition-colors mt-4 md:mt-0">
            查看全部产品 <ArrowRight className="ml-1 h-5 w-5" />
          </a>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                 {/* In a real app, use next/image with proper sizing */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                 </div>
                 <div className="absolute top-4 left-4 bg-secondary text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                   {product.tag}
                 </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{product.name}</h3>
                <p className="text-sm text-slate-500 mb-4">专注{product.tag}研发生产</p>
                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">查看详情</span>
                  <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 md:hidden text-center">
          <a href="/products" className="inline-flex items-center text-primary font-semibold">
            查看全部产品 <ArrowRight className="ml-1 h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
