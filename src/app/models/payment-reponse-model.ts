import { OrderDetails } from "./order-details";

export interface PaymentResponseModel {
  message: string;
  orderDetails: OrderDetails[];
}