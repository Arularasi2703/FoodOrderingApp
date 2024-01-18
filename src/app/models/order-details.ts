export interface OrderDetails {
  orderId: number;
  orderDate: Date;
  orderStatus: string;
  foodItemName: string;
  foodItemDescription: string;
  foodItemImageUrl: string;
  foodItemPrice: number;
  foodItemQty: number;
  transactionId: string;
  totalAmount: number;
  invoiceId: number;
}
