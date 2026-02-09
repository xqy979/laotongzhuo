import prisma from "@/lib/prisma";
import MessagesClient from "./messages-client";

async function getMessages() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return messages.map((msg) => ({
    ...msg,
    createdAt: msg.createdAt.toISOString(),
  }));
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

  return <MessagesClient initialMessages={messages} initialStats={stats} />;
}
