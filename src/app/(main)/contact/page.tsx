"use client";

import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    type: "OEM代工",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 只允许输入数字，最多11位
    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
    setFormData({ ...formData, phone: value });
  };

  const validatePhone = (phone: string) => {
    // 验证手机号：必须是11位数字
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) {
      setError("请填写姓名");
      return;
    }

    if (!formData.phone) {
      setError("请填写电话号码");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setError("请输入正确的11位手机号码");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", phone: "", type: "OEM代工", content: "" });
      } else {
        const data = await res.json();
        setError(data.error || "提交失败，请稍后重试");
      }
    } catch (err) {
      setError("网络错误，请稍后重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-slate-900 py-20 text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">联系我们</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            无论是OEM代工咨询，还是品牌代理加盟，我们随时为您提供专业的服务支持。
          </p>
        </div>
        {/* Abstract shapes bg */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                期待与您的合作
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                安徽老同桌生物科技有限公司拥有现代化生产基地，欢迎各位客户莅临厂区实地考察。我们提供免费接送服务（需提前预约）。
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">咨询热线</h3>
                  <p className="text-slate-600 mt-1">
                    400-XXX-XXXX (24小时服务)
                  </p>
                  <p className="text-slate-500 text-sm mt-1">
                    代工经理专线：138-XXX-XXXX
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">工厂地址</h3>
                  <p className="text-slate-600 mt-1">
                    安徽省XX市XX区XX工业园XX路88号
                  </p>
                  <button className="text-primary text-sm font-semibold mt-2 hover:underline">
                    查看地图导航 &rarr;
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">商务邮箱</h3>
                  <p className="text-slate-600 mt-1">
                    business@laotongzhuo.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">接待时间</h3>
                  <p className="text-slate-600 mt-1">周一至周日 8:00 - 18:00</p>
                  <p className="text-sm text-amber-600 mt-1 bg-amber-50 inline-block px-2 py-0.5 rounded">
                    春节期间请提前预约
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 rounded-2xl p-8 lg:p-10 border border-slate-100 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">在线留言</h3>

            {success ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">
                  留言提交成功！
                </h4>
                <p className="text-slate-600 mb-6">
                  我们会在24小时内与您联系，请保持电话畅通。
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="text-primary font-semibold hover:underline"
                >
                  继续提交留言
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      您的姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                      placeholder="怎么称呼您"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-slate-700 mb-2"
                    >
                      联系电话 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      maxLength={11}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                      placeholder="请输入11位手机号"
                    />
                    <p className="text-xs text-slate-400 mt-1">
                      {formData.phone.length}/11位
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    咨询类型
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {["OEM代工", "代理产品", "其他合作"].map((type) => (
                      <label key={type} className="cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          className="peer sr-only"
                          checked={formData.type === type}
                          onChange={() => setFormData({ ...formData, type })}
                        />
                        <div className="text-center py-2 rounded-lg border border-slate-300 peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white transition-all text-sm font-medium">
                          {type}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    留言内容
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none transition-colors"
                    placeholder="请简要描述您的需求，例如：我想做一款艾草颈椎贴，大概需要多少钱？"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-red-700 transition-colors shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      提交中...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" /> 提交留言申请
                    </>
                  )}
                </button>
                <p className="text-xs text-center text-slate-400">
                  我们将严格保护您的隐私，信息仅用于商务联系
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-20 rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[400px] bg-slate-100 relative group">
          {/* In production, replace this with baidu map iframe */}
          <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <p className="text-lg font-medium">[百度地图 API 占位区域]</p>
              <p className="text-sm mt-2">点击查看详细路线</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
