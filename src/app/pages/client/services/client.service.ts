import { Injectable } from '@angular/core';
import { Client } from 'src/app/shared/models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  getClients() {
    const clients: Client[] = [
      {
        id: 1,
        name: 'Client 1',
        email: 'daniel@gmail.com',
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
      {
        id: 2,
        name: 'Client 2',
        email: 'daniel@gmail.com',
        cpf: '12345678901',
        phone: '12345678901',
        address: 'Rua 2',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Client 3',
        email: 'daniel@gmail.com',
        cpf: '12345678901',
        phone: '12345678901',
        address: 'Rua 3',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: 'Client 4',
        email: 'daniel@gmail.com',
        cpf: '12345678901',
        phone: '12345678901',
        address: 'Rua 4',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: 'Client 5',
        email: 'daniel@gmail.com',
        cpf: '12345678901',
        phone: '12345678901',
        address: 'Rua 5',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: 'Client 6',
        email: 'daniel@gmail.com',
        cpf: '12345678901',
        phone: '12345678901',
        address: 'Rua 6',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        country: 'Brasil',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return clients;
  }
}
