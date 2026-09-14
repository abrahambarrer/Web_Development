
const tax_rate = prompt('Enter tax rate (0.10)');
const shipping_threshold = prompt('Enter shipping threshold (1000)');

/* add loop and other code here ... in this simple exercise we are not
   going to concern ourselves with minimizing globals, etc */

let subTotal = 0

for (const item of cart) {
   const total = calculateAmount(item.quantity, item.product.price);
   outputCartRow(item, total);
   subTotal += total;
}

const tax = parseFloat(tax_rate) * subTotal;

const shipping = subTotal < parseInt(shipping_threshold) ? 40 : 0;

const grandTotal = subTotal + tax + shipping;