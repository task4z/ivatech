import { NgModule } from '@angular/core';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrdersComponent } from './components/orders/orders.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/auth-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    MainComponent,
    DashboardComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    NgxChartsModule
  ],
  providers:
    [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class MainModule { }
