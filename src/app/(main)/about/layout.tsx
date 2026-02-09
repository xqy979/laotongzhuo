import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - 安徽老同桌生物科技有限公司",
  description:
    "安徽老同桌生物科技有限公司，专注贴剂研发生产10年+。30000㎡现代化生产基地，十万级净化车间，日产100万贴。拥有二类医疗器械资质，ISO9001认证。",
  keywords: [
    "老同桌简介",
    "膏药厂家",
    "安徽膏药工厂",
    "贴剂生产企业",
    "GMP车间",
    "医疗器械生产",
  ],
  openGraph: {
    title: "关于老同桌 - 专注贴剂研发生产10年+",
    description:
      "30000㎡现代化生产基地，十万级净化车间，日产100万贴，打造中国膏药行业标杆工厂",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
