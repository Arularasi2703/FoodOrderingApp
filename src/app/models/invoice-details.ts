import { OrderDetails } from './order-details';

export interface InvoiceDetails {
  invoiceId: number;
  orderDate: Date | null;
  orderStatus: string;
  orderDetails: OrderDetails[];
}
