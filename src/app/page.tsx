import { HeroSection } from '@/components/home/hero-section';
import { FeatureSection } from '@/components/home/feature-section';
import { ProcessFlow } from '@/components/home/process-flow';
import { ProductShowcase } from '@/components/home/product-showcase';
import { StatsSection } from '@/components/home/stats-section';
import { ArrowRight, Phone } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeatureSection />
      
      <ProcessFlow />
      
      {/* Advantage / Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden relative">
                 {/* Placeholder for About Image - could use same product one for now or a color block */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center">
                    <span className="text-slate-400 font-medium">[Factory/Lab Environment]</span>
                 </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 aspect-video bg-white rounded-2xl shadow-xl p-2 z-10 hidden lg:block">
                 <div className="w-full h-full bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                    <span className="text-slate-400 text-sm">[Lab Certificate]</span>
                 </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-amber-700 mb-6">
                源自安徽 · 道地药材
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                为什么选择老同桌？
              </h2>
              <div className="space-y-6 text-lg text-slate-600">
                <p>
                  安徽老同桌生物科技有限公司，坐落于中医药文化底蕴深厚的安徽，是一家集研发、生产、销售为一体的现代化高新技术企业。
                </p>
                <p>
                  我们拥有<span className="font-bold text-slate-900">现代化生产基地</span>，占地面积30000余平方米，引进国际先进的涂布、分割、包装自动化生产线。
                </p>
                <p>
                  <span className="font-bold text-slate-900">核心优势</span>：独家透皮吸收技术，药效更持久；自主研发实验室，可根据客户需求快速打样；一类/二类医疗器械文号齐全，让您销售无忧。
                </p>
              </div>
              <div className="mt-10">
                <Link href="/about" className="text-primary font-bold flex items-center hover:underline">
                  了解更多企业详情 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductShowcase />

      {/* CTA Section */}
      <section className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
            寻找可靠的膏药代加工工厂？
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            我们准备好了！无论是品牌贴牌还是来料加工，老同桌都是您值得信赖的合作伙伴。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-primary hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-colors">
               <Phone className="mr-2 h-5 w-5" />
               400-XXX-XXXX 免费咨询
             </button>
             <button className="bg-transparent border-2 border-white/20 hover:bg-white/5 text-white px-8 py-4 rounded-full font-bold text-lg transition-colors">
               在线留言获取报价
             </button>
          </div>
        </div>
      </section>
    </>
  );
}
