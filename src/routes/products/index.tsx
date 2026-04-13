import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DataTable, type ColumnConfig } from "@/components/biz/data-table";
import { DataFilter, type FilterField } from "@/components/biz/data-filter";
import { FormDialog, type FormField } from "@/components/biz/form-dialog";
import { productMock } from "@/mock/product";
import type { Product } from "@/types/product";

export const Route = createFileRoute("/products/")({
  component: ProductPage,
});

const columns: ColumnConfig<Product>[] = [
  { key: "code", label: "编号", type: "mono" },
  { key: "name", label: "产品名称" },
  { key: "category", label: "分类", type: "badge", dictId: "dict-product-category" },
  { key: "price", label: "单价", type: "money", align: "right" },
  { key: "stock", label: "库存", type: "number", align: "right" },
  { key: "status", label: "状态", type: "badge", dictId: "dict-product-status" },
  { key: "createdAt", label: "创建日期", type: "date" },
];

const filterFields: FilterField[] = [
  { key: "name", label: "产品名称", type: "text" },
  { key: "category", label: "分类", type: "select", dictId: "dict-product-category" },
  { key: "status", label: "状态", type: "select", dictId: "dict-product-status" },
];

const formFields: FormField[] = [
  { key: "name", label: "产品名称", type: "text", required: true },
  { key: "category", label: "分类", type: "select", dictId: "dict-product-category", required: true },
  { key: "price", label: "单价", type: "number", required: true },
  { key: "stock", label: "库存", type: "number", required: true },
  { key: "status", label: "状态", type: "select", dictId: "dict-product-status" },
  { key: "description", label: "描述", type: "textarea" },
];

function ProductPage() {
  const navigate = useNavigate();
  const [data] = useState(productMock);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Product | undefined>();
  const [filters, setFilters] = useState<Record<string, string>>({});

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
          <h1 className="text-2xl font-bold">产品列表</h1>
          <p className="text-muted-foreground mt-1">管理所有产品信息</p>
        </div>
        <Button onClick={() => { setEditingItem(undefined); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />新建产品
        </Button>
      </div>

      <DataFilter fields={filterFields} values={filters} onChange={setFilters} />

      <DataTable
        columns={columns}
        data={filtered}
        onView={(item) => navigate({ to: "/products/$id", params: { id: item.id } })}
        onEdit={(item) => { setEditingItem(item); setDialogOpen(true); }}
      />

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
