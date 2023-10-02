export interface OrderItem {
  dish_id: string;
  amount: number;
}
export interface Order {
  delivery_address_id: string;
  items_attributes: OrderItem[];
}
