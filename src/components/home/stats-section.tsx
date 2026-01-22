'use client';

export function StatsSection() {
  return (
    <section className="bg-primary py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div> {/* Placeholder pattern */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-5xl font-extrabold mb-2">10<span className="text-2xl ml-1 opacity-80">年</span></div>
            <div className="text-lg opacity-80 font-medium">行业经验沉淀</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">10<span className="text-2xl ml-1 opacity-80">万级</span></div>
            <div className="text-lg opacity-80 font-medium">GMP净化车间</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">100<span className="text-2xl ml-1 opacity-80">万贴</span></div>
            <div className="text-lg opacity-80 font-medium">日产能保障</div>
          </div>
          <div>
            <div className="text-5xl font-extrabold mb-2">500<span className="text-2xl ml-1 opacity-80">+</span></div>
            <div className="text-lg opacity-80 font-medium">合作品牌</div>
          </div>
        </div>
      </div>
    </section>
  );
}
