import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deviveryStatusEnum, Orders, statusEnum } from 'app/shared/models/order.model';
import notify from 'devextreme/ui/notify';
import { environment } from 'environments/environment';
import { OrderService } from './services/order.service';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  url: string = `${environment.apiUrl}`;
  readonly allowedPageSizes = [5, 10, 'all'];
  orders: Orders[] = [];
  orderItems: Orders[] = [];
  deviveryStatusEnum = deviveryStatusEnum 
  statusEnum = statusEnum


  constructor(private orderService: OrderService, private router: Router) { 
    this.orderService.findAll().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
  }

  ngOnInit(): void {
  }

  alert(msg: string) {
    notify({message: msg, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['order']);
      });
      resolve('a')
    }, 2000))
  }

  async saveOrder(e: any) {
    if(e.changes[0].type == 'update') {
      this.orderService.update(e.changes[0].data).subscribe(async(orders) => {
        await this.alert('Pedido atualizado!')
      })
    }
  }

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('pedidos.xls');
    });
  }

  orderEditing(e: any) {
    console.log('aaaaaa ', e.data)
    // this.prodEditing = {}
    // this.categoryEditing = {}
    this.orderItems = []
    if(e.data.items[0].id){
      this.orderItems = e.data.items
      console.log("entrou if ", this.orderItems)
      // this.prodEditing = e.data
      // this.categoryEditing = e.data.category
    }
  }
  deleteItemRow() {
    
  }
  cancelOrderEditing() {    
    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['product']);
    // });
  }
}
