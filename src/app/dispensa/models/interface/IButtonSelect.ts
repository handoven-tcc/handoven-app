interface IButtonSelect {
  id: number;
  name: string;
  code: string;
}

interface IButtonSelectComAbreviacao extends IButtonSelect {
  abbreviation: string;
}

export { type IButtonSelect, type IButtonSelectComAbreviacao };
