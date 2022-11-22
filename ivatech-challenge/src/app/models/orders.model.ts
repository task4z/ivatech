export interface Address {
    city: string;
    street: string;
    zipcode: string;
}

export interface Customer {
    address: Address;
    id: string;
    name: string;
    surname: string;
}

export interface Product {
    id: string;
    image: string;
    name: string;
    quantity: number;
}

export interface Order {
    created_at: Date | string;
    currency: string;
    customer: Customer;
    id: string;
    product: Product;
    status: string;
    total: number;
}

export interface Orders {
    orders: Order[];
    page: number;
    total: number;
}

