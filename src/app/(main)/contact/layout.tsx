import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我们 - 在线咨询与工厂地址",
  description:
    "联系安徽老同桌生物科技有限公司，获取膏药OEM代加工报价。提供24小时咨询热线、商务邮箱、工厂地址导航。欢迎莅临厂区实地考察。",
  keywords: [
    "联系老同桌",
    "膏药代工咨询",
    "工厂地址",
    "OEM报价",
    "膏药厂家电话",
  ],
  openGraph: {
    title: "联系我们 - 安徽老同桌生物科技",
    description: "24小时咨询热线，欢迎莅临厂区实地考察，提供免费接送服务",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
