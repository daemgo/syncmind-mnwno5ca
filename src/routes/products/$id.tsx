import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Palette, Cog, Layers, Target, Phone, MessageSquare } from "lucide-react";
import { productMock } from "@/mock/product";
import { getBadgeClassName } from "@/lib/dict";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/types/product";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetail,
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = productMock.find((d) => d.id === id);

  if (!product) {
    return (
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/products"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <h1 className="text-2xl font-bold">未找到产品</h1>
        </div>
        <p className="text-muted-foreground">该产品不存在或已被删除。</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/products"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <Badge className={getBadgeClassName(product.status)}>
          {product.status === "custom" ? "来料定制" : product.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image */}
        <Card className="lg:col-span-1">
          <CardContent className="p-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </CardContent>
        </Card>

        {/* Specs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>选型规格</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Cog className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">产品编号</p>
                  <p className="font-mono text-sm">{product.code}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900">
                  <Layers className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">产品分类</p>
                  <p className="text-sm">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                  <Cog className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">基材类型</p>
                  <Badge variant="outline">{product.substrate}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900">
                  <Cog className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">镀膜工艺</p>
                  <Badge variant="outline">{product.process}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900">
                  <Palette className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">膜色/颜色</p>
                  <Badge variant="outline">{product.color}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-900">
                  <Target className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">适用场景</p>
                  <p className="text-sm">{product.application}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs text-muted-foreground mb-2">产品描述</p>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">加工说明</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    本产品为PVD镀膜加工服务，支持来料加工。具体价格根据产品数量、尺寸、工艺要求综合评估。
                    批量加工可享优惠，欢迎联系详询。
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">
                <Phone className="mr-2 h-4 w-4" />联系询价
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />在线咨询
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
