import { v4 as uuidv4 } from 'uuid';
import { aggregateCart } from './queryHelper';
import { calculateTotal } from './calculateTotal';
import { CartSchema } from '../database/Models';

export class CartController {
  /**
   * This method adds an item to existing shopping cart or creates new cart and adds the item.
   *
   * @param {Object} request The request object
   * @param {Object} response The response object
   * @returns {Object} cart A cart with existing items
   */
  static async AddItemToCart(request, response) {
    const {
      body: { items, cart_id },
    } = request;

    let cart = cart_id;

    try {
      if (items.length) {
        if (!cart_id) {
          // generate new cart id using uuidv4()
          cart = uuidv4();
        }

        for (let index = 0; index < items.length; index++) {
          const element = items[index];

          const { item_id, quantity = 1 } = element;

          let cartItem = await CartSchema.findOne({
            cart_id: cart,
            item_id,
          });
          if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
          } else {
            cartItem = new CartSchema({ item_id, quantity, cart_id: cart });
            await cartItem.save();
          }
        }

        items.forEach(async ({ item_id, quantity = 1 }) => {
          // if item exists in cart, update quantity, else create new.
        });

        const cartDetails = await aggregateCart(cart);
        const total = calculateTotal(cartDetails);

        return response.status(201).send({
          total,
          cart: cartDetails,
          message: 'Product items have been added to cart',
        });
      } else {
        return response.status(400).send({
          message: 'Cart items must be provided in JSON format.',
        });
      }
    } catch (error) {
      console.log({ error });
      return response.status(200).send({
        message: 'An error occurred while processing cart.',
      });
    }
  }

  /**
   * This method retrieves all items in a shopping cart.
   *
   * @param {Object} request The request object
   * @param {Object} response The response object
   * @returns {Object} cartItems
   */
  static async AllCartItems(request, response) {
    const {
      query: { cart_id },
    } = request;

    if (!cart_id) {
      return response.status(400).send({ message: 'cart_id is required' });
    }

    try {
      const cartDetails = await aggregateCart(cart_id);
      const total = calculateTotal(cartDetails);

      return response.send({
        total,
        cart: cartDetails,
      });
    } catch (error) {
      console.log({ error });
      return response
        .status(500)
        .send({ message: 'An error occurred while retrieving cart details' });
    }
  }
}
