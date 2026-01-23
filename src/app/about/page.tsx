'use client';

import { motion } from 'framer-motion';
import { Award, CheckCircle2, Factory, FlaskConical, Truck, Users, ClipboardList, ArrowRight, XCircle } from 'lucide-react';
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
            <span className="inline-block py-1 px-3 rounded-full bg-primary text-white border border-primary-foreground/20 text-sm font-semibold mb-6 shadow-lg shadow-primary/30">
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
                  公司拥有生产厂区，总占地面积30余亩。我们深知质量是企业的生命线，因此不惜重金引进了国内领先的<strong>热熔胶涂布机、水凝胶涂布机、自动分切机、四边封包装机</strong>等自动化设备百余台。
                </p>
                <p>
                  目前，公司已形成透气橡皮膏、水凝胶、热敷贴、冷敷贴四大核心产品线，日产量高达<strong>100万贴</strong>，能够快速响应客户的大宗急单需求。
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

      {/* 3. Production Equipment Showcase */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">生产设备与工艺</h2>
            <p className="mt-4 text-slate-600">工欲善其事，必先利其器。我们选用业内顶尖的生产设备，只为做好每一贴膏药。</p>
          </div>

          {/* Core Equipment Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <FlaskConical className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="font-bold text-primary text-xl">01</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">基质制备</h3>
                <p className="text-sm text-slate-500 mb-4">沈阳杰飞 · 捏合搅拌机</p>
                <p className="text-slate-600">
                  采用专业捏合搅拌设备，将原料充分混合制备成膏体基质，确保基质均匀细腻。
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Factory className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="font-bold text-primary text-xl">02</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">精密涂布</h3>
                <p className="text-sm text-slate-500 mb-4">沈阳杰飞 · 涂布机</p>
                <p className="text-slate-600">
                  全自动涂布生产线，克重控制精准（误差&lt;0.1g）。支持不同厚度定制，涂层均匀平整，不渗漏。
                </p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-primary/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <CheckCircle2 className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4 shadow-lg shadow-primary/30">
                  <span className="font-bold text-white text-xl">03</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">微孔成型</h3>
                <p className="text-sm text-slate-500 mb-4">黄石龙昌 · 打孔切片机</p>
                <p className="text-slate-600">
                  <span className="text-primary font-bold">核心环节：</span>采用二代打孔技术，孔径均匀微小。既保证了透气性，又不影响药效渗透，彻底解决传统膏药闷痒问题。
                </p>
              </div>
            </div>
          </div>

          {/* Full Equipment List Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-slate-500" /> 
                主要生产设备清单
              </h3>
              <span className="text-xs text-slate-400">更新于 2026.01</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-3 font-medium">序号</th>
                    <th className="px-6 py-3 font-medium">设备名称</th>
                    <th className="px-6 py-3 font-medium">品牌/厂商</th>
                    <th className="px-6 py-3 font-medium">设备编号</th>
                    <th className="px-6 py-3 font-medium">用途类别</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { id: 1, name: '压胶机', factory: '山东博山鑫成机械', code: 'SC001', type: '原料处理' },
                    { id: 2, name: '捏合（搅拌）机', factory: '沈阳杰飞设备制造', code: 'SC002', type: '原料处理' },
                    { id: 3, name: '涂布机', factory: '沈阳杰飞设备制造', code: 'SC003', type: '核心生产' },
                    { id: 4, name: '切断床', factory: '沈阳杰飞设备制造', code: 'SC004', type: '核心生产' },
                    { id: 5, name: '打孔切片机', factory: '黄石龙昌机械', code: 'SC005', type: '核心生产', highlight: true },
                    { id: 6, name: '缝纫机', factory: '中国飞跃设备制造', code: 'SC006', type: '辅助加工' },
                    { id: 7, name: '热风恒温箱', factory: '沈阳杰飞设备制造', code: 'SC007', type: '环境控制' },
                    { id: 8, name: '封口机', factory: '温州鼎业包装机械', code: 'SC008', type: '包装物流' },
                    { id: 9, name: '打包机', factory: '上海美捷伦包装机械', code: 'SC010', type: '包装物流' },
                    { id: 10, name: '空调', factory: '珠海格力电器', code: 'SC011', type: '环境控制' },
                    { id: 11, name: '塑封机', factory: '上海耀宇仪器仪表', code: 'SC012', type: '包装物流' },
                    { id: 12, name: '包装机', factory: '温州高尚包装机械', code: 'SC013', type: '包装物流' },
                  ].map((item) => (
                    <tr key={item.id} className={`hover:bg-slate-50 transition-colors ${item.highlight ? 'bg-primary/5' : ''}`}>
                      <td className="px-6 py-4 text-slate-500">{item.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">
                        {item.name}
                        {item.highlight && <span className="ml-2 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded">关键</span>}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{item.factory}</td>
                      <td className="px-6 py-4 font-mono text-slate-400 text-xs">{item.code}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          item.type === '核心生产' ? 'bg-amber-100 text-amber-700' :
                          item.type === '包装物流' ? 'bg-blue-100 text-blue-700' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {item.type}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
