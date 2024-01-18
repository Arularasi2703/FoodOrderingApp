export class CartItem {
  public id: number;
  public name: string;
  public imageUrl: string;
  public price: number;
  public quantity: number = 0;
  public bill: number;
  public userId?: number;
  public foodItemId: number; 
  public totalAmount: number | undefined;

  constructor(id: number, name: string, imageUrl: string, price: number, qty: number, bill: number, foodItemId: number, userId?: number) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.price = price;
    this.quantity = qty;
    this.bill = bill;
    this.foodItemId = foodItemId;
    this.userId = userId;
    this.totalAmount = this.price * this.quantity; 
  }
}
