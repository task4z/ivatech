import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { OrdersComponent } from './orders.component';
import { OrderHelper, OrdersHelper } from 'src/app/models/orders-helper.model';
import { OrdersService } from '../../services/orders.service';

const MOCK_ORDER_HELPER: OrdersHelper = {
  orders: [{
    name: 'name',
    date: new Date(),
    price: 'price',
    status: 'status'
  } as OrderHelper],
  total: 1,
} as OrdersHelper;
describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  let getOrdersSpy: any;
  beforeEach(async () => {
    const fakeOrdersService = jasmine.createSpyObj('OrdersService', ['getOrders']);
    getOrdersSpy = fakeOrdersService.getOrders.and.returnValue(of(MOCK_ORDER_HELPER));
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      providers: [
        { provide: OrdersService, useValue: fakeOrdersService }],
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have total as 0', () => {
    getOrdersSpy.and.callFake(() => {
      return of({ orders: [], total: 0 });
    });
    component.ngOnInit();
    expect(component.total).toEqual(0);
  });

  it('should call getOrders', () => {
    component.ngOnInit();
    expect(component.total).toEqual(MOCK_ORDER_HELPER.total);
    expect(component.numberOfPages).toEqual(MOCK_ORDER_HELPER.total ? Math.ceil(MOCK_ORDER_HELPER.total / MOCK_ORDER_HELPER.orders.length) : 0);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should call getOrders after go to previous page', () => {
    component.goToPreviousPage();
    expect(component.total).toEqual(MOCK_ORDER_HELPER.total);
    expect(component.numberOfPages).toEqual(MOCK_ORDER_HELPER.total ? Math.ceil(MOCK_ORDER_HELPER.total / MOCK_ORDER_HELPER.orders.length) : 0);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should call getOrders after go to previous next', () => {
    component.goToNextPage();
    expect(component.total).toEqual(MOCK_ORDER_HELPER.total);
    expect(component.numberOfPages).toEqual(MOCK_ORDER_HELPER.total ? Math.ceil(MOCK_ORDER_HELPER.total / MOCK_ORDER_HELPER.orders.length) : 0);
    expect(component.dataSource.paginator).toBe(component.paginator);
  });

  it('should call getOrders after search term changes', fakeAsync(() => {
    component.term$.next('test');
    tick(1000);
    expect(component.total).toEqual(MOCK_ORDER_HELPER.total);
    expect(component.numberOfPages).toEqual(MOCK_ORDER_HELPER.total ? Math.ceil(MOCK_ORDER_HELPER.total / MOCK_ORDER_HELPER.orders.length) : 0);
    expect(component.dataSource.paginator).toBe(component.paginator);
  }));
});
