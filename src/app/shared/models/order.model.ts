import { Client } from "./client.model";
import { OrderItem } from "./orderItem.model";
import { PaymentMethods } from "./paymentMethods.model";

export class Order {
    constructor(
        public id?: number,
        public total?: number,
        public paymentMethod?: PaymentMethods,
        public client?: Client,
        public items?: OrderItem[],
        public createdAt?: Date,
    ) {}
}