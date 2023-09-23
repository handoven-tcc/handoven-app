interface ReceitasResponse {
  name: string;
  favorited: boolean;
  secao:
    (string[]
      | ({ name: string; quantity: string; notes: string; }
      | { name: string; quantity: string; notes?: undefined; }
      )[])[];
}

export { type ReceitasResponse };
