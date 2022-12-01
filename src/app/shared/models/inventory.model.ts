import { Sku } from "./sku.model";
import { Store } from "./store.model";

export class Inventory {
    constructor(
      public id?: number,
      public quantity?: number,
      public store?: Store, 
      public sku?: Sku,
    ) {}
}
