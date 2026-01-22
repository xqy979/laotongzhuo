'use client';

import { 
  ClipboardList, 
  FlaskConical, 
  Factory, 
  PackageCheck, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Check
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    title: 'OEM 贴牌加工',
    subtitle: 'Brand Labeling',
    desc: '适合有成熟品牌、销售渠道的客户。您提供商标和包装设计（或我们协助设计），我们按照您的要求进行生产。',
    features: ['现有成熟配方直接授权', '支持小批量起订', '快速上市抢占商机'],
    icon: Factory,
  },
  {
    title: 'ODM 研发定制',
    subtitle: 'R&D Customization',
    desc: '适合对产品有特殊要求的客户。我们提供从配方研发、基材选型、外观设计到注册备案的全案服务。',
    features: ['独家配方买断', '异形规格定制', '从0到1孵化爆品'],
    icon: FlaskConical,
  },
  {
    title: '来料/来样加工',
    subtitle: 'Processing with Supplied Materials',
    desc: '您提供原材料（药粉/基布）或样品，我们利用专业设备进行标准化生产、分切、包装。',
    features: ['利用您的独特原料', '发挥工厂设备优势', '加工成本透明'],
    icon: ClipboardList,
  },
];

const productTypes = [
  {
    name: '传统黑膏药',
    desc: '载药量大，药效持久，适合骨科痛症市场。',
    image: '/images/product-sample.png', // Placeholder
  },
  {
    name: '医用水凝胶',
    desc: '含水量高，透气致敏率低，适合退热、冷敷。',
    image: '/images/product-sample.png', // Placeholder
  },
  {
    name: '远红外理疗贴',
    desc: '添加陶瓷粉，热效应促进吸收，二类器械。',
    image: '/images/product-sample.png', // Placeholder
  },
  {
    name: '自发热暖贴',
    desc: '持续恒温发热，适合痛经、驱寒养生市场。',
    image: '/images/product-sample.png', // Placeholder
  },
];

const processes = [
  { step: 1, title: '需求沟通', desc: '明确产品类型、规格、数量', icon: ClipboardList },
  { step: 2, title: '免费打样', desc: '实验室3天出样，寄送试用', icon: FlaskConical },
  { step: 3, title: '签订合同', desc: '确定价格、货期、保密协议', icon: ShieldCheck },
  { step: 4, title: '包装设计', desc: '设计团队出稿，确认文案', icon: PackageCheck },
  { step: 5, title: '规模生产', desc: '10万级车间排单生产', icon: Factory },
  { step: 6, title: '质检发货', desc: '成品全检，物流直达', icon: Truck },
];

const faqs = [
  {
    q: '你们的起订量（MOQ）是多少？',
    a: '为了支持中小品牌创业，我们支持灵活起订。一般标准规格产品1万贴起订；如果是定制特殊规格或配方，通常需要5万贴起做。具体可咨询业务经理。',
  },
  {
    q: '大概多久能出货？',
    a: '包装材料到位后，常规产品3-7个工作日即可出货。如果是新产品开发，算上设计和备案时间，通常需要15-20天左右。',
  },
  {
    q: '可以帮忙设计包装吗？',
    a: '可以的。我们拥有专业的设计团队，可以免费为您提供符合新广告法和药监局要求的包装设计服务。',
  },
  {
    q: '产品有文号吗？好在药房卖吗？',
    a: '老同桌拥有齐全的一类/二类医疗器械文号（如远红外理疗贴、冷敷贴等），资质正规，完全可以在药房、诊所、医院合规销售。',
  },
];

export default function OEMPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero */}
      <div className="bg-primary pt-24 pb-32 text-center text-white relative">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            一站式膏药代加工服务<br/><span className="text-secondary">让您的品牌梦轻松落地</span>
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
            不用建厂、不用买设备、不用养工人。您负责品牌和销售，剩下的交给我们。
            <br/>老同桌 —— 您身边的超级工厂。
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#contact" className="bg-white text-primary font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-50 transition-colors">
              免费领取样品
            </Link>
            <Link href="#process" className="bg-primary border border-white/30 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors">
              了解合作流程
            </Link>
          </div>
        </div>
        {/* Curve divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-[0]">
           <svg className="relative block w-[calc(100%+1.3px)] h-[60px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
           </svg>
        </div>
      </div>

      {/* 2. Cooperation Models */}
      <div className="py-24 bg-white -mt-20 relative z-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{service.title}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">{service.subtitle}</p>
                <p className="text-slate-600 mb-6 min-h-[80px]">
                  {service.desc}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Product Capabilities */}
      <div className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">不仅能做，而且精通</h2>
            <p className="mt-4 text-primary font-semibold">四大核心剂型，满足市场90%的需求</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productTypes.map((type, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl aspect-[3/4] shadow-lg">
                <img src={type.image} alt={type.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {/* Enhanced Gradient Overlay for Readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2 drop-shadow-md">{type.name}</h3>
                  <p className="text-sm text-slate-200 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm font-medium">
                    {type.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Process Flow */}
      <div id="process" className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">标准化代工流程</h2>
            <p className="mt-4 text-slate-600">流程透明可视，让您每一个环节都心中有数</p>
          </div>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-[40px] left-[10%] right-[10%] h-1 bg-slate-100 -z-10"></div>
            
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-8 gap-y-12">
              {processes.map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center relative group">
                  <div className="w-20 h-20 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center mb-6 group-hover:border-primary group-hover:shadow-lg transition-all z-10">
                    <step.icon className="h-8 w-8 text-slate-400 group-hover:text-primary transition-colors" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-200 rounded-full text-xs flex items-center justify-center font-bold text-slate-600 group-hover:bg-primary group-hover:text-white transition-colors">
                      {step.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-500 px-2">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. FAQ */}
      <div className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
           <div className="text-center mb-12">
             <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
               <HelpCircle className="h-6 w-6 text-primary" />
             </div>
             <h2 className="text-3xl font-bold text-slate-900">常见问题解答</h2>
           </div>

           <div className="space-y-6">
             {faqs.map((faq, index) => (
               <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
                 <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
                   <span className="text-primary font-black text-xl leading-none mt-0.5">Q.</span>
                   {faq.q}
                 </h3>
                 <p className="text-slate-600 pl-8 leading-relaxed">
                   {faq.a}
                 </p>
               </div>
             ))}
           </div>
           
           <div className="text-center mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm" id="contact">
              <h3 className="text-xl font-bold text-slate-900 mb-2">还有其他疑问？</h3>
              <p className="text-slate-600 mb-6">我们的代工经理随时在线，为您提供一对一专业解答</p>
              <Link href="/contact" className="inline-flex items-center justify-center bg-primary hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors">
                 立即咨询人工客服 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
