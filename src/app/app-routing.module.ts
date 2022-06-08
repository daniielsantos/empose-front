import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { EmailSenderComponent } from './pages/email-sender/email-sender.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'client',
    component: ClientComponent
  },
  {
    path: 'product',
    component: ProductComponent
  },
  {
    path: 'email',
    component: EmailSenderComponent
  },
  {
    path: 'documentation',
    component: DocumentationComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
