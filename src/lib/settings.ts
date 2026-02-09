import prisma from "@/lib/prisma";

// 默认设置值
const defaultSettings: Record<string, string> = {
  siteName: "安徽老同桌生物科技有限公司",
  siteDescription: "专注膏药贴剂研发生产，提供一站式OEM/ODM代加工服务",
  seoKeywords: "膏药贴剂,OEM代加工,ODM定制,医用冷敷贴",
  phone: "400-888-6666",
  email: "contact@laotongzhuo.com",
  address: "安徽省阜阳市太和县经济开发区",
  copyright: "© 2024 安徽老同桌生物科技有限公司 版权所有",
  icp: "皖ICP备2024000001号",
  police: "皖公网安备34122202000001号",
  wechat: "",
  qq: "",
  wechatPublic: "",
  douyin: "",
};

// 获取所有设置
export async function getSettings(): Promise<Record<string, string>> {
  try {
    const settings = await prisma.setting.findMany();

    // 合并默认值和数据库值
    const settingsMap: Record<string, string> = { ...defaultSettings };
    settings.forEach((s) => {
      if (s.value) {
        settingsMap[s.key] = s.value;
      }
    });

    return settingsMap;
  } catch (error) {
    console.error("获取设置失败:", error);
    return defaultSettings;
  }
}

// 获取单个设置
export async function getSetting(key: string): Promise<string> {
  try {
    const setting = await prisma.setting.findUnique({
      where: { key },
    });
    return setting?.value || defaultSettings[key] || "";
  } catch (error) {
    console.error(`获取设置 ${key} 失败:`, error);
    return defaultSettings[key] || "";
  }
}

// 导出默认设置供其他地方使用
export { defaultSettings };
