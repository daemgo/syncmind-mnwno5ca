export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  /** 基材类型 */
  substrate: string;
  /** 镀膜工艺 */
  process: string;
  /** 颜色/膜色 */
  color: string;
  /** 适用场景 */
  application: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  image: string;
  createdAt: string;
}

export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock" | "custom";

/** 基材类型 */
export const substrateOptions = [
  "铜/铜合金",
  "不锈钢",
  "锌合金",
  "铝合金",
  "钛合金",
  "铁/钢",
] as const;

/** 镀膜工艺 */
export const processOptions = [
  "PVD离子镀",
  "PVD磁控溅射",
  "PVD真空离子镀",
  "UV真空电镀",
  "纳米涂层",
] as const;

/** 膜色/颜色 */
export const colorOptions = [
  "金色",
  "银白色",
  "黑色",
  "枪色",
  "玫瑰金",
  "蓝宝石蓝",
  "七彩渐变",
  "古铜色",
  "本色",
] as const;
