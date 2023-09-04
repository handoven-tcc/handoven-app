import { Headers } from "../headers.model";

class ProductRequest extends Headers {
  constructor(
    public name: string,
    public type: string,
    public validity: Date,
    public category: string,
    public cost: string,
    public amount: number,
    public id?: string
  ) {
    super();
  }
}

export { ProductRequest };
