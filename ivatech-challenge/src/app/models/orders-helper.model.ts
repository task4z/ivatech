export interface OrderHelper {
    name: string;
    date: Date;
    price: string;
    status: string;
}

export interface OrdersHelper {
    orders: OrderHelper[];
    total: number;
}

