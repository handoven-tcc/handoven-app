import {
  IngredientesReceita,
  ReceitaCategoria,
  ReceitaIngredienteCategoria,
} from "..";

interface AlgoritmoResponse {
  available_plates: AvailablePlate[];
  not_available_plates: NotAvailablePlate[];
}

interface AvailablePlate {
  plate: Plate;
  available_ingredients: string[];
  not_available_ingredients: NotAvailableIngredient[];
}

interface Plate {
  image: string;
  name: string;
  category: ReceitaCategoria;
  favorited: boolean;
  section: {
    ingredients: IngredientesReceita[];
    prepare_mode: [];
    extras: string[];
  };
}

interface NotAvailablePlate {
  plate: Plate;
  available_ingredients: string[];
  not_available_ingredients: NotAvailableIngredient[];
}

interface NotAvailableIngredient {
  ingredient_name: string;
  missing_quantity: number;
}

export { type AlgoritmoResponse };
