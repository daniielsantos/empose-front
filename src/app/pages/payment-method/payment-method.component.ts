import { Component, OnInit } from '@angular/core';
import { PaymentMethods } from 'app/shared/models/payment.methods.model';
import notify from 'devextreme/ui/notify';
import { PaymentMethodService } from './services/payment-method.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {
  paymentMethods: PaymentMethods[] = [];
  readonly allowedPageSizes = [5, 10, 'all'];
  constructor(private paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
    this.paymentMethodService.findAll().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })
  }

  alert(msg: string) {
    notify({message: msg, width: 400})
    return new Promise(resolve => setTimeout(() => {
      // this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      //   this.router.navigate(['product']);
      // });
      resolve('a')
    }, 2000))
  }

  onSavedPaymentMethod(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      this.paymentMethodService.update(data.changes[0].data).subscribe(async(pay) => {
        await this.alert("Meio de pagamento atualizado!")
      })
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      this.paymentMethodService.save(data.changes[0].data).subscribe(async(paymentMethods) => {
        await this.alert("Meio de pagamento inserido!")
      })
    }
  }

  onRemovedPaymentMethod(data: any) {
    this.paymentMethodService.delete(data.data).subscribe(async (paymentMethods) => {
      await this.alert("Meio de pagamento removido!")
    })
  }
  
}
