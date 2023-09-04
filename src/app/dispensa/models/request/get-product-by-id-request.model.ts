import { Headers } from "../headers.model";

class GetProductByIdRequest extends Headers {
  constructor(public id: string) {
    super();
  }
}

export { GetProductByIdRequest };
