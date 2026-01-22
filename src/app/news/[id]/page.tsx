'use client';

// This is a minimal implementation for demonstration. 
// In a real app, you would fetch data based on params.id
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  return (
    <article className="bg-white min-h-screen pb-20">
      {/* Breadcrumb / Nav */}
      <div className="border-b border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 py-4 text-sm text-slate-500">
          <Link href="/" className="hover:text-primary">首页</Link>
          <span className="mx-2">/</span>
          <Link href="/news" className="hover:text-primary">资讯中心</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">正文详情</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            膏药贴牌代加工需要注意哪些坑？老司机带你避雷
          </h1>
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" /> 老同桌研发部
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> 2025-10-24
            </span>
          </div>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg prose-slate mx-auto">
          <p className="lead text-xl text-slate-600 mb-8">
            很多刚入行想要做膏药品牌的客户，往往会被低价吸引。本文将从基布选择、药量配比、资质授权三个方面，为您详细解析OEM代工中的常见陷阱。
          </p>
          
          <h3>一、 基布选择：不仅要看厚度，更要看透气性</h3>
          <p>
            很多厂家为了降低成本，不仅使用劣质胶体，还在基布上做文章。好的无纺布透气性好，不容易过敏；而劣质基布贴在身上闷热难受，极易导致客户投诉。老同桌采用的是医用级水刺无纺布...
          </p>

          <img 
            src="/images/product-sample.png" 
            alt="基布对比图" 
            className="w-full rounded-xl my-8 shadow-lg"
          />

          <h3>二、 药量配比：不仅仅是“黑”</h3>
          <p>
            传统黑膏药之所以黑，是因为熬制工艺。现在很多劣质膏药通过添加色素变黑，实际上药效微乎其微。正规厂家的配方都是经过实验室反复验证的...
          </p>

          <h3>三、 资质陷阱：一类还是二类？</h3>
          <p>
            市面上很多所谓“神药”其实拿的是“消”字号甚至“妆”字号。老同桌拥有正规的“械”字号文号（一类、二类），能够在药房正规销售。
          </p>
          
          <div className="bg-primary/5 p-6 rounded-xl border-l-4 border-primary my-8">
            <strong>专家建议：</strong> 选择代工厂时，一定要实地考察，看车间净化等级，看原材料仓库。
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
          <Link href="/news" className="flex items-center text-slate-600 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> 返回列表
          </Link>
          <button className="flex items-center gap-2 text-slate-600 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" /> 分享文章
          </button>
        </div>
      </div>
    </article>
  );
}
