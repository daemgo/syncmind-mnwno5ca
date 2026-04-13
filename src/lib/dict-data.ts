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
    { label: "来料定制", value: "custom", color: "blue" },
  ],
  "dict-product-category": [
    { label: "卫浴五金", value: "卫浴五金", color: "blue" },
    { label: "渔具配件", value: "渔具配件", color: "emerald" },
    { label: "运动配件", value: "运动配件", color: "orange" },
    { label: "户外用品", value: "户外用品", color: "amber" },
    { label: "五金配件", value: "五金配件", color: "slate" },
    { label: "装饰工艺", value: "装饰工艺", color: "purple" },
  ],
  "dict-substrate": [
    { label: "铜/铜合金", value: "铜/铜合金", color: "yellow" },
    { label: "不锈钢", value: "不锈钢", color: "gray" },
    { label: "锌合金", value: "锌合金", color: "slate" },
    { label: "铝合金", value: "铝合金", color: "blue" },
    { label: "钛合金", value: "钛合金", color: "violet" },
    { label: "铁/钢", value: "铁/钢", color: "neutral" },
  ],
  "dict-process": [
    { label: "PVD离子镀", value: "PVD离子镀", color: "blue" },
    { label: "PVD磁控溅射", value: "PVD磁控溅射", color: "emerald" },
    { label: "PVD真空离子镀", value: "PVD真空离子镀", color: "cyan" },
    { label: "UV真空电镀", value: "UV真空电镀", color: "violet" },
    { label: "纳米涂层", value: "纳米涂层", color: "pink" },
  ],
  "dict-color": [
    { label: "金色", value: "金色", color: "yellow" },
    { label: "银白色", value: "银白色", color: "gray" },
    { label: "黑色", value: "黑色", color: "neutral" },
    { label: "枪色", value: "枪色", color: "slate" },
    { label: "玫瑰金", value: "玫瑰金", color: "pink" },
    { label: "蓝宝石蓝", value: "蓝宝石蓝", color: "blue" },
    { label: "七彩渐变", value: "七彩渐变", color: "violet" },
    { label: "古铜色", value: "古铜色", color: "amber" },
    { label: "本色", value: "本色", color: "stone" },
  ],
};
