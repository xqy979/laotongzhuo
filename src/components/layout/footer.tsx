import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">安徽老同桌</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              专注膏药贴剂研发生产，提供一站式OEM/ODM代加工服务。拥有十万级净化车间，日产百万贴，品质保障。
            </p>
          </div>
          
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">快速导航</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/oem" className="hover:text-white transition-colors">膏药代加工</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">自有品牌产品</Link></li>
              <li><Link href="/cases" className="hover:text-white transition-colors">合作案例</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">产品中心</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products?cat=rubber-plaster" className="hover:text-white transition-colors">透气橡皮膏</Link></li>
              <li><Link href="/products?cat=hydrogel" className="hover:text-white transition-colors">水凝胶系列</Link></li>
              <li><Link href="/products?cat=patch" className="hover:text-white transition-colors">热敷贴系列</Link></li>
              <li><Link href="/products?cat=kids" className="hover:text-white transition-colors">儿科护理系列</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white">联系方式</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>安徽省XX市XX区XX工业园XX路<br />安徽老同桌生物科技有限公司</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>400-XXX-XXXX / 138-XXX-XXXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>contact@laotongzhuo.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} 安徽老同桌生物科技有限公司. All rights reserved. 皖ICP备xxxxxx号</p>
        </div>
      </div>
    </footer>
  );
}
