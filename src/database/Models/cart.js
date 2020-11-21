import mongoose from 'mongoose';
const castAggregation = require('mongoose-cast-aggregation');

require('mongoose-uuid2')(mongoose);

const { ObjectId } = mongoose.Schema.Types;
const UUID = mongoose.Types.UUID;

/**
 * Schema for the shopping cart collection
 */
const CartSchema = new mongoose.Schema({
  quantity: {
    type: Number,
  },
  cart_id: {
    type: String,
  },
  item_id: {
    type: ObjectId,
    ref: 'Item',
  },
});

mongoose.plugin(castAggregation);

const Cart = mongoose.model('cart', CartSchema);

export default Cart;
