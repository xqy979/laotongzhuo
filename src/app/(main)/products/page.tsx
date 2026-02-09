"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Search, Loader2 } from "lucide-react";

// Product Data Type Definition
type Category = {
  id: string;
  name: string;
  slug: string;
  _count?: {
    products: number;
  };
};

type Product = {
  id: string;
  name: string;
  specs: string | null;
  image: string | null;
  tags: string | null;
  summary: string | null;
  isHot: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 获取分类
  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (error) {
      console.error("获取分类失败:", error);
    }
  }, []);

  // 获取产品
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeCategory !== "all") {
        params.set("category", activeCategory);
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("获取产品失败:", error);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // 搜索过滤
  const filteredProducts = products.filter((product) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(query) ||
      (product.summary && product.summary.toLowerCase().includes(query))
    );
  });

  // 解析 tags
  const parseTags = (tags: string | null): string[] => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-white py-12 md:py-20 border-b border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            自有品牌产品目录
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            正规械字号/消字号产品，资质齐全，支持药房、诊所、电商全渠道铺货。
            <br />
            <span className="text-primary font-bold">
              诚招全国代理商，提供全套控销支持！
            </span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-white shadow-md"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                全部分类
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.slug
                      ? "bg-primary text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat.name}
                  {cat._count && cat._count.products > 0 && (
                    <span className="ml-1 text-xs opacity-70">
                      ({cat._count.products})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-auto min-w-[300px]">
              <input
                type="text"
                placeholder="输入产品名称或功效..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          /* Product Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const tags = parseTags(product.tags);
                return (
                  <Link
                    href={`/products/${product.id}`}
                    key={product.id}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                      {/* Image Area */}
                      <div className="aspect-[4/4] bg-slate-100 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="text-slate-400 text-sm">
                              暂无图片
                            </div>
                          )}
                        </div>
                        {/* Hot Badge */}
                        {product.isHot && (
                          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                            热销
                          </div>
                        )}
                        {/* Tags Overlay */}
                        {tags.length > 0 && (
                          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                            {tags.slice(0, 2).map((tag, idx) => (
                              <span
                                key={idx}
                                className="bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded text-primary border border-primary/10"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </div>
                        {product.specs && (
                          <p className="text-xs text-slate-500 mb-3 bg-slate-50 inline-block px-2 py-1 rounded self-start">
                            规格：{product.specs}
                          </p>
                        )}
                        {product.summary && (
                          <p className="text-sm text-slate-600 mb-4 line-clamp-2 flex-grow">
                            {product.summary}
                          </p>
                        )}
                        <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-sm font-semibold text-primary">
                          <span>查看详情</span>
                          <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="col-span-full py-20 text-center text-slate-500">
                <p className="text-lg">未找到相关产品，请尝试其他关键词</p>
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 text-primary hover:underline"
                >
                  清除筛选条件
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
