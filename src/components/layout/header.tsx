"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "首页", href: "/" },
  { name: "膏药OEM代工", href: "/oem" },
  { name: "自有品牌产品", href: "/products" },
  { name: "合作案例", href: "/cases" },
  { name: "关于老同桌", href: "/about" },
  { name: "资讯中心", href: "/news" },
  { name: "联系我们", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">
                安徽老同桌
              </span>
              <span className="hidden text-sm font-medium text-muted-foreground md:block">
                | 专注膏药贴剂研发生产
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground",
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="hidden lg:flex items-center gap-2 rounded-full bg-primary/5 px-4 py-2 text-primary">
              <Phone className="h-4 w-4" />
              <span className="text-sm font-bold">400-XXX-XXXX</span>
            </div>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white"
          >
            <div className="space-y-1 px-4 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "block rounded-md px-3 py-2 text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary font-bold"
                        : "text-foreground hover:bg-primary/5 hover:text-primary",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary/5 px-3 py-3 text-primary">
                <Phone className="h-5 w-5" />
                <span className="font-bold">400-XXX-XXXX</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
