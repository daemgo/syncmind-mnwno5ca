import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Package, DollarSign, Warehouse, Calendar, FileText } from "lucide-react";
import { productMock } from "@/mock/product";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
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
          {getDictLabel(product.status, "dict-product-status")}
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

        {/* Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">产品编号</p>
                  <p className="font-mono text-sm">{product.code}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">产品分类</p>
                  <p className="text-sm">{product.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900">
                  <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">单价</p>
                  <p className="font-medium">¥{product.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900">
                  <Warehouse className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">库存数量</p>
                  <p className="font-medium">{product.stock} 件</p>
                </div>
              </div>

              <div className="flex items-center gap-3 col-span-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Calendar className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">创建日期</p>
                  <p className="text-sm">{product.createdAt}</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-xs text-muted-foreground mb-2">产品描述</p>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="sales" className="w-full">
        <TabsList>
          <TabsTrigger value="sales">销售记录</TabsTrigger>
          <TabsTrigger value="stock">库存变动</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { date: "2026-04-12", quantity: 5, customer: "浙江某制造企业" },
                  { date: "2026-04-08", quantity: 10, customer: "江苏某科技公司" },
                  { date: "2026-03-25", quantity: 3, customer: "上海某贸易公司" },
                ].map((record, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{record.customer}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                    <Badge variant="outline">售出 {record.quantity} 件</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stock" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { date: "2026-04-10", change: "+50", type: "入库" },
                  { date: "2026-03-28", change: "-10", type: "出库" },
                  { date: "2026-03-15", change: "+100", type: "入库" },
                ].map((record, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{record.type}</p>
                      <p className="text-xs text-muted-foreground">{record.date}</p>
                    </div>
                    <Badge className={record.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}>
                      {record.change} 件
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
