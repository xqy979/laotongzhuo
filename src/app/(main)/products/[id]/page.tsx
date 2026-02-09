"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  ShieldCheck,
  Truck,
  Phone,
  Loader2,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  slug: string | null;
  specs: string | null;
  image: string | null;
  images: string | null;
  summary: string | null;
  description: string | null;
  features: string | null;
  scenes: string | null;
  tags: string | null;
  license: string | null;
  isPublished: boolean;
  isHot: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  // 获取产品详情
  const fetchProduct = useCallback(async () => {
    try {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);

        // 获取相关产品
        if (data.category?.slug) {
          const relatedRes = await fetch(
            `/api/products?category=${data.category.slug}`,
          );
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            setRelatedProducts(
              relatedData.filter((p: Product) => p.id !== data.id).slice(0, 3),
            );
          }
        }
      }
    } catch (error) {
      console.error("获取产品失败:", error);
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // 解析 JSON 字段
  const parseJSON = (str: string | null): string[] => {
    if (!str) return [];
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center">
        <p className="text-slate-500 text-lg mb-4">产品不存在</p>
        <Link href="/products" className="text-primary hover:underline">
          返回产品列表
        </Link>
      </div>
    );
  }

  const images = parseJSON(product.images);
  const productImages =
    images.length > 0 ? images : product.image ? [product.image] : [];
  const features = parseJSON(product.features);
  const scenes = parseJSON(product.scenes);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 text-sm text-slate-500 flex items-center gap-2">
          <Link
            href="/products"
            className="hover:text-primary flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> 返回产品列表
          </Link>
          <span className="text-slate-300">|</span>
          <span>{product.category.name}</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {/* Main Product Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12">
            {/* Left: Image Gallery */}
            <div className="p-6 md:p-10 bg-slate-50 flex flex-col items-center">
              <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-slate-200 mb-4 overflow-hidden relative">
                {productImages.length > 0 ? (
                  <img
                    src={productImages[activeImg]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    暂无图片
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-primary text-white text-xs font-bold px-2 py-1 rounded">
                  正品保障
                </div>
              </div>
              {productImages.length > 1 && (
                <div className="flex gap-4 overflow-x-auto w-full pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={`w-20 h-20 rounded-lg border-2 bg-white flex-shrink-0 p-1 ${activeImg === idx ? "border-primary" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx}`}
                        className="w-full h-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="p-6 md:p-10 flex flex-col">
              {product.license && (
                <div className="mb-2 text-sm font-semibold text-primary bg-primary/5 inline-block px-3 py-1 rounded-full self-start">
                  {product.license}
                </div>
              )}
              <h1 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="space-y-4 mb-8">
                {product.specs && (
                  <div className="flex border-b border-slate-100 pb-3">
                    <span className="w-24 text-slate-500">产品规格</span>
                    <span className="font-medium text-slate-900">
                      {product.specs}
                    </span>
                  </div>
                )}
                {product.summary && (
                  <div className="flex border-b border-slate-100 pb-3">
                    <span className="w-24 text-slate-500">适用范围</span>
                    <span className="font-medium text-slate-900">
                      {product.summary}
                    </span>
                  </div>
                )}
                <div className="flex border-b border-slate-100 pb-3">
                  <span className="w-24 text-slate-500">所属分类</span>
                  <span className="font-medium text-slate-900">
                    {product.category.name}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mt-auto">
                <p className="text-sm text-slate-500 mb-4">
                  <span className="font-bold text-slate-900">温馨提示：</span>{" "}
                  本页面主要展示产品信息，不支持直接在线购买。如需代理或拿货，请联系销售经理。
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:400xxxxxxx"
                    className="flex-1 bg-primary text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                  >
                    <Phone className="h-5 w-5" /> 电话咨询底价
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 bg-white text-slate-700 font-bold py-3 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center"
                  >
                    在线申请拿样
                  </Link>
                </div>
              </div>

              {/* Services Icons */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-500">
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="h-6 w-6 text-slate-400" />
                  <span>资质齐全</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <CheckCircle className="h-6 w-6 text-slate-400" />
                  <span>源头正品</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Truck className="h-6 w-6 text-slate-400" />
                  <span>闪电发货</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Image Content (Long Scroll) */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {features.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">
                  产品卖点解析
                </h2>
                <div className="prose prose-slate max-w-none">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 bg-slate-50 p-4 rounded-lg"
                      >
                        <div className="min-w-[24px] h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm">
                          {idx + 1}
                        </div>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {scenes.length > 0 && (
              <section className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">
                  适用场景
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {scenes.map((scene) => (
                    <div
                      key={scene}
                      className="text-center p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-colors"
                    >
                      <div className="w-12 h-12 bg-white rounded-full mx-auto mb-3 shadow-sm flex items-center justify-center text-2xl">
                        🤒
                      </div>
                      <span className="font-medium text-slate-700">
                        {scene}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {product.description && (
              <section className="bg-white rounded-2xl p-8 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-primary pl-4">
                  产品详情
                </h2>
                <div
                  className="prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </section>
            )}
          </div>

          {/* Sidebar: Recommendations */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">相关产品推荐</h3>
              {relatedProducts.length > 0 ? (
                <div className="space-y-4">
                  {relatedProducts.map((item) => (
                    <Link
                      href={`/products/${item.id}`}
                      key={item.id}
                      className="flex gap-3 group"
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-lg flex-shrink-0 overflow-hidden">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs">
                            无图
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 text-sm group-hover:text-primary transition-colors">
                          {item.name}
                        </h4>
                        {item.specs && (
                          <p className="text-xs text-slate-500 mt-1">
                            {item.specs}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-sm">暂无相关产品</p>
              )}
              <Link
                href="/products"
                className="block w-full text-center py-3 mt-6 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                查看全部产品
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
