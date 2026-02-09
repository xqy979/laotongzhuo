import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "合作案例 - 500+品牌的共同选择",
  description:
    "查看老同桌膏药代加工成功案例，覆盖连锁药房、电商直播、微商团队等多种渠道。从连锁药房到电商巨头，我们用实力说话。",
  keywords: [
    "膏药代工案例",
    "OEM成功案例",
    "药房自有品牌",
    "电商膏药定制",
    "微商膏药代工",
  ],
  openGraph: {
    title: "合作案例 - 老同桌膏药代加工",
    description: "500+品牌的共同选择，从连锁药房到电商巨头，我们用实力说话",
    type: "website",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
