import prisma from "@/lib/prisma";
import MessagesClient from "./messages-client";

async function getMessages() {
  return prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });
}

async function getStats() {
  const [total, unread, unhandled] = await Promise.all([
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.message.count({ where: { isHandled: false } }),
  ]);
  return { total, unread, unhandled };
}

export default async function MessagesPage() {
  const [messages, stats] = await Promise.all([getMessages(), getStats()]);

  // 序列化日期
  const serializedMessages = messages.map((m) => ({
    ...m,
    createdAt: m.createdAt.toISOString(),
    updatedAt: m.updatedAt.toISOString(),
  }));

  return (
    <MessagesClient initialMessages={serializedMessages} initialStats={stats} />
  );
}
