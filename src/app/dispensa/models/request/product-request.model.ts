class ProductRequest {
  constructor(
    public name: string,
    public type: string,
    public validity: Date,
    public category: string,
    public cost: string,
    public amount: number,
    public id?: string
  ) {}
}

export { ProductRequest };
