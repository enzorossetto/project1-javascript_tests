// Class declaration
export default class Cart {
  items = [];

  getTotal() {}

  add(item) {}

  remove(product) {}

  summary() {}

  checkout() {}
}

// Use
const cart = new Cart();

const product = {
  title: '',
  price: '',
};

const item = {
  quantity: 2,
  product,
};

cart.add(item);
cart.remove(product);
cart.getTotal();
cart.summary();
cart.checkout();
