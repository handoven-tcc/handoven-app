import { ReceitaCategoria } from "../enums";
import { IngredientesReceita } from "../response";

export class ReceitaRequest {
  constructor(
    public image: any,
    public name: string,
    public favorited: boolean,
    public category: ReceitaCategoria,
    public section: {
      ingredients: IngredientesReceita[];
      prepare_mode: [];
      extras: string[];
    }
  ) {}
}
