'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, ShieldCheck, Truck, Phone } from 'lucide-react';
import { useState } from 'react';

// Mock data fetcher
const getProduct = (id: string) => {
  // In a real app, fetch from API
  return {
    id,
    name: '老同桌远红外筋骨消痛贴',
    category: '黑膏药系列',
    model: 'LTZ-001',
    specs: '8贴/盒（7cm×10cm）',
    license: '皖械注准2021209xxxx',
    manufacturer: '安徽老同桌生物科技有限公司',
    images: ['/images/product-sample.png', '/images/product-sample.png', '/images/product-sample.png'],
    features: [
      '独特远红外陶瓷粉配方，能够产生热效应，促进血液循环。',
      '医用级压敏胶，致敏率低，粘性适中，撕下不伤肤。',
      '透气无纺布基材，皮肤自由呼吸，夏天贴也不闷热。',
      '经典8贴装，性价比高，不仅适合药房销售，也适合居家常备。'
    ],
    scenes: ['颈椎酸痛', '肩周不适', '腰肌劳损', '关节疼痛', '运动跌打'],
  };
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const product = getProduct(params.id);
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 text-sm text-slate-500 flex items-center gap-2">
          <Link href="/products" className="hover:text-primary flex items-center">
             <ArrowLeft className="h-4 w-4 mr-1" /> 返回产品列表
          </Link>
          <span className="text-slate-300">|</span>
          <span>{product.category}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            
            {/* Left: Image Gallery */}
            <div className="p-6 md:p-10 bg-slate-50 flex flex-col items-center">
              <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-slate-200 mb-4 overflow-hidden relative">
                 <img 
                    src={product.images[activeImg]} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 transition-all duration-300"
                 />
                 <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                    正品保障
                 </div>
              </div>
              <div className="flex gap-4 overflow-x-auto w-full pb-2">
                 {product.images.map((img, idx) => (
                    <button 
                       key={idx}
                       onClick={() => setActiveImg(idx)}
                       className={`w-20 h-20 rounded-lg border-2 bg-white flex-shrink-0 p-1 ${activeImg === idx ? 'border-primary' : 'border-slate-200 hover:border-slate-300'}`}
                    >
                       <img src={img} alt={`View ${idx}`} className="w-full h-full object-contain" />
                    </button>
                 ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="p-6 md:p-10 flex flex-col">
              <div className="mb-2 text-sm font-semibold text-primary bg-primary/5 inline-block px-3 py-1 rounded-full self-start">
                 {product.license}
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                {product.name}
              </h1>
              
              <div className="space-y-4 mb-8">
                <div className="flex border-b border-slate-100 pb-3">
                   <span className="w-24 text-slate-500">产品规格</span>
                   <span className="font-medium text-slate-900">{product.specs}</span>
                </div>
                <div className="flex border-b border-slate-100 pb-3">
                   <span className="w-24 text-slate-500">适用范围</span>
                   <span className="font-medium text-slate-900">适用于因风寒湿邪引起的颈、肩、腰、腿等关节疼痛的辅助治疗。</span>
                </div>
                <div className="flex border-b border-slate-100 pb-3">
                   <span className="w-24 text-slate-500">生产企业</span>
                   <span className="font-medium text-slate-900">{product.manufacturer}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-auto">
                 <p className="text-sm text-slate-500 mb-4">
                    <span className="font-bold text-slate-900">温馨提示：</span> 本页面主要展示产品信息，不支持直接在线购买。如需代理或拿货，请联系销售经理。
                 </p>
                 <div className="flex flex-col sm:flex-row gap-4">
                    <a href="tel:400xxxxxxx" className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                       <Phone className="h-5 w-5" /> 电话咨询底价
                    </a>
                    <Link href="/contact" className="flex-1 bg-white text-slate-700 font-bold py-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center">
                       在线申请拿样
                    </Link>
                 </div>
              </div>

              {/* Services Icons */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
                 <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="h-6 w-6 text-slate-400" />
                    <span>资质齐全</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <CheckCircle className="h-6 w-6 text-slate-400" />
                    <span>源头正品</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Truck className="h-6 w-6 text-slate-400" />
                    <span>闪电发货</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Image Content (Long Scroll) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 space-y-8">
              <section className="bg-white rounded-2xl p-8 shadow-sm">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">产品卖点解析</h2>
                 <div className="prose prose-slate max-w-none">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                       {product.features.map((feature, idx) => (
                          <li key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-lg">
                             <div className="min-w-[24px] h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                                {idx + 1}
                             </div>
                             <span className="text-slate-700">{feature}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </section>

              <section className="bg-white rounded-2xl p-8 shadow-sm">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">适用场景</h2>
                 <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {product.scenes.map((scene) => (
                       <div key={scene} className="text-center p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-colors">
                          <div className="w-12 h-12 bg-white rounded-full mx-auto mb-3 shadow-sm flex items-center justify-center text-2xl">
                             🤒
                          </div>
                          <span className="font-medium text-slate-700">{scene}</span>
                       </div>
                    ))}
                 </div>
              </section>

              <section className="bg-white rounded-2xl p-8 shadow-sm">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">产品实拍</h2>
                 <div className="space-y-4">
                    <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                       [此处放置产品细节长图1]
                    </div>
                    <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                       [此处放置产品使用说明图2]
                    </div>
                 </div>
              </section>
           </div>
           
           {/* Sidebar: Recommendations */}
           <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                 <h3 className="font-bold text-slate-900 mb-4">相关产品推荐</h3>
                 <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                       <Link href="#" key={i} className="flex gap-3 group">
                          <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0"></div>
                          <div>
                             <h4 className="font-medium text-slate-900 text-sm group-hover:text-primary transition-colors">艾草温灸贴（升级版）</h4>
                             <p className="text-xs text-slate-500 mt-1">销量 10000+ 盒</p>
                          </div>
                       </Link>
                    ))}
                 </div>
                 <Link href="/products" className="block w-full text-center py-3 mt-6 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                    查看全部产品
                 </Link>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
