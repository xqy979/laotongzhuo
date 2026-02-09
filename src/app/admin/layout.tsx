"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 登录页面不显示后台布局
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("退出失败:", error);
    }
  };

  return (
    <div className="admin-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 w-full bg-slate-50 min-h-screen">
          <div className="flex items-center h-16 border-b bg-white px-4 shrink-0">
            <SidebarTrigger />
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 outline-none">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
                      A
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>管理员</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6 w-full space-y-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
