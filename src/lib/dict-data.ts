export interface DictItem {
  label: string;
  value: string;
  color?: string;
}

export const dictionaries: Record<string, DictItem[]> = {
  "dict-product-status": [
    { label: "有货", value: "in_stock", color: "green" },
    { label: "库存紧张", value: "low_stock", color: "yellow" },
    { label: "缺货", value: "out_of_stock", color: "red" },
  ],
  "dict-product-category": [
    { label: "物联网设备", value: "物联网设备", color: "blue" },
    { label: "传感器", value: "传感器", color: "emerald" },
    { label: "视觉设备", value: "视觉设备", color: "purple" },
    { label: "计算模块", value: "计算模块", color: "orange" },
    { label: "电力设备", value: "电力设备", color: "amber" },
  ],
};
