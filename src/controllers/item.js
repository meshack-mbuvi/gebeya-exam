import { ItemSchema } from '../database/Models';

export class ItemController {
  /**
   * Get all products
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} All products
   */
  static async All(req, res) {
    const items = await ItemSchema.find({});

    return res.status(200).send({
      items,
      count: items.length,
    });
  }

  /**
   * Retrieve a single product
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @returns {Object} A single product
   */
  static async One(req, res) {
    const {
      params: { id },
    } = req;

    // product_id should be a number
    if (isNaN(item_id)) {
      return res.status(400).send({ message: 'Item id should be a valid id' });
    }

    const item = await ItemSchema.findById(id);

    if (!item) {
      return res.status(404).send({ message: 'Item with given id not found' });
    }

    return res.status(200).send(item);
  }
}
