import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OEM/ODM代加工服务 - 一站式膏药代工解决方案",
  description:
    "老同桌提供OEM贴牌加工、ODM研发定制、来料来样加工等一站式膏药代加工服务。不用建厂、不用买设备、不用养工人，让您的品牌梦轻松落地。",
  keywords: [
    "膏药OEM",
    "膏药ODM",
    "贴剂代加工",
    "膏药贴牌",
    "来料加工",
    "膏药定制",
    "膏药代工厂",
  ],
  openGraph: {
    title: "OEM/ODM代加工 - 老同桌一站式膏药代工",
    description:
      "不用建厂、不用买设备、不用养工人，让您的品牌梦轻松落地。您身边的超级工厂。",
    type: "website",
  },
};

export default function OEMLayout({ children }: { children: React.ReactNode }) {
  return children;
}
