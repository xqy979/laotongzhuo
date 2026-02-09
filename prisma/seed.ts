import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始初始化数据库...");

  // 创建默认管理员用户
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashedPassword,
      name: "管理员",
      role: "admin",
    },
  });
  console.log("✅ 管理员用户已创建 (admin / admin123)");

  // 创建产品分类
  const categories = [
    { name: "透气橡皮膏系列", slug: "rubber-plaster", order: 1 },
    { name: "水凝胶系列", slug: "hydrogel", order: 2 },
    { name: "热敷贴系列", slug: "heating-patch", order: 3 },
    { name: "儿科护理", slug: "pediatric", order: 4 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ 产品分类已创建");

  // 创建新闻分类
  const newsCategories = [
    { name: "企业动态", slug: "company-news" },
    { name: "行业干货", slug: "industry-tips" },
    { name: "市场分析", slug: "market-analysis" },
    { name: "常见问题", slug: "faq" },
  ];

  for (const cat of newsCategories) {
    await prisma.newsCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log("✅ 新闻分类已创建");

  // 获取分类ID
  const rubberPlaster = await prisma.category.findUnique({
    where: { slug: "rubber-plaster" },
  });
  const hydrogel = await prisma.category.findUnique({
    where: { slug: "hydrogel" },
  });
  const heatingPatch = await prisma.category.findUnique({
    where: { slug: "heating-patch" },
  });
  const pediatric = await prisma.category.findUnique({
    where: { slug: "pediatric" },
  });

  // 创建示例产品
  const products = [
    {
      name: "老同桌远红外筋骨消痛贴",
      slug: "far-infrared-pain-relief",
      categoryId: rubberPlaster!.id,
      image: "/images/product-sample.png",
      tags: JSON.stringify(["药房爆款", "二类器械", "激光打孔"]),
      specs: "8贴/盒",
      summary: "采用远红外技术，深层渗透，持续发热，有效缓解颈肩腰腿痛症状。",
      isPublished: true,
      isHot: true,
    },
    {
      name: "激光微孔透气橡皮膏",
      slug: "micropore-rubber-plaster",
      categoryId: rubberPlaster!.id,
      image: "/images/product-sample.png",
      tags: JSON.stringify(["激光打孔", "高透气", "致敏率低"]),
      specs: "100张/包",
      summary:
        "专为诊所、理疗馆供应的空贴基布。采用优质橡皮膏涂布，均匀激光微孔，透气性极佳。",
      isPublished: true,
    },
    {
      name: "儿童退热贴",
      slug: "children-fever-patch",
      categoryId: hydrogel!.id,
      image: "/images/product-sample.png",
      tags: JSON.stringify(["物理降温", "宝妈必备", "温和不刺激"]),
      specs: "4贴/盒",
      summary:
        "进口亲水性高分子凝胶，快速带走热量。温和低敏配方，不伤宝宝娇嫩肌肤。",
      isPublished: true,
    },
    {
      name: "医用冷敷贴（面膜型）",
      slug: "medical-cold-mask",
      categoryId: hydrogel!.id,
      image: "/images/product-sample.png",
      tags: JSON.stringify(["医美修护", "无菌生产", "械字号"]),
      specs: "5片/盒",
      summary: "二类医疗器械资质，适用于医美术后修复。无菌车间生产，安全可靠。",
      isPublished: true,
    },
    {
      name: "艾草颈椎热敷贴",
      slug: "moxa-neck-heating-patch",
      categoryId: heatingPatch!.id,
      image: "/images/product-sample.png",
      tags: JSON.stringify(["自发热", "艾草精华", "四季可用"]),
      specs: "6贴/盒",
      summary: "蕲艾提取物配方，自发热技术，持续8-12小时温热舒适。",
      isPublished: true,
    },
  ];

  for (const product of products) {
    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
    });
    if (!existing) {
      await prisma.product.create({ data: product });
    }
  }
  console.log("✅ 示例产品已创建");

  // 获取新闻分类ID
  const companyNews = await prisma.newsCategory.findUnique({
    where: { slug: "company-news" },
  });
  const industryTips = await prisma.newsCategory.findUnique({
    where: { slug: "industry-tips" },
  });

  // 创建示例新闻
  const newsArticles = [
    {
      title: "橡皮膏贴牌代加工需要注意哪些坑？老司机带你避雷",
      slug: "oem-pitfalls-guide",
      categoryId: industryTips!.id,
      summary:
        "很多刚入行想要做膏药品牌的客户，往往会被低价吸引。本文将从基布选择、药量配比、资质授权三个方面，为您详细解析OEM代工中的常见陷阱...",
      author: "老同桌研发部",
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      title: "热烈祝贺安徽老同桌荣获'年度诚信示范企业'称号",
      slug: "annual-integrity-award",
      categoryId: companyNews!.id,
      summary:
        "在近日举办的2025药械行业年度盛典上，安徽老同桌生物科技有限公司凭借过硬的产品质量和良好的市场口碑，荣获...",
      author: "品牌中心",
      isPublished: true,
      publishedAt: new Date(),
    },
  ];

  for (const article of newsArticles) {
    const existing = await prisma.news.findUnique({
      where: { slug: article.slug },
    });
    if (!existing) {
      await prisma.news.create({ data: article });
    }
  }
  console.log("✅ 示例新闻已创建");

  // 创建示例案例
  const cases = [
    {
      client: "某知名连锁大药房",
      title: "连锁药房自有品牌定制",
      tags: JSON.stringify(["OEM贴牌", "橡皮膏", "线下渠道"]),
      description:
        "客户拥有3000+家线下门店，需要开发一款高性价比的远红外贴以提升自有品牌利润率。我们提供了全套文号授权和包装设计，产品上架后单月销售额突破500万。",
      results: JSON.stringify(["单月销额500万+", "覆盖3000+门店"]),
      image: "/images/product-sample.png",
      isPublished: true,
      order: 1,
    },
    {
      client: "XX健康微商团队",
      title: "微商爆款颈椎贴全案开发",
      tags: JSON.stringify(["ODM定制", "水凝胶", "私域流量"]),
      description:
        "针对微商渠道对'视觉冲击力'和'即时体验'的高要求，我们特别研发了'凉感+热感'双效叠加的水凝胶配方，并设计了国潮风礼盒包装，首发当日售罄5万盒。",
      results: JSON.stringify(["首发售罄5万盒", "复购率提升40%"]),
      image: "/images/product-sample.png",
      isPublished: true,
      order: 2,
    },
  ];

  for (const caseItem of cases) {
    const existing = await prisma.case.findFirst({
      where: { title: caseItem.title },
    });
    if (!existing) {
      await prisma.case.create({ data: caseItem });
    }
  }
  console.log("✅ 示例案例已创建");

  console.log("🎉 数据库初始化完成！");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
