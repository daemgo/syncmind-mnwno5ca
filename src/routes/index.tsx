import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, AlertTriangle, DollarSign, PackageX, Activity } from "lucide-react";
import { productMock } from "@/mock/product";
import { getDictLabel, getBadgeClassName } from "@/lib/dict";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const chartConfig = {
  sales: { label: "销量", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

function Dashboard() {
  const totalProducts = productMock.length;
  const inStock = productMock.filter((p) => p.status === "in_stock").length;
  const lowStock = productMock.filter((p) => p.status === "low_stock").length;
  const outOfStock = productMock.filter((p) => p.status === "out_of_stock").length;
  const totalValue = productMock.reduce((sum, p) => sum + p.price * p.stock, 0);

  const chartData = productMock.map((p) => ({
    name: p.name.slice(0, 6),
    sales: Math.floor(Math.random() * 100) + 20,
  }));

  const recentProducts = productMock.slice(0, 3);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">产品概览</h1>
        <p className="text-muted-foreground mt-1">实时掌握产品库存与销售情况</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">产品总数</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-1">款产品在售</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">库存价值</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">¥{(totalValue / 10000).toFixed(1)}万</div>
            <p className="text-xs text-muted-foreground mt-1">库存总价值</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">库存紧张</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStock}</div>
            <p className="text-xs text-muted-foreground mt-1">款产品需补货</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">已缺货</CardTitle>
            <PackageX className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStock}</div>
            <p className="text-xs text-muted-foreground mt-1">款产品缺货中</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">产品销量分布</CardTitle>
            <CardDescription>各产品本月销量统计</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[280px] w-full">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} tickLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">最近更新</CardTitle>
            <CardDescription>最新入库的产品</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.code}</p>
                  </div>
                </div>
                <Badge className={getBadgeClassName(product.status)}>
                  {getDictLabel(product.status, "dict-product-status")}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Activity className="h-5 w-5" />
            近期动态
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "今天 14:30", action: "智能网关 Pro 库存更新", detail: "入库 50 件" },
              { time: "今天 10:15", action: "温湿度传感器 S1 库存预警", detail: "库存低于阈值" },
              { time: "昨天 16:45", action: "工业摄像头 X2 售出", detail: "订单 #ORD-20260412" },
              { time: "昨天 09:20", action: "边缘计算模组 M1 新品上架", detail: "售价 ¥1899" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
