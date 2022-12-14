import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private paymentMethodService: PaymentMethodService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.paymentMethodService.findAll().subscribe(paymentMethods => {
      this.paymentMethods = paymentMethods;
    })
  }

  alert(msg: string, type: string) {
    notify({message: msg, type: type, width: 400})
    return new Promise(resolve => setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['payment-methods']);
      });
      resolve('a')
    }, 2000))
  }

  onSavedPaymentMethod(data: any) {
    if(data.changes[0] && data.changes[0].type == "update") {
      this.paymentMethodService.update(data.changes[0].data).subscribe({
        next: async (value) => {
          await this.alert('Meio de pagamento atualizado!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      })  
    }
    
    if(data.changes[0] && data.changes[0].type == "insert") {
      this.paymentMethodService.save(data.changes[0].data).subscribe({
        next: async (value) => {
          await this.alert('Meio de pagamento inserido!', 'success')
        },
        error: async (err) => {
          await this.alert(err.error.message, 'error')
        }
      }) 
    }
  }

  onRemovedPaymentMethod(data: any) {
    this.paymentMethodService.delete(data.data).subscribe({
      next: async (value) => {
        await this.alert('Meio de pagamento removido!', 'success')
      },
      error: async (err) => {
        await this.alert(err.error.message, 'error')
      }
    }) 
  }
  
}
