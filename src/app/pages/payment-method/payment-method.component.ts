import { Component, OnInit } from '@angular/core';
import { PaymentMethods } from 'app/shared/models/payment.methods.model';
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

  onSavedPaymentMethod(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      this.paymentMethodService.update(data.changes[0].data).subscribe(pay => {
        console.log("paymentMethods updated successfully");
      })
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      this.paymentMethodService.save(data.changes[0].data).subscribe(paymentMethods => {
        console.log("paymentMethods saved successfully ",paymentMethods);
      })
    }
  }

  onRemovedPaymentMethod(data: any) {
    this.paymentMethodService.delete(data.data).subscribe(paymentMethods => {
      console.log("Client deleted successfully ",paymentMethods);
    })
  }
  
}
