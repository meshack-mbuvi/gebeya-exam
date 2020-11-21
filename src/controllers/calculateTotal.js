/**
 * This method returns the total amount for all items in a given card
 * @param {Array} cart Cart with product items
 */
export const calculateTotal = (cart) => {
  let total = 0;
  if (cart.length === 0) return 0;
  cart.forEach((cartItem) => (total += cartItem.total));
  return total;
};
