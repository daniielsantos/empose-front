import { Injectable } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  getProducts() {
    const products: Product[] = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Product 1 description',
        discount: 0.5,
        category: 'Category 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'Product 2',
        description: 'Product 2 description',
        discount: 0.5,
        category: 'Category 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Product 3',
        description: 'Product 3 description',
        discount: 0.5,
        category: 'Category 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Product 4',
        description: 'Product 4 description',
        discount: 0.5,
        category: 'Category 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Product 5',
        description: 'Product 5 description',
        discount: 0.5,
        category: 'Category 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Product 6',
        description: 'Product 6 description',
        discount: 0.5,
        category: 'Category 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return products;
  }
}
