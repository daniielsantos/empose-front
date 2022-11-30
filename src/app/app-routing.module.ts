import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/auth-guard.service';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ClientComponent } from './pages/client/client.component';
import { ConfigComponent } from './pages/config/config.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { EmailSenderComponent } from './pages/email-sender/email-sender.component';
import { FileUploadComponent } from './pages/file-upload/file-upload.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OrderComponent } from './pages/order/order.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { PaymentMethodComponent } from './pages/payment-method/payment-method.component';
import { ProductComponent } from './pages/product/product.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'recovery',
    component: PasswordRecoveryComponent
  },
  {
    path: '',
    component: SidenavComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'order',
        component: OrderComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'payment-methods',
        component: PaymentMethodComponent
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
        path: 'uploads',
        component: FileUploadComponent
      },
      {
        path: 'email',
        component: EmailSenderComponent
      },
      {
        path: 'configs',
        component: ConfigComponent
      },
      {
        path: 'documentation',
        component: DocumentationComponent
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
