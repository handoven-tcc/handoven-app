interface ProdutoResponse {
  id: string;
  name: string;
  type: string;
  validity: string;
  category: string;
  cost: string;
  amount: number;
  familyId: string;
  expiryProduct: boolean;
}

export type { ProdutoResponse };
