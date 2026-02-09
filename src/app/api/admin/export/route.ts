import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET /api/admin/export - 导出数据库为 SQL
export async function GET() {
  try {
    // 获取所有数据
    const [
      users,
      categories,
      products,
      newsCategories,
      news,
      cases,
      settings,
      messages,
    ] = await Promise.all([
      prisma.user.findMany(),
      prisma.category.findMany(),
      prisma.product.findMany(),
      prisma.newsCategory.findMany(),
      prisma.news.findMany(),
      prisma.case.findMany(),
      prisma.setting.findMany(),
      prisma.message.findMany(),
    ]);

    // 生成 SQL 语句
    let sql = `-- 数据库导出时间: ${new Date().toISOString()}\n`;
    sql += `-- 老同桌后台管理系统数据备份\n\n`;

    // 帮助函数：转义 SQL 字符串
    const escapeSQL = (value: any): string => {
      if (value === null || value === undefined) return "NULL";
      if (typeof value === "boolean") return value ? "1" : "0";
      if (typeof value === "number") return String(value);
      if (value instanceof Date) return `'${value.toISOString()}'`;
      return `'${String(value).replace(/'/g, "''")}'`;
    };

    // 用户表
    sql += `-- ==================== 用户表 ====================\n`;
    sql += `DELETE FROM User;\n`;
    for (const user of users) {
      sql += `INSERT INTO User (id, username, password, name, role, createdAt, updatedAt) VALUES (${escapeSQL(user.id)}, ${escapeSQL(user.username)}, ${escapeSQL(user.password)}, ${escapeSQL(user.name)}, ${escapeSQL(user.role)}, ${escapeSQL(user.createdAt)}, ${escapeSQL(user.updatedAt)});\n`;
    }
    sql += "\n";

    // 产品分类表
    sql += `-- ==================== 产品分类表 ====================\n`;
    sql += `DELETE FROM Category;\n`;
    for (const cat of categories) {
      sql += `INSERT INTO Category (id, name, slug, description, \`order\`, createdAt, updatedAt) VALUES (${escapeSQL(cat.id)}, ${escapeSQL(cat.name)}, ${escapeSQL(cat.slug)}, ${escapeSQL(cat.description)}, ${escapeSQL(cat.order)}, ${escapeSQL(cat.createdAt)}, ${escapeSQL(cat.updatedAt)});\n`;
    }
    sql += "\n";

    // 产品表
    sql += `-- ==================== 产品表 ====================\n`;
    sql += `DELETE FROM Product;\n`;
    for (const product of products) {
      sql += `INSERT INTO Product (id, name, slug, categoryId, image, images, tags, specs, summary, description, features, isPublished, isHot, \`order\`, createdAt, updatedAt) VALUES (${escapeSQL(product.id)}, ${escapeSQL(product.name)}, ${escapeSQL(product.slug)}, ${escapeSQL(product.categoryId)}, ${escapeSQL(product.image)}, ${escapeSQL(product.images)}, ${escapeSQL(product.tags)}, ${escapeSQL(product.specs)}, ${escapeSQL(product.summary)}, ${escapeSQL(product.description)}, ${escapeSQL(product.features)}, ${escapeSQL(product.isPublished)}, ${escapeSQL(product.isHot)}, ${escapeSQL(product.order)}, ${escapeSQL(product.createdAt)}, ${escapeSQL(product.updatedAt)});\n`;
    }
    sql += "\n";

    // 新闻分类表
    sql += `-- ==================== 新闻分类表 ====================\n`;
    sql += `DELETE FROM NewsCategory;\n`;
    for (const cat of newsCategories) {
      sql += `INSERT INTO NewsCategory (id, name, slug, createdAt, updatedAt) VALUES (${escapeSQL(cat.id)}, ${escapeSQL(cat.name)}, ${escapeSQL(cat.slug)}, ${escapeSQL(cat.createdAt)}, ${escapeSQL(cat.updatedAt)});\n`;
    }
    sql += "\n";

    // 新闻表
    sql += `-- ==================== 新闻表 ====================\n`;
    sql += `DELETE FROM News;\n`;
    for (const article of news) {
      sql += `INSERT INTO News (id, title, slug, categoryId, summary, content, coverImage, author, views, isPublished, publishedAt, createdAt, updatedAt) VALUES (${escapeSQL(article.id)}, ${escapeSQL(article.title)}, ${escapeSQL(article.slug)}, ${escapeSQL(article.categoryId)}, ${escapeSQL(article.summary)}, ${escapeSQL(article.content)}, ${escapeSQL(article.coverImage)}, ${escapeSQL(article.author)}, ${escapeSQL(article.views)}, ${escapeSQL(article.isPublished)}, ${escapeSQL(article.publishedAt)}, ${escapeSQL(article.createdAt)}, ${escapeSQL(article.updatedAt)});\n`;
    }
    sql += "\n";

    // 案例表
    sql += `-- ==================== 合作案例表 ====================\n`;
    sql += `DELETE FROM \`Case\`;\n`;
    for (const caseItem of cases) {
      sql += `INSERT INTO \`Case\` (id, client, title, tags, description, results, image, isPublished, \`order\`, createdAt, updatedAt) VALUES (${escapeSQL(caseItem.id)}, ${escapeSQL(caseItem.client)}, ${escapeSQL(caseItem.title)}, ${escapeSQL(caseItem.tags)}, ${escapeSQL(caseItem.description)}, ${escapeSQL(caseItem.results)}, ${escapeSQL(caseItem.image)}, ${escapeSQL(caseItem.isPublished)}, ${escapeSQL(caseItem.order)}, ${escapeSQL(caseItem.createdAt)}, ${escapeSQL(caseItem.updatedAt)});\n`;
    }
    sql += "\n";

    // 设置表
    sql += `-- ==================== 网站设置表 ====================\n`;
    sql += `DELETE FROM Setting;\n`;
    for (const setting of settings) {
      sql += `INSERT INTO Setting (id, \`key\`, value, createdAt, updatedAt) VALUES (${escapeSQL(setting.id)}, ${escapeSQL(setting.key)}, ${escapeSQL(setting.value)}, ${escapeSQL(setting.createdAt)}, ${escapeSQL(setting.updatedAt)});\n`;
    }
    sql += "\n";

    // 留言表
    sql += `-- ==================== 留言表 ====================\n`;
    sql += `DELETE FROM Message;\n`;
    for (const message of messages) {
      sql += `INSERT INTO Message (id, name, phone, type, content, isRead, isHandled, note, createdAt, updatedAt) VALUES (${escapeSQL(message.id)}, ${escapeSQL(message.name)}, ${escapeSQL(message.phone)}, ${escapeSQL(message.type)}, ${escapeSQL(message.content)}, ${escapeSQL(message.isRead)}, ${escapeSQL(message.isHandled)}, ${escapeSQL(message.note)}, ${escapeSQL(message.createdAt)}, ${escapeSQL(message.updatedAt)});\n`;
    }

    // 返回 SQL 文件
    const filename = `laotongzhuo_backup_${new Date().toISOString().slice(0, 10)}.sql`;

    return new NextResponse(sql, {
      headers: {
        "Content-Type": "application/sql",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("导出数据库失败:", error);
    return NextResponse.json({ error: "导出失败" }, { status: 500 });
  }
}
