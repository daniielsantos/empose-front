import { Client } from "./client.model";
import { Product } from "./product.model";

export class Order {
    constructor(
        public id?: number,
        public total?: number,
        public status?: string,
        public paymentMethod?: string,
        public client?: Client,
        public products?: Product[],
        public createdAt?: Date,
        public updatedAt?: Date,
    ) {}
}