import UniqueValidator from 'mongoose-unique-validator';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema.Types;

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  price: {
    type: String,
  },
  photo: {
    type: String,
  },
  vendor: {
    type: ObjectId,
    ref: 'User',
  },
});

ItemSchema.plugin(UniqueValidator, {
  message: 'This {PATH} has already been added.',
});

const Item = mongoose.model('Item', ItemSchema);

export default Item;
