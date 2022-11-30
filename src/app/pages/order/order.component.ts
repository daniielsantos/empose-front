import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { Orders } from 'app/shared/models/order.model';
import { environment } from 'environments/environment';
import { OrderService } from './services/order.service';


// import { exportDataGrid } from 'devextreme/excel_exporter';
// import { Workbook } from 'exceljs';
// import { saveAs } from 'file-saver-es';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  url: string = `${environment.apiUrl}`;
  readonly allowedPageSizes = [5, 10, 'all'];
  orders: Orders[] = [];
  statusEnum = [
    {
      id: 1,
      name: 'AGUARDANDO',
    },
    {
      id: 2,
      name: 'ENVIADO',
    }
  ]

  constructor(private orderService: OrderService) { 
    this.orderService.findAll().subscribe(orders => {
      this.orders = orders;
      this.orders[4].delivery_status = 1
      console.log(orders);
    });
  }

  ngOnInit(): void {
  }
  
  onExporting(e: any) {
    // const doc = new jsPDF();
    // const workbook = new Workbook();
    // const worksheet = workbook.addWorksheet('Employees');
    // exportDataGrid({
    //   component: e.component,
    //   worksheet,
    //   autoFilterEnabled: true
    // }).then(() => {
    //   workbook.xlsx.writeBuffer().then((buffer) => {
    //     saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'pedidos.xlsx')
    //   })
    //   e.cancel = true
    // });
  }

  orderEditing(e: any) {
    // this.prodEditing = {}
    // this.categoryEditing = {}
    // this.prodSkus = []
    // if(e.data.skus[0].id){
    //   this.prodSkus = e.data.skus
    //   this.prodEditing = e.data
    //   this.categoryEditing = e.data.category
    // }
  }
  cancelOrderEditing() {    
    // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['product']);
    // });
  }
}
