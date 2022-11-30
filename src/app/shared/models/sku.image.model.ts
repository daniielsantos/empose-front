import { Store } from "./store.model";

export class SkuImage {
    constructor(
      public id?: number,
      public url?: string,
      public name?: string,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
}