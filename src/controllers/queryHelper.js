import mongoose from 'mongoose';
import { ItemSchema, CartSchema } from '../database/Models';
import { parse as uuidParse } from 'uuid';

require('mongoose-uuid2')(mongoose);

const UUID = mongoose.Types.UUID;

export const aggregateItems = async ({
  matchOptions = {},
  sortOptions = { price: -1 },
  skip = 0,
  limit = 10,
}) =>
  await ItemSchema.aggregate([
    {
      $match: { ...matchOptions },
    },
    {
      $sort: { ...sortOptions },
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

export const aggregateCart = async (cartId) =>
  await CartSchema.aggregate([
    {
      $match: { cart_id: { $eq: cartId.toString() } },
    },
    {
      $lookup: {
        from: 'items',
        localField: 'item_id',
        foreignField: '_id',
        as: 'item',
      },
    },
    { $unwind: '$item' },
    {
      $group: {
        _id: {
          itemName: '$item.name',
          itemId: '$item._id',
          price: '$item.price',
          photo: '$item.photo',
          id: '$cart_id',
          quantity: '$quantity',
          total: { $multiply: ['$item.price', '$quantity'] },
        },
        count: {
          $sum: 2,
        },
      },
    },
    {
      $project: {
        _id: 0,
        name: '$_id.itemName',
        price: '$_id.price',
        cart_id: '$_id.id',
        quantity: '$_id.quantity',
        itemId: '$_id.itemId',
        total: '$_id.total',
      },
    },
  ]);
