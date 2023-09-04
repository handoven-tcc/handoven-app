import { Headers } from "../headers.model";

class DeleteProductRequest extends Headers {
  constructor(public id: string) {
    super();
  }
}

export { DeleteProductRequest };
