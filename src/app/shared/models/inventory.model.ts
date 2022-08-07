import { Product } from "./product.model";
import { Sku } from "./sku.model";

export class Inventory {
    constructor(
      public id?: number,
      public sku?: Sku,
      public quantity?: number
    ) {}
}
