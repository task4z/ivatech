import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import { OrderHelper, OrdersHelper } from 'src/app/models/orders-helper.model';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  search: string = '';
  page = 1;
  total = 0;
  displayedColumns: string[] = ['name', 'date', 'price', 'status'];
  dataSource = new MatTableDataSource<OrderHelper>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  term$ = new Subject<string>();
  numberOfPages = 0;

  private onDestroy$: Subject<void> = new Subject();

  constructor(private ordersService: OrdersService) {
    this.term$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(() => {
        this.page = 1;
        this.getOrders();
        return EMPTY;
      }),
      takeUntil(this.onDestroy$)
    ).subscribe();
  }

  ngOnInit(): void {
    this.getOrders();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  goToPreviousPage(): void {
    this.page--;
    this.getOrders();
  }

  goToNextPage(): void {
    this.page++;
    this.getOrders();
  }

  private getOrders(): void {
    this.ordersService.getOrders(this.search, this.page).pipe(takeUntil(this.onDestroy$)).subscribe((res: OrdersHelper) => {
      this.dataSource = new MatTableDataSource<OrderHelper>(res.orders);
      this.total = res.total;
      this.numberOfPages = res.total ? Math.ceil(res.total / res.orders.length) : 0;
      this.dataSource.paginator = this.paginator;
    });
  }
}
