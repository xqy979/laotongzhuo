import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "安徽老同桌 - 专注膏药OEM/ODM代加工_黑膏药厂家货源",
    template: "%s | 安徽老同桌生物科技有限公司",
  },
  description: "安徽老同桌生物科技有限公司是一家集研发、生产、销售为一体的现代化生物科技企业，专注膏药贴剂代加工、OEM贴牌定制服务。主营黑膏药、水凝胶、热敷贴等多种剂型，日产百万贴，源头工厂，正品保障。",
  keywords: ["膏药代加工", "膏药OEM", "黑膏药贴牌", "老同桌", "安徽老同桌", "膏药厂家"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans antialiased`}
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
