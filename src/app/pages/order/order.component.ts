import { NgModule, Component, enableProdMode, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { deviveryStatusEnum, Orders, statusEnum } from 'app/shared/models/order.model';
import notify from 'devextreme/ui/notify';
import { environment } from 'environments/environment';
import { OrderService } from './services/order.service';
import { exportDataGrid } from 'devextreme/pdf_exporter';
import { jsPDF } from 'jspdf';
import { Sku } from 'app/shared/models/sku.model';
import { SkuService } from '../product/services/sku.service';
import { ClientService } from '../client/services/client.service';
import { PaymentMethodService } from '../payment-method/services/payment-method.service';
import { Client } from 'app/shared/models/client.model';
import { PaymentMethods } from 'app/shared/models/payment.methods.model';


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
  allSkus: Sku[] = []
  clients: Client[] = []
  orderEdit: Orders = {}
  paymentMethods: PaymentMethods[] = []

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private skuService: SkuService,
    private clientService: ClientService,
    private paymentMethodService: PaymentMethodService
    ) { 

  }

  ngOnInit(): void {
    this.orderService.findAll().subscribe(orders => {
      this.orders = orders;
      console.log(orders);
    });
    this.skuService.findAll().subscribe(skus => {
      this.allSkus = skus;
    })
    this.clientService.findAll().subscribe(clients => {
      this.clients = clients;
    })
    this.paymentMethodService.findAll().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })
  }

  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['order']);
      });
      resolve('a')
    }, 2000))
  }

  orderEditing(e: any) {
    this.orderEdit = e.data
    console.log('aaaaaa ', this.orderEdit)
    this.orderItems = []
    if(e.data.items[0].id){
      this.orderItems = e.data.items
      console.log("entrou if ", this.orderItems)
    }
  }

  async saveOrder(data: any) {
    console.log('e == ',data)
    console.log('this.this.orderEdit ', this.orderEdit)
    if(data.changes.length && data.changes[0].type == 'update') {
      console.log("entrou update 1")
      this.orderService.update(this.orderEdit).subscribe({
        next: async (value) => {
          await this.alert('Pedido atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })
      return 
    }
    if(this.orderEdit && !data.changes.length) {
      if(!this.orderEdit.items?.length) {
        await this.alert('Pedido sem items!', 'error')
        return
      }
      this.orderService.update(this.orderEdit).subscribe({
        next: async (value) => {
          await this.alert('Pedido atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })
      return
    }
    if(data.changes[0].type == 'insert') {
      let payload: Orders = {
        canceled: data.changes[0].data.canceled || false,
        status: data.changes[0].data.status,
        delivery_status: data.changes[0].data.delivery_status,
        items: this.orderItems,
        client: data.changes[0].data.client,
        payment: data.changes[0].data.payment
      }
      if(!this.orderItems.length) {
        await this.alert('Pedido sem items!', 'error')
        return
      }

      this.orderService.save(payload).subscribe({
        next: async (res) => {
            await this.alert('Pedido criado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })
    }
  }





  cancelOrderEditing() {    
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['order']);
    });
  }

  setCellValue = (rowData: any, value: any) => {
    const files = this.allSkus.find(s => s.id == value)
    rowData.id = files!.id;
    rowData.name = files!.name;
    rowData.description = files?.description
    rowData.price = files?.price
    rowData.quantity = 1
  };

  onExporting(e: any) {
    const doc = new jsPDF();
    exportDataGrid({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('pedidos.xls');
    });
  }
}
