/* define your functions here */

const calculateAmount = (quantity, price) =>  quantity * price;

const outputCartRow = (item, total) => { 
    document.write(`<tr>`);
    document.write(`<td><img src="images/` + item.product.filename + `"></img></td>`);
    document.write(`<td>` + item.product.title + `</td>`);
    document.write(`<td>` + item.quantity + `</td>`);
    document.write(`<td>$` + item.product.price.toFixed(2) + `</td>`);
    document.write(`<td>$` + total.toFixed(2) + `</td>`);
    document.write(`</tr>`);
};

/* 
        <tr class="totals">
            <td colspan="4">Subtotal</td>
            <td>$550.00</td>
        </tr>
        <tr class="totals">
            <td colspan="4">Tax</td>
            <td>$55.00</td>
        </tr>
        <tr class="totals">
            <td colspan="4">Shipping</td>
            <td>$0.00</td>
        </tr>
        <tr class="totals">
            <td colspan="4" class="focus">Grand Total</td>
            <td class="focus">$605.00</td>
        </tr>
*/


        