import { ItemSchema } from '../database/Models';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types.ObjectId;

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
