import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let getDashboardSpy: any;
  beforeEach(async () => {
    const fakeDashboardService = jasmine.createSpyObj('DashboardService', ['getDashboard']);
    getDashboardSpy = fakeDashboardService.getDashboard.and.returnValue(of(null));

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: fakeDashboardService }
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDashboard and set dataSource.paginator', () => {
    getDashboardSpy.and.callFake(() => {
      return of({ bestsellers: [] });
    });
    component.ngOnInit();
    expect(getDashboardSpy).toHaveBeenCalled();
    expect(component.dataSource.paginator).toBe(component.paginator);
  });
});
