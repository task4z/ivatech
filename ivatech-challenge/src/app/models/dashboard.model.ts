export interface Dashboard {
    dashboard: DashboardRes;
}

export interface DashboardRes {
    bestsellers: Bestsellers[];
    sales_over_time_week: SalesOverTimeWeek;
    sales_over_time_year: SalesOverTimeYear;
}

export interface Bestsellers {
    product: Product;
    revenue: number;
    units: number;
}

export interface Product {
    id: string;
    image: string;
    name: string;
}
export interface SalesOverTimeWeek {
    1: Sales;
    2: Sales;
    3: Sales;
    4: Sales;
    5: Sales;
    6: Sales;
    7: Sales;
}

export interface SalesOverTimeYear {
    1: Sales;
    2: Sales;
    3: Sales;
    4: Sales;
    5: Sales;
    6: Sales;
    7: Sales;
    8: Sales;
    9: Sales;
    10: Sales;
    11: Sales;
    12: Sales;
}

export interface Sales {
    orders: number;
    total: number;
}