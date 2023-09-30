import { ReceitaCategoria, ReceitaIngredienteCategoria } from "../../../receitas/models";

interface ReceitasResponse {
  name: string;
  favorited: boolean;
  category: ReceitaCategoria;
  section: {
    ingredients: IngredientesReceita[],
    prepare_mode: [],
    extras: string[]
  };
}

interface IngredientesReceita {
  ingredients_name: string;
  ingredients_quantity: string;
  ingredients_category: ReceitaIngredienteCategoria;
  ingredients_notes: string;
}

export { type ReceitasResponse, type IngredientesReceita };
