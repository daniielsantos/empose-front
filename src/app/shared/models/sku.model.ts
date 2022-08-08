import { Product } from "./product.model";
import { Inventory } from "./inventory.model";

export class Sku {
    constructor(
      public id?: number,
      public name?: string,
      public description?: string,
      public isActive?: boolean,
      public product?: Product,
      // public inventory?: Inventory
    ) {}
}
