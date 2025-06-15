import { UUID } from 'crypto';
import Product from './Product';

class Purchase {
    uuid: UUID | null;
    product: Product;
    price: number;
    quantity: number;
    tags: string[];

    constructor(uuid: UUID | null, product: Product, price: number, quantity: number, tags: string[]) {
        this.uuid = uuid;
        this.product = product;
        this.price = price;
        this.quantity = quantity;
        this.tags = tags;
    }
}

export default Purchase;