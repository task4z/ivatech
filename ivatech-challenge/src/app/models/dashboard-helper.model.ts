export interface DashboardHelper {
    header: Header[];
    lastSevenDays: LastSevenDay[];
    lastTwelveMonths: LastTwelveMonth[];
    bestsellers: Bestseller[];
}

export interface Header {
    label: string;
    total: string;
    orders: any;
}

export interface LastSevenDay {
    name: string;
    value: number;
}

export interface LastTwelveMonth {
    name: string;
    value: number;
}

export interface Bestseller {
    name: string;
    price: string;
    unitsSold: number;
    revenue: number;
}