import prisma from "@/lib/prisma";
import SettingsClient from "./settings-client";

async function getSettings() {
  const settings = await prisma.setting.findMany();

  // 转换为键值对对象
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value || "";
  });

  return settingsMap;
}

export default async function SettingsPage() {
  const settings = await getSettings();

  return <SettingsClient initialSettings={settings} />;
}
