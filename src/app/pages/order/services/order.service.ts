import { Injectable } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  getOrders() {
    const orders: Order[] = [
      {
        id: 1,
        total: 199,
        status: 'PAGO',
        paymentMethod: 'DÉBITO',
        client: {
          id: 1,
          name: 'Client 1',
          email: 'teste@gmail',
          cpf: '12345678901',
          phone: '12345678901',
          address: 'Rua 1',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '12345678',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        products: [
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
        
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        total: 599,
        status: 'AGUARDANDO PAGAMENTO',
        paymentMethod: 'CARTAO_CREDITO',
        client: {
          id: 2,
          name: 'Client 2',
          email: 'teste@gmail',
          cpf: '12345678901',
          phone: '12345678901',
          address: 'Rua 1',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '12345678',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        products: [
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
        
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        total: 1599,
        status: 'CANCELADO',
        paymentMethod: 'BOLETO',
        client: {
          id: 2,
          name: 'Client 3',
          email: 'teste@gmail',
          cpf: '12345678901',
          phone: '12345678901',
          address: 'Rua 1',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '12345678',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        products: [
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
        
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        total: 250,
        status: 'PAGO',
        paymentMethod: 'BOLETO',
        client: {
          id: 2,
          name: 'Client 4',
          email: 'teste@gmail',
          cpf: '12345678901',
          phone: '12345678901',
          address: 'Rua 1',
          city: 'Paranavaí',
          state: 'PR',
          zipCode: '12345678',
          country: 'Brasil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        products: [
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
        
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return orders;
  }
}
