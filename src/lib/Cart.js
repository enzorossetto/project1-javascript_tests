import find from 'lodash/find';
import remove from 'lodash/remove';
import Dinero from 'dinero.js';

Dinero.defaultCurrency = 'BRL';
Dinero.defaultPrecision = 2;

const calculatePercentageDiscount = (amount, item) => {
  if (item?.condition?.percentage && item.quantity > item?.condition?.minimum) {
    return amount.percentage(item.condition.percentage);
  }

  return Dinero({ amount: 0 });
};

const calculateQuantityDiscount = (amount, item) => {
  const isEven = item.quantity % 2 === 0;

  if (item?.condition?.quantity && item.quantity > item?.condition?.quantity) {
    return amount.percentage(isEven ? 50 : 40);
  }

  return Dinero({ amount: 0 });
};

const calculateDiscount = (amount, quantity, condition) => {
  const list = Array.isArray(condition) ? condition : [condition];

  const [higherDiscount] = list
    .map(cond => {
      if (cond.percentage) {
        return calculatePercentageDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      } else if (cond.quantity) {
        return calculateQuantityDiscount(amount, {
          condition: cond,
          quantity,
        }).getAmount();
      }
    })
    .sort((a, b) => b - a);

  return Dinero({ amount: higherDiscount });
};

export default class Cart {
  items = [];

  getTotal() {
    return this.items.reduce((acc, item) => {
      const amount = Dinero({ amount: item.product.price * item.quantity });
      let discount = Dinero({ amount: 0 });

      if (item.condition) {
        discount = calculateDiscount(amount, item.quantity, item.condition);
      }

      return acc.add(amount).subtract(discount);
    }, Dinero({ amount: 0 }));
  }

  add(item) {
    const itemToFind = { product: item.product };

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind);
    }

    this.items.push(item);
  }

  remove(product) {
    remove(this.items, { product });
  }

  summary() {
    const total = this.getTotal().getAmount();
    const items = this.items;

    return {
      total,
      items,
    };
  }

  checkout() {
    const { total, items } = this.summary();

    this.items = [];

    return {
      total,
      items,
    };
  }
}
