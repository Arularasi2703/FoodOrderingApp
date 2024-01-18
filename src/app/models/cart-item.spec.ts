import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should create an instance', () => {
    const cartItem = new CartItem(1, 'Item Name', 'image.jpg', 10, 2, 20, 123); // Provide required arguments
    expect(cartItem).toBeTruthy();
  });
});
