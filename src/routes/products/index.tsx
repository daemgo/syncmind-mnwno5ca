import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { productMock } from "@/mock/product";
import type { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/products/")({
  component: ProductPage,
});

const columns: ColumnConfig<Product>[] = [
  { key: "code", label: "编号", type: "mono" },
  { key: "name", label: "产品名称" },
  { key: "category", label: "分类", type: "badge", dictId: "dict-product-category" },
  { key: "substrate", label: "基材", type: "badge", dictId: "dict-substrate" },
  { key: "process", label: "工艺", type: "badge", dictId: "dict-process" },
  { key: "color", label: "颜色", type: "badge", dictId: "dict-color" },
  { key: "application", label: "适用场景", type: "text" },
];

const filterFields: FilterField[] = [
  { key: "name", label: "产品名称/关键词", type: "text" },
  { key: "category", label: "分类", type: "select", dictId: "dict-product-category" },
  { key: "substrate", label: "基材", type: "select", dictId: "dict-substrate" },
  { key: "process", label: "工艺", type: "select", dictId: "dict-process" },
  { key: "color", label: "颜色", type: "select", dictId: "dict-color" },
];

const formFields: FormField[] = [
  { key: "name", label: "产品名称", type: "text", required: true },
  { key: "category", label: "分类", type: "select", dictId: "dict-product-category", required: true },
  { key: "substrate", label: "基材", type: "select", dictId: "dict-substrate", required: true },
  { key: "process", label: "工艺", type: "select", dictId: "dict-process", required: true },
  { key: "color", label: "颜色", type: "select", dictId: "dict-color", required: true },
  { key: "application", label: "适用场景", type: "text" },
  { key: "description", label: "描述", type: "textarea" },
];

function ProductPage() {
  const navigate = useNavigate();
  const [data] = useState(productMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | undefined>();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards");

  const filtered = data.filter((item) => {
    return Object.entries(filters).every(([key, val]) => {
      if (!val) return true;
      const fieldVal = String((item as unknown as Record<string, unknown>)[key] ?? "");
      return fieldVal.toLowerCase().includes(val.toLowerCase());
    });
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">PVD镀膜加工 - 在线选型</h1>
          <p className="text-muted-foreground mt-1">选择基材、工艺和颜色，快速匹配您的加工需求</p>
        </div>
        <div className="flex gap-2">
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
            >
              卡片
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              列表
            </Button>
          </div>
          <Button variant="outline" onClick={() => { setEditingItem(undefined); setDialogOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />新建产品
          </Button>
        </div>
      </div>

      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />

      {viewMode === "table" ? (
        <DataTable
          columns={columns}
          data={filtered}
          onView={(item) => navigate({ to: "/products/$id", params: { id: item.id } })}
          onEdit={(item) => { setEditingItem(item); setDialogOpen(true); }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => navigate({ to: "/products/$id", params: { id: item.id } })}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-mono">{item.code}</p>
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                    {item.substrate}
                  </span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs rounded">
                    {item.process}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs rounded">
                    {item.color}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.application}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <FormDialog
        entityName="产品"
        fields={formFields}
        data={editingItem as unknown as Record<string, unknown>}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
