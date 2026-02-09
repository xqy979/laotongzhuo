export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">网站设置</h1>
        <p className="text-slate-600 mt-1">配置网站基本信息</p>
      </div>

      <div className="grid gap-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            基本信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                网站名称
              </label>
              <input
                type="text"
                defaultValue="安徽老同桌生物科技有限公司"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                网站描述
              </label>
              <textarea
                rows={3}
                defaultValue="专注膏药贴剂研发生产，提供一站式OEM/ODM代加工服务"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
              />
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            联系方式
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                客服电话
              </label>
              <input
                type="text"
                placeholder="400-XXX-XXXX"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                联系邮箱
              </label>
              <input
                type="email"
                placeholder="contact@laotongzhuo.com"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">
                公司地址
              </label>
              <input
                type="text"
                placeholder="安徽省XX市XX区XX工业园"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* 保存按钮 */}
        <div className="flex justify-end">
          <button className="bg-primary hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            保存设置
          </button>
        </div>
      </div>
    </div>
  );
}
