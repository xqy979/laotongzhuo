'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Tag, Search } from 'lucide-react';
import Image from 'next/image';

// Product Data Type Definition
type Product = {
  id: string;
  name: string;
  category: string;
  image: string;
  tags: string[];
  specs: string;
  summary: string;
};

// Mock Data
const categories = [
  { id: 'all', name: '全部分类' },
  { id: 'black-plaster', name: '黑膏药系列' },
  { id: 'hydrogel', name: '水凝胶系列' },
  { id: 'heating-patch', name: '热敷贴系列' },
  { id: 'pediatric', name: '儿科护理' },
];

const allProducts: Product[] = [
  {
    id: '1',
    name: '老同桌远红外筋骨消痛贴',
    category: 'black-plaster',
    image: '/images/product-sample.png',
    tags: ['药房爆款', '二类器械', '高利润'],
    specs: '8贴/盒',
    summary: '经典黑膏药工艺与现代远红外技术结合，深层渗透，快速止痛。适用于颈肩腰腿痛的辅助治疗。',
  },
  {
    id: '2',
    name: '冷敷凝胶（颈椎专用）',
    category: 'hydrogel',
    image: '/images/product-sample.png',
    tags: ['办公族首选', '清凉舒适', '不粘毛'],
    specs: '50g/支',
    summary: '专为低头族设计，高分子水凝胶载体，物理降温，缓解颈椎疲劳与酸胀感。',
  },
  {
    id: '3',
    name: '艾草膝盖热敷贴',
    category: 'heating-patch',
    image: '/images/product-sample.png',
    tags: ['四季可用', '艾灸热敷', '自发热'],
    specs: '10贴/盒',
    summary: '精选三年陈艾，配合自发热技术，持续恒温热敷8小时+，驱寒祛湿，养护膝盖。',
  },
  {
    id: '4',
    name: '小儿感冒退热贴',
    category: 'pediatric',
    image: '/images/product-sample.png',
    tags: ['物理降温', '宝妈必备', '温和不刺激'],
    specs: '4贴/盒',
    summary: '进口亲水性高分子凝胶，快速带走热量。温和低敏配方，不伤宝宝娇嫩肌肤。',
  },
  {
    id: '5',
    name: '医用冷敷贴（面膜型）',
    category: 'hydrogel',
    image: '/images/product-sample.png',
    tags: ['医美修护', '无菌生产', '械字号'],
    specs: '5片/盒',
    summary: '适用于激光术后红肿修复、敏感肌镇静。十万级车间无菌生产，安全可靠。',
  },
  {
    id: '6',
    name: '传统手工黑膏药布',
    category: 'black-plaster',
    image: '/images/product-sample.png',
    tags: ['老中医配方', '防渗漏', '粘性强'],
    specs: '100张/包',
    summary: '专为诊所、理疗馆供应的空贴基布。采用优质加厚无纺布，防渗防侧漏。',
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering Logic
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-white py-12 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">自有品牌产品目录</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            正规械字号/消字号产品，资质齐全，支持药房、诊所、电商全渠道铺货。
            <br />
            <span className="text-primary font-bold">诚招全国代理商，提供全套控销支持！</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
             {/* Category Tabs */}
             <div className="flex flex-wrap gap-2 justify-center md:justify-start">
               {categories.map((cat) => (
                 <button
                   key={cat.id}
                   onClick={() => setActiveCategory(cat.id)}
                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                     activeCategory === cat.id
                       ? 'bg-primary text-white shadow-md'
                       : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                   }`}
                 >
                   {cat.name}
                 </button>
               ))}
             </div>

             {/* Search Bar */}
             <div className="relative w-full md:w-auto min-w-[300px]">
               <input
                 type="text"
                 placeholder="输入产品名称或功效..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
               />
               <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
             </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image Area */}
                  <div className="aspect-[4/4] bg-slate-100 relative overflow-hidden">
                     {/* Replace with actual Image component */}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                     </div>
                     {/* Tags Overlay */}
                     <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        {product.tags.slice(0, 2).map((tag, idx) => (
                           <span key={idx} className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-primary border border-primary/10">
                              {tag}
                           </span>
                        ))}
                     </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-5 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                           {product.name}
                        </h3>
                     </div>
                     <p className="text-xs text-slate-500 mb-3 bg-slate-50 inline-block px-2 py-1 rounded self-start">
                        规格：{product.specs}
                     </p>
                     <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                        {product.summary}
                     </p>
                     <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-semibold text-primary">
                        <span>查看详情</span>
                        <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                     </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-slate-500">
               <p className="text-lg">未找到相关产品，请尝试其他关键词</p>
               <button 
                  onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                  className="mt-4 text-primary hover:underline"
               >
                  清除筛选条件
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
