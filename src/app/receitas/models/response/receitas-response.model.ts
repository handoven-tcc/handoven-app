import { ReceitaCategoria, ReceitaIngredienteCategoria } from "..";

interface ReceitasResponse {
  id?: string;
  image?: any;
  name: string;
  category: ReceitaCategoria;
  section: {
    ingredients: IngredientesReceita[];
    prepare_mode: [];
    extras: string[];
  };
}

interface IngredientesReceita {
  ingredients_name: string;
  ingredients_quantity: number;
  ingredients_unit_measure: string;
  ingredients_category: ReceitaIngredienteCategoria;
  ingredients_notes: string;
}

export { type ReceitasResponse, type IngredientesReceita };
