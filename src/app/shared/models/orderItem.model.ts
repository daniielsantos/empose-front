import { Sku } from "./sku.model";

export class OrderItem {
    constructor(
      public id?: number,
      public quantity?: number,
      public sku?: Sku,
    ) {}
}
