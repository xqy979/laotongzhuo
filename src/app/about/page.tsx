'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, Factory, FlaskConical, Truck, Users } from 'lucide-react';
import Image from 'next/image';

const milestones = [
  { year: '2015', title: '品牌创立', desc: '安徽老同桌生物科技有限公司正式成立，确立“专注于贴剂”的发展战略。' },
  { year: '2017', title: '基地扩建', desc: '投资5000万建设一期生产基地，引进首条全自动涂布生产线。' },
  { year: '2019', title: '资质升级', desc: '全线产品通过二类医疗器械认证，获得多项实用新型专利。' },
  { year: '2021', title: '产能翻番', desc: '二期智能工厂投产，日产能突破100万贴，成为行业头部代工厂。' },
  { year: '2024', title: '研发创新', desc: '与中医药大学建立联合实验室，推出更高效的远红外陶瓷粉配方。' },
];

const certificates = [
  { name: '营业执照', id: 1 },
  { name: '医疗器械生产许可证', id: 2 },
  { name: 'ISO9001认证', id: 3 },
  { name: '实用新型专利', id: 4 },
  { name: '诚信示范企业', id: 5 },
  { name: '高新技术企业', id: 6 },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* 1. Hero Section - Factory Aerial View Mockup */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/50 z-10"></div>
        {/* Placeholder for Video/Image Background */}
        <div className="absolute inset-0 bg-[url('/factory-bg.jpg')] bg-cover bg-center opacity-30"></div>
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-sm font-semibold mb-6 backdrop-blur-sm">
              专注贴剂研发生产10年+
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              打造中国膏药行业的<br/><span className="text-primary">标杆工厂</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              30000㎡ 现代化生产基地 · 十万级净化车间 · 全自动智能产线
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">关于老同桌</h2>
              <div className="prose prose-lg text-slate-600">
                <p>
                  安徽老同桌生物科技有限公司，坐落于药材资源丰富的中原腹地。作为一家集研发、生产、销售为一体的现代化高新技术企业，我们始终致力于<strong>“让好膏药走进千家万户”</strong>。
                </p>
                <p>
                  公司拥有两大生产厂区，总占地面积30余亩。我们深知质量是企业的生命线，因此不惜重金引进了国内领先的<strong>热熔胶涂布机、水凝胶涂布机、自动分切机、四边封包装机</strong>等自动化设备百余台。
                </p>
                <p>
                  目前，公司已形成黑膏药、水凝胶、热敷贴、冷敷贴四大核心产品线，日产量高达<strong>100万贴</strong>，能够快速响应客户的大宗急单需求。
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mt-10">
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-3xl font-bold text-primary mb-1">30000<span className="text-sm text-slate-500">㎡</span></div>
                    <div className="text-sm font-medium text-slate-700">厂房面积</div>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-3xl font-bold text-primary mb-1">100<span className="text-sm text-slate-500">万+</span></div>
                    <div className="text-sm font-medium text-slate-700">日均产能</div>
                 </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                 <div className="h-48 bg-slate-200 rounded-2xl w-full"></div> {/* Placeholder for factory interior 1 */}
                 <div className="h-64 bg-slate-200 rounded-2xl w-full"></div> {/* Placeholder for factory interior 2 */}
              </div>
              <div className="space-y-4 pt-8">
                 <div className="h-64 bg-slate-200 rounded-2xl w-full"></div> {/* Placeholder for factory interior 3 */}
                 <div className="h-48 bg-slate-200 rounded-2xl w-full"></div> {/* Placeholder for factory interior 4 */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Factory Strength Showcase (Tabs or Grid) */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">实地探厂</h2>
            <p className="mt-4 text-slate-600">眼见为实，带您走进我们的透明化车间</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Production */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-64 bg-slate-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <Factory className="h-10 w-10 text-white mb-3" />
                  <h3 className="text-xl font-bold text-white">自动化生产车间</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed">
                  引进德国进口涂布技术，全自动四边封包装机，确保每一贴膏药克重精准、密封严实。只有标准化的设备，才能生产出标准化的好产品。
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">自动涂布</span>
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">激光模切</span>
                </div>
              </div>
            </div>

            {/* Card 2: R&D */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-64 bg-slate-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <FlaskConical className="h-10 w-10 text-white mb-3" />
                  <h3 className="text-xl font-bold text-white">研发与质检中心</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed">
                  配备高效液相色谱仪等专业检测设备，从原材料入库到成品出厂，经过12道严苛质检。确保产品不致敏、药效足、粘性好。
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">配方实验室</span>
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">留样室</span>
                </div>
              </div>
            </div>

            {/* Card 3: Storage */}
            <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="h-64 bg-slate-200 relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                  <Truck className="h-10 w-10 text-white mb-3" />
                  <h3 className="text-xl font-bold text-white">仓储物流中心</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed">
                  5000平米现代化立体仓库，常备库存充足。与多家物流公司深度合作，确保订单当日生产，次日发货，为您的生意争分夺秒。
                </p>
                <div className="mt-4 flex gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">恒温库</span>
                  <span className="px-2 py-1 bg-slate-100 text-xs text-slate-600 rounded">一件代发</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Qualification Certificates */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">资质荣誉</h2>
              <p className="mt-2 text-slate-600">手续齐全，合规经营，为您解决后顾之忧</p>
            </div>
          </div>
          
          <div className="relative">
            {/* Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x scrollbar-hide">
              {certificates.map((cert) => (
                <div key={cert.id} className="snap-center flex-shrink-0 w-[200px] md:w-[280px]">
                  <div className="aspect-[3/4] bg-slate-50 border-4 border-slate-100 rounded-lg shadow-inner flex items-center justify-center relative group cursor-pointer hover:border-primary/30 transition-colors">
                     {/* Certificate Image Placeholder */}
                     <div className="text-center p-4">
                        <Award className="h-16 w-16 text-slate-300 mx-auto mb-4 group-hover:text-primary transition-colors" />
                        <span className="text-xs text-slate-400 font-mono">CERTIFICATE</span>
                     </div>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                  </div>
                  <p className="text-center mt-4 font-medium text-slate-900">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. History Timeline */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">发展历程</h2>
            <p className="mt-4 text-slate-400">一步一个脚印，见证老同桌的成长</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
             {/* Vertical Line */}
             <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-700 md:-ml-[1px]"></div>

             <div className="space-y-12">
               {milestones.map((item, index) => (
                 <div key={item.year} className={`relative flex flex-col md:flex-row gap-8 items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Dot */}
                    <div className="absolute left-[10px] md:left-1/2 w-5 h-5 rounded-full bg-primary border-4 border-slate-800 md:-translate-x-1/2 mt-1 z-10"></div>
                    
                    {/* Content */}
                    <div className="ml-12 md:ml-0 md:w-1/2 md:px-12">
                       <div className={`flex flex-col ${index % 2 === 0 ? 'md:items-start text-left' : 'md:items-end md:text-right'}`}>
                          <span className="text-4xl font-black text-slate-700/50 absolute -top-4 select-none opacity-20 md:opacity-100">{item.year}</span>
                          <span className="text-xl font-bold text-primary mb-2 relative z-10">{item.year}</span>
                          <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                       </div>
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block md:w-1/2"></div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
