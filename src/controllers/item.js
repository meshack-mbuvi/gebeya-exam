import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types.ObjectId;

import { ItemSchema } from '../database/Models';
import { aggregateItems } from './queryHelper';

export class ItemController {
  /**
   * Add a new product item
   * @param {Object} request The request object
   * @param {Object} response The response object
   * @returns {Object} item The new created item
   */
  static async Add(request, response) {
    const {
      body: { name, photo, description, price },
      user: { id },
    } = request;

    if (!name || !description || !price || !photo) {
      return response.status(400).send({
        message:
          'Please provide all item details as indicated on the documentation.',
      });
    }

    try {
      let item = await ItemSchema.findOne({ name });
      if (item) {
        return response.status(409).send({
          message: 'An item with the specified name exists.',
        });
      }

      item = new ItemSchema({
        name,
        description,
        price,
        photo,
        vendor: id,
      });

      item = await item.save();

      return response.status(201).send({
        item,
        message: 'New product item created successfully.',
      });
    } catch (error) {
      console.log({ error });
      return response.status(500).send({
        message: 'An error occurred while creating new product item.',
      });
    }
  }

  /**
   * Get all products
   * @param {Object} request The request object
   * @param {Object} response The response object
   * @returns {Object} All products
   */
  static async All(request, response) {
    const {
      body: { limit = 10, page = 1 },
    } = request;
    const skip = (page - 1) * limit;
    const items = await aggregateItems({
      skip,
      sortOptions: { price: -1 },
      skip,
      limit,
    });

    return response.status(200).send({
      items,
      count: items.length,
      page,
      limit,
    });
  }

  /**
   * Retrieve a single product
   * @param {Object} request The request object
   * @param {Object} response The response object
   * @returns {Object} A single product
   */
  static async One(request, response) {
    const {
      params: { id },
    } = request;

    // product_id should be a number
    if (!id) {
      return response.status(400).send({ message: 'Missing item id.' });
    }

    try {
      const item = await aggregateItems({
        matchOptions: { _id: { $eq: ObjectId(id) } },
      });

      if (!item) {
        return response
          .status(404)
          .send({ message: 'Item with given id not found' });
      }

      return response.status(200).send(item);
    } catch (error) {
      return response.status(500).send({
        message: 'An error occurred while trying.',
      });
    }
  }
}
