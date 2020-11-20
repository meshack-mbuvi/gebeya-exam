import { ItemSchema } from '../database/Models';

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
    const items = await ItemSchema.aggregate([
      {
        $sort: { price: -1 },
      },
      { $limit: skip + limit },
      { $skip: skip },
      {
        $lookup: {
          from: 'users',
          localField: 'vendor',
          foreignField: '_id',
          as: 'user',
        },
      },
      { $unwind: '$user' },
      {
        $group: {
          _id: {
            name: '$name',
            description: '$description',
            price: '$price',
            photo: '$photo',
            id: '$_id',
            vendor: '$user.name',
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          _id: 0,
          name: '$_id.name',
          description: '$_id.description',
          photo: '$_id.photo',
          price: '$_id.price',
          id: '$_id.id',
          vendor: '$_id.vendor',
        },
      },
    ]);

    return response.status(200).send({
      items,
      count: items.length,
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
    if (isNaN(item_id)) {
      return response
        .status(400)
        .send({ message: 'Item id should be a valid id' });
    }

    const item = await ItemSchema.findById(id);

    if (!item) {
      return response
        .status(404)
        .send({ message: 'Item with given id not found' });
    }

    return response.status(200).send(item);
  }
}
