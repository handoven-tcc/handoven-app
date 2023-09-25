import { ReceitaIngredienteCategoria } from "../../../receitas/models";

class ProdutoRequest {
  constructor(
    public name: string,
    public type: string,
    public validity: string,
    public category: ReceitaIngredienteCategoria,
    public cost: string,
    public amount: number,
    public unitMeasure: string,
    public familyId: string,
    public id?: string
  ) {}
}

export { ProdutoRequest };
