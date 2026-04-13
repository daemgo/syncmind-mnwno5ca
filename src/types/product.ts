export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  description: string;
  image: string;
  createdAt: string;
}

export type ProductStatus = "in_stock" | "low_stock" | "out_of_stock";
