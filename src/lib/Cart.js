export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    );
  }

  add(item) {
    this.items.push(item);
  }

  remove(product) {}

  summary() {}

  checkout() {}
}
