enum ReceitaCategoria {
  Sobremesas = 1,
  Saladas = 2,
  Sopas = 3,
  Omeletes = 4,
  "Pratos Asiáticos" = 5,
  "Pratos Brasileiros" = 6,
  Risotos = 7,
  Frangos = 8,
  Massas = 9,
  Peixes = 10,
  Pizzas = 11,
  Bebidas = 12,
  Aperitivos = 13,
  Vegetarianas = 14,
}

interface ReceitasResponse {
  name: string;
  favorited: boolean;
  category: ReceitaCategoria;
  section: {
    ingredients: {
      name: string,
      quantity: string,
      category: string,
      notes: string,
    }[],
    prepareMode: [],
    extras: []
  };
}

export { type ReceitasResponse };
