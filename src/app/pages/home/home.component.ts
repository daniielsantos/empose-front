import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Orders } from 'app/shared/models/order.model';
import { OrderService } from '../order/services/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  orders: Orders[] = []
  totalByMonth = [
    {
    month: 1,
    name: 'Janeiro',
    total: 0
    },
    {
    month: 2,
    name: 'Fevereiro',
    total: 0
    },
    {
    month: 3,
    name: 'Março',
    total: 0
    },
    {
    month: 4,
    name: 'Abril',
    total: 0
    },
    {
    month: 5,
    name: 'Maio',
    total: 0
    },
    {
    month: 6,
    name: 'Junho',
    total: 0
    },
    {
    month: 7,
    name: 'Julho',
    total: 0
    },
    {
    month: 8,
    name: 'Agosto',
    total: 0
    },
    {
    month: 9,
    name: 'Setembro',
    total: 0
    },
    {
    month: 10,
    name: 'Outubro',
    total: 0
    },
    {
    month: 11,
    name: 'Novembro',
    total: 0
    },
    {
    month: 12,
    name: 'Dezembro',
    total: 0
    },
]
  constructor(private orderService: OrderService) {
    
  }

  async ngAfterViewInit(): Promise<void> {
    this.orderService.findAll().subscribe(orders => {
      this.orders = orders
      this.filterOrdersByMonth()
    })    
  }

  filterOrdersByMonth() {
    this.orders.forEach(it => {
      let date = new Date(it.created_at || '')
      if(date.getFullYear() == new Date().getFullYear()) {
        this.totalByMonth = this.totalByMonth.filter(i => {
          if(i.month == date.getMonth() + 1) {
            let total = it.total || 0
            i.total += parseFloat(total.toString())
          }
          return i
        })
      }
    })
  }

}
