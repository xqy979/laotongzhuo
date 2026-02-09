import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://laotongzhuo.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "安徽老同桌 - 专注橡皮膏OEM/ODM代加工_透气贴剂厂家货源",
    template: "%s | 安徽老同桌生物科技有限公司",
  },
  description:
    "安徽老同桌生物科技有限公司是一家集研发、生产、销售为一体的现代化生物科技企业，专注橡皮膏、水凝胶、热敷贴等多种剂型代加工。主营激光微孔透气橡皮膏、水凝胶、热敷贴，日产百万贴，源头工厂，正品保障。",
  keywords: [
    "橡皮膏代加工",
    "膏药OEM",
    "膏药ODM",
    "透气贴剂贴牌",
    "老同桌",
    "安徽老同桌",
    "膏药厂家",
    "医用冷敷贴",
    "水凝胶贴",
    "热敷贴生产",
    "远红外贴",
    "膏药代工厂",
  ],
  authors: [{ name: "安徽老同桌生物科技有限公司" }],
  creator: "安徽老同桌生物科技有限公司",
  publisher: "安徽老同桌生物科技有限公司",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: baseUrl,
    siteName: "安徽老同桌生物科技有限公司",
    title: "安徽老同桌 - 专注橡皮膏OEM/ODM代加工_透气贴剂厂家货源",
    description:
      "安徽老同桌生物科技有限公司，专注橡皮膏、水凝胶、热敷贴等多种剂型代加工。日产百万贴，源头工厂，正品保障。",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "安徽老同桌生物科技有限公司",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "安徽老同桌 - 专注橡皮膏OEM/ODM代加工",
    description: "日产百万贴，源头工厂，正品保障",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
    // other: {
    //   "baidu-site-verification": "your-baidu-code",
    // },
  },
};

// 结构化数据 - 组织信息
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "安徽老同桌生物科技有限公司",
  alternateName: "老同桌",
  url: baseUrl,
  logo: `${baseUrl}/images/logo.png`,
  description:
    "安徽老同桌生物科技有限公司是一家集研发、生产、销售为一体的现代化生物科技企业，专注橡皮膏、水凝胶、热敷贴等多种剂型代加工。",
  address: {
    "@type": "PostalAddress",
    addressLocality: "阜阳市",
    addressRegion: "安徽省",
    addressCountry: "CN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["zh-CN"],
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
