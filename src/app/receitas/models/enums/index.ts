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

enum ReceitaIngredienteCategoria {
  Outros,
  "Açúcares",
  Bebidas,
  Carnes,
  Chocolates,
  Condimentos,
  Conservas,
  Farinhas,
  Frutas,
  Fungos,
  Gorduras,
  "Grãos",
  "Laticínios",
  Legumes,
  "Líquidos",
  Massas,
  Molhos,
  "Pães",
  Peixes,
  "Proteína",
  Temperos,
  Vegetais,
  Verduras
}

enum ReceitaIngredienteUnidadeDeMedida {
  "Colher de sopa",
  "Colher de chá",
  Gramas,
  Litros,
  Miligramas,
  Mililitros,
  "Peças",
  Pitada,
  Quilogramas,
  "Xícaras",
  Unidades,
}


export {ReceitaCategoria, ReceitaIngredienteCategoria, ReceitaIngredienteUnidadeDeMedida};
