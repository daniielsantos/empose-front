import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderComponent } from './pages/order/order.component';
import { ClientComponent } from './pages/client/client.component';
import { ProductComponent } from './pages/product/product.component';
import { DocumentationComponent } from './pages/documentation/documentation.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EmailSenderComponent } from './pages/email-sender/email-sender.component';
import { DxDataGridModule, DxScrollViewModule, DxButtonModule, DxListModule, DxCheckBoxModule, DxSelectBoxModule } from 'devextreme-angular';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuardService } from './auth/auth-guard.service';


@NgModule({
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    OrderComponent,
    ClientComponent,
    ProductComponent,
    DocumentationComponent,
    NotFoundComponent,
    EmailSenderComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    DxDataGridModule,
    DxScrollViewModule,
    DxButtonModule,
    DxListModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
