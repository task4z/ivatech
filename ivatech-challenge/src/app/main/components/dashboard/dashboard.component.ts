import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { Bestseller, DashboardHelper } from 'src/app/models/dashboard-helper.model';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumns: string[] = ['name', 'price', 'unitsSold', 'revenue'];
  dataSource = new MatTableDataSource<Bestseller>();
  dashboard: DashboardHelper | undefined;
  checked = false;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  private onDestroy$: Subject<void> = new Subject();

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getDashboard();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  getDashboard(): void {
    this.dashboardService.getDashboard().pipe(takeUntil(this.onDestroy$)).subscribe((res: DashboardHelper) => {
      this.dashboard = res;
      this.dataSource = new MatTableDataSource<Bestseller>(res.bestsellers);
      this.dataSource.paginator = this.paginator;
    });
  }

}
