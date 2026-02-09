import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "资讯中心 - 膏药行业动态与企业新闻",
  description:
    "了解膏药行业最新动态、老同桌企业新闻、产品知识科普。掌握行业趋势，把握商机。",
  keywords: ["膏药行业新闻", "贴剂资讯", "老同桌动态", "OEM行业", "膏药知识"],
  openGraph: {
    title: "资讯中心 - 老同桌企业新闻",
    description: "膏药行业动态、企业新闻、产品知识科普",
    type: "website",
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
