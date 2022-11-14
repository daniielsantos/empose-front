import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DxDataGridModule } from 'devextreme-angular';
import * as AspNetData from 'devextreme-aspnet-data-nojquery';
import { Orders } from 'src/app/shared/models/order.model';
import { Client } from 'src/app/shared/models/client.model';
import { environment } from 'src/environments/environment';
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
