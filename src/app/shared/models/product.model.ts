export class Product {
    constructor(
        public id?: number, 
        public name?: string, 
        public description?: string, 
        public discount?: number,
        public category?: string,
        public createdAt?: Date,
        public updatedAt?: Date,        
    ) {}
}
