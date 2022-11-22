import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Bestseller, DashboardHelper, Header, LastSevenDay, LastTwelveMonth } from 'src/app/models/dashboard-helper.model';
import { Bestsellers, Dashboard, DashboardRes, SalesOverTimeWeek, SalesOverTimeYear } from 'src/app/models/dashboard.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(): Observable<DashboardHelper> {
    return this.http.get<Dashboard>(`${environment.apiUrl}dashboard`).pipe(map((result: Dashboard) => {
      let header = this.getHeader(result.dashboard);
      let revenue = this.getRevenue(result.dashboard);
      let bestsellers = this.getBestsellers(result.dashboard.bestsellers);
      return { header: header, ...revenue, bestsellers };
    }));
  }

  private getBestsellers(bestsellers: Bestsellers[]): Bestseller[] {
    return bestsellers.map((bestseller: Bestsellers) => ({
      name: bestseller.product.name,
      price: "$" + Math.floor(bestseller.revenue / bestseller.units),
      unitsSold: bestseller.units,
      revenue: bestseller.revenue
    }));
  }

  private getHeader(dashboard: DashboardRes): Header[] {
    return [
      {
        label: 'Today',
        total: this.getThousands(dashboard.sales_over_time_week[1].total.toString()),
        orders: dashboard.sales_over_time_week[1].orders
      },
      {
        label: 'Last Week',
        total: this.getThousands(this.getWeeklyTotal(dashboard.sales_over_time_week)),
        orders: this.getWeeklyOrders(dashboard.sales_over_time_week)
      },
      {
        label: 'Last Month',
        total: this.getThousands(dashboard.sales_over_time_year[1].total.toString()),
        orders: dashboard.sales_over_time_year[1].orders
      },
    ];
  }

  private getWeeklyTotal(weeks: SalesOverTimeWeek): string {
    let res: number = 0;
    for (const week in weeks) {
      res += (weeks as any)[week].total;
    }
    return res.toString();
  }

  private getWeeklyOrders(weeks: SalesOverTimeWeek): string {
    let res = 0;
    for (const week in weeks) {
      res += (weeks as any)[week].orders;
    }
    return res.toString();
  }

  private getThousands(value: string): string {
    const res: number = +value;
    if ((res / 1000) > 10) {
      return `$${Math.round(res / 1000)}K`;
    }
    return `$${res}`;
  }

  private getRevenue(dashboard: DashboardRes): { lastSevenDays: LastSevenDay[], lastTwelveMonths: LastTwelveMonth[] } {
    return {
      lastSevenDays: this.getLastSevenDays(dashboard.sales_over_time_week),
      lastTwelveMonths: this.getLastTwelveMonths(dashboard.sales_over_time_year)
    };
  }

  private getLastSevenDays(weeks: SalesOverTimeWeek): LastSevenDay[] {
    let lastSevenDays = [];
    for (const week in weeks) {
      lastSevenDays.push({
        name: this.getDayLabel(week),
        value: (weeks as any)[week].total
      });
    }
    return lastSevenDays;
  }

  private getDayLabel(i: string): string {
    switch (i) {
      case '1': {
        return 'today';
      }
      case '2': {
        return 'yesterday';
      }
      default: {
        return `day ${i}`
      }
    }
  }

  private getLastTwelveMonths(months: SalesOverTimeYear): LastTwelveMonth[] {
    let lastTwelveMonths = [];
    for (const month in months) {
      lastTwelveMonths.push({
        name: this.getMonthLabel(month),
        value: (months as any)[month].total
      });
    }
    return lastTwelveMonths;
  }

  private getMonthLabel(i: string): string {
    switch (i) {
      case '1': {
        return 'this month';
      }
      case '2': {
        return 'last month';
      }
      default: {
        return `month ${i}`
      }
    }
  }
}
