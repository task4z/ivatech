import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrdersHelper } from 'src/app/models/orders-helper.model';
import { Order, Orders } from 'src/app/models/orders.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(search: string, page: number): Observable<OrdersHelper> {
    return this.http.get<Orders>(`${environment.apiUrl}/orders?page=${page}&q=${search}`).pipe(map((res: Orders) => {
      return {
        orders: res.orders.map((order: Order) => ({
          name: order.product.name,
          date: new Date(order.created_at),
          price: order.currency + (Math.round(order.total / order.product.quantity * 100) / 100).toFixed(2),
          status: order.status
        })),
        total: res.total
      };
    }));
  }
}
