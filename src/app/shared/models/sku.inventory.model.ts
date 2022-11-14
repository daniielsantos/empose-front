import { Company } from "./company.model";

export class SkuInventory {
    constructor(
      public id?: number,
      public quantity?: number,
      public company?: Company,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
}