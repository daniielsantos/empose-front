import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { Orders } from 'app/shared/models/order.model';
import { Client } from 'app/shared/models/client.model';
import { environment } from 'environments/environment';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  url: string = `${environment.apiUrl}`;

  orders: Orders[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private orderService: OrderService) { 
    this.orderService.findAll().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  ngOnInit(): void {
  }
  
  customizeColumns(columns: any) {
    // columns[0].cellTemplate = 'cellTemplate';
  }
}
