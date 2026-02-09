"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, CheckCircle } from "lucide-react";

interface SettingsClientProps {
  initialSettings: Record<string, string>;
}

export default function SettingsClient({
  initialSettings,
}: SettingsClientProps) {
  const defaultSettings = {
    siteName: "安徽老同桌生物科技有限公司",
    siteDescription: "专注膏药贴剂研发生产，提供一站式OEM/ODM代加工服务",
    seoKeywords: "膏药贴剂,OEM代加工,ODM定制,医用冷敷贴",
    phone: "400-888-6666",
    email: "contact@laotongzhuo.com",
    address: "安徽省阜阳市太和县经济开发区",
    copyright: "© 2024 安徽老同桌生物科技有限公司 版权所有",
    icp: "皖ICP备2024000001号",
    police: "皖公网安备34122202000001号",
    wechat: "",
    qq: "",
    wechatPublic: "",
    douyin: "",
  };

  const [settings, setSettings] = useState({
    ...defaultSettings,
    ...initialSettings,
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // 更新设置值
  const updateSetting = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  // 保存设置
  const handleSave = async () => {
    setLoading(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      } else {
        const data = await res.json();
        setError(data.error || "保存失败");
      }
    } catch {
      setError("保存失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">网站设置</h1>
          <p className="text-slate-600 mt-1">配置网站基本信息</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-sm"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              保存中...
            </>
          ) : saved ? (
            <>
              <CheckCircle className="h-5 w-5" />
              已保存
            </>
          ) : (
            <>
              <Save className="h-5 w-5" />
              保存设置
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          {error}
        </div>
      )}

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-600 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          设置已成功保存
        </div>
      )}

      <div className="grid gap-6">
        {/* 基本信息 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            基本信息
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                网站名称
              </label>
              <input
                type="text"
                value={settings.siteName || ""}
                onChange={(e) => updateSetting("siteName", e.target.value)}
                placeholder="安徽老同桌生物科技有限公司"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                网站描述
              </label>
              <textarea
                rows={3}
                value={settings.siteDescription || ""}
                onChange={(e) =>
                  updateSetting("siteDescription", e.target.value)
                }
                placeholder="专注膏药贴剂研发生产，提供一站式OEM/ODM代加工服务"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                SEO 关键词
              </label>
              <input
                type="text"
                value={settings.seoKeywords || ""}
                onChange={(e) => updateSetting("seoKeywords", e.target.value)}
                placeholder="膏药贴剂,OEM代加工,ODM定制,医用冷敷贴"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <p className="text-xs text-slate-400 mt-1">
                多个关键词用逗号分隔
              </p>
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
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                客服电话
              </label>
              <input
                type="text"
                value={settings.phone || ""}
                onChange={(e) => updateSetting("phone", e.target.value)}
                placeholder="400-XXX-XXXX"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                联系邮箱
              </label>
              <input
                type="email"
                value={settings.email || ""}
                onChange={(e) => updateSetting("email", e.target.value)}
                placeholder="contact@laotongzhuo.com"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                微信号
              </label>
              <input
                type="text"
                value={settings.wechat || ""}
                onChange={(e) => updateSetting("wechat", e.target.value)}
                placeholder="微信号或微信二维码链接"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                QQ 号
              </label>
              <input
                type="text"
                value={settings.qq || ""}
                onChange={(e) => updateSetting("qq", e.target.value)}
                placeholder="QQ 号码"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                公司地址
              </label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => updateSetting("address", e.target.value)}
                placeholder="安徽省XX市XX区XX工业园"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 社交媒体 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            社交媒体
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                微信公众号
              </label>
              <input
                type="text"
                value={settings.wechatPublic || ""}
                onChange={(e) => updateSetting("wechatPublic", e.target.value)}
                placeholder="公众号名称或二维码链接"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                抖音号
              </label>
              <input
                type="text"
                value={settings.douyin || ""}
                onChange={(e) => updateSetting("douyin", e.target.value)}
                placeholder="抖音账号"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>

        {/* 备案信息 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            备案信息
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                ICP 备案号
              </label>
              <input
                type="text"
                value={settings.icp || ""}
                onChange={(e) => updateSetting("icp", e.target.value)}
                placeholder="皖ICP备XXXXXXXX号"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                公安备案号
              </label>
              <input
                type="text"
                value={settings.police || ""}
                onChange={(e) => updateSetting("police", e.target.value)}
                placeholder="皖公网安备XXXXXXXXXXXX号"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                版权信息
              </label>
              <input
                type="text"
                value={settings.copyright || ""}
                onChange={(e) => updateSetting("copyright", e.target.value)}
                placeholder="© 2024 安徽老同桌生物科技有限公司 版权所有"
                className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
