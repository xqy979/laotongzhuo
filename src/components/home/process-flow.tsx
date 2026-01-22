'use client';

import { ArrowRight, CheckCircle2, ClipboardList, Truck, XCircle } from 'lucide-react';

export function ProcessFlow() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900">生产工艺流程</h2>
          <p className="mt-4 text-slate-600">严格遵循GMP标准作业程序，设置两道关键质检关卡，确保出厂合格率100%</p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Desktop Connecting Line Background */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            
            {/* Stage 1: Ingredients & Mixing */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:hover:-translate-y-2 transition-transform">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Phase 01 · 基质制备
              </div>
              <div className="space-y-6 relative">
                {/* Step Items */}
                <div className="flex gap-4">
                  <div className="w-1/2 text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">领取原料</div>
                  <div className="w-1/2 text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">投料/压胶</div>
                </div>
                
                <div className="flex justify-center">
                  <div className="bg-slate-200 w-px h-6"></div>
                </div>

                <div className="relative p-4 bg-primary/5 border border-primary/20 rounded-xl text-center">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2">
                    <ArrowRight className="rotate-90 text-slate-300 w-4 h-4" />
                  </div>
                  <div className="flex items-center justify-center gap-2 font-bold text-slate-900">
                    <span>捏合搅拌</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-700 font-bold" title="关键工序">▲</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">关键工序 · 充分融合</p>
                </div>
              </div>
            </div>

            {/* Stage 2: Coating & Cutting */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:hover:-translate-y-2 transition-transform">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Phase 02 · 涂布成型
              </div>
              <div className="space-y-6">
                <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium">涂布工艺</div>
                
                {/* QA Check */}
                <div className="relative p-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 font-bold text-indigo-900">
                    <ClipboardList className="w-4 h-4" />
                    <span>工序检验</span>
                  </div>
                  <div className="mt-2 flex justify-center gap-4 text-xs font-bold">
                    <span className="text-green-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> 合格</span>
                    <span className="text-red-400 flex items-center line-through decoration-red-400 decoration-2"><XCircle className="w-3 h-3 mr-1"/> 不合格</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2 text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">分切</div>
                  <div className="w-1/2 text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm">打孔切片</div>
                </div>
              </div>
            </div>

            {/* Stage 3: Packaging */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:hover:-translate-y-2 transition-transform">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Phase 03 · 封装打包
              </div>
              <div className="space-y-6">
                <div className="relative p-4 bg-primary/5 border border-primary/20 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 font-bold text-slate-900">
                    <span>装袋封口</span>
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-700 font-bold" title="关键工序">★</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">关键工序 · 密封性</p>
                </div>

                <div className="flex justify-center">
                  <div className="bg-slate-200 w-px h-6"></div>
                </div>

                <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm font-medium">外盒包装</div>
              </div>
            </div>

            {/* Stage 4: QA & Storage */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 lg:hover:-translate-y-2 transition-transform">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                Phase 04 · 质检入库
              </div>
              <div className="space-y-6">
                {/* Final QA Check */}
                <div className="relative p-4 border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-xl text-center">
                  <div className="flex items-center justify-center gap-2 font-bold text-indigo-900">
                    <ClipboardList className="w-4 h-4" />
                    <span>成品检验</span>
                  </div>
                  <div className="mt-2 flex justify-center gap-4 text-xs font-bold">
                    <span className="text-green-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> 合格</span>
                    <span className="text-red-400 flex items-center line-through decoration-red-400 decoration-2"><XCircle className="w-3 h-3 mr-1"/> 不合格</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-slate-200 w-px h-6"></div>
                </div>

                <div className="p-4 bg-green-600 text-white rounded-xl text-center shadow-lg shadow-green-600/20">
                  <div className="font-bold text-lg flex items-center justify-center gap-2">
                    <Truck className="w-5 h-5" />
                    入库发货
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Legends & Control Loop */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-700 font-bold">▲</span>
                <span>捏合关键工序</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-[10px] text-amber-700 font-bold">★</span>
                <span>封口关键工序</span>
              </div>
              <div className="flex items-center gap-2 text-red-400">
                <XCircle className="h-4 w-4" />
                <span>不合格品控制：隔离、标识、评审、处置</span>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
