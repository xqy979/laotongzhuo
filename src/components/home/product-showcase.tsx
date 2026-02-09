"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Product = {
  id: string;
  name: string;
  specs: string | null;
  image: string | null;
  tags: string | null;
  isHot: boolean;
  category: Category;
};

export function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("hot");

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
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("获取产品失败:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  // 解析 tags
  const parseTags = (tags: string | null): string[] => {
    if (!tags) return [];
    try {
      return JSON.parse(tags);
    } catch {
      return [];
    }
  };

  // 过滤产品
  const filteredProducts = products
    .filter((product) => {
      if (activeCategory === "hot") {
        return product.isHot;
      }
      return product.category.slug === activeCategory;
    })
    .slice(0, 4);

  // 显示全部分类
  const displayCategories = [
    { id: "hot", name: "热销推荐", slug: "hot" },
    ...categories.slice(0, 3),
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              精选产品展示
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              自主研发品牌，多种剂型，满足不同渠道销售需求
            </p>
          </div>
          <Link
            href="/products"
            className="hidden md:flex items-center text-primary font-semibold hover:text-red-700 transition-colors mt-4 md:mt-0"
          >
            查看全部产品 <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {displayCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.slug
                  ? "bg-primary text-white shadow-lg shadow-primary/25"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-slate-500">暂无产品</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const tags = parseTags(product.tags);
              const firstTag = tags[0] || "优质产品";

              return (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="text-slate-400 text-sm">暂无图片</div>
                      )}
                    </div>
                    <div className="absolute top-4 left-4 bg-secondary text-slate-900 text-xs font-bold px-3 py-1 rounded-full">
                      {firstTag}
                    </div>
                    {product.isHot && (
                      <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        热销
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-4">
                      {product.specs || product.category.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">查看详情</span>
                      <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-10 md:hidden text-center">
          <Link
            href="/products"
            className="inline-flex items-center text-primary font-semibold"
          >
            查看全部产品 <ArrowRight className="ml-1 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
