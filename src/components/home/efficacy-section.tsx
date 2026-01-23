'use client';

import { Activity, ShieldCheck, Zap, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';

const benefits = [
  {
    icon: Zap,
    title: '深层渗透技术',
    description: '采用现代化经皮给药技术，突破皮肤屏障，将有效成分快速输送至患处，直达病灶深处。',
    color: 'bg-blue-50 text-blue-600',
    borderColor: 'border-blue-100',
  },
  {
    icon: Activity,
    title: '持续缓释作用',
    description: '独特的药物缓释系统，确保药效在12-24小时内平稳释放，提供全天候的持续护理体验。',
    color: 'bg-green-50 text-green-600',
    borderColor: 'border-green-100',
  },
  {
    icon: ShieldCheck,
    title: '亲肤透气材质',
    description: '选用进口医用级无纺布与低敏压敏胶，微孔透气结构，即使敏感肌肤也能舒适贴敷，拒绝闷痒。',
    color: 'bg-amber-50 text-amber-600',
    borderColor: 'border-amber-100',
  },
  {
    icon: Droplets,
    title: '浓缩草本精华',
    description: '精选道地药材，运用低温萃取工艺，保留药物高活性成分，浓度更高，效果更显著。',
    color: 'bg-red-50 text-red-600',
    borderColor: 'border-red-100',
  },
];

export function EfficacySection() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4">
              核心技术优势
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
              科学配方，直击痛点
            </h2>
            <p className="text-lg text-slate-600">
              结合传统中医理论与现代制药科技，打造疗效确切、使用舒适的膏贴产品
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-2xl p-8 border ${benefit.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 group`}
            >
              <div className={`w-14 h-14 rounded-xl ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <benefit.icon className="h-7 w-7" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {benefit.title}
              </h3>
              
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
