"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  LayoutDashboard,
  MessageSquare,
  Package,
  Layers,
  Newspaper,
  Handshake,
  Users,
  Settings,
  Download,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "仪表盘",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "留言管理",
    url: "/admin/messages",
    icon: MessageSquare,
  },
  {
    title: "产品管理",
    url: "/admin/products",
    icon: Package,
  },
  {
    title: "产品分类",
    url: "/admin/categories",
    icon: Layers,
  },
  {
    title: "资讯中心",
    url: "/admin/news",
    icon: Newspaper,
  },
  {
    title: "合作案例",
    url: "/admin/cases",
    icon: Handshake,
  },
  {
    title: "用户管理",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "网站设置",
    url: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">老同桌后台</span>
                  <span className="truncate text-xs">管理系统</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>菜单</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="导出数据库"
              onClick={() => {
                // 触发下载
                window.location.href = "/api/admin/export";
              }}
            >
              <button type="button" className="w-full">
                <Download />
                <span>导出数据库</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="查看前台">
              <Link href="/" target="_blank">
                <Send />
                <span>查看前台网站</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
