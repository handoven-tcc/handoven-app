class ProdutoRequest {
  constructor(
    public name: string,
    public type: string,
    public validity: string,
    public category: string,
    public cost: string,
    public amount: number,
    public familyId: string,
    public id?: string
  ) {}
}

export { ProdutoRequest };
