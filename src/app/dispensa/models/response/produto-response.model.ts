import { ReceitaIngredienteCategoria } from "../../../receitas/models";

interface ProdutoResponse {
  id: string;
  name: string;
  type: string;
  validity: string;
  category: ReceitaIngredienteCategoria;
  cost: string;
  amount: number;
  unitMeasure: string;
  familyId: string;
  expiryProduct: boolean;
}

export type { ProdutoResponse };
