import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "产品中心 - 膏药贴剂OEM代加工产品目录",
  description:
    "查看老同桌全系列膏药产品目录，包括透气橡皮膏、水凝胶、热敷贴、冷敷贴等。正规械字号/消字号产品，资质齐全，支持药房、诊所、电商全渠道铺货。",
  keywords: [
    "膏药产品",
    "透气橡皮膏",
    "水凝胶贴",
    "热敷贴",
    "远红外贴",
    "医用冷敷贴",
    "膏药OEM",
  ],
  openGraph: {
    title: "产品中心 - 老同桌膏药产品目录",
    description:
      "透气橡皮膏、水凝胶、热敷贴等多种剂型，资质齐全，支持全渠道铺货",
    type: "website",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
