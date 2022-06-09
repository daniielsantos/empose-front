import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];

  constructor(private orderService: OrderService) { 
    this.orders = this.orderService.getOrders();
  }

  ngOnInit(): void {
  }
  
  customizeColumns(columns: any) {
    // columns[0].width = 300;
  }
}
