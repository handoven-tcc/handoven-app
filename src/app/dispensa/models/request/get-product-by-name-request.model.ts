import { Headers } from "../headers.model";

class GetProductByNameRequest extends Headers {
  constructor(public name: string) {
    super();
  }
}

export { GetProductByNameRequest };
